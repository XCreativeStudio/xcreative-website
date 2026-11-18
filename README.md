# xcreative-website

The studio site for **XCreative Studio** — an index of small Chrome extensions, with a page for each one.

Products today:

- **postMessage Catcher** — a DevTools panel that captures `window.postMessage` traffic from every frame.
- **Changicon** — replaces any page's favicon with an emoji, a badge, a line icon, or an uploaded image.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static prerendering) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui primitives (`Button`, `Badge`, `Card`, `Separator`) on Radix |
| Theming | `next-themes` — system default, manual toggle, no flash |
| Fonts | `next/font` — Geist Sans, Geist Mono, Instrument Serif (display) |
| Monitoring | `@vercel/speed-insights` — Core Web Vitals from real visitors |

**No TanStack Query.** Every page is prerendered and the only remote data is the latest GitHub
release, which the product pages fetch at build time with `next.revalidate` (ISR) inside
[`src/components/release-note.tsx`](src/components/release-note.tsx). Client-side caching would add
JavaScript without adding anything. Add TanStack Query the day a page needs interactive, paginated
or mutation-heavy data — nothing in this structure prevents it.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run start     # serve the build
npm run typecheck # tsc --noEmit
```

## Structure

```
src/app/layout.tsx              fonts, metadata, theme provider, header/footer
src/app/page.tsx                home: hero, product cards, principles
src/app/[slug]/page.tsx         product pages from generateStaticParams()
src/app/sitemap.ts, robots.ts   SEO endpoints
src/components/                 header, footer, product card, section label, release note
src/components/ui/              shadcn/ui primitives
src/data/products.ts            the only file to edit when adding a product
public/products/<slug>/         icon + marquee + screenshots (webp)
public/og, public/og.png        social preview images
```

## Adding a product

1. Append an entry to [`src/data/products.ts`](src/data/products.ts) — slug, name, tagline,
   summary, features, screenshots, store/repo URLs.
2. Drop its assets into `public/products/<slug>/` (`icon.png`, `marquee.webp`,
   screenshots at 1280×800).
3. The route, metadata, JSON-LD, sitemap entry, home card, navigation links and the
   "also from the studio" link all follow automatically.

## Speed Insights

`<SpeedInsights />` is mounted once in [`src/app/layout.tsx`](src/app/layout.tsx). It injects
`/_vercel/speed-insights/script.js`, which only exists on Vercel — locally the request 404s and
nothing is recorded, which is expected.

After the first deploy, open the project in Vercel → **Speed Insights** → **Enable**. Field data
appears within a few minutes of the first visit. It reports real-user LCP, INP and CLS per route
(`/`, `/postmessage-catcher`, `/customize-tab-icon`), so a regression on one page is visible on its own.

## SEO

- Per-page `title`, description, canonical, Open Graph and Twitter cards via the Metadata API
- JSON-LD `SoftwareApplication` on product pages
- `sitemap.xml` + `robots.txt` generated from the same data
- Static HTML for every route; the only JavaScript is the theme toggle and the mobile nav

After deploying, submit `https://xcreative.dev/sitemap.xml` in Google Search Console and
Bing Webmaster Tools.

## Deploy

Vercel picks this up with zero configuration:

1. Import `XCreativeStudio/xcreative-website`.
2. Framework preset **Next.js** — build `next build`, no output directory override.
3. Add the domain `xcreative.dev`, then point the registrar's `A` record (or nameservers) at
   Vercel.

`.dev` is HSTS-preloaded, so the site must be served over HTTPS — Vercel issues the certificate
automatically.
