"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section, SectionOpener } from "@/components/Section";
import { tx } from "@/lib/tx";

export default function PartnerSection() {
  const t = useTranslations("partners");

  return (
    <Section id="partners-section">
      <SectionOpener
        deck={tx(
          t,
          "deck",
          "Tools and teams helping keep DashBeam free and open source.",
        )}
        eyebrow={tx(t, "eyebrow", "Partners")}
        title={t("title")}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <a
          className="group flex min-h-0 items-center justify-center rounded-card border border-border bg-card px-6 py-14 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-8 md:py-16"
          href="https://www.lambdatest.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt={t("testmuAlt")}
            className="h-auto w-full max-w-50 object-contain transition-transform duration-200 group-hover:scale-[1.02] md:max-w-60 dark:brightness-0 dark:invert"
            height={63}
            src="/assets/sponsors/testMUlogo.svg"
            width={200}
          />
        </a>

        <div className="flex min-h-0 flex-col rounded-card bg-brand-tan px-6 py-12 text-neutral-900 shadow-card md:px-8 md:py-14">
          <h3 className="font-sans text-lg font-semibold leading-snug tracking-[-0.01em] md:text-xl">
            {t("ctaTitle")}
          </h3>
          <p className="mt-2.5 max-w-[46ch] font-sans text-sm leading-relaxed text-neutral-900/70 md:text-base">
            {t("ctaDescription")}
          </p>
          <div className="mt-auto w-fit self-start pt-6 md:pt-8">
            <Button
              className="border-transparent bg-neutral-950 font-sans text-white hover:bg-neutral-800 focus-visible:ring-offset-brand-tan"
              render={
                <a
                  href="https://github.com/sponsors/tonyantony300"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
            >
              {t("ctaButton")}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
