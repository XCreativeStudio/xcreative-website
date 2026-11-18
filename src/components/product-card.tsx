import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/${product.slug}`}
      className="group focus-visible:outline-none"
      aria-label={`${product.name} — ${product.tagline}`}
    >
      <Card className="h-full overflow-hidden p-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-lg group-focus-visible:border-foreground/30">
        <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted">
          <Image
            src={product.screenshots[0].src}
            alt={product.screenshots[0].alt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <CardHeader className="gap-3 p-6">
          <div className="flex items-center gap-3">
            <Image
              src={product.icon}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-lg ring-1 ring-border"
            />
            <h2 className="text-lg font-semibold tracking-tight">{product.name}</h2>
            <Badge variant="secondary" className="ml-auto font-mono">
              v{product.version}
            </Badge>
          </div>
          <CardDescription className="text-[15px] leading-relaxed">
            {product.summary}
          </CardDescription>
        </CardHeader>

        <div className="mt-auto flex items-center justify-between border-t px-6 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            Free · Chrome
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium">
            View
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
