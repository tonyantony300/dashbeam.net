"use client";

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Link } from '@/i18n/routing';
import { WEB_APP_URL } from '@/constants/downloads';

const PLATFORMS = [
  {
    key: 'desktop',
    image: '/desktop.webp',
    imageAlt: 'Desktop applications',
    width: 1010,
    height: 645,
    href: '/downloads#download-desktop',
  },
  {
    key: 'android',
    image: '/mobile.webp',
    imageAlt: 'Android application',
    width: 601,
    height: 448,
    href: '/downloads#download-android',
  },
  {
    key: 'cli',
    image: '/cli.webp',
    imageAlt: 'Command line interface',
    width: 1214,
    height: 739,
    href: '/downloads#download-desktop',
  },
  {
    key: 'web',
    image: '/browser.webp',
    imageAlt: 'Web application',
    width: 1010,
    height: 687,
    href: WEB_APP_URL,
    external: true,
  },
];

const cardBorderClasses = (index, total) =>
  [
    index < total - 1 ? 'border-b border-foreground/15' : '',
    index % 2 === 0 && index < total - 1 ? 'md:border-r' : '',
    index < 2 ? 'md:border-b lg:border-b-0' : 'md:border-b-0',
    index < total - 1 ? 'lg:border-r lg:border-b-0' : '',
  ].join(' ');

export default function AvailableAs() {
  const t = useTranslations('availableAs');

  return (
    <section className="home-section home-section--extra-bottom">
      <div className="home-section__container">
        <div className="px-5 pt-10">
          <h2 className="home-section__heading">
            <span className="block">{t('titleLine1')}</span>
            <span className="block">{t('titleLine2')}</span>
          </h2>
        </div>

        <div className="border border-foreground/15">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {PLATFORMS.map((platform, index) => {
              const isExternal = platform.external;
              const cardClasses = `home-card ${cardBorderClasses(index, PLATFORMS.length)}`;
              const cardContent = (
                <>
                  <div className="mb-5 w-full overflow-hidden">
                    <img
                      src={platform.image}
                      alt={platform.imageAlt}
                      width={platform.width}
                      height={platform.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                  </div>
                  <h3 className="font-funnel-sans text-lg text-foreground font-semibold mb-2 md:text-xl">
                    {t(`${platform.key}.title`)}
                  </h3>
                  <p className="font-funnel-sans text-sm text-foreground/55 font-normal leading-relaxed mb-6 flex-grow md:text-base md:mb-8">
                    {t(`${platform.key}.description`)}
                  </p>
                  <span className="home-card__link-text inline-flex items-center gap-1">
                    {isExternal ? t('openWeb') : t('download')}
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </>
              );

              if (isExternal) {
                return (
                  <a
                    key={platform.key}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2`}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={platform.key}
                  href={platform.href}
                  className={`${cardClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2`}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
