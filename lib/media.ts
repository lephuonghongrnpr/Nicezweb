import fs from "fs/promises";
import path from "path";
import { list, put } from "@vercel/blob";
import { DEFAULT_CATEGORY_ID } from "@/lib/categories";

export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  videoSrc?: string;
  categoryId: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "media.json");
const BLOB_MEDIA_KEY = "media.json";

function useBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function normalizeItems(items: MediaItem[]): MediaItem[] {
  return items.map((item) => ({
    ...item,
    categoryId: item.categoryId ?? DEFAULT_CATEGORY_ID,
  }));
}

async function getMediaFromBlob(): Promise<MediaItem[] | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_MEDIA_KEY, limit: 1 });
    const blob = blobs.find((entry) => entry.pathname === BLOB_MEDIA_KEY);
    if (!blob) return null;

    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;

    return normalizeItems((await res.json()) as MediaItem[]);
  } catch {
    return null;
  }
}

async function getMediaFromFs(): Promise<MediaItem[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return normalizeItems(JSON.parse(raw) as MediaItem[]);
}

export async function getMediaItems(): Promise<MediaItem[]> {
  if (useBlobStorage()) {
    const blobItems = await getMediaFromBlob();
    if (blobItems) return blobItems;
  }

  return getMediaFromFs();
}

export async function saveMediaItems(items: MediaItem[]): Promise<void> {
  const normalized = normalizeItems(items);
  const payload = `${JSON.stringify(normalized, null, 2)}\n`;

  if (useBlobStorage()) {
    await put(BLOB_MEDIA_KEY, payload, {
      access: "public",
      allowOverwrite: true,
      contentType: "application/json",
    });
  }

  try {
    await fs.writeFile(DATA_FILE, payload, "utf-8");
  } catch {
    // Vercel serverless may not allow writing to disk — blob is the source of truth there.
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

  if (useBlobStorage()) {
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

export { useBlobStorage };
