import { getMediaItems } from "@/lib/media";
import Hero from "@/components/shop/Hero";
import ProductGrid from "@/components/shop/ProductGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await getMediaItems();
  const recommended = items.filter((i) => i.categoryId === "recommended");

  return (
    <main>
      <h1 className="sr-only">XML FIVEM — ร้าน XML สำหรับ FiveM</h1>
      <Hero />
      <ProductGrid
        items={recommended}
        title="🔥 สินค้าแนะนำ"
        subtitle="ขายดี ยอดนิยม สำหรับเซิร์ฟ FiveM"
      />
      <ProductGrid
        items={items}
        title="📦 สินค้าทั้งหมด"
        subtitle="XML FiveM ครบทุกประเภท"
      />
    </main>
  );
}
