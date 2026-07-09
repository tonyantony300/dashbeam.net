"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import {
  detectPlatform,
  getDownloadOptions,
  getPrimaryDownloadOption,
  WEB_APP_URL,
} from '@/constants/downloads';

export default function HeroSection() {
  const t = useTranslations();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [platform, setPlatform] = useState({ os: "mac", arch: "x64" });

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.download-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const downloadOptions = getDownloadOptions(t);
  const primaryDownload = getPrimaryDownloadOption(t, platform.os, platform.arch);

  const heroFeatures = [
    {
      title: "Free, for files & folders of any size",
      description:
        "AltSendme works by connecting sender and receiver directly, so there's no need to upload to a server, which means your transfers are truly private.",
    },
    {
      title: "Fast",
      description: "AltSendme can saturate a 4Gbps connection.",
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

  return (
    <section className="relative w-full min-h-[559px] md:min-h-[60vh] lg:min-h-[70vh] xl:min-h-[80vh] flex flex-col items-center lg:items-start justify-center overflow-hidden py-10 lg:pt-20 px-5 md:px-10 lg:px-[60px]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[url('/heroImage.jpg')] bg-[length:auto_100%] lg:bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 hero-grain mix-blend-overlay opacity-[0.22]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-start gap-8 lg:gap-12">
        <div className="flex flex-col items-center lg:items-start">
          <a
            href="https://github.com/tonyantony300/alt-sendme"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center lg:justify-start gap-2 font-funnel-sans text-sm text-black px-4 py-1.5 rounded-full mb-6 border-[0.5px] border-white/40 bg-white/20 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.5)] hover:bg-white/30 transition-colors"
          >
            {t('common.openSourceAgpl')}
          </a>

          <h1 className="font-funnel-sans text-[41px] leading-[1.2] text-center lg:text-left text-black font-bold mb-6 max-w-[600px] md:text-[56px] md:mb-6 md:max-w-[800px] lg:mb-8 lg:max-w-[1000px] tracking-tight">
            {t('hero.title')}
          </h1>

          <p className="font-funnel-sans text-base text-center lg:text-left text-black mb-6 max-w-[600px] md:text-lg md:mb-8">
            {t('hero.description')}
          </p>

          <div className="flex flex-col items-center lg:items-start gap-3 mb-6 md:mb-8">
            <p className="font-funnel-sans text-sm text-center lg:text-left text-black italic max-w-[600px] md:text-base">
              {t('hero.airdropQuote')}
            </p>
          </div>

          <div className="w-full max-w-[460px] lg:max-w-[660px] flex flex-col items-center lg:items-start">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full mb-8">
              <div className="relative w-full sm:w-auto flex-shrink-0">
                <span className="pointer-events-none absolute -right-1 -top-3 z-10 rounded-full bg-yc-red px-2 py-0.5 font-funnel-sans text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_10px_rgba(220,38,38,0.5)] ring-2 ring-white">
                  {t('hero.newBadge')}
                </span>
                <a
                  href={WEB_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all h-16 px-6 text-base md:text-lg lg:text-xl bg-white text-dark hover:opacity-90 font-funnel-sans"
                >
                  {t('hero.sendNow')}
                </a>
              </div>

            <div className="relative w-full rounded-[20px] lg:w-auto download-container flex-1 sm:flex-initial">
              <div className="flex group hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] rounded-xl transition-all bg-dark w-full lg:w-auto ">
                <a
                  href={primaryDownload.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all h-16 px-4 text-base md:px-6 md:text-lg lg:text-xl flex-1 rounded-r-none border-0 shadow-none group-hover:shadow-none transform-none group-hover:transform-none bg-dark hover:opacity-90 text-white"
                >
                  <Image
                    src={primaryDownload.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="flex-shrink-0 brightness-0 invert"
                  />
                  <span className="font-funnel-sans font-medium">{primaryDownload.label}</span>
                </a>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all h-16 px-3 rounded-l-none border-0 flex-shrink-0 shadow-none group-hover:shadow-none transform-none group-hover:transform-none bg-dark hover:opacity-90 text-white border-l-[0.5px] border-white"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m7 15 5 5 5-5"></path>
                    <path d="m7 9 5-5 5 5"></path>
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 mt-2 w-full lg:w-[400px] overflow-hidden rounded-xl border border-section-border bg-dark shadow-lg z-40">
                  {downloadOptions.map((option) => (
                    <a
                      key={option.id}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between border-b border-white/10 px-5 py-3 text-left text-sm font-medium text-white transition-colors last:border-b-0 hover:bg-white/10 md:text-base whitespace-nowrap"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Image
                          src={option.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="flex-shrink-0 brightness-0 invert"
                        />
                        <span className="font-funnel-sans truncate">{option.label}</span>
                      </div>
                      <span className="ml-2 flex-shrink-0 font-funnel-sans text-sm text-white/60">{option.size}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full md:max-w-[500px] lg:max-w-[600px] rounded-[20px] border border-foreground/20 bg-white/30 backdrop-blur-md p-1.5 shadow-[2px_2px_12px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)]">

          <div className="rounded-xl overflow-hidden">
            <Image
              src="/altsendme-demo.gif"
              alt="AltSendMe app demo"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
        </div>

        <div className="w-full mt-12 lg:mt-16 border border-foreground/15 bg-background/40 backdrop-blur-sm">
          <div className="p-6 md:p-8 border-b border-foreground/15">
            <h2 className="font-federo text-sm md:text-base font-bold uppercase tracking-wide text-foreground mb-2">
              {heroFeatures[0].title}
            </h2>
            <p className="font-funnel-sans text-sm md:text-base text-foreground leading-relaxed">
              {heroFeatures[0].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {heroFeatures.slice(1).map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 md:p-8 ${
                  index < heroFeatures.length - 2
                    ? "border-b border-foreground/15 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <h3 className="font-funnel-sans text-sm md:text-base font-bold uppercase tracking-wide text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-funnel-sans text-sm md:text-base text-foreground leading-relaxed">
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
