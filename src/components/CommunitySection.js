"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import GithubIcon from '@/components/GithubIcon';

import { GITHUB_REPO_URL } from "@/lib/seo";

const GITHUB_URL = GITHUB_REPO_URL;
const DISCORD_URL = 'https://discord.gg/xwb7z22Eve';

const AVATAR_IMAGES = [
  '/dp-one.png',
  '/dp-two.png',
  '/dp-three.jpeg',
  '/dp-four.jpeg',
  '/dp-five.png',
  '/dp-six.png',
];

function DiscordIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function CommunitySection() {
  const t = useTranslations('community');

  return (
    <section
      id="community-section"
      className="relative w-full scroll-mt-24 overflow-hidden font-funnel-sans min-h-[520px] md:min-h-[600px] lg:min-h-[720px]"
    >
      <div
        className="absolute inset-0 bg-[url('/communityBg.webp')] bg-cover bg-no-repeat bg-[center_42%] sm:bg-center"
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20 h-full">
        <div className="mx-auto flex w-full max-w-[1200px] h-full min-h-[440px] flex-col justify-between gap-10 md:min-h-[520px] md:gap-12 lg:min-h-[600px] lg:gap-16">
          <div className="max-w-[540px] lg:max-w-[560px] lg:pt-2">
            <h2 className="text-[32px] font-bold leading-[1.15] tracking-tight text-[#452815] md:text-[56px] lg:text-[64px]">
              {t('title')}
            </h2>
            <p className="mt-3 text-xl font-bold leading-snug tracking-tighter text-[#452815] md:mt-4 md:text-2xl lg:text-4xl">
              {t('subtitle')}
            </p>
            <p className="mt-4 max-w-[480px] text-sm font-normal leading-relaxed text-[#452815]/85 md:mt-5 md:text-base md:leading-7">
              {t('description')}
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-md bg-[#452815] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452815] focus-visible:ring-offset-2 md:mt-8"
            >
              <GithubIcon size={18} className="shrink-0" />
              {t('githubStars')}
            </a>
          </div>

          <div className="w-full max-w-[440px] lg:ml-auto lg:mr-0 lg:mb-2">
            <div className="rounded-lg bg-white p-6 text-center shadow-[0_8px_32px_rgba(69,40,21,0.08)] md:p-10">
              <h3 className="text-[28px] font-bold leading-snug tracking-tight text-[#452815] md:text-[40px] md:tracking-[-0.06em]">
                {t('cardTitle')}
              </h3>

              <div className="mt-8 flex items-center justify-center">
                <div className="flex items-center">
                  {AVATAR_IMAGES.map((src, index) => (
                    <div
                      key={src}
                      className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-[#E5D3C0] bg-white ${index > 0 ? '-ml-2.5' : ''}`}
                      style={{ zIndex: index + 1 }}
                    >
                      <Image
                        src={src}
                        alt=""
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  <div
                    className="relative -ml-2.5 flex h-9 items-center"
                    style={{ zIndex: AVATAR_IMAGES.length + 1 }}
                  >
                    <div
                      className="absolute left-0 h-9 w-9 rounded-full bg-[#fff]"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 whitespace-nowrap pl-2.5 text-sm font-medium tracking-tight text-[#452815]">
                      {t('othersCount')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-sm leading-relaxed text-[#452815]/85 md:text-[15px] md:leading-7">
                {t('cardDescription')}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-[#452815]/85 md:text-[15px] md:leading-7">
                {t('cardDescription2')}
              </p>

              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex w-full items-center justify-center gap-2.5 rounded-md bg-[#452815] px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452815] focus-visible:ring-offset-2 md:text-base"
              >
                <DiscordIcon className="h-[18px] w-[18px] shrink-0" />
                {t('discordButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
