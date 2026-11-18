import type { MetadataRoute } from "next";

import { products } from "@/data/products";

const base = "https://xcreative.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...products.map((product) => ({
      url: `${base}/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
