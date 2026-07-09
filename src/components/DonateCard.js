"use client";

import { Heart } from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import BuyMeACoffeeIcon from "@/components/BuyMeACoffeeIcon";
import GithubIcon from "@/components/GithubIcon";
import { DONATE_LINKS } from "@/constants/downloads";

export default function DonateCard({ className = "" }) {
  const t = useTranslations("downloadsPage");

  return (
    <div id="support" className={className || "md:col-span-2"}>
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
