import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { getCategoryById } from "@/lib/categories";
import { normalizeMediaItems } from "@/lib/media-normalize";
import { getMediaItems, saveMediaItems, type MediaItem } from "@/lib/media";

export async function GET() {
  const items = await getMediaItems();
  return NextResponse.json(items, {
    headers: { "Cache-Control": "no-store" },
  });
}

function validateItems(items: MediaItem[]): string | null {
  for (const [index, item] of items.entries()) {
    const label = item.name || item.id || `#${index + 1}`;

    if (!item.id) {
      return `รายการ ${label}: ไม่มี ID`;
    }
    if (!item.src) {
      return `รายการ ${label}: กรุณาใส่ URL รูป (src)`;
    }
    if (item.type !== "image" && item.type !== "video") {
      return `รายการ ${label}: ประเภทไฟล์ไม่ถูกต้อง`;
    }
    if (!getCategoryById(item.categoryId)) {
      return `รายการ ${label}: หมวดหมู่ไม่ถูกต้อง`;
    }
  }

  return null;
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบใหม่" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const items = normalizeMediaItems(body as MediaItem[]);
  const validationError = validateItems(items);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await saveMediaItems(items);
  } catch (error) {
    console.error("Failed to save media items:", error);
    const message =
      error instanceof Error ? error.message : "บันทึกลง storage ไม่สำเร็จ";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/category/general");
  revalidatePath("/category/recommended");

  const saved = await getMediaItems();
  return NextResponse.json(saved);
}
