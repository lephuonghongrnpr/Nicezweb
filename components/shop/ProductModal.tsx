"use client";

import { useCallback, useEffect, useRef } from "react";
import MediaImage from "@/components/MediaImage";
import { ChevronLeft, ChevronRight, ShoppingBag, X } from "lucide-react";
import { formatPrice, getBuyUrl } from "@/lib/site";
import type { MediaItem } from "@/lib/media";

interface ProductModalProps {
  items: MediaItem[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProductModal({
  items,
  selectedIndex,
  onClose,
  onNavigate,
}: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const item = items[selectedIndex];
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < items.length - 1;
  const showVideo = item.type === "video" && item.videoSrc;
  const buyUrl = getBuyUrl(item.buyUrl, item.name);

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(selectedIndex - 1);
  }, [hasPrev, onNavigate, selectedIndex]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(selectedIndex + 1);
  }, [hasNext, onNavigate, selectedIndex]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (!showVideo && videoRef.current) videoRef.current.pause();
  }, [showVideo, selectedIndex]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="relative flex max-h-[95vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-[#222] bg-[#141414] sm:rounded-2xl">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-video w-full shrink-0 bg-black">
          {showVideo ? (
            <video
              ref={videoRef}
              key={item.videoSrc}
              src={item.videoSrc}
              poster={item.src}
              controls
              autoPlay
              className="h-full w-full object-contain"
            />
          ) : (
            <MediaImage src={item.src} alt={item.alt} fill sizes="512px" className="object-cover" />
          )}
        </div>

        <div className="overflow-y-auto p-4 sm:p-5">
          <h2 id="product-title" className="mb-1 text-lg font-bold text-white">
            {item.name}
          </h2>
          <p className="mb-1 text-2xl font-black text-red-500">{formatPrice(item.price)}</p>
          <p className="mb-3 text-xs text-white/40">คงเหลือ {item.stock ?? 99} ชิ้น</p>

          {item.description && (
            <p className="mb-4 text-sm leading-relaxed text-white/60">{item.description}</p>
          )}

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
          >
            <ShoppingBag className="h-4 w-4" />
            ซื้อเลย
          </a>
        </div>

        {(hasPrev || hasNext) && (
          <div className="flex border-t border-white/5">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={handlePrev}
              className="flex flex-1 items-center justify-center gap-1 py-3 text-sm text-white/60 disabled:opacity-30 hover:bg-white/5"
            >
              <ChevronLeft className="h-4 w-4" />
              ก่อนหน้า
            </button>
            <span className="flex items-center px-3 text-xs text-white/30">
              {selectedIndex + 1}/{items.length}
            </span>
            <button
              type="button"
              disabled={!hasNext}
              onClick={handleNext}
              className="flex flex-1 items-center justify-center gap-1 py-3 text-sm text-white/60 disabled:opacity-30 hover:bg-white/5"
            >
              ถัดไป
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
