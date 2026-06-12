"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { MediaItem } from "@/lib/data";

interface MediaCardProps {
  item: MediaItem;
}

export default function MediaCard({ item }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo = item.type === "video";

  const showPause = isVideo && (isHovered || isPlaying);

  return (
    <article
      className="group relative aspect-square overflow-hidden bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isVideo && setIsPlaying((prev) => !prev)}
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
          showPause ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {isVideo ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/50 backdrop-blur-sm">
            {showPause ? (
              <Pause className="h-6 w-6 fill-white text-white" />
            ) : (
              <Play className="h-6 w-6 fill-white text-white" />
            )}
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
