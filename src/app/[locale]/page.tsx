import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Lock, PenLine, Ruler } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { localizeProducts, products } from "@/data/products";
import { isLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import { getStoreStats } from "@/lib/chrome-web-store";

type PageProps = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "XCreative Studio — small tools, made carefully",
    description:
      "An independent studio making small, specific tools. Each one solves a single thing, then stops.",
  },
  zh: {
    title: "XCreative Studio — 小工具，认真做",
    description:
      "独立工作室，做小而具体的工具。每个都只解决一件事，做完就停。",
  },
} as const;

const principleIcons = [Lock, PenLine, Ruler];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { title, description } = copy[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", "zh-Hans": "/zh", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "XCreative Studio" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);
  const items = localizeProducts(locale);
  const stats = await Promise.all(products.map((product) => getStoreStats(product)));
  const statsBySlug = new Map(products.map((product, index) => [product.slug, stats[index]]));

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)] dark:opacity-25"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 pt-20 sm:pb-16 sm:pt-28">
          <p
            className={cn(
              "font-mono text-[11px] text-muted-foreground",
              locale === "zh" ? "tracking-[0.1em]" : "uppercase tracking-[0.18em]"
            )}
          >
            {t.home.eyebrow}
          </p>

          <h1
            className={cn(
              "mt-7 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.98] text-balance",
              locale === "zh" ? "tracking-[0.01em]" : "tracking-[-0.02em]"
            )}
          >
            {t.home.title}
          </h1>

          <p
            className={cn(
              "mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground",
              locale === "en" ? "text-balance" : "text-pretty"
            )}
          >
            {t.home.lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={`/${locale}#products`}>
                {t.home.seeProducts}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/XCreativeStudio" target="_blank" rel="noreferrer">
                {t.home.github}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-12 sm:py-16"
      >
        <SectionLabel locale={locale as Locale}>{t.home.productsLabel}</SectionLabel>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              locale={locale as Locale}
              stats={statsBySlug.get(product.slug)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-8">
        <div className="grid gap-10 border-t border-border/70 pt-12 sm:grid-cols-3">
          {t.home.principles.map((principle, index) => {
            const Icon = principleIcons[index] ?? Lock;
            return (
              <div key={principle.title} className="space-y-3">
                <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <h2 className="text-[15px] font-medium tracking-tight">{principle.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground lg:[word-break:keep-all]">
                  {principle.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pt-16">
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <p className="font-display text-2xl tracking-tight">{t.home.ctaTitle}</p>
            <p className="text-sm text-muted-foreground">{t.home.ctaBody}</p>
          </div>
          <Button asChild size="lg" variant="outline" className="w-fit">
            <a href="https://github.com/XCreativeStudio" target="_blank" rel="noreferrer">
              {t.home.ctaButton}
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
