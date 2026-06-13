import fs from "fs/promises";
import path from "path";

export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  videoSrc?: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "media.json");

export async function getMediaItems(): Promise<MediaItem[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as MediaItem[];
}

export async function saveMediaItems(items: MediaItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, `${JSON.stringify(items, null, 2)}\n`, "utf-8");
}

export function createMediaId(): string {
  return Date.now().toString(36);
}

export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function ensureUploadDir(): Promise<void> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}
