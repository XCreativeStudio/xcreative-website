import Link from "next/link";

import { GithubIcon } from "@/components/icons";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Mark } from "@/components/mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { products } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link href={`/${locale}`} className="group flex items-center gap-2.5">
          <Mark className="size-7 text-primary transition-transform duration-300 group-hover:-rotate-6" />
          <span className="text-[15px] font-medium tracking-tight">
            XCreative<span className="text-muted-foreground"> Studio</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm" aria-label="Main">
          <div className="hidden items-center gap-1 md:flex">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/${locale}/${product.slug}`}
                className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {product.name}
              </Link>
            ))}
          </div>

          <a
            href="https://github.com/XCreativeStudio"
            target="_blank"
            rel="noreferrer"
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t.header.github}
          >
            <GithubIcon className="size-4" />
          </a>

          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
