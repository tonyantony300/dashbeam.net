"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { BRAND_NAME, GITHUB_REPO_URL, PRESS_LINKS } from "@/lib/seo";

const PRESS_ITEMS = [
  { name: "Softpedia", url: PRESS_LINKS.softpediaMac },
  { name: "Neowin", url: PRESS_LINKS.neowin },
  { name: "XDA Developers", url: PRESS_LINKS.xda },
  { name: "DEV Community", url: PRESS_LINKS.devto },
];

const FOOTER_NAV_GROUPS = [
  {
    heading: "groupProduct",
    links: [
      { key: "howItWorks", href: "/under-the-hood" },
      { key: "downloads", href: "/downloads" },
      { key: "compare", href: "/compare" },
    ],
  },
  {
    heading: "groupCompare",
    links: [
      { key: "compareLocalsend", href: "/compare/localsend" },
      { key: "compareBlip", href: "/compare/blip" },
      { key: "compareWormhole", href: "/compare/wormhole" },
      { key: "comparePairdrop", href: "/compare/pairdrop" },
    ],
  },
  {
    heading: "groupCommunity",
    links: [
      { key: "sourceCode", href: GITHUB_REPO_URL, external: true },
      { key: "discord", href: "https://discord.gg/xwb7z22Eve", external: true },
      { key: "contactUs", href: "/contact" },
    ],
  },
  {
    heading: "groupSupport",
    links: [
      {
        key: "githubSponsors",
        href: "https://github.com/sponsors/tonyantony300",
        external: true,
      },
      {
        key: "buyMeACoffee",
        href: "https://buymeacoffee.com/tny_antny",
        external: true,
      },
    ],
  },
];

const NAV_LINK_CLASS =
  "text-white/70 transition-colors duration-200 hover:text-white";

function FooterRule({ className = "" }) {
  return (
    <div className={`px-5 md:px-10 lg:px-[60px] ${className}`}>
      <div className="mx-auto h-px w-full max-w-[1200px] bg-white/10" />
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      <div className="px-5 pb-12 pt-16 md:px-10 md:pb-14 md:pt-20 lg:px-[60px] lg:pb-12 lg:pt-24">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl lg:max-w-lg lg:shrink-0">
            <h2 className="font-heading text-[28px] font-medium leading-[1.1] tracking-[-0.015em] text-white sm:text-[34px] lg:text-[44px]">
              {t.rich("headline", {
                br: () => <br />,
              })}
            </h2>
            <p className="mt-4 font-sans text-md text-white/80">
              {t("builtOn")}{" "}
              <a
                href="https://www.iroh.computer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-[3px] font-bold text-brand-tan"
              >
                iroh
              </a>
            </p>
          </div>

          <nav className="grid w-full grid-cols-2 gap-x-6 gap-y-8 font-sans text-sm sm:gap-x-8 md:grid-cols-4 lg:ml-12 lg:flex-1">
            {FOOTER_NAV_GROUPS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                  {t(group.heading)}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.links.map(({ key, href, external }) => (
                    <li key={key}>
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={NAV_LINK_CLASS}
                        >
                          {t(key)}
                        </a>
                      ) : (
                        <Link href={href} className={NAV_LINK_CLASS}>
                          {t(key)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <FooterRule />

      <div className="px-5 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12 lg:px-[60px]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="flex items-center gap-4 md:gap-6">
            <Image
              src="/Altsendmelogo.png"
              alt={`${BRAND_NAME} logo`}
              width={220}
              height={220}
              className="h-24 w-24 shrink-0 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
            />
            <span className="min-w-0 font-sans text-[clamp(2.75rem,12.1vw,3.85rem)] font-extrabold leading-none tracking-tighter text-brand-tan sm:text-[clamp(2.75rem,12vw,4.5rem)] md:text-[clamp(3rem,12vw,6rem)] lg:text-[clamp(3.5rem,15vw,10rem)]">
              {BRAND_NAME}
            </span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <p className="max-w-md font-sans text-xs text-white/50 sm:text-sm">
              {t("formerlyKnownAs")}
            </p>

            <div className="flex flex-col gap-2 sm:items-end">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                {t("asSeenIn")}
              </p>
              <p className="flex flex-wrap gap-x-1 font-sans text-xs text-white/70 sm:justify-end">
                {PRESS_ITEMS.map((item, index) => (
                  <span key={item.name}>
                    {index > 0 && (
                      <span aria-hidden="true" className="text-white/30">
                        {" · "}
                      </span>
                    )}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterRule />

      <div className="px-5 py-6 md:px-10 md:py-8 lg:px-[60px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 text-center font-sans text-xs text-white/60 sm:flex-row sm:justify-between sm:text-left md:text-sm">
          <p>
            {t("websiteBy")}{" "}
            <a
              href="https://www.linkedin.com/in/shravankumarps/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-white"
            >
              {t("designer")}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              {t("privacy")}
            </Link>
            <span aria-hidden="true" className="text-white/25">
              ·
            </span>
            <span>{t("license")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
