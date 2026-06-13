"use client";

import { useCallback, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media";
import MediaCard from "./MediaCard";
import MediaLightbox from "./MediaLightbox";

interface MediaGridProps {
  items: MediaItem[];
}

export default function MediaGrid({ items }: MediaGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const handleOpen = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    if (selectedIndex !== null) {
      cardRefs.current[selectedIndex]?.focus();
    }
    setSelectedIndex(null);
  }, [selectedIndex]);

  const handleNavigate = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <>
      <section
        aria-label="แกลเลอรีสินค้า XML UPDATE"
        className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el?.querySelector("article") ?? null;
            }}
          >
            <MediaCard item={item} index={index} onOpen={() => handleOpen(index)} />
          </div>
        ))}
      </section>

      {selectedIndex !== null && (
        <MediaLightbox
          items={items}
          selectedIndex={selectedIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
