"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { MediaItem } from "@/lib/data";

interface MediaLightboxProps {
  items: MediaItem[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function MediaLightbox({
  items,
  selectedIndex,
  onClose,
  onNavigate,
}: MediaLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const item = items[selectedIndex];
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < items.length - 1;
  const showVideo = item.type === "video" && item.videoSrc;

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(selectedIndex - 1);
  }, [hasPrev, onNavigate, selectedIndex]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(selectedIndex + 1);
  }, [hasNext, onNavigate, selectedIndex]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (!showVideo && videoRef.current) {
      videoRef.current.pause();
    }
  }, [showVideo, selectedIndex]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <h2 id="lightbox-title" className="sr-only">
        {item.alt}
      </h2>

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="ปิด"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="ก่อนหน้า"
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4 sm:h-12 sm:w-12"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="ถัดไป"
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4 sm:h-12 sm:w-12"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      )}

      <div className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center">
        {showVideo ? (
          <video
            ref={videoRef}
            key={item.videoSrc}
            src={item.videoSrc}
            poster={item.src}
            controls
            autoPlay
            className="max-h-[85vh] max-w-[90vw] rounded-lg"
          />
        ) : (
          <div className="relative h-[70vh] w-[70vw] max-w-3xl">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
        {selectedIndex + 1} / {items.length}
      </p>
    </div>
  );
}
