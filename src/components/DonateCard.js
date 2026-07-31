"use client";

import { Heart } from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import BuyMeACoffeeIcon from "@/components/BuyMeACoffeeIcon";
import GithubIcon from "@/components/GithubIcon";
import { DONATE_LINKS } from "@/constants/downloads";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DonateCard({ className = "" }) {
  const t = useTranslations("downloadsPage");

  return (
    <div className={className || "md:col-span-2"} id="support">
      <div className="overflow-hidden rounded-card border border-border bg-secondary/40 shadow-card">
        <div className="flex flex-col gap-8 p-8 md:flex-row md:items-center md:gap-10 md:p-10 lg:p-12">
          <div className="order-first flex shrink-0 justify-center md:order-last md:block">
            {/* Monochrome line art on white, so it inverts cleanly rather than
                glaring as a white block on the dark ground. */}
            <Image
              alt=""
              aria-hidden="true"
              className="h-56 w-56 object-contain md:h-48 md:w-48 lg:h-64 lg:w-64 dark:invert"
              height={280}
              src="/assets/sponsors/donate.webp"
              width={280}
            />
          </div>
          <div className="order-last min-w-0 flex-1 md:order-first">
            <div className="mb-4 flex justify-center md:justify-start">
              <Badge className="gap-2 rounded-full border-transparent bg-brand-brown/10 px-3 py-1.5 font-sans text-xs font-medium text-brand-brown md:text-sm">
                <Heart aria-hidden="true" size={14} weight="fill" />
                {t("donate.badge")}
              </Badge>
            </div>
            <h2 className="text-center font-heading text-[28px] font-medium leading-tight tracking-[-0.015em] text-brand-brown md:text-left md:text-[34px]">
              {t("donate.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-center font-sans text-sm leading-relaxed text-muted-foreground md:text-left md:text-base">
              {t("donate.description")}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                className="border-transparent bg-[#FFDD00] font-sans font-semibold text-[#452815] hover:bg-[#FFDD00]/90 md:text-base"
                render={
                  <a
                    href={DONATE_LINKS.buyMeACoffee}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
                size="lg"
              >
                <BuyMeACoffeeIcon className="shrink-0" size={20} />
                {t("donate.buyMeACoffee")}
              </Button>
              <Button
                className="border-transparent bg-brand-brown font-sans font-semibold text-primary-foreground hover:opacity-90 md:text-base dark:text-neutral-900"
                render={
                  <a
                    href={DONATE_LINKS.githubSponsors}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
                size="lg"
              >
                <GithubIcon className="shrink-0" size={18} />
                {t("donate.githubSponsors")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
