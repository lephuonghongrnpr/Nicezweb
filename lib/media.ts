import fs from "fs/promises";
import path from "path";
import {
  BLOB_MEDIA_KEY,
  getBlobSaveErrorMessage,
  getStorageMode,
  isBlobStorageEnabled,
  readJsonBlob,
  uploadBlobFile,
  writeJsonBlob,
} from "@/lib/blob-storage";
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

function normalizeItems(items: MediaItem[]): MediaItem[] {
  return normalizeMediaItems(items);
}

async function getMediaFromBlob(): Promise<MediaItem[] | null> {
  const data = await readJsonBlob<MediaItem[]>(BLOB_MEDIA_KEY);
  if (!data) return null;
  return normalizeItems(data);
}

async function getMediaFromFs(): Promise<MediaItem[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return normalizeItems(JSON.parse(raw) as MediaItem[]);
}

export async function getMediaItems(): Promise<MediaItem[]> {
  if (isBlobStorageEnabled()) {
    const blobItems = await getMediaFromBlob();
    if (blobItems) return blobItems;

    const fsItems = await getMediaFromFs().catch(() => null);
    if (fsItems) {
      try {
        await saveMediaItems(fsItems);
      } catch (error) {
        console.error("Failed to seed blob from filesystem:", error);
      }
      return fsItems;
    }
  }

  return getMediaFromFs();
}

export async function saveMediaItems(items: MediaItem[]): Promise<void> {
  const normalized = normalizeItems(items);
  const payload = `${JSON.stringify(normalized, null, 2)}\n`;

  if (isBlobStorageEnabled()) {
    try {
      await writeJsonBlob(BLOB_MEDIA_KEY, payload);
      return;
    } catch (error) {
      console.error("Blob save failed:", error);
      throw new Error(getBlobSaveErrorMessage(error));
    }
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
    const url = await uploadBlobFile(`uploads/${filename}`, data, contentType);
    return { url, isVideo };
  }

  await ensureUploadDir();
  const filepath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filepath, data);

  return { url: `/uploads/${filename}`, isVideo };
}

export { getStorageMode, isBlobStorageEnabled };
