import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export function SectionLabel({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={cn(
          "font-mono text-[11px] text-muted-foreground",
          locale === "zh" ? "tracking-[0.1em]" : "uppercase tracking-[0.16em]"
        )}
      >
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
