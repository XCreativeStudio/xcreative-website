"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";

import { otherLocale, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const target = otherLocale(locale);
  const rest = pathname.replace(/^\/(en|zh)(?=\/|$)/, "");
  const href = `/${target}${rest}` || `/${target}`;

  return (
    <Link
      href={href}
      hrefLang={target === "zh" ? "zh-Hans" : "en"}
      aria-label={dictionaries[locale].switchLabel}
      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-2.5 text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground"
    >
      <Languages className="size-3.5" aria-hidden="true" />
      {dictionaries[target].languageName}
    </Link>
  );
}
