import { getMediaItems } from "@/lib/media";
import ProductGrid from "@/components/shop/ProductGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await getMediaItems();

  return (
    <main>
      <h1 className="sr-only">XML FIVEM — ร้าน XML FiveM</h1>
      <ProductGrid
        items={items}
        categoryId="recommended"
        title="สินค้าทั่วไป"
        subtitle="รายการแนะนำสำหรับคุณ"
        viewAllHref="/products"
      />
    </main>
  );
}
