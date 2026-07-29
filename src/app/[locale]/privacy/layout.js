import { getTranslations } from "next-intl/server";
import {
  BRAND_NAME,
  OG_LOCALE_MAP,
  SITE_URL,
  absoluteUrl,
  pageAlternates,
} from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: "tonyantony300" }],
    creator: "tonyantony300",
    publisher: BRAND_NAME,
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale] || "en_US",
      url: absoluteUrl(locale, "privacy"),
      siteName: BRAND_NAME,
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} Privacy Policy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@tonyantony300",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: pageAlternates(locale, "privacy"),
  };
}

export default function PrivacyLayout({ children }) {
  return children;
}
