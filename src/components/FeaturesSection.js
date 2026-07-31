"use client";

import { useTranslations } from "next-intl";
import {
  PaperPlaneTilt,
  FileArchive,
  Infinity,
  Lightning,
  LockKey,
  PlayPause,
  EyeSlash,
} from "@phosphor-icons/react";
import GithubIcon from "@/components/GithubIcon";
import { Section, SectionOpener } from "@/components/Section";
import { tx } from "@/lib/tx";

const FEATURES = [
  { key: "directSend", Icon: PaperPlaneTilt },
  { key: "transferAnything", Icon: FileArchive },
  { key: "noSizeLimits", Icon: Infinity },
  { key: "blazingFast", Icon: Lightning },
  { key: "endToEndEncrypted", Icon: LockKey },
  { key: "resumable", Icon: PlayPause },
  { key: "zeroPersonalData", Icon: EyeSlash },
  { key: "freeOpenSource", Icon: GithubIcon },
];

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <Section id="features-section" tone="inverse">
      <SectionOpener
        deck={tx(
          t,
          "deck",
          "No accounts, no quotas, no ceiling. These are the guarantees behind every transfer.",
        )}
        eyebrow={tx(t, "eyebrow", "Why DashBeam")}
        title={tx(t, "title", `${t("titleLine1")} ${t("titleLine2")}`)}
        tone="inverse"
      />

      {/* No cells and no rules: eight technical claims, not a fourth card grid. */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ key, Icon }) => (
          <div key={key}>
            <span className="mb-3.5 flex size-9 items-center justify-center rounded-frame bg-brand-tan/15 text-brand-tan">
              <Icon aria-hidden="true" size={18} weight="regular" />
            </span>
            <h3 className="mb-1.5 font-sans text-base font-semibold leading-snug tracking-[-0.01em] text-surface-inverse-foreground md:text-[17px]">
              {t(`items.${key}.title`)}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-surface-inverse-muted md:text-base">
              {t(`items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
