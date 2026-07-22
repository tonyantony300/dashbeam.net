import { getTranslations } from "next-intl/server";
import { BRAND_NAME, OG_LOCALE_MAP, SITE_URL, absoluteUrl, pageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "comparePage.pairdrop",
  });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale] || "en_US",
      url: absoluteUrl(locale, "compare/pairdrop"),
      siteName: BRAND_NAME,
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "DashBeam vs PairDrop",
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
    alternates: pageAlternates(locale, "compare/pairdrop"),
  };
}

export default function ComparePairdropLayout({ children }) {
  return children;
}
