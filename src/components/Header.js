"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Heart, List } from "@phosphor-icons/react";
import GithubIcon from "@/components/GithubIcon";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle, { THEME_OPTIONS } from "@/components/ThemeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuLinkItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { LANGUAGES } from "@/constants/languages";
import { DONATE_LINKS } from "@/constants/downloads";
import { GITHUB_REPO_URL, GITHUB_STAR_COUNT } from "@/lib/seo";

const NAV_LINKS = [
  { key: "footer.howItWorks", href: "/under-the-hood" },
  { key: "footer.compare", href: "/compare" },
  { key: "footer.downloads", href: "/downloads" },
  { key: "footer.contactUs", href: "/contact" },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* z-50 matches the portal layer used by select/menu/tooltip popups.
          Anything higher paints the header over its own dropdowns, since
          those portal into the end of <body> and only win the tie on DOM
          order. It still clears every in-page layer (max z-40). */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 px-3 py-3 backdrop-blur-md sm:px-5 md:px-10 lg:px-[60px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-1.5">
          <div className="flex min-w-0 items-center gap-2 lg:gap-6">
            <Link
              className="min-w-0 shrink transition-opacity hover:opacity-70"
              href="/"
            >
              {/* Steps down below 360px so the brand name never truncates —
                  the star pill and the CTA both hold their width. */}
              <span className="block truncate font-sans text-lg font-extrabold tracking-tighter text-primary min-[360px]:text-xl sm:text-2xl lg:text-[28px]">
                {t("common.logo")}
              </span>
            </Link>

            {/* Below lg these live in the overflow menu instead. */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  className="rounded-lg px-2.5 py-1.5 font-sans text-sm font-medium text-muted-foreground whitespace-nowrap transition-colors hover:bg-accent hover:text-foreground"
                  href={href}
                  key={key}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
            {/* Social proof stays visible at every width — it is the one piece
                of the utility cluster that earns its space on mobile. */}
            <a
              aria-label={t("header.starsAria", { count: GITHUB_STAR_COUNT })}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-border px-2 font-sans text-xs font-semibold text-foreground transition-colors hover:bg-accent sm:h-7"
              href={GITHUB_REPO_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubIcon className="shrink-0 opacity-80" size={14} />
              <span>{GITHUB_STAR_COUNT}</span>
            </a>

            {/* No donate affordance on desktop — it competes with the download
                CTA. Donating stays one tap away in the mobile menu and in the
                footer's Support group. */}
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            <ThemeToggle className="hidden lg:inline-flex" compact />

            <Button
              className="font-sans font-semibold"
              render={<Link href="/downloads" />}
              size="sm"
            >
              {t("header.getApp")}
            </Button>

            <Menu>
              <MenuTrigger
                aria-label={t("header.menu")}
                className={buttonVariants({
                  className: "lg:hidden",
                  size: "icon-sm",
                  variant: "ghost",
                })}
              >
                <List aria-hidden="true" size={18} weight="bold" />
              </MenuTrigger>
              <MenuPopup align="end" className="w-56 font-sans">
                <MenuGroup>
                  {NAV_LINKS.map(({ key, href }) => (
                    <MenuLinkItem key={key} render={<Link href={href} />}>
                      {t(key)}
                    </MenuLinkItem>
                  ))}
                </MenuGroup>

                <MenuSeparator />

                <MenuLinkItem
                  render={
                    <a
                      href={DONATE_LINKS.githubSponsors}
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  }
                >
                  <Heart aria-hidden="true" size={16} weight="fill" />
                  {t("common.donate")}
                </MenuLinkItem>
                <MenuLinkItem
                  render={
                    <a
                      href={GITHUB_REPO_URL}
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  }
                >
                  <GithubIcon size={16} />
                  {t("footer.sourceCode")}
                </MenuLinkItem>

                <MenuSeparator />

                <MenuGroup>
                  <MenuGroupLabel>{t("header.language")}</MenuGroupLabel>
                  <MenuRadioGroup
                    onValueChange={(value) => {
                      if (value && value !== locale) {
                        router.replace(pathname, { locale: value });
                      }
                    }}
                    value={locale}
                  >
                    {LANGUAGES.map((language) => (
                      <MenuRadioItem key={language.code} value={language.code}>
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <span aria-hidden="true">{language.flag}</span>
                          {language.name}
                        </span>
                      </MenuRadioItem>
                    ))}
                  </MenuRadioGroup>
                </MenuGroup>

                <MenuSeparator />

                <MenuGroup>
                  <MenuGroupLabel>{t("header.theme")}</MenuGroupLabel>
                  <MenuRadioGroup
                    onValueChange={(value) => {
                      if (value) setTheme(value);
                    }}
                    value={theme ?? "system"}
                  >
                    {THEME_OPTIONS.map(({ value, label, Icon }) => (
                      <MenuRadioItem key={value} value={value}>
                        <span className="flex items-center gap-2">
                          <Icon aria-hidden="true" className="size-4" />
                          {label}
                        </span>
                      </MenuRadioItem>
                    ))}
                  </MenuRadioGroup>
                </MenuGroup>
              </MenuPopup>
            </Menu>
          </div>
        </div>
      </header>
      <AnnouncementBanner />
    </>
  );
}
