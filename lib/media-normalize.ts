import { DEFAULT_CATEGORY_ID } from "@/lib/categories";
import type { MediaItem } from "@/lib/media";

export function normalizeMediaItems(items: MediaItem[]): MediaItem[] {
  return items.map((item) => {
    const name = (item.name ?? item.alt ?? "สินค้า").trim() || "สินค้า";
    const src = item.src?.trim() ?? "";
    const categoryId = item.categoryId?.trim() || DEFAULT_CATEGORY_ID;

    return {
      ...item,
      id: String(item.id ?? "").trim(),
      type: item.type === "video" ? "video" : "image",
      src,
      alt: (item.alt ?? name).trim() || name,
      name,
      categoryId,
      price: Number.isFinite(Number(item.price)) ? Number(item.price) : 259,
      description: item.description?.trim() ?? "",
      buyUrl: item.buyUrl?.trim() || undefined,
      badge: item.badge ?? null,
      stock: Number.isFinite(Number(item.stock)) ? Number(item.stock) : 99,
      videoSrc: item.videoSrc?.trim() || undefined,
    };
  });
}
