/**
 * Read a translation that may not exist in every locale yet.
 *
 * The editorial section openers introduced eyebrow and deck strings that are
 * currently only written in English. Rather than emit MISSING_MESSAGE errors
 * for the other eight locales, fall back to the English source string until a
 * translation lands.
 */
export function tx(t, key, fallback = "") {
  return t.has(key) ? t(key) : fallback;
}
