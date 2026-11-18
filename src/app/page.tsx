import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock, PenLine, Ruler } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "XCreative Studio — small Chrome extensions, made carefully",
  description:
    "Two Chrome extensions from one person: postMessage Catcher, a DevTools panel for window.postMessage, and Changicon, tab icons you choose. Free, local, no accounts.",
  alternates: { canonical: "/" },
};

const principles = [
  {
    icon: Lock,
    title: "Local by default",
    body: "Both extensions do their work on your machine. No accounts, no telemetry, no server holding a copy of what you pasted.",
  },
  {
    icon: PenLine,
    title: "One person, end to end",
    body: "Design, code, store listing and support. That is why the feature list stays short and the details get attention.",
  },
  {
    icon: Ruler,
    title: "Small on purpose",
    body: "Each extension does one job and then stops. A tool you reach for ten times a day should not need a manual.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)] dark:opacity-25"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 pt-20 sm:pb-16 sm:pt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Independent studio · Chrome extensions
          </p>

          <h1 className="mt-7 max-w-4xl font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-balance">
            Make something people want.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Two small extensions that make the browser do what you meant: one shows you the
            messages your page never sees, the other gives every tab a face you recognize.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="#products">
                See the products
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com/XCreativeStudio" target="_blank" rel="noreferrer">
                GitHub
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-12 sm:py-16">
        <SectionLabel>Products</SectionLabel>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-8">
        <div className="grid gap-10 border-t border-border/70 pt-12 sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <div key={title} className="space-y-3">
              <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
              <h2 className="text-[15px] font-medium tracking-tight">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pt-16">
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <p className="font-display text-2xl tracking-tight">Both are free.</p>
            <p className="text-sm text-muted-foreground">
              No accounts, no telemetry. Install from the Chrome Web Store, or read the code
              and build it yourself.
            </p>
          </div>
          <Button asChild size="lg" variant="outline" className="w-fit">
            <a
              href="https://github.com/XCreativeStudio"
              target="_blank"
              rel="noreferrer"
            >
              Browse the source
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
