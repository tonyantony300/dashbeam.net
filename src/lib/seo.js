import { routing } from "@/i18n/routing";

export const SITE_URL = "https://dashbeam.net";

export const BRAND_NAME = "DashBeam";
export const BRAND_FORMER_NAMES = [
  "AltSendme",
  "Alt Send Me",
  "Alt Send ME",
  "alt-sendme",
  "Altsendme",
  "AltSendMe",
];
export const GITHUB_REPO_URL = "https://github.com/tonyantony300/dashbeam";
export const GITHUB_REPO_URL_LEGACY =
  "https://github.com/tonyantony300/alt-sendme";

export const OG_LOCALE_MAP = {
  en: "en_US",
  ru: "ru_RU",
  th: "th_TH",
  de: "de_DE",
  fr: "fr_FR",
  ja: "ja_JP",
  zh: "zh_CN",
  ko: "ko_KR",
  it: "it_IT",
};

/** Path segments after the locale, e.g. '' | 'downloads' | 'compare/localsend' */
export function localePath(locale, path = "") {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

export function absoluteUrl(locale, path = "") {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/** hreflang map including x-default → English */
export function languageAlternates(path = "") {
  const languages = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(locale, path);
  }
  languages["x-default"] = absoluteUrl("en", path);
  return languages;
}

export function pageAlternates(locale, path = "") {
  return {
    canonical: absoluteUrl(locale, path),
    languages: languageAlternates(path),
  };
}

export const SITE_ROUTES = [
  "",
  "downloads",
  "under-the-hood",
  "contact",
  "compare",
  "compare/localsend",
  "compare/blip",
  "compare/wormhole",
  "compare/pairdrop",
];

export const SEO_KEYWORDS = [
  "DashBeam",
  "open source Blip alternative",
  "open source alternative to Blip",
  "Blip alternative",
  "blip.net alternative",
  "alternative to blip.net",
  "open source blip.net alternative",
  "free Blip alternative",
  "LocalSend alternative for the internet",
  "LocalSend alternative",
  "WeTransfer alternative open source",
  "file transfer",
  "peer-to-peer",
  "P2P file sharing",
  "encrypted file transfer",
  "cross-platform file transfer",
  "secure file sharing",
  "private file transfer",
  "free file transfer",
  "unlimited file transfer",
  "AltSendme",
  "Alt Send Me",
  "Alt Send ME",
  "alt-sendme",
  "Altsendme",
  "AltSendMe",
  "sendme",
  "iroh",
  "open source file transfer",
  "AirDrop alternative",
  "send large files free",
  "Windows file transfer",
  "macOS file transfer",
  "Linux file transfer",
  "Android file transfer",
];

export const PRESS_LINKS = {
  softpediaMac:
    "https://mac.softpedia.com/get/Internet-Utilities/AltSendme.shtml",
  softpediaLinux:
    "https://linux.softpedia.com/get/Communications/Filesharing/AltSendme-104966.shtml",
  softpediaWindows:
    "https://www.softpedia.com/get/Internet/File-Sharing/AltSendme.shtml",
  neowin: "https://www.neowin.net/software/altsendme-041/",
  xda: "https://www.xda-developers.com/i-swapped-dropbox-for-this-self-hosted-alternative/",
  devto:
    "https://dev.to/githubopensource/altsendme-the-secure-serverless-way-to-share-files-directly-51dg",
  sourceforge: "https://sourceforge.net/projects/altsendme.mirror/",
  hnSendme: "https://news.ycombinator.com/item?id=47935026",
  hnWormhole: "https://news.ycombinator.com/item?id=46032371",
};
