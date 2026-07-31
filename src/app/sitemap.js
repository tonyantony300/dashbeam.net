import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates, SITE_ROUTES } from "@/lib/seo";

function priorityFor(route) {
  if (route === "") return 1;
  if (route === "downloads" || route.startsWith("compare")) return 0.9;
  return 0.7;
}

export default function sitemap() {
  const lastModified = new Date();

  return SITE_ROUTES.flatMap((route) => {
    const languages = languageAlternates(route);

    return routing.locales.map((locale) => ({
      url: absoluteUrl(locale, route),
      lastModified,
      changeFrequency: "weekly",
      priority: priorityFor(route),
      alternates: { languages },
    }));
  });
}
