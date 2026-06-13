import fs from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";
import { normalizeMediaItems } from "@/lib/media-normalize";

export type MediaType = "image" | "video";
export type ProductBadge = "new" | "hot" | "sale" | null;

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  videoSrc?: string;
  categoryId: string;
  name: string;
  price: number;
  description?: string;
  buyUrl?: string;
  badge?: ProductBadge;
  stock?: number;
}

const DATA_FILE = path.join(process.cwd(), "data", "media.json");
const BLOB_MEDIA_KEY = "media.json";

function isBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function normalizeItems(items: MediaItem[]): MediaItem[] {
  return normalizeMediaItems(items);
}

async function getMediaFromBlob(): Promise<MediaItem[] | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_MEDIA_KEY });
    const blob = blobs.find((entry) => entry.pathname === BLOB_MEDIA_KEY);
    if (!blob) return null;

    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;

    return normalizeItems((await res.json()) as MediaItem[]);
  } catch (error) {
    console.error("Failed to read media from blob:", error);
    return null;
  }
}

async function getMediaFromFs(): Promise<MediaItem[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return normalizeItems(JSON.parse(raw) as MediaItem[]);
}

async function seedBlobFromFs(): Promise<MediaItem[]> {
  const items = await getMediaFromFs();
  await saveMediaItems(items);
  return items;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  if (isBlobStorageEnabled()) {
    const blobItems = await getMediaFromBlob();
    if (blobItems) return blobItems;
    return seedBlobFromFs();
  }

  return getMediaFromFs();
}

export async function saveMediaItems(items: MediaItem[]): Promise<void> {
  const normalized = normalizeItems(items);
  const payload = `${JSON.stringify(normalized, null, 2)}\n`;

  if (isBlobStorageEnabled()) {
    await put(BLOB_MEDIA_KEY, payload, {
      access: "public",
      allowOverwrite: true,
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return;
  }

  try {
    await fs.writeFile(DATA_FILE, payload, "utf-8");
  } catch (error) {
    console.error("Failed to write media.json:", error);
    throw new Error("Cannot save media without Blob storage on this host");
  }
}

export function createMediaId(): string {
  return Date.now().toString(36);
}

export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function ensureUploadDir(): Promise<void> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function uploadFile(
  filename: string,
  data: Buffer,
  contentType: string,
): Promise<{ url: string; isVideo: boolean }> {
  const isVideo = contentType.startsWith("video/");

  if (isBlobStorageEnabled()) {
    const blob = await put(`uploads/${filename}`, data, {
      access: "public",
      contentType,
    });
    return { url: blob.url, isVideo };
  }

  await ensureUploadDir();
  const filepath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filepath, data);

  return { url: `/uploads/${filename}`, isVideo };
}

export { isBlobStorageEnabled };
