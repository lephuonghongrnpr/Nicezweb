import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { getCategoryById } from "@/lib/categories";
import { getMediaItems, saveMediaItems, type MediaItem } from "@/lib/media";

export async function GET() {
  const items = await getMediaItems();
  return NextResponse.json(items, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as MediaItem[];

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  for (const item of body) {
    if (!item.id || !item.src || !item.type || !item.categoryId) {
      return NextResponse.json({ error: "Invalid item format" }, { status: 400 });
    }
    if (item.type !== "image" && item.type !== "video") {
      return NextResponse.json({ error: "Invalid media type" }, { status: 400 });
    }
    if (!getCategoryById(item.categoryId)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
  }

  await saveMediaItems(body);
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  revalidatePath("/products");
  revalidatePath("/category/general");
  revalidatePath("/category/recommended");

  const items = await getMediaItems();
  return NextResponse.json(items);
}
