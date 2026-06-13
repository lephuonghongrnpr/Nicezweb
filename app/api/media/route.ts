import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";
import { getMediaItems, saveMediaItems, type MediaItem } from "@/lib/media";

export async function GET() {
  const items = await getMediaItems();
  return NextResponse.json(items);
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
    if (!item.id || !item.src || !item.alt || !item.type) {
      return NextResponse.json({ error: "Invalid item format" }, { status: 400 });
    }
    if (item.type !== "image" && item.type !== "video") {
      return NextResponse.json({ error: "Invalid media type" }, { status: 400 });
    }
  }

  await saveMediaItems(body);
  revalidatePath("/");
  revalidatePath("/admin");

  return NextResponse.json(body);
}
