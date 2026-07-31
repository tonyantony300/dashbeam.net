"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import GithubIcon from "@/components/GithubIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { GITHUB_REPO_URL } from "@/lib/seo";

const GITHUB_URL = GITHUB_REPO_URL;
const DISCORD_URL = "https://discord.gg/xwb7z22Eve";

const AVATAR_IMAGES = [
  "/dp-one.png",
  "/dp-two.png",
  "/dp-three.jpeg",
  "/dp-four.jpeg",
  "/dp-five.png",
  "/dp-six.png",
];

function DiscordIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function CommunitySection() {
  const t = useTranslations("community");

  return (
    <section
      className="relative min-h-[520px] w-full scroll-mt-24 overflow-hidden font-sans md:min-h-[600px] lg:min-h-[720px]"
      id="community-section"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/communityBg.webp')] bg-cover bg-[center_42%] bg-no-repeat sm:bg-center"
      />
      {/* Transparent in light mode, dark veil in dark mode. */}
      <div aria-hidden="true" className="absolute inset-0 bg-scrim" />

      <div className="relative z-10 h-full px-5 py-16 md:px-10 md:py-20 lg:px-[60px] lg:py-24">
        {/* Stacked and left-aligned until lg, where the copy and the card sit
            side by side with their tops on the same line. */}
        <div className="mx-auto flex h-full min-h-[440px] w-full max-w-[1200px] flex-col justify-between gap-10 md:min-h-[520px] md:gap-12 lg:min-h-[600px] lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-[540px] lg:max-w-[560px]">
            <h2 className="text-balance font-heading text-[36px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-brown md:text-[56px] lg:text-[64px]">
              {t("title")}
            </h2>
            <p className="mt-3 font-sans text-xl font-semibold leading-snug tracking-[-0.02em] text-brand-brown md:mt-4 md:text-2xl lg:text-[32px]">
              {t("subtitle")}
            </p>
            <p className="mt-4 max-w-[480px] font-sans text-sm font-normal leading-relaxed text-brand-brown/85 md:mt-5 md:text-base md:leading-7">
              {t("description")}
            </p>
            <Button
              className="mt-6 border-transparent bg-brand-brown font-sans text-primary-foreground hover:opacity-90 md:mt-8 dark:text-neutral-900"
              render={
                <a
                  href={GITHUB_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="lg"
            >
              <GithubIcon className="shrink-0" size={18} />
              {t("githubStars")}
            </Button>
          </div>

          {/* Centred while stacked, flush to the content edge once it moves
              alongside the copy at lg. */}
          <Card className="mx-auto w-full max-w-[440px] shrink-0 rounded-card p-6 text-center shadow-card-lift md:p-10 lg:mx-0 lg:ml-auto">
            <h3 className="font-heading text-[30px] font-medium leading-tight tracking-[-0.015em] text-brand-brown md:text-[40px]">
              {t("cardTitle")}
            </h3>

            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center">
                {AVATAR_IMAGES.map((src, index) => (
                  <div
                    className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-secondary bg-card ${
                      index > 0 ? "-ml-2.5" : ""
                    }`}
                    key={src}
                    style={{ zIndex: index + 1 }}
                  >
                    <Image
                      alt=""
                      className="h-full w-full object-cover"
                      height={36}
                      src={src}
                      width={36}
                    />
                  </div>
                ))}
                <div
                  className="relative -ml-2.5 flex h-9 items-center"
                  style={{ zIndex: AVATAR_IMAGES.length + 1 }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-0 h-9 w-9 rounded-full bg-card"
                  />
                  <span className="relative z-10 whitespace-nowrap pl-2.5 text-sm font-medium tracking-tight text-brand-brown">
                    {t("othersCount")}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-7">
              {t("cardDescription")}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-7">
              {t("cardDescription2")}
            </p>

            <Button
              className="mt-10 w-full border-transparent bg-brand-brown font-sans text-primary-foreground hover:opacity-90 md:text-base dark:text-neutral-900"
              render={
                <a
                  href={DISCORD_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="xl"
            >
              <DiscordIcon className="size-[18px] shrink-0" />
              {t("discordButton")}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
