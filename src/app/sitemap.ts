import type { MetadataRoute } from "next";

import { products } from "@/data/products";
import { locales } from "@/i18n/config";

const base = "https://xcreative.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const languages = { en: `${base}/en`, "zh-Hans": `${base}/zh`, "x-default": `${base}/en` };

  const home = locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages },
  }));

  const productPages = products.flatMap((product) =>
    locales.map((locale) => ({
      url: `${base}/${locale}/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${base}/en/${product.slug}`,
          "zh-Hans": `${base}/zh/${product.slug}`,
          "x-default": `${base}/en/${product.slug}`,
        },
      },
    }))
  );

  return [...home, ...productPages];
}
