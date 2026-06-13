import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/auth";
import { ensureUploadDir, UPLOAD_DIR } from "@/lib/media";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
]);

const MAX_SIZE = 50 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 });
  }

  await ensureUploadDir();

  const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".jpg");
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fs.writeFile(filepath, buffer);

  const isVideo = file.type.startsWith("video/");

  return NextResponse.json({
    url: `/uploads/${filename}`,
    isVideo,
  });
}
