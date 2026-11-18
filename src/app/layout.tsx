import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://xcreative.dev";
const description =
  "XCreative Studio makes small, careful Chrome extensions: postMessage Catcher for DevTools and Changicon for tab icons. No accounts, no telemetry, built by one person.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "XCreative Studio — small Chrome extensions, made carefully",
    template: "%s — XCreative Studio",
  },
  description,
  applicationName: "XCreative Studio",
  keywords: [
    "Chrome extensions",
    "postMessage",
    "DevTools",
    "favicon",
    "tab icon",
    "developer tools",
  ],
  authors: [{ name: "XCreative Studio", url: siteUrl }],
  creator: "XCreative Studio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "XCreative Studio",
    url: siteUrl,
    title: "XCreative Studio — small Chrome extensions, made carefully",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "XCreative Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "XCreative Studio — small Chrome extensions, made carefully",
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
