"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { DownloadSimple, Heart } from "@phosphor-icons/react";
import GithubIcon from "@/components/GithubIcon";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations();

  return (
    <header className="w-full py-3 px-5 md:px-10 lg:px-[60px] border-b border-[#aeadad] sticky top-0 z-[100] bg-background">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 md:gap-3 hover:opacity-70 transition-opacity"
          >
            <Image
              src="/Altsendmelogo.png"
              alt="Altsendme logo"
              width={32}
              height={32}
              priority
            />
            <span className="font-funnel-sans text-2xl text-[#452815] font-extrabold tracking-tighter lg:text-[28px]">
              {t("common.logo")}
            </span>
          </Link>
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
        <nav className="flex items-center gap-3 md:gap-6">
          <a
            href="https://github.com/sponsors/tonyantony300"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Sponsors"
            className="md:flex hidden items-center gap-1 rounded-md px-1.5 py-1.5 font-funnel-sans text-sm font-semibold text-[#452815] transition-opacity hover:opacity-70"
          >
            <Heart
              size={16}
              weight="fill"
              className="shrink-0 text-[#452815]"
              aria-hidden="true"
            />
            <span>Donate</span>
          </a>
          <a
            href="https://github.com/tonyantony300/alt-sendme"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 md:gap-2 font-funnel-sans text-sm font-semibold text-[#452815] px-1.5 py-1.5 rounded-md "
          >
            <GithubIcon size={14} className="shrink-0" />
            <span>8.5K</span>
          </a>
          <Link
            href="/downloads"
            className="flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1.5 font-funnel-sans text-sm font-semibold text-[#452815] transition-opacity hover:opacity-70"
          >
            <DownloadSimple
              size={14}
              weight="bold"
              className="shrink-0 text-[#452815]"
              aria-hidden="true"
            />
            <span>Downloads</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
