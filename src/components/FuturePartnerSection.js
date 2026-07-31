"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const TIERS = [
  {
    id: 'gold',
    label: 'Gold',
    badgeClass: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
    gridClass: 'grid-cols-2',
    partners: [
      { type: 'text', name: 'Company 1' },
      { type: 'text', name: 'Company 2' },
    ],
  },
  {
    id: 'silver',
    label: 'Silver',
    badgeClass: 'text-zinc-200 border-zinc-400/40 bg-zinc-400/10',
    gridClass: 'grid-cols-1 sm:grid-cols-3',
    partners: [
      { type: 'text', name: 'Company 3' },
      { type: 'text', name: 'Company 4' },
      { type: 'text', name: 'Company 5' },
    ],
  },
  {
    id: 'bronze',
    label: 'Bronze',
    badgeClass: 'text-orange-300 border-orange-400/40 bg-orange-400/10',
    gridClass: 'grid-cols-2',
    partners: [
      {
        type: 'logo',
        href: 'https://www.lambdatest.com/',
        src: '/assets/sponsors/testMUlogo.svg',
        altKey: 'testmuAlt',
      },
      { type: 'text', name: 'Company 6' },
    ],
  },
];

function PartnerCell({ partner, t }) {
  const baseClass =
    'group flex h-full min-h-[72px] items-center justify-center bg-[#FBF8F2] px-4 py-4 transition-colors hover:bg-[#F6F2EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-dark md:min-h-[80px]';

  if (partner.type === 'logo') {
    const content = (
      <Image
        src={partner.src}
        alt={t(partner.altKey)}
        width={200}
        height={63}
        className="h-auto w-full max-w-[140px] object-contain transition-transform group-hover:scale-[1.02] md:max-w-[160px]"
      />
    );

    if (partner.href) {
      return (
        <a
          href={partner.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
        >
          {content}
        </a>
      );
    }

    return <div className={baseClass}>{content}</div>;
  }

  return (
    <div className={baseClass}>
      <span className="font-funnel-sans text-sm font-medium text-zinc-400 md:text-base">
        {partner.name}
      </span>
    </div>
  );
}

function TierRow({ tier, t, isLast }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[112px_1fr] ${isLast ? '' : 'border-b border-zinc-700/60'}`}
    >
      <div className="flex items-center justify-center border-b border-zinc-700/60 bg-dark px-3 py-3 md:border-b-0 md:border-r md:py-0">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-funnel-sans text-[10px] font-semibold uppercase tracking-[0.12em] md:text-xs ${tier.badgeClass}`}
        >
          {tier.label}
        </span>
      </div>

      <div className={`grid divide-x divide-zinc-700/60 ${tier.gridClass}`}>
        {tier.partners.map((partner) => (
          <PartnerCell
            key={partner.name || partner.src}
            partner={partner}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

export default function PartnerSection() {
  const t = useTranslations('partners');

  return (
    <section
      id="partners-section"
      className="relative w-full scroll-mt-24 py-16 px-5 md:px-10 md:py-20 lg:px-[60px] lg:py-24 text-zinc-100 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none isolate" aria-hidden="true">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 dark-grain" />
        <div className="absolute inset-0 dark-grain" />
        <div className="absolute inset-0 dark-grain" />
      </div>

      <div className="relative z-10 w-full max-w-[960px] mx-auto">
        <h2 className="font-funnel-sans text-[32px] leading-[1.2] text-center text-tan font-bold mb-8 md:text-[40px] md:mb-10">
          {t('title')}
        </h2>

        <div className="border border-zinc-700/60">
          {TIERS.map((tier, index) => (
            <TierRow
              key={tier.id}
              tier={tier}
              t={t}
              isLast={index === TIERS.length - 1}
            />
          ))}

          <div className="flex flex-col gap-3 border-t border-zinc-700/60 bg-tan px-6 py-6 text-ink md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
            <div className="md:max-w-[70%]">
              <h3 className="font-funnel-sans text-base font-semibold leading-snug md:text-lg">
                {t('ctaTitle')}
              </h3>
              <p className="mt-1 font-funnel-sans text-sm leading-relaxed text-ink/70">
                {t('ctaDescription')}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-fit shrink-0 items-center justify-center rounded-md bg-dark px-4 py-2 font-funnel-sans text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-tan"
            >
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
