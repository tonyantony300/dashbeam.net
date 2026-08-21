"use client";

import { useTranslations } from "next-intl";
import { Section, SectionOpener } from "@/components/Section";
import { cn } from "@/lib/utils";
import { tx } from "@/lib/tx";

export default function WaysToSend() {
  const t = useTranslations("waysToSend");

  // Three peers rather than a sequence: a visitor picks one of these, they
  // don't walk through all three. Nearby leads because it asks the least of
  // whoever is receiving, and the ticket comes last carrying the line that
  // does the most work on this page — the receiver installs nothing.
  const ways = [
    {
      tag: tx(t, "way1.tag", "Recommended"),
      title: tx(t, "way1.title", "Nearby devices"),
      description: tx(
        t,
        "way1.description",
        "On the same Wi-Fi, your devices just appear. Pick one, confirm a code the first time, and it’s already sending.",
      ),
    },
    {
      title: tx(t, "way2.title", "Paired devices"),
      description: tx(
        t,
        "way2.description",
        "Pair once with a short code and they stay paired. Works over the internet, not just the same network. After that it’s one click.",
      ),
    },
    {
      title: tx(t, "way3.title", "Ticket, link or QR"),
      description: tx(
        t,
        "way3.description",
        "For anyone else: a one-time link, code, or QR. They install nothing. It opens in their browser.",
      ),
    },
  ];

  return (
    <Section id="ways-to-send-section">
      <SectionOpener
        deck={tx(
          t,
          "deck",
          "Three ways to send a file, and no account on either end.",
        )}
        eyebrow={tx(t, "eyebrow", "Ways to send")}
        title={tx(t, "sectionLabel", "Pick a device.\nOr send a link.")}
      />

      {/* Unordered on purpose. The old numbers marked a real sequence
          (drop → share → receive); these are alternatives, and numbering them
          would imply you work through them in turn. */}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
        {ways.map((way) => (
          <li key={way.title}>
            {/* The tag borrows the section eyebrow's type so it reads as a
                label on the card. Only one card carries it, so the slot stays
                reserved on wide screens to keep the three titles on one line —
                and collapses on mobile, where there's nothing to align to. */}
            <p
              aria-hidden={way.tag ? undefined : "true"}
              className={cn(
                "mb-3 font-sans text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-brand-brown",
                !way.tag && "hidden md:block md:invisible",
              )}
            >
              {way.tag || "\u00A0"}
            </p>
            <h3 className="mb-2 font-sans text-lg font-semibold tracking-[-0.01em] md:text-xl">
              {way.title}
            </h3>
            <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              {way.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
