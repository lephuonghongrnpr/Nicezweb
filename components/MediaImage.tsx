import Image, { type ImageProps } from "next/image";

function shouldUseUnoptimized(src: ImageProps["src"]): boolean {
  const url = typeof src === "string" ? src : "";
  return (
    url.startsWith("/uploads/") ||
    url.startsWith("/placeholders/") ||
    url.endsWith(".svg") ||
    url.includes("blob.vercel-storage.com")
  );
}

export default function MediaImage({ src, alt, unoptimized, ...props }: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={unoptimized ?? shouldUseUnoptimized(src)}
      {...props}
    />
  );
}
