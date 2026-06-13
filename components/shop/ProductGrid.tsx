"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/shop/PageContainer";
import type { MediaItem } from "@/lib/media";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

interface ProductGridProps {
  items: MediaItem[];
  categoryId?: string;
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
}

export default function ProductGrid({
  items,
  categoryId,
  title,
  subtitle,
  viewAllHref,
}: ProductGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const filteredItems = useMemo(
    () => (categoryId ? items.filter((item) => item.categoryId === categoryId) : items),
    [items, categoryId],
  );

  const handleClose = useCallback(() => {
    if (selectedIndex !== null) cardRefs.current[selectedIndex]?.focus();
    setSelectedIndex(null);
  }, [selectedIndex]);

  return (
    <>
      <section className="py-6 sm:py-8">
        <PageContainer className="max-w-[1400px]">
          {(title || subtitle || viewAllHref) && (
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                {title && (
                  <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
                )}
                {subtitle && (
                  <p className="mt-0.5 text-sm text-white/45">{subtitle}</p>
                )}
              </div>
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="flex shrink-0 items-center gap-1 text-xs text-white/50 transition-colors hover:text-red-400 sm:text-sm"
                >
                  ดูทั้งหมด
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          )}

          {filteredItems.length === 0 ? (
            <p className="py-16 text-center text-sm text-white/40">ยังไม่มีสินค้า</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[index] = el?.querySelector("article") ?? null;
                  }}
                >
                  <ProductCard
                    item={item}
                    index={index}
                    onOpen={() => setSelectedIndex(index)}
                  />
                </div>
              ))}
            </div>
          )}
        </PageContainer>
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
