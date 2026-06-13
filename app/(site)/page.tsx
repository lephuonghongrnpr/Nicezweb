import { getMediaItems } from "@/lib/media";
import MediaGrid from "@/components/MediaGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await getMediaItems();

  return (
    <main>
      <h1 className="sr-only">XML UPDATE Gallery</h1>
      <MediaGrid items={items} title="หน้าแรก" />
    </main>
  );
}
