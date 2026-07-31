"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronsUpDown } from "lucide-react";
import {
  detectPlatform,
  getDownloadOptions,
  getPrimaryDownloadOption,
  WEB_APP_URL,
} from "@/constants/downloads";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuTrigger,
} from "@/components/ui/menu";

const HERO_FEATURES = [
  {
    title: "Free, for files & folders of any size",
    description:
      "DashBeam works by connecting sender and receiver directly, so there's no need to upload to a server, which means your transfers are truly private.",
  },
  {
    title: "Fast",
    description: "DashBeam can saturate a 4Gbps connection.",
  },
  {
    title: "Resumable fetching",
    description: "Interrupted downloads pick up where they left off.",
  },
  {
    title: "Integrity checks",
    description:
      "Data is automatically verified for correctness on both send and receive.",
  },
];

export default function HeroSection() {
  const t = useTranslations();
  const [platform, setPlatform] = useState({ os: "mac", arch: "x64" });

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const downloadOptions = getDownloadOptions(t);
  const primaryDownload = getPrimaryDownloadOption(
    t,
    platform.os,
    platform.arch,
  );

  return (
    <section className="relative flex min-h-[559px] w-full flex-col items-center justify-center overflow-hidden px-5 py-16 md:min-h-[60vh] md:px-10 md:py-20 lg:items-start lg:px-[60px] lg:py-24 xl:min-h-[80vh]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[url('/heroImage.jpg')] bg-[length:auto_100%] bg-center bg-no-repeat lg:bg-cover" />
        <div className="absolute inset-0 hero-grain opacity-[0.22] mix-blend-overlay" />
        {/* Transparent in light mode; darkens the photograph in dark mode so
            the copy layered on top keeps its contrast. */}
        <div className="absolute inset-0 bg-scrim" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col">
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:justify-start lg:gap-12">
          <div className="flex flex-col items-center lg:items-start">
            <a
              className="mb-6 flex items-center justify-center gap-2 rounded-full border-[0.5px] border-white/40 bg-white/20 px-4 py-1.5 font-sans text-sm text-black shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md transition-colors hover:bg-white/30 lg:justify-start dark:border-white/25 dark:bg-white/10 dark:text-white"
              href="https://github.com/tonyantony300/dashbeam"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("common.openSourceAgpl")}
            </a>

            <h1 className="mb-6 max-w-[620px] text-balance text-center font-heading text-[42px] font-medium leading-[1.04] tracking-[-0.02em] text-black md:max-w-[760px] md:text-[62px] lg:mb-8 lg:text-left dark:text-white">
              {t("hero.title")}
            </h1>

            <p className="mb-6 max-w-[600px] text-center font-sans text-base text-black md:mb-8 md:text-lg lg:text-left dark:text-zinc-200">
              {t("hero.description")}
            </p>

            <p className="mb-6 max-w-[600px] text-center font-sans text-sm italic text-black md:mb-8 md:text-base lg:text-left dark:text-zinc-300">
              {t("hero.airdropQuote")}
            </p>

            <div className="flex w-full max-w-[460px] flex-col items-center lg:max-w-[660px] lg:items-start">
              <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full shrink-0 sm:w-auto">
                  <Badge className="pointer-events-none absolute -right-1 -top-3 z-10 rounded-full border-transparent bg-yc-red px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_10px_rgba(220,38,38,0.5)] ring-2 ring-white">
                    {t("hero.newBadge")}
                  </Badge>
                  <Button
                    className="h-16 sm:h-16 w-full border-transparent bg-white font-sans text-base text-neutral-950 hover:bg-white/90 sm:w-auto md:text-lg lg:text-xl"
                    render={
                      <a
                        href={WEB_APP_URL}
                        rel="noopener noreferrer"
                        target="_blank"
                      />
                    }
                  >
                    {t("hero.sendNow")}
                  </Button>
                </div>

                <div className="flex w-full flex-1 rounded-lg bg-neutral-950 sm:flex-initial lg:w-auto">
                  <Button
                    className="h-16 sm:h-16 flex-1 rounded-e-none border-transparent bg-neutral-950 px-4 font-sans text-base text-white hover:bg-neutral-800 md:px-6 md:text-lg lg:text-xl"
                    render={
                      <a
                        href={primaryDownload.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      />
                    }
                  >
                    <Image
                      alt=""
                      className="shrink-0 brightness-0 invert"
                      height={20}
                      src={primaryDownload.icon}
                      width={20}
                    />
                    <span className="font-medium">{primaryDownload.label}</span>
                  </Button>

                  <Menu>
                    <MenuTrigger
                      render={
                        <Button
                          aria-label={t("hero.sendNow")}
                          className="h-16 sm:h-16 shrink-0 rounded-s-none border-transparent border-s-white/40 bg-neutral-950 px-3 text-white hover:bg-neutral-800"
                        />
                      }
                    >
                      <ChevronsUpDown
                        aria-hidden="true"
                        className="size-5 opacity-100"
                      />
                    </MenuTrigger>
                    <MenuPopup
                      align="end"
                      className="min-w-[280px] lg:min-w-[400px]"
                    >
                      {downloadOptions.map((option) => (
                        <MenuLinkItem
                          className="justify-between py-2.5"
                          href={option.url}
                          key={option.id}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <Image
                              alt=""
                              className="shrink-0 dark:brightness-0 dark:invert"
                              height={20}
                              src={option.icon}
                              width={20}
                            />
                            <span className="truncate font-sans">
                              {option.label}
                            </span>
                          </span>
                          <span className="ms-2 shrink-0 font-sans text-sm text-muted-foreground">
                            {option.size}
                          </span>
                        </MenuLinkItem>
                      ))}
                    </MenuPopup>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full rounded-[18px] border border-black/20 bg-white/30 p-1.5 shadow-[2px_2px_12px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md md:max-w-[575px] lg:max-w-[690px] dark:border-white/15 dark:bg-white/10">
            <div className="overflow-hidden rounded-card">
              <Image
                alt="DashBeam app demo"
                className="h-auto w-full object-contain"
                height={800}
                priority
                src="/altsendme-demo.gif"
                unoptimized
                width={1200}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 w-full overflow-hidden rounded-card border border-black/15 bg-white/40 backdrop-blur-sm lg:mt-16 dark:border-white/15 dark:bg-black/40">
          <div className="border-b border-black/15 p-6 md:p-8 dark:border-white/15">
            <h2 className="mb-2 font-sans text-sm font-bold uppercase tracking-wide text-black md:text-base dark:text-white">
              {HERO_FEATURES[0].title}
            </h2>
            <p className="font-sans text-sm leading-relaxed text-black md:text-base dark:text-zinc-200">
              {HERO_FEATURES[0].description}
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-black/15 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-white/15">
            {HERO_FEATURES.slice(1).map((feature) => (
              <div className="p-6 md:p-8" key={feature.title}>
                <h3 className="mb-2 font-sans text-sm font-bold uppercase tracking-wide text-black md:text-base dark:text-white">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-black md:text-base dark:text-zinc-200">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
