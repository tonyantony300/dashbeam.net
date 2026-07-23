import { getTranslations } from "next-intl/server";
import { DESKTOP_VERSION } from "@/constants/downloads";
import {
  BRAND_FORMER_NAMES,
  BRAND_NAME,
  GITHUB_REPO_URL,
  GITHUB_REPO_URL_LEGACY,
  PRESS_LINKS,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

/** Homepage-only FAQ schema; FAQPage markup must match visible page content */
export async function HomeFaqStructuredData({ locale }) {
  const t = await getTranslations({ locale, namespace: "faq" });

  const faqKeys = [
    "faq1",
    "faq2",
    "faq3",
    "faq4",
    "faq5",
    "faq6",
    "faq7",
    "faq8",
    "faq9",
  ];

  // JSON-LD requires plain strings; strip rich-text tags like <link>/<compareLink>
  const getFaqAnswerText = (key) =>
    t.raw(`items.${key}.answer`).replace(/<\/?[^>]+>/g, "");

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: t(`items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: getFaqAnswerText(key),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
    />
  );
}

export default async function StructuredData({ locale }) {
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: BRAND_NAME,
    alternateName: BRAND_FORMER_NAMES,
    disambiguatingDescription:
      "Formerly known as AltSendme, Alt Send Me, alt-sendme, and Altsendme. Same open-source peer-to-peer file transfer app; official site is https://dashbeam.net.",
    applicationCategory: "FileTransferApplication",
    operatingSystem: ["Windows", "macOS", "Linux", "Android", "Web"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tMeta("description"),
    featureList: [
      "Peer-to-peer file transfer over the internet",
      "No account required",
      "End-to-end encryption (QUIC + TLS 1.3)",
      "Unlimited file size and transfers",
      "Cross-platform (Windows, macOS, Linux, Android, Web)",
      "NAT hole punching with encrypted relay fallback",
      "Verified streaming (BLAKE3)",
      "Resumable downloads",
      "CLI compatible with Iroh sendme",
      "Open source (AGPL-3.0)",
      "Built on Iroh networking stack",
    ],
    softwareVersion: DESKTOP_VERSION,
    releaseNotes:
      "Cross-platform peer-to-peer file transfer for desktop, Android, web, and CLI",
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
    author: {
      "@type": "Person",
      name: "tonyantony300",
      url: "https://github.com/tonyantony300",
    },
    url: SITE_URL,
    downloadUrl: absoluteUrl("en", "downloads"),
    codeRepository: GITHUB_REPO_URL,
    isAccessibleForFree: true,
    softwareHelp: "https://www.iroh.computer/docs/faq",
    applicationSubCategory: "File Sharing",
    sameAs: [
      GITHUB_REPO_URL,
      GITHUB_REPO_URL_LEGACY,
      PRESS_LINKS.softpediaMac,
      PRESS_LINKS.softpediaLinux,
      PRESS_LINKS.softpediaWindows,
      PRESS_LINKS.neowin,
      PRESS_LINKS.xda,
      PRESS_LINKS.devto,
      PRESS_LINKS.sourceforge,
      PRESS_LINKS.hnSendme,
      PRESS_LINKS.hnWormhole,
    ],
    screenshot: `${SITE_URL}/og-image.png`,
    keywords:
      "DashBeam, open source Blip alternative, Blip alternative, blip.net alternative, AltSendme, Alt Send Me, Alt Send ME, alt-sendme, Altsendme, file transfer, peer-to-peer, P2P, LocalSend alternative, encrypted, open source, iroh, sendme",
    inLanguage: ["en", "fr", "th", "de", "zh", "ja", "ru", "ko", "it"],
    browserRequirements:
      "Native app recommended; web app available at app.altsendme.com",
    softwareRequirements:
      "Windows 10+, macOS 10.13+, Linux, Android 8+, or modern browser",
    permissions: "File system access for sending and receiving files",
  };

  const webSiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    alternateName: [
      ...BRAND_FORMER_NAMES,
      "DashBeam - Peer-to-peer file transfer",
    ],
    description:
      "Official website for DashBeam, formerly AltSendme / Alt Send Me / alt-sendme. Peer-to-peer file transfer.",
    url: SITE_URL,
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      name: "tonyantony300",
      url: "https://github.com/tonyantony300",
    },
  };

  const brandStructuredData = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: BRAND_NAME,
    alternateName: BRAND_FORMER_NAMES,
    url: SITE_URL,
    slogan:
      "Announcement: AltSendme is now DashBeam. Same app, easier to pronounce, remember and find",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(brandStructuredData),
        }}
      />
    </>
  );
}
