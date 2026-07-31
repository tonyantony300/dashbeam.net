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

  // The pairing track is the repeat-use path: one setup, and the ticket step
  // disappears for good. It stays subordinate to the ticket flow because the
  // ticket flow is the one that works with someone who has never opened
  // DashBeam — that's still the first thing a visitor needs to believe.
  const pairedSteps = [
    {
      title: tx(t, "paired.step1.title", "Pair once"),
      description: tx(
        t,
        "paired.step1.description",
        "Enter a short code on both devices. One time, and they stay paired.",
      ),
    },
    {
      title: tx(t, "paired.step2.title", "Then just click"),
      description: tx(
        t,
        "paired.step2.description",
        "Paired devices show up right in the app. Pick one and the file goes straight over — no ticket to copy.",
      ),
    },
  ];

  return (
    <Section id="how-it-works-section">
      <SectionOpener
        deck={tx(
          t,
          "deck",
          "Send a ticket to anyone, or pair once and send to your own devices in a click. No account on either end.",
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
            <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      {/* A second track rather than more steps: pairing replaces step 2, it
          doesn't follow step 3. The rule and the lighter scale carry that. */}
      <div className="mt-12 border-t border-border pt-10 md:mt-14">
        <h3 className="mb-8 font-sans text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-brand-brown md:mb-10">
          {tx(t, "paired.label", "Sending often? Pair once.")}
        </h3>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          {pairedSteps.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="mb-3 block font-heading text-[28px] font-medium leading-none text-brand-brown/45"
              >
                {index + 1}
              </span>
              <h4 className="mb-2 font-sans text-base font-semibold tracking-[-0.01em] md:text-lg">
                {step.title}
              </h4>
              <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
