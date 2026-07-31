"use client";

import { useTranslations } from "next-intl";
import { Section, SectionOpener } from "@/components/Section";
import { tx } from "@/lib/tx";

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    { title: t("step1.title"), description: t("step1.description") },
    { title: t("step2.title"), description: t("step2.description") },
    { title: t("step3.title"), description: t("step3.description") },
  ];

  return (
    <Section id="how-it-works-section">
      <SectionOpener
        deck={tx(
          t,
          "deck",
          "One ticket, sent however you already talk to people. No account on either end.",
        )}
        eyebrow={tx(t, "eyebrow", "How it works")}
        title={t("sectionLabel")}
      />

      {/* Numbered because these genuinely happen in order. */}
      <ol className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span
              aria-hidden="true"
              className="mb-4 block font-heading text-[40px] font-medium leading-none text-brand-brown/45"
            >
              {index + 1}
            </span>
            <h3 className="mb-2 font-sans text-lg font-semibold tracking-[-0.01em] md:text-xl">
              {step.title}
            </h3>
            <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
