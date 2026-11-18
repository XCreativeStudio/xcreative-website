"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : "en";
  const t = getDictionary(locale);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {t.notFound.label}
      </p>
      <h1 className="font-display text-5xl tracking-[-0.02em]">{t.notFound.title}</h1>
      <p className="max-w-md text-muted-foreground">{t.notFound.body}</p>
      <Button asChild size="lg">
        <Link href={`/${locale}`}>{t.notFound.cta}</Link>
      </Button>
    </section>
  );
}
