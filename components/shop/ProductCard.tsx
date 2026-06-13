"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MediaImage from "@/components/MediaImage";
import { formatPrice, getBuyUrl } from "@/lib/site";
import type { MediaItem } from "@/lib/media";
import { Play } from "lucide-react";

interface ProductCardProps {
  item: MediaItem;
  index: number;
  onOpen: () => void;
}

export default function ProductCard({ item, index, onOpen }: ProductCardProps) {
  const isVideo = item.type === "video";
  const buyUrl = getBuyUrl(item.buyUrl, item.name);
  const stock = item.stock ?? 99;

  return (
    <article
      className="animate-fade-in flex flex-col overflow-hidden rounded-xl border border-[#222] bg-[#141414] opacity-0"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: "forwards" }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative aspect-square w-full overflow-hidden bg-black text-left"
      >
        <MediaImage
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 50vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60">
              <Play className="h-4 w-4 fill-white text-white" />
            </div>
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col p-3">
        <button type="button" onClick={onOpen} className="mb-1 text-left">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">{item.name}</h3>
        </button>

        <p className="mb-0.5 text-base font-bold text-red-500">{formatPrice(item.price)}</p>
        <p className="mb-3 text-[11px] text-white/40">คงเหลือ {stock} ชิ้น</p>

        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => buyUrl === "#" && e.preventDefault()}
          className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-[#3d1010] py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-600 hover:text-white sm:text-sm"
        >
          ซื้อเลย
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
