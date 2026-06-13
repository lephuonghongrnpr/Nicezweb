"use client";

import { useState } from "react";
import MediaImage from "@/components/MediaImage";
import { formatPrice } from "@/lib/site";
import type { MediaItem } from "@/lib/media";
import { Play, ShoppingBag } from "lucide-react";

const BADGE_LABELS = { new: "NEW", hot: "HOT", sale: "SALE" } as const;

interface ProductCardProps {
  item: MediaItem;
  index: number;
  onOpen: () => void;
}

export default function ProductCard({ item, index, onOpen }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = item.type === "video";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`ดู ${item.name}`}
      className="group animate-fade-in cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-[#111118] opacity-0 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <MediaImage
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {item.badge && (
          <span
            className={`badge-${item.badge} absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-lg`}
          >
            {BADGE_LABELS[item.badge]}
          </span>
        )}

        {isVideo && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-sm">
              <Play className="h-5 w-5 fill-white text-white" aria-hidden />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
          <span className="text-[10px] font-medium uppercase tracking-wider text-orange-400">
            FiveM XML
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
          {item.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold text-orange-400">{formatPrice(item.price)}</span>
          <span className="flex items-center gap-1 rounded-lg bg-orange-500/10 px-2 py-1 text-[10px] font-medium text-orange-300">
            <ShoppingBag className="h-3 w-3" />
            สั่งซื้อ
          </span>
        </div>
      </div>
    </article>
  );
}
