import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Internal preview routes (e.g. /design-system) are intentionally omitted.
  return Object.values(pages).map((page) => ({
    url: new URL(page.slug, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.slug === "/" ? 1 : 0.7,
  }));
}
