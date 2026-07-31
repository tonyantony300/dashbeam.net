"use client";

import { useTranslations } from 'next-intl';

export default function ComparisonTable() {
  const t = useTranslations();

  const comparisons = [
    {
      feature: t('comparison.accountRequired'),
      altSendme: t('comparison.no'),
      cloudSharing: t('comparison.yes'),
    },
    {
      feature: t('comparison.fileSizeLimit'),
      altSendme: t('comparison.unlimited'),
      cloudSharing: t('comparison.usuallyLimited'),
    },
    {
      feature: t('comparison.privacy'),
      altSendme: t('comparison.endToEndEncrypted'),
      cloudSharing: t('comparison.storedOnServer'),
    },
    {
      feature: t('comparison.speed'),
      altSendme: t('comparison.directConnection'),
      cloudSharing: t('comparison.uploadDownload'),
    },
    {
      feature: t('comparison.cost'),
      altSendme: t('comparison.free'),
      cloudSharing: t('comparison.oftenPaid'),
    },
  ];

  return (
    <section className="flex flex-col items-center py-10 px-5 w-full md:px-10 lg:px-[60px]">
      <h2 className="font-swear-display text-[32px] leading-[1.2] text-center text-ink font-normal mb-8 max-w-[600px] md:text-[40px] md:mb-10 lg:mb-12">
        {t('comparison.title')}
      </h2>

      <div className="w-full max-w-[1000px] overflow-x-auto">
        <div className="min-w-full border-2 border-ink rounded-[20px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-ink bg-cream">
                <th className="font-federo text-base text-left p-4 md:text-lg md:p-6"></th>
                <th className="font-swear-display text-base text-center p-4 md:text-lg md:p-6">
                  {t('comparison.altSendme')}
                </th>
                <th className="font-swear-display text-base text-center p-4 md:text-lg md:p-6">
                  {t('comparison.cloudSharing')}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <tr 
                  key={index} 
                  className={`border-b-2 border-ink ${index === comparisons.length - 1 ? '' : 'border-b-2'}`}
                >
                  <td className="font-federo text-base font-medium p-4 md:text-lg md:p-6">
                    {comparison.feature}
                  </td>
                  <td className="font-swear-display text-base text-center p-4 md:text-lg md:p-6">
                    {comparison.altSendme}
                  </td>
                  <td className="font-swear-display text-base text-center p-4 md:text-lg md:p-6">
                    {comparison.cloudSharing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

