import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  Funnel_Sans,
  Newsreader,
  Libre_Franklin,
  Koulen,
  Inter,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import {
  OG_LOCALE_MAP,
  PRESS_LINKS,
  SEO_KEYWORDS,
  absoluteUrl,
  pageAlternates,
} from "@/lib/seo";
import StructuredData from "./StructuredData";
import "../globals.css";
import "../../styles/home-sections.css";

const funnelSans = Funnel_Sans({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

const koulen = Koulen({
  variable: "--font-koulen",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    metadataBase: new URL("https://altsendme.com"),
    title: {
      default: t("meta.title"),
      template: "%s | AltSendme",
    },
    description: t("meta.description"),
    keywords: SEO_KEYWORDS,
    authors: [
      { name: "tonyantony300", url: "https://github.com/tonyantony300" },
    ],
    creator: "tonyantony300",
    publisher: "AltSendme",
    other: {
      "github:repository": "https://github.com/tonyantony300/alt-sendme",
      "review:softpedia-mac": PRESS_LINKS.softpediaMac,
      "review:softpedia-linux": PRESS_LINKS.softpediaLinux,
      "review:neowin": PRESS_LINKS.neowin,
      "review:xda-developers": PRESS_LINKS.xda,
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "format-detection": "telephone=no",
    },
    applicationName: "AltSendme",
    category: "File Transfer Software",
    classification: "Desktop Application",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      locale: OG_LOCALE_MAP[locale] || "en_US",
      url: absoluteUrl(locale),
      siteName: "AltSendme",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "AltSendme - Peer-to-peer file transfer application",
        },
      ],
      seeAlso: "https://github.com/tonyantony300/alt-sendme",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
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
    alternates: pageAlternates(locale),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={SEO_KEYWORDS.join(", ")} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <script src="https://tally.so/widgets/embed.js" async></script>
      </head>
      <body
        className={`${funnelSans.variable} ${newsreader.variable} ${libreFranklin.variable} ${koulen.variable} ${inter.variable}`}
      >
        <NextIntlClientProvider messages={messages}>
          <StructuredData locale={locale} />
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
