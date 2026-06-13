"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media";
import MediaCard from "./MediaCard";
import MediaLightbox from "./MediaLightbox";

interface MediaGridProps {
  items: MediaItem[];
  categoryId?: string;
  title?: string;
}

export default function MediaGrid({ items, categoryId, title }: MediaGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const filteredItems = useMemo(
    () => (categoryId ? items.filter((item) => item.categoryId === categoryId) : items),
    [items, categoryId],
  );

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
      {title && (
        <header className="sticky top-0 z-20 border-b border-white/5 bg-black/95 px-4 py-3 backdrop-blur">
          <h2 className="text-sm font-semibold text-white sm:text-base">{title}</h2>
        </header>
      )}

      <section
        aria-label="แกลเลอรีสินค้า XML UPDATE"
        className="grid grid-cols-1 gap-0.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredItems.length === 0 ? (
          <p className="col-span-full px-4 py-16 text-center text-sm text-white/50">
            ยังไม่มีสินค้าในหมวดนี้
          </p>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el?.querySelector("article") ?? null;
              }}
            >
              <MediaCard item={item} index={index} onOpen={() => handleOpen(index)} />
            </div>
          ))
        )}
      </section>

      {selectedIndex !== null && filteredItems.length > 0 && (
        <MediaLightbox
          items={filteredItems}
          selectedIndex={selectedIndex}
          onClose={handleClose}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}
