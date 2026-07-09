"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const FOOTER_NAV_GRID = [
  [
    { key: "sourceCode", href: "https://github.com/tonyantony300/alt-sendme", external: true },
    { key: "howItWorks", href: "/under-the-hood" },
    { key: "downloads", href: "/downloads" },
    { key: "contactUs", href: "/contact" },
  ],
  [
    { key: "githubSponsors", href: "https://github.com/sponsors/tonyantony300", external: true },
    { key: "buyMeACoffee", href: "https://buymeacoffee.com/tny_antny", external: true },
    { key: "discord", href: "https://discord.gg/xwb7z22Eve", external: true },
    { key: "reportIssue", href: "https://github.com/tonyantony300/alt-sendme/issues", external: true },
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
      <FooterRule className="pt-10 md:pt-14" />

      <div className="px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-12 lg:px-[60px] lg:pb-12 lg:pt-6">
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

                return (
                  <a
                    key={key}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="whitespace-nowrap hover:underline underline-offset-[3px]"
                  >
                    {t(key)}
                  </a>
                );
              })
            )}
          </nav>
        </div>
      </div>


      <div className="px-5 py-8 md:px-10 md:py-10 lg:px-[60px] lg:py-16">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 md:gap-6">
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
