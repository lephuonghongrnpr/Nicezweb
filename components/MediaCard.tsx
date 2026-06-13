"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { MediaItem } from "@/lib/media";

interface MediaCardProps {
  item: MediaItem;
  index: number;
  onOpen: () => void;
}

export default function MediaCard({ item, index, onOpen }: MediaCardProps) {
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
      aria-label={`เปิด ${item.alt}`}
      className="group relative aspect-square cursor-pointer overflow-hidden bg-black animate-fade-in opacity-0"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-200 ${
          isVideo && isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {isVideo ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/50 backdrop-blur-sm">
            <Play className="h-6 w-6 fill-white text-white" aria-hidden />
          </div>
        ) : (
          <div className="h-14 w-14 rounded-full border border-white/20 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <Image
          src="/logo.svg"
          alt=""
          width={20}
          height={20}
          className="h-4 w-4 opacity-40"
          aria-hidden
        />
      </div>
    </article>
  );
}
