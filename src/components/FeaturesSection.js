"use client";

import { useTranslations } from "next-intl";
import {
  Bug,
  Broadcast,
  ClockCounterClockwise,
  Feather,
  FileArchive,
  Globe,
  Key,
  Lightning,
  PlayPause,
} from "@phosphor-icons/react";
import { Section, SectionOpener } from "@/components/Section";
import { tx } from "@/lib/tx";

const ITEM_FALLBACKS = {
  anyFileAnySize: {
    title: "Any File, Any Size.",
    description:
      "Send files or whole folders of any size, verified end-to-end with BLAKE3 integrity checks.",
  },
  multiGigabit: {
    title: "Multi-Gigabit Speeds.",
    description:
      "Saturates fast local and remote connections for lightning-quick transfers.",
  },
  resumableMultiPeer: {
    title: "Resumable & Multi-Peer.",
    description:
      "Interrupted transfers pick up where they left off, and one send can reach many peers at once.",
  },
  previewHistory: {
    title: "Preview & History.",
    description:
      "See what's inside before you download, and keep a local log of every transfer.",
  },
  dialByKey: {
    title: "Dial by Key.",
    description: "Connect using a device's identity, not its IP address.",
  },
  roaming: {
    title: "Roaming.",
    description:
      "Switch Wi-Fi, cellular, or networks mid-transfer without dropping the connection.",
  },
  selfHostRelays: {
    title: "Self-Host Relays.",
    description:
      "Run your own relay for unthrottled remote transfers (Settings → Infra).",
  },
  advancedDebugMode: {
    title: "Advanced Debug Mode.",
    description:
      "Opt-in diagnostics show exactly what's happening under the hood.",
  },
  lightweightFree: {
    title: "Lightweight & Free.",
    description: "Small installs, open source, and no limits.",
  },
};

const GROUP_FALLBACKS = {
  performance: "Performance",
  connectivity: "Connectivity",
  other: "Other",
};

// Grouped rather than one flat grid: reads as a story instead of a wall of
// claims. Nearby / Paired devices / Code-Link-QR are deliberately left out -
// Ways to Send already carries those in depth.
const FEATURE_GROUPS = [
  {
    key: "performance",
    items: [
      { key: "anyFileAnySize", Icon: FileArchive },
      { key: "multiGigabit", Icon: Lightning },
      { key: "resumableMultiPeer", Icon: PlayPause },
    ],
  },
  {
    key: "connectivity",
    items: [
      { key: "dialByKey", Icon: Key },
      { key: "roaming", Icon: Globe },
      { key: "selfHostRelays", Icon: Broadcast },
    ],
  },
  {
    key: "other",
    items: [
      { key: "previewHistory", Icon: ClockCounterClockwise },
      { key: "advancedDebugMode", Icon: Bug },
      { key: "lightweightFree", Icon: Feather },
    ],
  },
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

      <div className="space-y-12 md:space-y-14">
        {FEATURE_GROUPS.map((group) => (
          <div key={group.key}>
            <p className="mb-6 font-sans text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-brand-tan">
              {tx(
                t,
                `groups.${group.key}.label`,
                GROUP_FALLBACKS[group.key],
              )}
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
              {group.items.map(({ key, Icon }) => (
                <div key={key}>
                  <span className="mb-3 flex size-8 items-center justify-center rounded-frame bg-brand-tan/15 text-brand-tan">
                    <Icon aria-hidden="true" size={16} weight="regular" />
                  </span>
                  <h3 className="mb-1 font-sans text-base font-semibold leading-snug tracking-[-0.01em] text-surface-inverse-foreground md:text-[17px]">
                    {tx(
                      t,
                      `items.${key}.title`,
                      ITEM_FALLBACKS[key].title,
                    )}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-surface-inverse-muted md:text-base">
                    {tx(
                      t,
                      `items.${key}.description`,
                      ITEM_FALLBACKS[key].description,
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
