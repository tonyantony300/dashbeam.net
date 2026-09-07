import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates, SITE_ROUTES } from "@/lib/seo";
import routeDates from "@/lib/routeDates.json";

/**
 * `lastModified` comes from a committed map rather than `new Date()`: stamping
 * every build made all 90 URLs claim they changed today, which teaches crawlers
 * to ignore the signal outright. Regenerate with `node scripts/update-route-dates.mjs`.
 *
 * `changeFrequency` and `priority` are deliberately absent — Google ignores both.
 */
export default function sitemap() {
  return SITE_ROUTES.flatMap((route) => {
    const languages = languageAlternates(route);
    const lastModified = routeDates[route];

    return routing.locales.map((locale) => ({
      url: absoluteUrl(locale, route),
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages },
    }));
  });
}
