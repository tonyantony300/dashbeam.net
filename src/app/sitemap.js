import { routing } from "@/i18n/routing";
import { absoluteUrl, SITE_ROUTES } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    SITE_ROUTES.map((route) => ({
      url: absoluteUrl(locale, route),
      lastModified,
      changeFrequency: "weekly",
      priority:
        route === ""
          ? 1
          : route.startsWith("compare")
            ? 0.9
            : route === "downloads"
              ? 0.9
              : 0.7,
    })),
  );
}
