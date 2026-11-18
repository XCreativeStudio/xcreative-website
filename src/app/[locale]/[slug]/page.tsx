import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";

import { ReleaseNote } from "@/components/release-note";
import { SectionLabel } from "@/components/section-label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProduct, localizeProduct, products } from "@/data/products";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const product = getProduct(slug);
  if (!product) return {};

  const text = product.text[locale];
  const title = `${product.name} — ${text.tagline}`;

  return {
    title,
    description: text.summary,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        en: `/en/${slug}`,
        "zh-Hans": `/zh/${slug}`,
        "x-default": `/en/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}/${slug}`,
      title,
      description: text.summary,
      images: [{ url: `/og/${slug}.png`, width: 1200, height: 630, alt: product.name }],
    },
    twitter: { card: "summary_large_image", title, description: text.summary },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const t = getDictionary(locale);

  const base = getProduct(slug);
  if (!base) notFound();

  const product = localizeProduct(base, locale);
  const otherBase = products.find((item) => item.slug !== slug)!;
  const other = localizeProduct(otherBase, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.summary,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    url: `https://xcreative.dev/${locale}/${product.slug}`,
    downloadUrl: product.storeUrl,
    sameAs: [product.repoUrl, product.storeUrl],
    softwareVersion: product.version,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Organization",
      name: "XCreative Studio",
      url: "https://xcreative.dev",
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative overflow-hidden border-b border-border/70">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_30%_0%,black,transparent_70%)] dark:opacity-20"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-20">
          <Link
            href={`/${locale}#products`}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {t.product.back}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Image
              src={product.icon}
              alt=""
              width={56}
              height={56}
              className="size-14 rounded-xl ring-1 ring-border"
            />
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.02em]">
              {product.name}
            </h1>
          </div>

          <p
            className={cn(
              "mt-5 max-w-2xl font-display text-[clamp(1.4rem,3vw,1.9rem)] leading-snug text-muted-foreground",
              locale === "en" && "italic"
            )}
          >
            {product.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {product.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={product.storeUrl} target="_blank" rel="noreferrer">
                {t.product.addToChrome}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={product.repoUrl} target="_blank" rel="noreferrer">
                {t.product.readSource}
              </a>
            </Button>

            <div className="ml-1 flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                v{product.version}
              </Badge>
              <Badge variant="outline">{product.license}</Badge>
              <Badge variant="outline">{t.product.free}</Badge>
            </div>
          </div>

          <div className="mt-5">
            <ReleaseNote repo={product.repoName} label={t.product.latestRelease} locale={locale} />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="-mt-2 overflow-hidden rounded-2xl border shadow-sm sm:-mt-6">
          <Image
            src={product.marquee}
            alt={`${product.name}: ${product.tagline}`}
            width={1400}
            height={560}
            priority
            className="w-full"
          />
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionLabel locale={locale}>{t.product.whatItDoes}</SectionLabel>

        <div className="mt-8 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((feature, index) => (
            <div key={feature.title} className="space-y-2.5">
              <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-[15px] font-medium tracking-tight">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <SectionLabel locale={locale}>{t.product.inside}</SectionLabel>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {product.screenshots.map((shot) => (
            <figure key={shot.src} className="space-y-3">
              <div className="overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1280}
                  height={800}
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="w-full"
                />
              </div>
              <figcaption className="text-xs leading-relaxed text-muted-foreground">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="max-w-2xl space-y-12">
          {product.sections.map((section) => (
            <div key={section.title}>
              <h2
                className={cn(
                  "font-mono text-[11px] text-muted-foreground",
                  locale === "zh" ? "tracking-[0.1em]" : "uppercase tracking-[0.14em]"
                )}
              >
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-pretty leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-8">
        <div className="flex items-start gap-3 rounded-xl border bg-card px-6 py-5">
          <ShieldCheck
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.75}
          />
          <p className="text-sm leading-relaxed text-muted-foreground">{product.privacy}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-4">
        <Link
          href={`/${locale}/${other.slug}`}
          className="group flex items-center justify-between gap-6 rounded-xl border px-6 py-5 transition-colors hover:border-foreground/20"
        >
          <div className="flex items-center gap-4">
            <Image
              src={other.icon}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-lg ring-1 ring-border"
            />
            <div>
              <p
                className={cn(
                  "font-mono text-[11px] text-muted-foreground",
                  locale === "zh" ? "tracking-[0.08em]" : "uppercase tracking-[0.14em]"
                )}
              >
                {t.product.alsoFrom}
              </p>
              <p className="mt-1 text-[15px] font-medium">{other.name}</p>
            </div>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </Link>
      </section>
    </article>
  );
}
