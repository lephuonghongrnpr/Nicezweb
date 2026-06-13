import { getMediaItems } from "@/lib/media";
import MediaGrid from "@/components/MediaGrid";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getMediaItems();

  return (
    <div className="relative min-h-screen bg-black">
      <main>
        <h1 className="sr-only">XML UPDATE Gallery</h1>
        <MediaGrid items={items} />
      </main>
    </div>
  );
}
