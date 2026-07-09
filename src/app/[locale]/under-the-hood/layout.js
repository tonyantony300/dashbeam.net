import { getTranslations } from "next-intl/server";
import { OG_LOCALE_MAP, absoluteUrl, pageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "underTheHoodPage" });

  return {
    metadataBase: new URL("https://altsendme.com"),
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale] || "en_US",
      url: absoluteUrl(locale, "under-the-hood"),
      siteName: "AltSendme",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("heroAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/og-image.png"],
      creator: "@tonyantony300",
    },
    alternates: pageAlternates(locale, "under-the-hood"),
  };
}

export default function UnderTheHoodLayout({ children }) {
  return children;
}
