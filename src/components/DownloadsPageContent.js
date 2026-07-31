"use client";

import { Copy, Check } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronsUpDown } from "lucide-react";
import DonateCard from "@/components/DonateCard";
import { PAGE_OPENER_MIN_H } from "@/components/Section";
import {
  desktopPlatformGroups,
  detectPlatform,
  getAlternateDownloadsForOs,
  getDownloadHref,
  getPrimaryDownload,
  getPrimaryDownloadUrl,
  mobilePlatformGroups,
  WEB_APP_URL,
} from "@/constants/downloads";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuTrigger,
} from "@/components/ui/menu";

function DownloadIcon({ className = "", fill = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11.8523 5.36364V14.2955L15.2557 10.8807L16.2898 11.9034L11.1136 17.0682L5.94886 11.9034L6.96023 10.8807L10.375 14.2955V5.36364H11.8523ZM11.1136 22.1136C9.9053 22.1136 8.75379 21.9299 7.65909 21.5625C6.56818 21.1951 5.56629 20.6761 4.65341 20.0057C3.74432 19.339 2.95455 18.5492 2.28409 17.6364C1.61742 16.7273 1.10038 15.7273 0.732955 14.6364C0.36553 13.5417 0.181818 12.3902 0.181818 11.1818C0.181818 9.97348 0.36553 8.82386 0.732955 7.73295C1.10038 6.63826 1.61742 5.63636 2.28409 4.72727C2.95455 3.81439 3.74432 3.02462 4.65341 2.35795C5.56629 1.6875 6.56818 1.16856 7.65909 0.801136C8.75379 0.433712 9.9053 0.25 11.1136 0.25C12.322 0.25 13.4716 0.433712 14.5625 0.801136C15.6572 1.16856 16.6591 1.6875 17.5682 2.35795C18.4811 3.02462 19.2708 3.81439 19.9375 4.72727C20.608 5.63636 21.1269 6.63826 21.4943 7.73295C21.8617 8.82386 22.0455 9.97348 22.0455 11.1818C22.0455 12.3902 21.8617 13.5417 21.4943 14.6364C21.1269 15.7273 20.608 16.7273 19.9375 17.6364C19.2708 18.5492 18.4811 19.339 17.5682 20.0057C16.6591 20.6761 15.6572 21.1951 14.5625 21.5625C13.4716 21.9299 12.322 22.1136 11.1136 22.1136ZM11.1136 20.6932C12.1667 20.6932 13.1667 20.5322 14.1136 20.2102C15.0644 19.892 15.9356 19.4413 16.7273 18.858C17.5227 18.2784 18.2121 17.5928 18.7955 16.8011C19.3788 16.0057 19.8295 15.1326 20.1477 14.1818C20.4659 13.2311 20.625 12.2311 20.625 11.1818C20.625 10.1288 20.4659 9.12689 20.1477 8.17614C19.8295 7.22538 19.3788 6.35417 18.7955 5.5625C18.2121 4.77083 17.5227 4.08333 16.7273 3.5C15.9356 2.91667 15.0644 2.46591 14.1136 2.14773C13.1667 1.82955 12.1667 1.67045 11.1136 1.67045C10.0606 1.67045 9.05871 1.82955 8.10795 2.14773C7.1572 2.46591 6.28409 2.91667 5.48864 3.5C4.69697 4.08333 4.00947 4.77083 3.42614 5.5625C2.84659 6.35417 2.39583 7.22538 2.07386 8.17614C1.75568 9.12689 1.59659 10.1288 1.59659 11.1818C1.59659 12.2311 1.75568 13.2311 2.07386 14.1818C2.39583 15.1326 2.84659 16.0057 3.42614 16.8011C4.00947 17.5928 4.69697 18.2784 5.48864 18.858C6.28409 19.4413 7.1572 19.892 8.10795 20.2102C9.05871 20.5322 10.0606 20.6932 11.1136 20.6932Z"
        fill={fill}
      />
    </svg>
  );
}

const ROW = "grid grid-cols-2 gap-4 border-t border-border py-6 md:py-8";
const ROW_LABEL = "font-sans text-base font-medium text-foreground md:text-lg";

function PlatformDownloadRow({ platformKey, links, t }) {
  return (
    <div className={`${ROW} md:min-h-[120px]`}>
      <div className={ROW_LABEL}>{t(`platforms.${platformKey}`)}</div>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.key}
            href={getDownloadHref(link)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-3 font-sans text-sm text-muted-foreground transition-colors hover:text-brand-brown md:text-base"
          >
            <span className="flex items-start gap-3">
              <DownloadIcon className="mt-0.5 h-5 w-5 shrink-0 text-foreground transition-colors group-hover:text-brand-brown" />
              <span>{t(`links.${link.key}`)}</span>
            </span>
            {link.size && (
              <span className="shrink-0 text-muted-foreground group-hover:text-brand-brown">
                {link.size}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function CopyCommandButton({ copyText, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access may be unavailable in some browsers.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : copyLabel}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? (
        <Check size={18} weight="bold" aria-hidden="true" />
      ) : (
        <Copy size={18} aria-hidden="true" />
      )}
    </button>
  );
}

function CliCommandLine({ command, copyText, copyLabel, copiedLabel }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <code className="block min-w-0 flex-1 break-all font-mono text-xs text-foreground md:text-sm">
        {command}
      </code>
      <CopyCommandButton
        copyText={copyText}
        copyLabel={copyLabel}
        copiedLabel={copiedLabel}
      />
    </div>
  );
}

function CliDownloadRow({ label, intro, commands, copyLabel, copiedLabel }) {
  return (
    <div className={`${ROW} md:min-h-[120px]`}>
      <div className={ROW_LABEL}>{label}</div>
      <div>
        <p className="mb-3 font-sans text-sm text-muted-foreground md:text-base">
          {intro}
        </p>
        <div className="flex flex-col gap-3">
          {commands.map((item) => (
            <CliCommandLine
              key={item.copyText}
              command={item.command}
              copyText={item.copyText}
              copyLabel={copyLabel}
              copiedLabel={copiedLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CliNotesRow({ copyNote, runNote }) {
  return (
    <div className={ROW}>
      <div aria-hidden="true" />
      <div className="flex flex-col gap-2 font-sans text-sm text-muted-foreground md:text-base">
        <p>{copyNote}</p>
        <p>{runNote}</p>
      </div>
    </div>
  );
}

export default function DownloadsPageContent() {
  const t = useTranslations("downloadsPage");
  const tHero = useTranslations("hero");
  const [platform, setPlatform] = useState({ os: "mac", arch: "x64" });

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const primary = getPrimaryDownload(platform.os, platform.arch);
  const alternateDownloads = getAlternateDownloadsForOs(platform.os, platform.arch);
  const primaryUrl = getPrimaryDownloadUrl(platform.os, platform.arch);

  const scrollToPlatforms = () => {
    document.getElementById("other-platforms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full font-sans">
      {/* Not a PageHero: this band carries the download CTAs and a photograph,
          so it follows the landing hero's pattern instead — same scrim, same
          grain, so the copy holds contrast once the photo darkens in dark. */}
      <section
        className={`relative flex w-full items-center overflow-hidden px-5 py-14 md:px-10 md:py-16 lg:px-[60px] lg:py-20 ${PAGE_OPENER_MIN_H}`}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[url('/communityBg.webp')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 hero-grain mix-blend-overlay opacity-[0.18]" />
          <div className="absolute inset-0 bg-scrim" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <h1 className="mb-4 font-heading text-[40px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-brown md:text-[56px] lg:text-[64px]">
            <span className="block">{t("titleLine1")}</span>
            <span className="block">{t("titleLine2")}</span>
          </h1>

          <p className="mb-8 font-sans text-sm font-medium text-brand-brown md:text-base">
            {t("statsLine")}
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* Same split button as the landing hero: the halves stay
                transparent so the shared brand-brown shell reads as one
                control, and each half tints itself on hover. */}
            <div className="flex w-full rounded-lg bg-brand-brown shadow-card sm:w-auto">
              <Button
                className="h-12 flex-1 rounded-e-none border-transparent bg-transparent px-5 font-sans font-semibold text-primary-foreground shadow-none hover:bg-white/10 sm:h-11 sm:flex-initial dark:text-neutral-900 dark:hover:bg-black/10"
                render={
                  <a
                    href={primaryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
                size="xl"
                variant="ghost"
              >
                <span>
                  {tHero(primary.heroTranslationKey.replace(/^hero\./, ""))}
                </span>
                <DownloadIcon className="size-5 shrink-0" />
              </Button>

              {alternateDownloads.length > 0 && (
                <Menu>
                  <MenuTrigger
                    render={
                      <Button
                        aria-label={t("moreFormats")}
                        className="h-12 shrink-0 rounded-s-none border-transparent border-s-white/25 bg-transparent px-3 text-primary-foreground shadow-none hover:bg-white/10 sm:h-11 dark:border-s-black/15 dark:text-neutral-900 dark:hover:bg-black/10"
                        size="xl"
                        variant="ghost"
                      />
                    }
                  >
                    <ChevronsUpDown
                      aria-hidden="true"
                      className="size-4 opacity-70"
                    />
                  </MenuTrigger>
                  <MenuPopup align="end" className="min-w-[280px]">
                    {alternateDownloads.map((link) => (
                      <MenuLinkItem
                        className="justify-between py-2.5"
                        href={link.href}
                        key={link.key}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="truncate font-sans">
                          {t(`links.${link.key}`)}
                        </span>
                        {link.size && (
                          <span className="ms-2 shrink-0 font-sans text-sm text-muted-foreground">
                            {link.size}
                          </span>
                        )}
                      </MenuLinkItem>
                    ))}
                  </MenuPopup>
                </Menu>
              )}
            </div>

            <Button
              className="h-12 w-full shrink-0 border-transparent bg-brand-brown px-5 font-sans font-semibold text-primary-foreground shadow-card hover:opacity-90 sm:h-11 sm:w-auto dark:text-neutral-900"
              render={
                <a href={WEB_APP_URL} rel="noopener noreferrer" target="_blank" />
              }
              size="xl"
            >
              {t("tryOnWeb")}
            </Button>

            {/* Tertiary, and last: this only scrolls further down the page, so
                it takes the outline shell rather than a third solid brown
                button. It still needs a defined surface of its own to hold
                against the photograph. */}
            <Button
              className="h-12 w-full shrink-0 px-5 font-sans font-semibold sm:h-11 sm:w-auto"
              onClick={scrollToPlatforms}
              size="xl"
              variant="outline"
            >
              <span>{t("otherPlatforms")}</span>
              <DownloadIcon className="size-5 shrink-0" />
            </Button>
          </div>
        </div>
      </section>

      <section
        id="other-platforms"
        className="scroll-mt-24 px-5 py-16 md:px-10 md:py-20 lg:px-[60px] lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-12 md:grid-cols-[6fr_4fr] md:gap-16">
            <div id="download-desktop">
              <h2 className="mb-6 font-heading text-2xl font-medium tracking-[-0.015em] text-foreground md:text-[28px]">
                {t("desktop")}
              </h2>
              <div className="border-t border-border">
                {desktopPlatformGroups.map((group) => (
                  <PlatformDownloadRow
                    key={group.key}
                    platformKey={group.key}
                    links={group.links}
                    t={t}
                  />
                ))}
                <CliDownloadRow
                  label={t("scoopLabel")}
                  intro={t("scoopIntro")}
                  commands={[
                    {
                      command: "scoop bucket add extras",
                      copyText: "scoop bucket add extras",
                    },
                    {
                      command: "scoop install extras/altsendme",
                      copyText: "scoop install extras/altsendme",
                    },
                  ]}
                  copyLabel={t("cli.copyCommand")}
                  copiedLabel={t("cli.copied")}
                />
              </div>
            </div>

            <div id="download-android">
              <h2 className="mb-6 font-heading text-2xl font-medium tracking-[-0.015em] text-foreground md:text-[28px]">
                {t("mobile")}
              </h2>
              <div className="border-t border-border">
                {mobilePlatformGroups.map((group) => (
                  <PlatformDownloadRow
                    key={group.key}
                    platformKey={group.key}
                    links={group.links}
                    t={t}
                  />
                ))}
              </div>
            </div>

            <div id="download-cli" className="md:col-span-2">
              <h2 className="mb-6 font-heading text-2xl font-medium tracking-[-0.015em] text-foreground md:text-[28px]">
                {t("cli.title")}
              </h2>
              <div className="border-t border-border">
                <CliDownloadRow
                  label={t("cli.platforms.bash")}
                  intro={t("cli.bashIntro")}
                  commands={[
                    {
                      command: "$ curl -fsSL https://iroh.computer/sendme.sh | sh",
                      copyText: "curl -fsSL https://iroh.computer/sendme.sh | sh",
                    },
                  ]}
                  copyLabel={t("cli.copyCommand")}
                  copiedLabel={t("cli.copied")}
                />
                <CliDownloadRow
                  label={t("cli.platforms.powershell")}
                  intro={t("cli.powershellIntro")}
                  commands={[
                    {
                      command: "$ iwr https://www.iroh.computer/sendme.ps1 -useb | iex",
                      copyText: "iwr https://www.iroh.computer/sendme.ps1 -useb | iex",
                    },
                  ]}
                  copyLabel={t("cli.copyCommand")}
                  copiedLabel={t("cli.copied")}
                />
                <CliNotesRow copyNote={t("cli.copyNote")} runNote={t("cli.runNote")} />
              </div>
            </div>

            <DonateCard />
          </div>
        </div>
      </section>
    </div>
  );
}
