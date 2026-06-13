import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/categories";
import { getMediaItems } from "@/lib/media";
import MediaGrid from "@/components/MediaGrid";

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
  if (!category) return { title: "XML UPDATE" };
  return { title: `${category.name} — XML UPDATE` };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const items = await getMediaItems();

  return (
    <main>
      <h1 className="sr-only">{category.name}</h1>
      <MediaGrid items={items} categoryId={id} title={category.name} />
    </main>
  );
}
