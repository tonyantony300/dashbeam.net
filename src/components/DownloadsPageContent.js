"use client";

import { Copy, Check, Heart } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import GithubIcon from "@/components/GithubIcon";
import BuyMeACoffeeIcon from "@/components/BuyMeACoffeeIcon";
import {
  desktopPlatformGroups,
  detectPlatform,
  DONATE_LINKS,
  getAlternateDownloadsForOs,
  getDownloadHref,
  getPrimaryDownload,
  getPrimaryDownloadUrl,
  mobilePlatformGroups,
  WEB_APP_URL,
} from "@/constants/downloads";

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

function PlatformDownloadRow({ platformKey, links, t }) {
  return (
    <div className="grid grid-cols-2 gap-4 border-t border-[#D3D2CD] py-6 md:min-h-[120px] md:py-8">
      <div className="font-funnel-sans text-base font-medium text-[#121212] md:text-lg">
        {t(`platforms.${platformKey}`)}
      </div>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.key}
            href={getDownloadHref(link)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-3 font-funnel-sans text-sm text-[#4D4D4D] transition-colors hover:text-[#73411F] md:text-base"
          >
            <span className="flex items-start gap-3">
              <DownloadIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#121212] transition-colors group-hover:text-[#73411F]" />
              <span>{t(`links.${link.key}`)}</span>
            </span>
            {link.size && (
              <span className="shrink-0 text-[#737373] group-hover:text-[#73411F]">
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
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D3D2CD] text-[#121212] transition-colors hover:bg-[#E7E6DF] hover:text-[#73411F]"
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
      <code className="block min-w-0 flex-1 break-all font-mono text-xs text-[#121212] md:text-sm">
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
    <div className="grid grid-cols-2 gap-4 border-t border-[#D3D2CD] py-6 md:min-h-[120px] md:py-8">
      <div className="font-funnel-sans text-base font-medium text-[#121212] md:text-lg">
        {label}
      </div>
      <div>
        <p className="mb-3 font-funnel-sans text-sm text-[#4D4D4D] md:text-base">{intro}</p>
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
    <div className="grid grid-cols-2 gap-4 border-t border-[#D3D2CD] py-6 md:py-8">
      <div aria-hidden="true" />
      <div className="flex flex-col gap-2 font-funnel-sans text-sm text-[#4D4D4D] md:text-base">
        <p>{copyNote}</p>
        <p>{runNote}</p>
      </div>
    </div>
  );
}

function DonateCard({ t }) {
  return (
    <div id="support" className="md:col-span-2">
      <div className="overflow-hidden rounded-xl border-4 border-accent bg-[#E5DACC]">
        <div className="flex flex-col gap-8 p-8 md:flex-row md:items-center md:gap-10 md:p-10 lg:p-12">
          <div className="order-first flex shrink-0 justify-center md:order-last md:block">
            <Image
              src="/assets/sponsors/donate.webp"
              alt=""
              width={280}
              height={280}
              className="h-56 w-56 object-contain md:h-48 md:w-48 lg:h-64 lg:w-64"
              aria-hidden="true"
            />
          </div>
          <div className="order-last min-w-0 flex-1 md:order-first">
            <div className="mb-4 flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#452815]/10 px-3 py-1.5 font-funnel-sans text-xs font-medium text-[#73411F] md:text-sm">
                <Heart size={14} weight="fill" aria-hidden="true" />
                {t("donate.badge")}
              </div>
            </div>
            <h2 className="text-center font-funnel-sans text-2xl font-semibold leading-tight text-[#452815] md:text-left md:text-[28px]">
              {t("donate.title")}
            </h2>
            <p className="mt-3 max-w-2xl font-funnel-sans text-sm leading-relaxed text-[#4D4D4D] text-center md:text-left md:text-base">
              {t("donate.description")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={DONATE_LINKS.buyMeACoffee}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFDD00] px-5 py-2.5 font-funnel-sans text-sm font-semibold text-[#452815] transition-opacity hover:opacity-90 md:text-base"
              >
                <BuyMeACoffeeIcon size={20} className="shrink-0" />
                {t("donate.buyMeACoffee")}
              </a>
              <a
                href={DONATE_LINKS.githubSponsors}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#452815] px-5 py-2.5 font-funnel-sans text-sm font-semibold text-[#F5F4F0] transition-colors hover:bg-[#5a3419] md:text-base"
              >
                <GithubIcon size={18} className="shrink-0" />
                {t("donate.githubSponsors")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadsPageContent() {
  const t = useTranslations("downloadsPage");
  const tHero = useTranslations("hero");
  const [platform, setPlatform] = useState({ os: "mac", arch: "x64" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  const primary = getPrimaryDownload(platform.os, platform.arch);
  const alternateDownloads = getAlternateDownloadsForOs(platform.os, platform.arch);
  const primaryUrl = getPrimaryDownloadUrl(platform.os, platform.arch);

  const scrollToPlatforms = () => {
    document.getElementById("other-platforms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full font-funnel-sans">
      <section className="relative flex min-h-[420px] w-full items-start overflow-hidden px-5 py-14 md:min-h-[480px] md:px-10 md:py-16 lg:min-h-[540px] lg:px-[60px] lg:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[url('/communityBg.webp')] bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 hero-grain mix-blend-overlay opacity-[0.18]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <h1 className="mb-4 font-funnel-sans text-[40px] font-bold leading-[1.1] tracking-tight text-[#452815] md:text-[56px] lg:text-[64px]">
            <span className="block">{t("titleLine1")}</span>
            <span className="block">{t("titleLine2")}</span>
          </h1>

          <p className="mb-8 font-funnel-sans text-sm font-medium text-[#452815] md:text-base">
            {t("statsLine")}
          </p>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <div className="flex h-12 w-full overflow-hidden rounded-md border-4 border-accent bg-[#452815] sm:w-auto">
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-full flex-1 items-center justify-center gap-3 px-6 text-base font-medium text-[#F5F4F0] transition-colors hover:bg-[#5a3419] sm:flex-initial"
                >
                  <span>{tHero(primary.heroTranslationKey.replace(/^hero\./, ""))}</span>
                  <DownloadIcon className="h-5 w-5 shrink-0" fill="#F5F4F0" />
                </a>

                {alternateDownloads.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={isDropdownOpen}
                    aria-label={t("moreFormats")}
                    onClick={() => setIsDropdownOpen((open) => !open)}
                    className="inline-flex h-full w-11 shrink-0 items-center justify-center border-l border-[#F5F4F0]/20 text-[#F5F4F0] transition-colors hover:bg-[#5a3419]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                )}
              </div>

              {isDropdownOpen && alternateDownloads.length > 0 && (
                <div className="absolute left-0 right-0 top-full w-full z-20 mt-2 overflow-hidden rounded-md border border-[#73411F]/20 bg-[#5a3419] shadow-lg sm:right-auto sm:min-w-[240px]">
                  {alternateDownloads.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 border-b border-[#F5F4F0]/10 px-5 py-3 text-left text-sm font-medium text-[#F5F4F0] transition-colors last:border-b-0 hover:bg-[#73411F] md:text-base"
                    >
                      <span>{t(`links.${link.key}`)}</span>
                      {link.size && (
                        <span className="shrink-0 text-[#F5F4F0]/60">{link.size}</span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={scrollToPlatforms}
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border-4 border-accent bg-[#E5DACC] px-6 text-base font-medium text-[#73411F] transition-colors hover:bg-[#D9CCB5] sm:w-auto"
            >
              <span>{t("otherPlatforms")}</span>
              <DownloadIcon className="h-5 w-5 shrink-0" fill="#73411F" />
            </button>

            <a
              href={WEB_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border-4 border-accent bg-[#452815] px-6 text-base font-medium text-[#F5F4F0] transition-colors hover:bg-[#5a3419] sm:w-auto"
            >
              <span>{t("tryOnWeb")}</span>
              <DownloadIcon className="h-5 w-5 shrink-0" fill="#F5F4F0" />
            </a>
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
              <h2 className="mb-6 font-funnel-sans text-2xl font-semibold text-[#121212] md:text-[28px]">
                {t("desktop")}
              </h2>
              <div className="border-t border-[#D3D2CD]">
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
              <h2 className="mb-6 font-funnel-sans text-2xl font-semibold text-[#121212] md:text-[28px]">
                {t("mobile")}
              </h2>
              <div className="border-t border-[#D3D2CD]">
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
              <h2 className="mb-6 font-funnel-sans text-2xl font-semibold text-[#121212] md:text-[28px]">
                {t("cli.title")}
              </h2>
              <div className="border-t border-[#D3D2CD]">
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

            <DonateCard t={t} />
          </div>
        </div>
      </section>
    </div>
  );
}
