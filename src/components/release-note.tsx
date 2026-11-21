import type { Locale } from "@/i18n/config";
import type { LatestRelease } from "@/lib/github";

export function ReleaseNote({
  release,
  label,
  locale,
}: {
  release: LatestRelease | null;
  label: string;
  locale: Locale;
}) {
  if (!release) return null;

  const date = new Date(release.publishedAt).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
      {label} {release.tag} · {date}
    </p>
  );
}
