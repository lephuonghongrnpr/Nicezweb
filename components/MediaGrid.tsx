import { mediaItems } from "@/lib/data";
import MediaCard from "./MediaCard";

export default function MediaGrid() {
  return (
    <section className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
      {mediaItems.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </section>
  );
}
