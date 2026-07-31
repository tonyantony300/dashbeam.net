"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import GithubIcon from "@/components/GithubIcon";
import { Link } from "@/i18n/routing";
import PageHero from "@/components/PageHero";
import { Section, SectionOpener } from "@/components/Section";
import { Button } from "@/components/ui/button";

const CONCEPT_IDS = [
  "blobs",
  "tickets",
  "peerDiscovery",
  "quic",
  "relays",
  "pairing",
];

const BLOB_ITEM_KEYS = ["blob", "link", "hashSeq", "provider"];
const PAIRING_ITEM_KEYS = [
  "pairingCode",
  "closed",
  "proof",
  "consent",
  "presence",
  "invites",
];
const QUIC_POWER_KEYS = [
  "encryption",
  "multiplexing",
  "headOfLine",
  "priorities",
  "congestion",
  "datagram",
  "zeroRtt",
];

function ConceptList({ items }) {
  return (
    <ul className="mt-6 flex flex-col gap-3 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brown"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ConceptBody({ children }) {
  return (
    <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
      {children}
    </p>
  );
}

export default function UnderTheHoodPageContent() {
  const t = useTranslations("underTheHoodPage");

  return (
    <>
      <PageHero
        art={
          <Image
            alt={t("heroAlt")}
            className="h-auto w-full object-contain"
            height={900}
            priority
            src="/underthehoodasset.svg"
            width={1600}
          />
        }
        lead={t("intro")}
        title={t("title")}
        tone="inverse"
      />

      <Section>
        <SectionOpener title={t("conceptsTitle")} />

        {/* Numbered because the concepts build on each other: a blob is what a
            ticket points at, and a ticket is what peer discovery resolves. */}
        <ol className="flex flex-col gap-4">
          {CONCEPT_IDS.map((id, index) => (
            <li
              className="scroll-mt-28 rounded-card border border-border bg-card p-8 shadow-card md:p-10 lg:p-12"
              id={`concept-${id}`}
              key={id}
            >
              <h3 className="font-heading text-2xl font-medium tracking-[-0.01em] md:text-3xl">
                <span className="mr-3 text-brand-brown/45" aria-hidden="true">
                  {index + 1}
                </span>
                {t(`sections.${id}.title`)}
              </h3>

              {id === "blobs" && (
                <>
                  <ConceptBody>{t("sections.blobs.intro")}</ConceptBody>
                  <ConceptList
                    items={BLOB_ITEM_KEYS.map((key) =>
                      t(`sections.blobs.items.${key}`),
                    )}
                  />
                </>
              )}

              {id === "tickets" && (
                <ConceptBody>{t("sections.tickets.body")}</ConceptBody>
              )}

              {id === "peerDiscovery" && (
                <ConceptBody>{t("sections.peerDiscovery.body")}</ConceptBody>
              )}

              {id === "quic" && (
                <>
                  <ConceptBody>{t("sections.quic.intro")}</ConceptBody>
                  <p className="mt-4 font-sans text-sm font-medium text-foreground md:text-base">
                    {t("sections.quic.powersLabel")}
                  </p>
                  <ConceptList
                    items={QUIC_POWER_KEYS.map((key) =>
                      t(`sections.quic.powers.${key}`),
                    )}
                  />
                </>
              )}

              {id === "relays" && (
                <ConceptBody>
                  {t.rich("sections.relays.body", {
                    link: (chunks) => (
                      <a
                        className="font-medium text-brand-brown underline underline-offset-[3px] transition-colors hover:text-foreground"
                        href="https://docs.iroh.computer/iroh-services/relays/public"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </ConceptBody>
              )}

              {id === "pairing" && (
                <>
                  <ConceptBody>{t("sections.pairing.intro")}</ConceptBody>
                  <ConceptList
                    items={PAIRING_ITEM_KEYS.map((key) =>
                      t(`sections.pairing.items.${key}`),
                    )}
                  />
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
          <Button
            className="h-12 px-6 font-sans"
            render={<Link href="/downloads" />}
            size="xl"
          >
            {t("downloadCta")}
          </Button>

          <Button
            className="h-12 gap-2 px-6 font-sans"
            render={
              <a
                href="https://github.com/tonyantony300/dashbeam"
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            size="xl"
            variant="outline"
          >
            <GithubIcon className="shrink-0" size={18} />
            {t("githubCta")}
          </Button>
        </div>
      </Section>
    </>
  );
}
