import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales } from "@/i18n/config";

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase())
    .filter(Boolean);

  for (const lang of preferred) {
    if (lang.startsWith("zh")) return "zh";
    if (lang.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // Already localized — nothing to do.
  if (isLocale(first)) return NextResponse.next();

  // Old product URLs (linked from the GitHub org and READMEs) keep working.
  const locale = detectLocale(request);
  const target = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(new URL(target, request.url), 308);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\.[^/]+$).*)"],
};

export { locales };
