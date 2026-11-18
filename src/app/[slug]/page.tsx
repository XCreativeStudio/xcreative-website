import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";

import { ReleaseNote } from "@/components/release-note";
import { SectionLabel } from "@/components/section-label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = `${product.name} — ${product.tagline}`;
  const description = product.summary;

  return {
    title,
    description,
    alternates: { canonical: `/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${product.slug}`,
      images: [
        { url: `/og/${product.slug}.png`, width: 1200, height: 630, alt: product.name },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const other = products.find((item) => item.slug !== product.slug)!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.summary,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    url: `https://xcreative.dev/${product.slug}`,
    downloadUrl: product.storeUrl,
    sameAs: [product.repoUrl, product.storeUrl],
    softwareVersion: product.version,
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
            href="/#products"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            All products
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

          <p className="mt-5 max-w-2xl font-display text-[clamp(1.4rem,3vw,1.9rem)] italic leading-snug text-muted-foreground">
            {product.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {product.intro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={product.storeUrl} target="_blank" rel="noreferrer">
                Add to Chrome
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={product.repoUrl} target="_blank" rel="noreferrer">
                Read the source
              </a>
            </Button>

            <div className="ml-1 flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                v{product.version}
              </Badge>
              <Badge variant="outline">{product.license}</Badge>
              <Badge variant="outline">Free</Badge>
            </div>
          </div>

          <div className="mt-5">
            <ReleaseNote repo={product.repoName} />
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
        <SectionLabel>What it does</SectionLabel>

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
        <SectionLabel>Inside</SectionLabel>

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
              <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
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
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
          <p className="text-sm leading-relaxed text-muted-foreground">{product.privacy}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-4">
        <Link
          href={`/${other.slug}`}
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
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Also from the studio
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
