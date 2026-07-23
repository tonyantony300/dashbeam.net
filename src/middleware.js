import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import { SITE_URL } from "./lib/seo";

const intlMiddleware = createMiddleware(routing);

const normalizedLocales = routing.locales.map((l) => l.toLowerCase());

/** Legacy marketing hosts that should permanently resolve to dashbeam.net */
const LEGACY_HOSTS = new Set([
  "altsendme.com",
  "www.altsendme.com",
  "alt-sendme.com",
  "www.alt-sendme.com",
]);

export default function middleware(request) {
  const host = (request.headers.get("host") || "")
    .split(":")[0]
    .toLowerCase();

  // Canonicalize former brand domains onto dashbeam.net (keep app.altsendme.com alone)
  if (LEGACY_HOSTS.has(host)) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_URL);
    return NextResponse.redirect(destination, 308);
  }

  const acceptLanguage = request.headers.get("accept-language");

  const pathname = request.nextUrl.pathname;
  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!hasLocale) {
    let localeToUse = routing.defaultLocale;

    if (acceptLanguage) {
      const preferredLocales = acceptLanguage.split(",").map((lang) => {
        const [locale] = lang.trim().split(";");
        return locale.toLowerCase().split("-")[0];
      });

      const exactMatch = preferredLocales.find((pref) =>
        normalizedLocales.includes(pref),
      );

      if (exactMatch) {
        localeToUse =
          routing.locales.find((loc) => loc.toLowerCase() === exactMatch) ||
          routing.defaultLocale;
      }
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${localeToUse}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|manifest.json|llm\\.txt|llms\\.txt|.*\\..*).*)",
  ],
};
