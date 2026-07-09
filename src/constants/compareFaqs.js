export function buildCompareFaqs(t, keys) {
  return keys.map((key) => ({
    q: t(`${key}q`),
    a: t(`${key}a`),
  }));
}

export const LOCALSEND_FAQ_KEYS = [
  "faq1",
  "faq2",
  "faq3",
  "faq4",
  "faq5",
  "faq6",
];

export const WORMHOLE_FAQ_KEYS = [
  "faq1",
  "faq2",
  "faq3",
  "faq4",
  "faq5",
  "faq6",
];

export const PAIRDROP_FAQ_KEYS = [
  "faq1",
  "faq2",
  "faq3",
  "faq4",
  "faq5",
  "faq6",
];

export function buildLocalsendFaqs(t) {
  return buildCompareFaqs(t, LOCALSEND_FAQ_KEYS);
}

export function buildWormholeFaqs(t) {
  return buildCompareFaqs(t, WORMHOLE_FAQ_KEYS);
}

export function buildPairdropFaqs(t) {
  return buildCompareFaqs(t, PAIRDROP_FAQ_KEYS);
}
