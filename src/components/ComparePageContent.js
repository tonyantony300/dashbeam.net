"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Section, SectionOpener } from "@/components/Section";
import ComparisonMatrix, {
  STATUS,
  status,
  text,
} from "@/components/ComparisonMatrix";
import { buildCompareHubTable } from "@/lib/compareHubTable";
import {
  buildLocalsendFaqs,
  buildWormholeFaqs,
  buildPairdropFaqs,
} from "@/constants/compareFaqs";
import { tx } from "@/lib/tx";

function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex w-full flex-1 flex-col font-sans">{children}</main>
      <Footer />
    </div>
  );
}

function WhenList({ title, items, highlighted }) {
  return (
    <div
      className={`rounded-card border p-6 shadow-card md:p-8 ${
        highlighted
          ? "border-brand-brown/40 bg-secondary/40"
          : "border-border bg-card"
      }`}
    >
      <h3
        className={`font-sans text-lg font-semibold tracking-[-0.01em] md:text-xl ${
          highlighted ? "text-brand-brown" : "text-foreground"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                highlighted ? "bg-brand-brown" : "bg-foreground"
              }`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqList({ items }) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-card shadow-card">
      {items.map((item, index) => (
        <div
          key={item.q}
          className={`p-6 md:p-8 ${
            index < items.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <h3 className="font-sans text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
            {item.q}
          </h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * The four one-on-one pages, as an index rather than a card grid.
 *
 * Rows, because the section above them is a table and these are the same
 * comparison read one rival at a time — a grid of boxes broke that continuity
 * and made four near-identical cards out of four different arguments. The
 * headline is the rival's name alone: "DashBeam vs" four times over was
 * repetition doing no work, and the band already says what the comparison is.
 */
function DeepDiveIndex({ items }) {
  return (
    <ul className="border-t border-border">
      {items.map((item) => (
        <li className="border-b border-border" key={item.href}>
          <Link
            aria-label={item.title}
            className="group grid grid-cols-1 gap-y-2 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:grid-cols-[minmax(0,17rem)_1fr_auto] md:items-baseline md:gap-x-10 md:py-7"
            href={item.href}
          >
            {/* The name track is sized for the longest rival ("Magic
                Wormhole") so the descriptions all start on one line. */}
            <h3 className="font-heading text-[26px] font-medium leading-[1.05] tracking-[-0.015em] text-foreground transition-colors group-hover:text-brand-brown md:text-[30px]">
              <span className="mr-2 font-sans text-base font-normal text-muted-foreground">
                vs
              </span>
              {item.name}
            </h3>
            <p className="max-w-[60ch] font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              {item.desc}
            </p>
            <ArrowRight
              aria-hidden="true"
              className="hidden self-center text-muted-foreground transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-brand-brown md:block"
              size={18}
              weight="bold"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CompareHubContent() {
  const t = useTranslations("comparePage.hub");
  const s = useTranslations("comparePage.shared");
  const { columns, sections } = buildCompareHubTable(t, s);

  const deepDives = [
    {
      href: "/compare/localsend",
      name: s("localsend"),
      title: t("localsendCardTitle"),
      desc: t("localsendCardDesc"),
    },
    {
      href: "/compare/blip",
      name: s("blip"),
      title: t("blipCardTitle"),
      desc: t("blipCardDesc"),
    },
    {
      href: "/compare/wormhole",
      name: s("wormhole"),
      title: t("wormholeCardTitle"),
      desc: t("wormholeCardDesc"),
    },
    {
      href: "/compare/pairdrop",
      name: s("pairdrop"),
      title: t("pairdropCardTitle"),
      desc: t("pairdropCardDesc"),
    },
  ];

  return (
    <PageShell>
      <PageHero title={t("title")} lead={t("lead")} tone="inverse" />

      <Section>
        <SectionOpener
          deck={tx(t, "tableDeck", "")}
          eyebrow={tx(t, "eyebrow", "Comparison")}
          title={t("tableTitle")}
        />
        <ComparisonMatrix
          columns={columns}
          highlightColumnIndex={0}
          sections={sections}
        />
      </Section>

      <Section>
        <SectionOpener
          deck={tx(
            t,
            "deepDivesDeck",
            "Every row above, argued out one rival at a time: where each tool wins, and where it stops.",
          )}
          eyebrow={tx(t, "deepDivesEyebrow", "Head to head")}
          title={t("deepDives")}
        />
        <DeepDiveIndex items={deepDives} />
      </Section>
    </PageShell>
  );
}

export function CompareLocalSendContent() {
  const t = useTranslations("comparePage.localsend");
  const s = useTranslations("comparePage.shared");
  const tHub = useTranslations("comparePage.hub");

  const columns = [s("altsendme"), s("localsend")];
  const rows = [
    {
      feature: s("network"),
      values: [text(s("internet")), text(s("lan"))],
    },
    {
      feature: s("speed"),
      values: [text(s("speedGigabit")), text(s("speedLan"))],
    },
    {
      feature: s("cli"),
      values: [text(s("cliYes")), text(s("cliNo"))],
    },
    {
      feature: s("license"),
      values: [text(s("agpl")), text(s("foss"))],
    },
    {
      feature: s("cost"),
      values: [text(s("free")), text(s("free"))],
    },
    {
      feature: s("encryption"),
      values: [text(s("quic")), text(s("httpsLocal"))],
    },
    {
      feature: s("discovery"),
      values: [text(s("tickets")), text(s("nearby"))],
    },
    {
      feature: s("stack"),
      values: [text(s("iroh")), text("Local HTTPS")],
    },
    {
      feature: tHub("table.resumable"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.partial, tHub("partial")),
      ],
    },
    {
      feature: tHub("table.platforms"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.yes, tHub("yes")),
      ],
    },
  ];

  const faqs = buildLocalsendFaqs(t);

  return (
    <PageShell>
      <PageHero
        eyebrow={s("localsend")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
        tone="inverse"
      />

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowTable", "Side by side")}
          title={t("tableTitle")}
        />
        <ComparisonMatrix columns={columns} rows={rows} />
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowWhen", "Which one")}
          title={t("whenTitle")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <WhenList
            items={[
              t("whenLocalsend1"),
              t("whenLocalsend2"),
              t("whenLocalsend3"),
            ]}
            title={t("whenLocalsendTitle")}
          />
          <WhenList
            highlighted
            items={[
              t("whenAltsendme1"),
              t("whenAltsendme2"),
              t("whenAltsendme3"),
            ]}
            title={t("whenAltsendmeTitle")}
          />
        </div>
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowFaq", "Questions")}
          title={t("faqTitle")}
        />
        <FaqList items={faqs} />
      </Section>
    </PageShell>
  );
}

export function CompareBlipContent() {
  const t = useTranslations("comparePage.blip");
  const s = useTranslations("comparePage.shared");
  const tHub = useTranslations("comparePage.hub");

  const columns = [s("altsendme"), s("blip")];
  const rows = [
    {
      feature: s("license"),
      values: [text(s("agpl")), text(s("proprietary"))],
    },
    {
      feature: s("cost"),
      values: [text(s("free")), text(s("freemium"))],
    },
    {
      feature: s("network"),
      values: [text(s("internet")), text(s("internet"))],
    },
    {
      feature: s("speed"),
      values: [text(s("speedGigabit")), text(s("speedTypical"))],
    },
    {
      feature: s("cli"),
      values: [text(s("cliYes")), text(s("cliNo"))],
    },
    {
      feature: s("encryption"),
      values: [text(s("quic")), status(STATUS.partial, tHub("partial"))],
    },
    {
      feature: s("discovery"),
      values: [text(s("tickets")), status(STATUS.partial, tHub("partial"))],
    },
    {
      feature: tHub("table.noAccount"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.partial, tHub("partial")),
      ],
    },
    {
      feature: tHub("table.unlimitedSize"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.yes, tHub("yes")),
      ],
    },
    {
      feature: tHub("table.openSource"),
      values: [status(STATUS.yes, tHub("yes")), status(STATUS.no, tHub("no"))],
    },
  ];

  const faqs = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow={s("blip")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
        tone="inverse"
      />

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowTable", "Side by side")}
          title={t("tableTitle")}
        />
        <ComparisonMatrix columns={columns} rows={rows} />
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowWhen", "Which one")}
          title={t("whenTitle")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <WhenList
            items={[t("whenBlip1"), t("whenBlip2")]}
            title={t("whenBlipTitle")}
          />
          <WhenList
            highlighted
            items={[
              t("whenAltsendme1"),
              t("whenAltsendme2"),
              t("whenAltsendme3"),
            ]}
            title={t("whenAltsendmeTitle")}
          />
        </div>
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowFaq", "Questions")}
          title={t("faqTitle")}
        />
        <FaqList items={faqs} />
      </Section>
    </PageShell>
  );
}

export function CompareWormholeContent() {
  const t = useTranslations("comparePage.wormhole");
  const s = useTranslations("comparePage.shared");
  const tHub = useTranslations("comparePage.hub");

  const columns = [s("altsendme"), s("wormhole")];
  const rows = [
    {
      feature: s("network"),
      values: [text(s("internet")), text(s("internet"))],
    },
    {
      feature: s("speed"),
      values: [text(s("speedGigabit")), text(s("speedDirect"))],
    },
    {
      feature: s("cli"),
      values: [text(s("cliYes")), text(s("cliYes"))],
    },
    {
      feature: s("license"),
      values: [text(s("agpl")), text(s("foss"))],
    },
    {
      feature: s("cost"),
      values: [text(s("free")), text(s("free"))],
    },
    {
      feature: s("encryption"),
      values: [text(s("quic")), text(s("encryptedTcp"))],
    },
    {
      feature: s("discovery"),
      values: [text(s("tickets")), text(s("shortCodes"))],
    },
    {
      feature: s("stack"),
      values: [text(s("iroh")), text(tHub("table.protocolWormhole"))],
    },
    {
      feature: tHub("table.resumable"),
      values: [status(STATUS.yes, tHub("yes")), status(STATUS.no, tHub("no"))],
    },
    {
      feature: tHub("table.platforms"),
      values: [
        text(tHub("table.platformsAltsendme")),
        text(tHub("table.platformsWormhole")),
      ],
    },
  ];

  const faqs = buildWormholeFaqs(t);

  return (
    <PageShell>
      <PageHero
        eyebrow={s("wormhole")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
        tone="inverse"
      />

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowTable", "Side by side")}
          title={t("tableTitle")}
        />
        <ComparisonMatrix columns={columns} rows={rows} />
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowWhen", "Which one")}
          title={t("whenTitle")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <WhenList
            items={[t("whenWormhole1"), t("whenWormhole2"), t("whenWormhole3")]}
            title={t("whenWormholeTitle")}
          />
          <WhenList
            highlighted
            items={[
              t("whenAltsendme1"),
              t("whenAltsendme2"),
              t("whenAltsendme3"),
            ]}
            title={t("whenAltsendmeTitle")}
          />
        </div>
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowFaq", "Questions")}
          title={t("faqTitle")}
        />
        <FaqList items={faqs} />
      </Section>
    </PageShell>
  );
}

export function ComparePairdropContent() {
  const t = useTranslations("comparePage.pairdrop");
  const s = useTranslations("comparePage.shared");
  const tHub = useTranslations("comparePage.hub");

  const columns = [s("altsendme"), s("pairdrop")];
  const rows = [
    {
      feature: s("network"),
      values: [text(s("internet")), text(s("internet"))],
    },
    {
      feature: s("speed"),
      values: [text(s("speedGigabit")), text(s("speedBrowser"))],
    },
    {
      feature: s("cli"),
      values: [text(s("cliYes")), status(STATUS.partial, tHub("partial"))],
    },
    {
      feature: s("license"),
      values: [text(s("agpl")), text(s("foss"))],
    },
    {
      feature: s("cost"),
      values: [text(s("free")), text(s("free"))],
    },
    {
      feature: s("encryption"),
      values: [text(s("quic")), text(s("webrtcStack"))],
    },
    {
      feature: s("discovery"),
      values: [text(s("tickets")), text(s("pagePairing"))],
    },
    {
      feature: s("stack"),
      values: [text(s("iroh")), text(tHub("table.protocolPairdrop"))],
    },
    {
      feature: tHub("table.resumable"),
      values: [status(STATUS.yes, tHub("yes")), status(STATUS.no, tHub("no"))],
    },
    {
      feature: tHub("table.unlimitedSize"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.partial, tHub("table.sizePairdrop")),
      ],
    },
    {
      feature: tHub("table.platforms"),
      values: [
        text(tHub("table.platformsAltsendme")),
        text(tHub("table.platformsPairdrop")),
      ],
    },
  ];

  const faqs = buildPairdropFaqs(t);

  return (
    <PageShell>
      <PageHero
        eyebrow={s("pairdrop")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
        tone="inverse"
      />

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowTable", "Side by side")}
          title={t("tableTitle")}
        />
        <ComparisonMatrix columns={columns} rows={rows} />
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowWhen", "Which one")}
          title={t("whenTitle")}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <WhenList
            items={[t("whenPairdrop1"), t("whenPairdrop2"), t("whenPairdrop3")]}
            title={t("whenPairdropTitle")}
          />
          <WhenList
            highlighted
            items={[
              t("whenAltsendme1"),
              t("whenAltsendme2"),
              t("whenAltsendme3"),
            ]}
            title={t("whenAltsendmeTitle")}
          />
        </div>
      </Section>

      <Section>
        <SectionOpener
          eyebrow={tx(s, "eyebrowFaq", "Questions")}
          title={t("faqTitle")}
        />
        <FaqList items={faqs} />
      </Section>
    </PageShell>
  );
}
