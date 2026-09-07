import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale negotiation only. Two things deliberately live outside this file:
 *
 * - Legacy-host canonicalisation (altsendme.com / alt-sendme.com -> dashbeam.net)
 *   is handled by `redirects` in vercel.json, which the routing layer applies
 *   before middleware is invoked. Doing it here cost edge CPU for a no-op.
 * - Accept-Language negotiation is next-intl's job (`localeDetection: true` in
 *   ./i18n/routing). The previous hand-rolled pass ran first and then delegated
 *   here anyway, doing the work twice.
 *
 * Keep this module's import graph minimal: anything reachable from here is
 * evaluated on every edge cold start, and that time is billed as active CPU.
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
