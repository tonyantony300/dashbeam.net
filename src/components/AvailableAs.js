"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import { WEB_APP_URL } from "@/constants/downloads";
import { Section, SectionOpener } from "@/components/Section";
import { tx } from "@/lib/tx";

const PLATFORMS = [
  {
    key: "desktop",
    image: "/desktop.webp",
    imageAlt: "Desktop applications",
    width: 1010,
    height: 645,
    href: "/downloads#download-desktop",
  },
  {
    key: "android",
    image: "/mobile.webp",
    imageAlt: "Android application",
    width: 601,
    height: 448,
    href: "/downloads#download-android",
  },
  {
    key: "cli",
    image: "/cli.webp",
    imageAlt: "Command line interface",
    width: 1214,
    height: 739,
    href: "/downloads#download-desktop",
  },
  {
    key: "web",
    image: "/browser.webp",
    imageAlt: "Web application",
    width: 1010,
    height: 687,
    href: WEB_APP_URL,
    external: true,
  },
];

const CARD_CLASSES =
  "group flex h-full flex-col rounded-card border border-border bg-card p-3.5 pb-4.5 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function AvailableAs() {
  const t = useTranslations("availableAs");

  return (
    <Section>
      <SectionOpener
        deck={tx(
          t,
          "deck",
          "Native apps, a terminal client, and a browser build, all speaking the same protocol.",
        )}
        eyebrow={tx(t, "eyebrow", "Platforms")}
        title={`${t("titleLine1")} ${t("titleLine2")}`}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORMS.map((platform) => {
          const content = (
            <>
              {/* Source screenshots have four different native aspect ratios,
                  so they sit in a fixed 4:3 frame to keep the cards aligned. */}
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-frame bg-frame">
                <img
                  alt={platform.imageAlt}
                  className="h-full w-full object-cover object-top"
                  decoding="async"
                  height={platform.height}
                  loading="lazy"
                  src={platform.image}
                  width={platform.width}
                />
              </div>
              <h3 className="mb-1.5 px-1 font-sans text-[17px] font-semibold tracking-[-0.01em] text-card-foreground">
                {t(`${platform.key}.title`)}
              </h3>
              <p className="mb-4 grow px-1 font-sans text-sm leading-relaxed text-muted-foreground">
                {t(`${platform.key}.description`)}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 px-1 font-sans text-sm font-semibold text-brand-brown">
                {platform.external ? t("openWeb") : t("download")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={15}
                  weight="bold"
                />
              </span>
            </>
          );

          if (platform.external) {
            return (
              <a
                className={CARD_CLASSES}
                href={platform.href}
                key={platform.key}
                rel="noopener noreferrer"
                target="_blank"
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              className={CARD_CLASSES}
              href={platform.href}
              key={platform.key}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
