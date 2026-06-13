import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://xml-update-gallery.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...CATEGORIES.map((category) => ({
      url: `${siteUrl}${category.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
