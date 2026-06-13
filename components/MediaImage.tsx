import Image, { type ImageProps } from "next/image";

function getSrcString(src: ImageProps["src"]): string {
  if (typeof src === "string") return src.trim();
  if (typeof src === "object" && src !== null && "src" in src) return src.src;
  return "";
}

function shouldUseUnoptimized(src: ImageProps["src"]): boolean {
  const url = getSrcString(src);
  if (!url) return true;

  return (
    url.startsWith("/uploads/") ||
    url.startsWith("/placeholders/") ||
    url.endsWith(".svg") ||
    url.includes("blob.vercel-storage.com") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  );
}

export default function MediaImage({ src, alt, unoptimized, ...props }: ImageProps) {
  const url = getSrcString(src);

  if (!url) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-neutral-900 text-xs text-white/40"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={unoptimized ?? shouldUseUnoptimized(src)}
      {...props}
    />
  );
}
