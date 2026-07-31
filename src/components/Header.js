"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { DownloadSimple, Heart } from "@phosphor-icons/react";
import GithubIcon from "@/components/GithubIcon";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  const t = useTranslations();

  return (
    <>
      {/* z-50 matches the portal layer used by select/menu/tooltip popups.
          Anything higher paints the header over its own dropdowns, since
          those portal into the end of <body> and only win the tie on DOM
          order. It still clears every in-page layer (max z-40). */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 px-5 py-3 backdrop-blur-md md:px-10 lg:px-[60px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              className="flex items-center gap-1 transition-opacity hover:opacity-70 md:gap-3"
              href="/"
            >
              <Image
                alt="DashBeam logo"
                height={32}
                priority
                src="/Altsendmelogo.png"
                width={32}
              />
              <span className="truncate font-sans text-xl font-extrabold tracking-tighter text-primary sm:text-2xl lg:text-[28px]">
                {t("common.logo")}
              </span>
            </Link>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          </div>

          <nav className="flex items-center gap-1 md:gap-2">
            <Button
              className="hidden font-sans font-semibold text-primary md:inline-flex"
              render={
                <a
                  aria-label="GitHub Sponsors"
                  href="https://github.com/sponsors/tonyantony300"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="sm"
              variant="ghost"
            >
              <Heart aria-hidden="true" size={16} weight="fill" />
              <span>Donate</span>
            </Button>

            {/* Hidden on the narrowest screens so the logo and theme selector
                both fit without truncating. */}
            <Button
              className="hidden font-sans font-semibold text-primary sm:inline-flex"
              render={
                <a
                  href="https://github.com/tonyantony300/dashbeam"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="sm"
              variant="ghost"
            >
              <GithubIcon className="shrink-0" size={14} />
              <span>8.7K</span>
            </Button>

            <Button
              className="font-sans font-semibold text-primary"
              render={<Link href="/downloads" />}
              size="sm"
              variant="ghost"
            >
              <DownloadSimple aria-hidden="true" size={14} weight="bold" />
              <span className="hidden sm:inline">Downloads</span>
            </Button>

            <ThemeToggle className="ml-1 shrink-0" />
          </nav>
        </div>
      </header>
      <AnnouncementBanner />
    </>
  );
}
