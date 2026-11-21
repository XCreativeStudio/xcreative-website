import { Star } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { StoreStats as StoreStatsData } from "@/lib/chrome-web-store";
import { cn } from "@/lib/utils";

export function StoreStats({
  stats,
  locale,
  compact = false,
  className,
}: {
  stats: StoreStatsData;
  locale: Locale;
  /** Cards show only the rating and user count; the detail page adds the review count. */
  compact?: boolean;
  className?: string;
}) {
  const t = getDictionary(locale);

  const rating = stats.rating.toFixed(1);
  const ratingWord =
    locale === "en" && stats.ratingCount === 1 ? "rating" : t.product.ratings;
  const userWord = locale === "en" && stats.users === 1 ? "user" : t.product.users;
  const userCount =
    stats.users === null
      ? null
      : `${new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US").format(stats.users)}${
          stats.usersPlus ? "+" : ""
        }`;

  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px] text-muted-foreground",
        locale === "zh" ? "tracking-[0.06em]" : "tracking-[0.08em]",
        className
      )}
    >
      <Star
        aria-hidden
        className="size-3.5 shrink-0 fill-foreground text-foreground"
        strokeWidth={0}
      />
      <span className="text-foreground">{rating}</span>
      <span className="sr-only">{t.product.ratingOutOf}</span>

      {!compact && (
        <>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <span className="whitespace-nowrap">
            {stats.ratingCount} {ratingWord}
          </span>
        </>
      )}

      {userCount && (
        <>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <span className="whitespace-nowrap">
            {userCount} {userWord}
          </span>
        </>
      )}
    </p>
  );
}
