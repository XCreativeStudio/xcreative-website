# xcreative-website

The studio site for **XCreative Studio** — an index of small tools, with a page for each one.
Each product carries a `platform` label (`Chrome`, `微信小程序`, `iOS`, …) so the home cards stay
accurate as the catalogue grows beyond browser extensions.

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
| Languages | English (`/en`) and Chinese (`/zh`) — static routes, no client translation runtime |

**No TanStack Query.** Every page is prerendered and the only remote data is public store
metadata: the latest GitHub release and the Chrome Web Store rating. Both are fetched on the
server at build time with `next.revalidate` (ISR) — the release note in
[`src/lib/github.ts`](src/lib/github.ts), the store numbers in
[`src/lib/chrome-web-store.ts`](src/lib/chrome-web-store.ts). Client-side caching would add
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
src/app/[locale]/layout.tsx        root layout: fonts, theme, header/footer, <html lang>
src/app/[locale]/page.tsx          home: hero, product cards, principles
src/app/[locale]/[slug]/page.tsx   product pages (locales × products)
src/app/[locale]/not-found.tsx     localized 404
src/app/sitemap.ts, robots.ts      SEO endpoints (both locales)
src/proxy.ts                       locale detection + redirects for unprefixed URLs
src/i18n/config.ts                 locales, helpers
src/i18n/dictionaries.ts           UI strings for en and zh
src/data/products.ts               product structure + copy for both languages
src/lib/github.ts                  latest GitHub release + release zip URL
src/lib/chrome-web-store.ts        store rating, review count and users
src/components/                    header, footer, card, stats, locale switcher, release note
src/components/ui/                 shadcn/ui primitives
public/products/<slug>/            icon + marquee + screenshots (webp)
public/og, public/og.png           social preview images
```

## Languages

Every page is prerendered twice:

| URL | Language |
| --- | --- |
| `/en`, `/en/postmessage-catcher` | English |
| `/zh`, `/zh/postmessage-catcher` | Chinese (Simplified) |

- `src/proxy.ts` (Next 16's replacement for `middleware.ts`) sends `/` and any unprefixed path to
  the locale that matches the visitor's `Accept-Language`, with a 308 so links without a prefix
  keep working.
- The toggle in the header is a plain link, so it works without JavaScript.
- Each page declares `hreflang` alternates (`en`, `zh-Hans`, `x-default`), and `sitemap.xml`
  lists both versions with the same alternates.
- UI copy lives in `src/i18n/dictionaries.ts`; product copy lives next to the product in
  `src/data/products.ts` under `text.en` / `text.zh`.

## Adding a product

1. Append an entry to [`src/data/products.ts`](src/data/products.ts) — slug, name, `platform`
   (shown on the home card as “Free · Chrome”), version, store/repo URLs, both `text.en` and
   `text.zh` blocks (tagline, summary, intro, features, sections, screenshot captions, privacy),
   and the `download` + `storeStats` fallbacks described below.
2. Drop its assets into `public/products/<slug>/` (`icon.png`, `marquee.webp`,
   screenshots at 1280×800).
3. The route, metadata, JSON-LD, sitemap entry, home card, navigation links and the
   "also from the studio" link all follow automatically.
4. On every version bump, update `download` to the new release asset URL (and keep `storeStats`
   roughly current so a failed store fetch never shows stale numbers for long).

## Store numbers and downloads

The product page has a **Download .zip** button and a small rating line; the home cards repeat the
rating. Both come from public pages, fetched on the server and cached by ISR:

- **Release zip.** [`src/lib/github.ts`](src/lib/github.ts) reads the latest release once an hour
  and picks its `.zip` asset (the packaged extension). The button falls back to the fixed
  `download.url` in `src/data/products.ts` if the GitHub API is unreachable or rate-limited.
  GitHub sends `Content-Disposition: attachment`, so the download starts without JavaScript.
- **Store numbers.** Chrome Web Store has no public ratings API, so
  [`src/lib/chrome-web-store.ts`](src/lib/chrome-web-store.ts) parses the rendered listing once a
  day (`?hl=en-US&gl=US`): the first `Average rating` block is the item's own rating, followed by
  its rating count and user count. If the page layout changes, a network request fails, or the
  response is a JS-only shell, `storeStats` in `src/data/products.ts` is used instead and a
  `[store-stats] … using bundled fallback` warning is logged. The build never fails because of it.

The displayed user count is Chrome Web Store’s own rounded figure, not an exact install count.
The visible rating is also emitted as `aggregateRating` in the product page JSON-LD.

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
Bing Webmaster Tools. The sitemap lists `/en` and `/zh` with `hreflang` alternates so each
language is indexed separately.

## Deploy

Vercel picks this up with zero configuration:

1. Import `XCreativeStudio/xcreative-website`.
2. Framework preset **Next.js** — build `next build`, no output directory override.
3. Add the domain `xcreative.dev`, then point the registrar's `A` record (or nameservers) at
   Vercel.

`.dev` is HSTS-preloaded, so the site must be served over HTTPS — Vercel issues the certificate
automatically.
