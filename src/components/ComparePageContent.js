"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsLeftRight,
  Browsers,
  Question,
  Scales,
  Terminal,
  WifiHigh,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex w-full flex-1 flex-col font-funnel-sans">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function DarkHero({ eyebrow, title, lead, backHref, backLabel }) {
  return (
    <section className="relative w-full overflow-hidden bg-dark text-zinc-100">
      <div
        className="absolute inset-0 pointer-events-none isolate"
        aria-hidden="true"
      >
        <div className="absolute inset-0 dark-grain opacity-40" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-12 md:px-10 md:py-16 lg:px-0 lg:py-20">
        {backHref && (
          <Link
            href={backHref}
            className="mb-6 inline-flex items-center gap-2 font-inter text-sm text-zinc-400 transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} weight="bold" aria-hidden="true" />
            {backLabel}
          </Link>
        )}
        {eyebrow && (
          <p className="mb-3 font-inter text-xs font-medium uppercase tracking-[0.14em] text-accent/80 md:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl font-funnel-sans text-[36px] font-bold leading-[1.1] tracking-tight text-accent md:text-[48px] lg:text-[56px]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-zinc-300 md:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}

function SectionHeading({ icon: Icon, children }) {
  return (
    <div className="mb-6 flex items-center gap-3 md:mb-8">
      {Icon && (
        <span className="inline-flex h-10 w-10 items-center justify-center border border-[#D3D2CD] bg-[#F5F4F1] text-[#73411F]">
          <Icon size={20} weight="regular" aria-hidden="true" />
        </span>
      )}
      <h2 className="font-funnel-sans text-2xl font-bold text-[#121212] md:text-3xl">
        {children}
      </h2>
    </div>
  );
}

function WhenList({ title, items, highlighted }) {
  return (
    <div
      className={`border p-6 md:p-8 ${
        highlighted
          ? "border-[#73411F]/40 bg-[#FBF8F3]"
          : "border-[#D3D2CD] bg-white"
      }`}
    >
      <h3
        className={`font-funnel-sans text-lg font-bold md:text-xl ${
          highlighted ? "text-[#73411F]" : "text-[#121212]"
        }`}
      >
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                highlighted ? "bg-[#73411F]" : "bg-[#121212]"
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
    <div className="border border-[#D3D2CD] bg-white">
      {items.map((item, index) => (
        <div
          key={item.q}
          className={`p-6 md:p-8 ${
            index < items.length - 1 ? "border-b border-[#D3D2CD]" : ""
          }`}
        >
          <h3 className="font-funnel-sans text-base font-semibold text-[#121212] md:text-lg">
            {item.q}
          </h3>
          <p className="mt-3 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CompareHubContent() {
  const t = useTranslations("comparePage.hub");
  const s = useTranslations("comparePage.shared");
  const { columns, sections } = buildCompareHubTable(t, s);

  const deepDives = [
    {
      href: "/compare/localsend",
      icon: WifiHigh,
      title: t("localsendCardTitle"),
      desc: t("localsendCardDesc"),
    },
    {
      href: "/compare/blip",
      icon: ArrowsLeftRight,
      title: t("blipCardTitle"),
      desc: t("blipCardDesc"),
    },
    {
      href: "/compare/wormhole",
      icon: Terminal,
      title: t("wormholeCardTitle"),
      desc: t("wormholeCardDesc"),
    },
    {
      href: "/compare/pairdrop",
      icon: Browsers,
      title: t("pairdropCardTitle"),
      desc: t("pairdropCardDesc"),
    },
  ];

  return (
    <PageShell>
      <DarkHero title={t("title")} lead={t("lead")} />

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading icon={Scales}>{t("tableTitle")}</SectionHeading>
          <ComparisonMatrix
            columns={columns}
            sections={sections}
            highlightColumnIndex={0}
          />

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={ArrowsLeftRight}>
              {t("deepDives")}
            </SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              {deepDives.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col border border-[#D3D2CD] bg-white p-6 transition-colors hover:border-[#73411F] md:p-8"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center border border-[#D3D2CD] bg-[#F5F4F1] text-[#73411F] transition-colors group-hover:border-[#73411F]">
                        <Icon size={20} weight="regular" aria-hidden="true" />
                      </span>
                      <ArrowRight
                        size={18}
                        weight="bold"
                        className="text-[#121212]/40 transition-colors group-hover:text-[#73411F]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-funnel-sans text-xl font-bold text-[#121212]">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                      {item.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
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
      <DarkHero
        eyebrow={s("localsend")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
      />

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading icon={Scales}>{t("tableTitle")}</SectionHeading>
          <ComparisonMatrix columns={columns} rows={rows} />

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={WifiHigh}>{t("whenTitle")}</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <WhenList
                title={t("whenLocalsendTitle")}
                items={[
                  t("whenLocalsend1"),
                  t("whenLocalsend2"),
                  t("whenLocalsend3"),
                ]}
              />
              <WhenList
                highlighted
                title={t("whenAltsendmeTitle")}
                items={[
                  t("whenAltsendme1"),
                  t("whenAltsendme2"),
                  t("whenAltsendme3"),
                ]}
              />
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Question}>{t("faqTitle")}</SectionHeading>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
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
      <DarkHero
        eyebrow={s("blip")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
      />

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading icon={Scales}>{t("tableTitle")}</SectionHeading>
          <ComparisonMatrix columns={columns} rows={rows} />

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={ArrowsLeftRight}>
              {t("whenTitle")}
            </SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <WhenList
                title={t("whenBlipTitle")}
                items={[t("whenBlip1"), t("whenBlip2")]}
              />
              <WhenList
                highlighted
                title={t("whenAltsendmeTitle")}
                items={[
                  t("whenAltsendme1"),
                  t("whenAltsendme2"),
                  t("whenAltsendme3"),
                ]}
              />
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Question}>{t("faqTitle")}</SectionHeading>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
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
      <DarkHero
        eyebrow={s("wormhole")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
      />

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading icon={Scales}>{t("tableTitle")}</SectionHeading>
          <ComparisonMatrix columns={columns} rows={rows} />

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Terminal}>{t("whenTitle")}</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <WhenList
                title={t("whenWormholeTitle")}
                items={[
                  t("whenWormhole1"),
                  t("whenWormhole2"),
                  t("whenWormhole3"),
                ]}
              />
              <WhenList
                highlighted
                title={t("whenAltsendmeTitle")}
                items={[
                  t("whenAltsendme1"),
                  t("whenAltsendme2"),
                  t("whenAltsendme3"),
                ]}
              />
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Question}>{t("faqTitle")}</SectionHeading>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
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
      <DarkHero
        eyebrow={s("pairdrop")}
        title={t("title")}
        lead={t("lead")}
        backHref="/compare"
        backLabel={s("backToCompare")}
      />

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading icon={Scales}>{t("tableTitle")}</SectionHeading>
          <ComparisonMatrix columns={columns} rows={rows} />

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Browsers}>{t("whenTitle")}</SectionHeading>
            <div className="grid gap-4 md:grid-cols-2">
              <WhenList
                title={t("whenPairdropTitle")}
                items={[
                  t("whenPairdrop1"),
                  t("whenPairdrop2"),
                  t("whenPairdrop3"),
                ]}
              />
              <WhenList
                highlighted
                title={t("whenAltsendmeTitle")}
                items={[
                  t("whenAltsendme1"),
                  t("whenAltsendme2"),
                  t("whenAltsendme3"),
                ]}
              />
            </div>
          </div>

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Question}>{t("faqTitle")}</SectionHeading>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
