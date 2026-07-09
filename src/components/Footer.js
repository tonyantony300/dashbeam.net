"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PRESS_LINKS } from "@/lib/seo";

const PRESS_ITEMS = [
  { name: "Softpedia", url: PRESS_LINKS.softpediaMac },
  { name: "Neowin", url: PRESS_LINKS.neowin },
  { name: "XDA Developers", url: PRESS_LINKS.xda },
  { name: "DEV Community", url: PRESS_LINKS.devto },
];

const FOOTER_NAV_GRID = [
  [
    {
      key: "sourceCode",
      href: "https://github.com/tonyantony300/alt-sendme",
      external: true,
    },
    { key: "howItWorks", href: "/under-the-hood" },
    { key: "downloads", href: "/downloads" },
    { key: "compare", href: "/compare" },
  ],
  [
    { key: "contactUs", href: "/contact" },
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
    { key: "discord", href: "https://discord.gg/xwb7z22Eve", external: true },
  ],
];

function FooterRule({ className = "" }) {
  return (
    <div className={`px-5 md:px-10 lg:px-[60px] ${className}`}>
      <div className="mx-auto h-px w-full max-w-[1200px] bg-white/25" />
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative w-full overflow-hidden bg-black text-white">
      <div className="px-5 pb-14 pt-12 md:px-10 md:pb-20 md:pt-14 lg:px-[60px] lg:pb-12 lg:pt-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl lg:max-w-lg lg:shrink-0">
            <h2 className="font-funnel-sans text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[40px]">
              {t.rich("headline", {
                br: () => <br />,
              })}
            </h2>
            <p className="mt-4 font-inter text-md text-white/80">
              {t("builtOn")}{" "}
              <a
                href="https://www.iroh.computer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-[3px] font-bold text-accent"
              >
                iroh
              </a>
            </p>
          </div>

          <nav className="grid w-full grid-cols-2 gap-x-6 gap-y-5 font-inter text-sm text-white sm:gap-x-8 md:grid-cols-4 md:gap-y-4 lg:ml-12 lg:flex-1">
            {FOOTER_NAV_GRID.flatMap((row, rowIndex) =>
              row.map((link, colIndex) => {
                if (!link) {
                  return (
                    <span
                      key={`empty-${rowIndex}-${colIndex}`}
                      className="hidden md:block"
                      aria-hidden="true"
                    />
                  );
                }

                const { key, href, external } = link;
                const className =
                  "whitespace-nowrap hover:underline underline-offset-[3px]";

                if (external) {
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {t(key)}
                    </a>
                  );
                }

                return (
                  <Link key={key} href={href} className={className}>
                    {t(key)}
                  </Link>
                );
              }),
            )}
          </nav>
        </div>
      </div>

      <div className="px-5 pt-8 pb-4 md:px-10 md:pt-10 md:pb-5 lg:px-[60px] lg:pt-16 lg:pb-6">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Image
              src="/Altsendmelogo.png"
              alt="AltSendme logo"
              width={220}
              height={220}
              className="h-24 w-24 shrink-0 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
            />
            <span className="min-w-0 font-funnel-sans text-[clamp(2.75rem,12.1vw,3.85rem)] font-extrabold leading-none tracking-tighter text-accent sm:text-[clamp(2.75rem,12vw,4.5rem)] md:text-[clamp(3rem,12vw,6rem)] lg:text-[clamp(3.5rem,15vw,10rem)]">
              AltSendme
            </span>
          </div>
          <div className="flex flex-col gap-2 font-inter text-xs text-white/60">
            <p>{t("asSeenIn")}</p>
            <p className="flex flex-wrap gap-x-1 gap-y-1">
              {PRESS_ITEMS.map((item, index) => (
                <span key={item.name}>
                  {index > 0 && <span aria-hidden="true"> · </span>}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-[3px] hover:text-white/80"
                  >
                    {item.name}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <FooterRule />

      <div className="px-5 py-6 md:px-10 md:py-8 lg:px-[60px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 text-center font-inter text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between sm:text-left md:text-sm">
          <p>
            {t("websiteBy")}{" "}
            <a
              href="https://www.linkedin.com/in/shravankumarps/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-[3px] hover:text-white"
            >
              {t("designer")}
            </a>
          </p>
          <p>{t("license")}</p>
        </div>
      </div>
    </footer>
  );
}
