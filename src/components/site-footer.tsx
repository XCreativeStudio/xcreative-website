import Link from "next/link";

import { products } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium">XCreative Studio</p>
          <p className="max-w-xs text-sm text-muted-foreground">{t.footer.tagline}</p>
        </div>

        <div className="flex gap-12 text-sm">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {t.footer.products}
            </p>
            <ul className="space-y-1.5">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${locale}/${product.slug}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {t.footer.elsewhere}
            </p>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://github.com/XCreativeStudio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.github}
                </a>
              </li>
              <li>
                <a
                  href="mailto:xminimalistcreativehub@gmail.com"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          © {new Date().getFullYear()} XCreative Studio
        </p>
      </div>
    </footer>
  );
}
