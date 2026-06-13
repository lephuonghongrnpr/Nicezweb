import MediaGrid from "@/components/MediaGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <main>
        <h1 className="sr-only">XML UPDATE Gallery</h1>
        <MediaGrid />
      </main>
    </div>
  );
}
