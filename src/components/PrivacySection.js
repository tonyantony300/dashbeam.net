"use client";

import { useTranslations } from 'next-intl';

export default function PrivacySection() {
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center py-10 px-5 w-full md:px-10 lg:px-[60px]">
      <h2 className="font-swear-display text-[32px] leading-[1.2] text-center text-ink font-normal mb-8 max-w-[600px] md:text-[40px] md:mb-10 lg:mb-12">
        {t('privacy.title')}
      </h2>

      <div className="w-full max-w-[800px] flex flex-col gap-6 md:gap-8">
        <p className="font-fanwood-text text-base text-center text-ink md:text-lg">
          {t.rich('privacy.description', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}
        </p>

        <p className="font-fanwood-text text-base text-center text-ink md:text-lg">
          {t('privacy.noData')}
        </p>

        <p className="font-fanwood-text text-base text-center text-ink md:text-lg">
          {t('privacy.onlyYou')}
        </p>

        <p className="font-fanwood-text text-base text-center text-ink font-medium md:text-lg">
          {t('privacy.private')}
        </p>

        <div className="flex justify-center mt-4">
          <a 
            href="#" 
            className="font-federo text-base text-ink hover:underline underline-offset-[3px] md:text-lg"
          >
            {t('privacy.learnMore')}
          </a>
        </div>
      </div>
    </section>
  );
}

