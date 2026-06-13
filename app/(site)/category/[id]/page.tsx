import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/categories";
import { getMediaItems } from "@/lib/media";
import ProductGrid from "@/components/shop/ProductGrid";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [{ id: "general" }, { id: "recommended" }];
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return { title: "XML FIVEM" };
  return { title: `${category.name} — XML FIVEM` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const items = await getMediaItems();

  return (
    <main>
      <h1 className="sr-only">{category.name}</h1>
      <ProductGrid
        items={items}
        categoryId={id}
        title={category.name}
        subtitle={category.description}
      />
    </main>
  );
}
