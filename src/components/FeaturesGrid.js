"use client";

import { useTranslations } from 'next-intl';

export default function FeaturesGrid() {
  const t = useTranslations();

  const features = [
    {
        key: 'unlimited',
        title: t('features.unlimited.title'),
        description: t('features.unlimited.description'),
      },

    {
        key: 'noAccounts',
        title: t('features.noAccounts.title'),
        description: t('features.noAccounts.description'),
      },
    {
      key: 'private',
      title: t('features.private.title'),
      description: t('features.private.description'),
    },
    {
      key: 'fast',
      title: t('features.fast.title'),
      description: t('features.fast.description'),
    },
    {
      key: 'crossPlatform',
      title: t('features.crossPlatform.title'),
      description: t('features.crossPlatform.description'),
    },
    {
      key: 'openSource',
      title: t('features.openSource.title'),
      description: t('features.openSource.description'),
    },
  ];

  return (
    <section id="features-section" className="flex flex-col items-center scroll-mt-24 py-10 px-5 w-full md:px-10 lg:px-[60px]">
      <h2 className="font-swear-display text-[32px] leading-[1.2] text-center text-ink font-normal mb-8 max-w-[600px] md:text-[40px] md:mb-10 lg:mb-12">
        {t('features.title')}
      </h2>

      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature) => (
          <div key={feature.key} className="flex flex-col items-center gap-2 border-2 border-ink rounded-[20px] p-6 bg-cream">
            <h3 className="font-swear-display  text-lg text-ink font-bold md:text-xl">
              {feature.title}
            </h3>
            <p className="font-fanwood-text text-base text-center text-ink md:text-lg">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

