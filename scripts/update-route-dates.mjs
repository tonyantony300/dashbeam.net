/**
 * Regenerates src/lib/routeDates.json — the `lastmod` source for sitemap.xml.
 *
 * Why a committed file instead of shelling out to git inside sitemap.js:
 * Vercel builds from a shallow clone, so per-file `git log` returns nothing there
 * and every route would silently fall back to the build date — exactly the
 * "everything changed today" signal this replaces.
 *
 * A route's date is the newer of:
 *   1. the last commit touching its own page.js / layout.js, and
 *   2. the last commit that actually changed its slice of locales/en.json.
 * Most page copy lives in the locale catalogue, so (2) is what usually moves;
 * without it, editing a page's text would leave lastmod stale. Shared components
 * are deliberately excluded — a navigation refactor is not a content change.
 *
 * Run after changing page content, then commit the result:
 *   node scripts/update-route-dates.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, "src/app/[locale]");
const CATALOGUE = "locales/en.json";

const git = (...args) =>
  execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 32 << 20 }).trim();

const seo = readFileSync(join(ROOT, "src/lib/seo.js"), "utf8");
const block = seo.match(/export const SITE_ROUTES = \[([\s\S]*?)\];/);
if (!block) throw new Error("SITE_ROUTES not found in src/lib/seo.js");
const routes = [...block[1].matchAll(/"([^"]*)"/g)].map((m) => m[1]);

/** Which slice of the locale catalogue each route renders. */
const NAMESPACES = {
  "": ["common", "header", "hero", "waysToSend", "features", "comparison",
       "testimonial", "partners", "community", "availableAs", "download",
       "taglineFooter", "footer", "faq", "meta"],
  downloads: ["downloadsPage"],
  "under-the-hood": ["underTheHoodPage"],
  contact: ["contact"],
  privacy: ["privacyPage"],
  compare: ["comparePage.hub"],
  "compare/localsend": ["comparePage.localsend"],
  "compare/blip": ["comparePage.blip"],
  "compare/wormhole": ["comparePage.wormhole"],
  "compare/pairdrop": ["comparePage.pairdrop"],
};

const at = (obj, path) =>
  path.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj);

// Walk the catalogue's history once; cache each revision.
const shas = git("log", "--format=%H", "--", CATALOGUE).split("\n").filter(Boolean);
const dateOf = new Map();
const revision = new Map();
for (const sha of shas) {
  dateOf.set(sha, git("show", "-s", "--format=%cI", sha));
  try {
    revision.set(sha, JSON.parse(git("show", `${sha}:${CATALOGUE}`)));
  } catch {
    revision.set(sha, null); // catalogue absent or unparseable at that revision
  }
}

/** Newest commit at which any of `paths` differs from the preceding revision. */
const catalogueDate = (paths) => {
  for (let i = 0; i < shas.length; i++) {
    const now = revision.get(shas[i]);
    const prev = i + 1 < shas.length ? revision.get(shas[i + 1]) : null;
    const changed = paths.some(
      (p) => JSON.stringify(at(now, p)) !== JSON.stringify(at(prev, p)),
    );
    if (changed) return dateOf.get(shas[i]);
  }
  return null;
};

const routeFileDate = (route) => {
  const dir = route ? join(APP, route) : APP;
  const files = ["page.js", "layout.js"].map((f) => join(dir, f)).filter(existsSync);
  if (route === "") {
    const home = join(APP, "HomePage.js");
    if (existsSync(home)) files.push(home);
  }
  const stamps = files
    .map((f) => git("log", "-1", "--format=%cI", "--", f))
    .filter(Boolean)
    .sort();
  return stamps.at(-1) ?? null;
};

const dates = {};
for (const route of routes) {
  const ns = NAMESPACES[route];
  if (!ns) throw new Error(`route "${route}" has no NAMESPACES entry — add one`);
  const candidates = [routeFileDate(route), catalogueDate(ns)].filter(Boolean).sort();
  const latest = candidates.at(-1);
  if (!latest) throw new Error(`no date resolved for route "${route}"`);
  dates[route] = new Date(latest).toISOString();
}

writeFileSync(join(ROOT, "src/lib/routeDates.json"), JSON.stringify(dates, null, 2) + "\n");
console.log(`wrote ${Object.keys(dates).length} route dates`);
for (const [r, d] of Object.entries(dates)) {
  console.log(`  ${(r || "/").padEnd(20)} ${d.slice(0, 10)}`);
}
