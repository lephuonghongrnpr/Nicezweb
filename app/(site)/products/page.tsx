import { getMediaItems } from "@/lib/media";
import ProductGrid from "@/components/shop/ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = { title: "สินค้าทั้งหมด — XML FIVEM" };

export default async function ProductsPage() {
  const items = await getMediaItems();

  return (
    <main>
      <h1 className="sr-only">สินค้าทั้งหมด</h1>
      <ProductGrid items={items} title="สินค้าทั้งหมด" subtitle="XML FiveM ครบทุกหมวด" />
    </main>
  );
}
