export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

/** `lang` attribute for the <html> element. */
export function htmlLang(locale: Locale) {
  return locale === "zh" ? "zh-Hans" : "en";
}
