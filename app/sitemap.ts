import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xml-update-gallery.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/", "/products", "/topup", "/history", "/contact", "/category/general", "/category/recommended"];

  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
}
