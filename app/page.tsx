import Navbar from "@/components/Navbar";
import MediaGrid from "@/components/MediaGrid";
import ProfileOverlay from "@/components/ProfileOverlay";
import EditFab from "@/components/EditFab";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />

      <main className="pb-32">
        <MediaGrid />
      </main>

      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-t from-black via-black/80 to-transparent"
        aria-hidden
      />

      <ProfileOverlay />
      <EditFab />
    </div>
  );
}
