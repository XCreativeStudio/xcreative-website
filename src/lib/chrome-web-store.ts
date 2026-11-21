import { cache } from "react";

import type { Product } from "@/data/products";

export type StoreStats = {
  rating: number;
  ratingCount: number;
  users: number | null;
  usersPlus: boolean;
  source: "live" | "fallback";
};

type ParsedStats = {
  rating: number;
  ratingCount: number;
  users: number | null;
  usersPlus: boolean;
};

const CHROME_WEB_STORE_HOST = "chromewebstore.google.com";

const MULTIPLIERS = { K: 1e3, M: 1e6, B: 1e9 } as const;

// The store serves a server-rendered page to plain HTTP clients; a browser
// User-Agent plus an English locale keeps the rating markup and number format stable.
const STORE_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

function parseCount(raw: string): { value: number; plus: boolean } | null {
  const value = raw.trim();
  const plus = value.endsWith("+");
  const match = value
    .replace(/,/g, "")
    .replace(/\+$/, "")
    .match(/^([\d.]+)([KMB])?$/i);
  if (!match) return null;

  const multiplier = match[2]
    ? MULTIPLIERS[match[2].toUpperCase() as keyof typeof MULTIPLIERS]
    : 1;
  const count = Math.round(Number.parseFloat(match[1]) * multiplier);

  return Number.isFinite(count) ? { value: count, plus } : null;
}

/**
 * The listing has no public API, so the numbers come from the rendered page.
 * The first rating block is the item itself; later ones belong to related items.
 */
function parseStoreStats(html: string): ParsedStats | null {
  const ratingMatch = html.match(/aria-label="Average rating ([\d.]+) out of 5 stars/);
  const ratingCountMatch = html.match(/>\s*([\d,.]+[KMB]?)\s+ratings?\s*</i);
  if (!ratingMatch || !ratingCountMatch) return null;

  const rating = Number.parseFloat(ratingMatch[1]);
  const ratingCount = parseCount(ratingCountMatch[1]);
  if (!Number.isFinite(rating) || rating <= 0 || !ratingCount) return null;

  const usersMatch = html.match(/>\s*([\d,.]+[KMB]?\+?)\s+users\s*</i);
  const users = usersMatch ? parseCount(usersMatch[1]) : null;

  return {
    rating,
    ratingCount: ratingCount.value,
    users: users?.value ?? null,
    usersPlus: users?.plus ?? false,
  };
}

function fallbackStats(product: Product): StoreStats | null {
  if (!product.storeStats) return null;

  return {
    rating: product.storeStats.rating,
    ratingCount: product.storeStats.ratingCount,
    users: product.storeStats.users,
    usersPlus: product.storeStats.usersPlus ?? false,
    source: "fallback",
  };
}

/**
 * Refreshed once a day at ISR time. If the store page can't be read, the bundled
 * numbers in `products.ts` keep the page complete and the build green.
 */
export const getStoreStats = cache(async (product: Product): Promise<StoreStats | null> => {
  const fallback = fallbackStats(product);
  if (!fallback) return null;

  let url: URL;
  try {
    url = new URL(product.storeUrl);
  } catch {
    return fallback;
  }
  if (url.hostname !== CHROME_WEB_STORE_HOST) return fallback;

  url.searchParams.set("hl", "en-US");
  url.searchParams.set("gl", "US");

  try {
    const res = await fetch(url, {
      headers: STORE_HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const parsed = parseStoreStats(await res.text());
    if (!parsed) throw new Error("rating markup not found");

    return {
      rating: parsed.rating,
      ratingCount: parsed.ratingCount,
      users: parsed.users ?? fallback.users,
      usersPlus: parsed.users === null ? fallback.usersPlus : parsed.usersPlus,
      source: "live",
    };
  } catch (error) {
    console.warn(
      `[store-stats] ${product.slug}: using bundled fallback (${error instanceof Error ? error.message : String(error)})`
    );
    return fallback;
  }
});
