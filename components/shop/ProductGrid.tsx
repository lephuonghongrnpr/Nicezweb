"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { MediaItem } from "@/lib/media";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface ProductGridProps {
  items: MediaItem[];
  categoryId?: string;
  title?: string;
  subtitle?: string;
}

export default function ProductGrid({
  items,
  categoryId,
  title,
  subtitle,
}: ProductGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const filteredItems = useMemo(
    () => (categoryId ? items.filter((item) => item.categoryId === categoryId) : items),
    [items, categoryId],
  );

  const handleOpen = useCallback((index: number) => setSelectedIndex(index), []);

  const handleClose = useCallback(() => {
    if (selectedIndex !== null) cardRefs.current[selectedIndex]?.focus();
    setSelectedIndex(null);
  }, [selectedIndex]);

  return (
    <>
      {(title || subtitle) && (
        <div className="border-b border-white/5 px-4 py-4 sm:px-6">
          {title && <h2 className="text-base font-bold text-white sm:text-lg">{title}</h2>}
          {subtitle && <p className="mt-0.5 text-xs text-white/45 sm:text-sm">{subtitle}</p>}
        </div>
      )}

      <section
        aria-label="สินค้า XML FiveM"
        className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredItems.length === 0 ? (
          <p className="col-span-full py-16 text-center text-sm text-white/40">
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
              <ProductCard item={item} index={index} onOpen={() => handleOpen(index)} />
            </div>
          ))
        )}
      </section>

      {selectedIndex !== null && filteredItems.length > 0 && (
        <ProductModal
          items={filteredItems}
          selectedIndex={selectedIndex}
          onClose={handleClose}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
}
