"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsLeftRight,
  Check,
  CloudArrowUp,
  DownloadSimple,
  Globe,
  Lightning,
  Minus,
  Question,
  Scales,
  TerminalWindow,
  WifiHigh,
  X,
} from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STATUS = {
  yes: "yes",
  no: "no",
  partial: "partial",
  limited: "limited",
  lanOnly: "lanOnly",
};

function StatusIcon({ status }) {
  if (status === STATUS.yes) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20]">
        <Check size={16} weight="bold" aria-hidden="true" />
      </span>
    );
  }
  if (status === STATUS.no) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FCE8E6] text-[#B3261E]">
        <X size={16} weight="bold" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F5F4F1] text-[#73411F]">
      <Minus size={16} weight="bold" aria-hidden="true" />
    </span>
  );
}

function StatusCell({ status, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <StatusIcon status={status} />
      <span className="font-inter text-sm leading-snug text-[#4D4D4D] md:text-[15px]">
        {label}
      </span>
    </div>
  );
}

function TextCell({ label }) {
  return (
    <span className="font-inter text-sm leading-snug text-[#4D4D4D] md:text-[15px]">
      {label}
    </span>
  );
}

/** Mobile: stacked feature cards. Desktop: clean table. */
function ComparisonMatrix({ columns, rows }) {
  return (
    <>
      {/* Mobile / tablet stacked cards */}
      <div className="space-y-3 lg:hidden">
        {rows.map((row) => (
          <article
            key={row.feature}
            className="border border-[#D3D2CD] bg-white p-4 sm:p-5"
          >
            <h3 className="font-funnel-sans text-base font-semibold text-[#121212]">
              {row.feature}
            </h3>
            <ul className="mt-4 divide-y divide-[#E8E7E2]">
              {columns.map((col, colIndex) => {
                const cell = row.values[colIndex];
                return (
                  <li
                    key={`${row.feature}-${col}`}
                    className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <span
                      className={`shrink-0 font-funnel-sans text-sm ${
                        colIndex === 0
                          ? "font-semibold text-[#73411F]"
                          : "font-medium text-[#121212]"
                      }`}
                    >
                      {col}
                    </span>
                    <div className="min-w-0 text-right">
                      {cell.kind === "status" ? (
                        <div className="inline-flex items-center gap-2">
                          <span className="font-inter text-sm text-[#4D4D4D]">
                            {cell.label}
                          </span>
                          <StatusIcon status={cell.status} />
                        </div>
                      ) : (
                        <TextCell label={cell.label} />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden border border-[#D3D2CD] bg-white lg:block">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="border-b border-[#D3D2CD] bg-[#F5F4F1]">
              <th className="w-[22%] px-5 py-4 text-left font-funnel-sans text-sm font-semibold text-[#121212]">
                {/* feature column */}
              </th>
              {columns.map((col, index) => (
                <th
                  key={col}
                  className={`px-5 py-4 text-left font-funnel-sans text-sm font-semibold ${
                    index === 0 ? "text-[#73411F]" : "text-[#121212]"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.feature}
                className={
                  rowIndex < rows.length - 1 ? "border-b border-[#D3D2CD]" : ""
                }
              >
                <th
                  scope="row"
                  className="px-5 py-4 text-left align-middle font-funnel-sans text-sm font-semibold text-[#121212]"
                >
                  {row.feature}
                </th>
                {row.values.map((cell, cellIndex) => (
                  <td
                    key={`${row.feature}-${cellIndex}`}
                    className="px-5 py-4 align-middle"
                  >
                    {cell.kind === "status" ? (
                      <StatusCell status={cell.status} label={cell.label} />
                    ) : (
                      <TextCell label={cell.label} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

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
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
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

function CtaBlock({ downloadLabel, underTheHoodLabel, builtOnIrohLabel }) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12 md:gap-4">
      <Link
        href="/downloads"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#121212] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a] md:text-base"
      >
        <DownloadSimple size={18} weight="bold" aria-hidden="true" />
        {downloadLabel}
      </Link>
      <Link
        href="/under-the-hood"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#D3D2CD] bg-white px-6 text-sm font-medium text-[#121212] transition-colors hover:border-[#73411F] hover:text-[#73411F] md:text-base"
      >
        {underTheHoodLabel}
      </Link>
      <a
        href="https://www.iroh.computer"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#D3D2CD] bg-white px-6 text-sm font-medium text-[#121212] transition-colors hover:border-[#73411F] hover:text-[#73411F] md:text-base"
      >
        <Globe size={18} weight="regular" aria-hidden="true" />
        {builtOnIrohLabel}
      </a>
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

function status(statusKey, label) {
  return { kind: "status", status: statusKey, label };
}

function text(label) {
  return { kind: "text", label };
}

export function CompareHubContent() {
  const t = useTranslations("comparePage.hub");
  const s = useTranslations("comparePage.shared");

  const columns = [s("altsendme"), s("localsend"), s("blip"), s("cloud")];

  const rows = [
    {
      feature: t("worksOverInternet"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.lanOnly, t("lanOnly")),
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
      ],
    },
    {
      feature: t("gigabitSpeed"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.partial, t("partial")),
        status(STATUS.partial, t("partial")),
        status(STATUS.no, t("browserLimited")),
      ],
    },
    {
      feature: t("cliSupport"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.no, t("no")),
        status(STATUS.no, t("no")),
        status(STATUS.no, t("no")),
      ],
    },
    {
      feature: t("openSource"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.no, t("no")),
        status(STATUS.no, t("no")),
      ],
    },
    {
      feature: t("noAccount"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.partial, t("partial")),
        status(STATUS.no, t("no")),
      ],
    },
    {
      feature: t("unlimitedSize"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.limited, t("limited")),
      ],
    },
    {
      feature: t("e2eEncryption"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.partial, t("partial")),
        status(STATUS.partial, t("partial")),
      ],
    },
    {
      feature: t("folders"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
      ],
    },
    {
      feature: t("resumable"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.partial, t("partial")),
        status(STATUS.yes, t("yes")),
        status(STATUS.partial, t("partial")),
      ],
    },
    {
      feature: t("platforms"),
      values: [
        status(STATUS.yes, t("yes")),
        status(STATUS.yes, t("yes")),
        status(STATUS.partial, t("partial")),
        status(STATUS.yes, t("yes")),
      ],
    },
  ];

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
  ];

  const others = [
    { icon: CloudArrowUp, title: t("wetransfer"), note: t("wetransferNote") },
    { icon: Globe, title: t("filepizza"), note: t("filepizzaNote") },
    { icon: TerminalWindow, title: t("wormhole"), note: t("wormholeNote") },
  ];

  return (
    <PageShell>
      <DarkHero title={t("title")} lead={t("lead")} />

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading icon={Scales}>{t("tableTitle")}</SectionHeading>
          <ComparisonMatrix columns={columns} rows={rows} />

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 border border-[#D3D2CD] bg-[#FBF8F3] p-4 md:p-5">
              <Lightning
                size={22}
                weight="regular"
                className="mt-0.5 shrink-0 text-[#73411F]"
                aria-hidden="true"
              />
              <p className="font-inter text-sm leading-relaxed text-[#4D4D4D]">
                {t("filepizzaNote")}
              </p>
            </div>
            <div className="flex gap-3 border border-[#D3D2CD] bg-[#FBF8F3] p-4 md:p-5">
              <TerminalWindow
                size={22}
                weight="regular"
                className="mt-0.5 shrink-0 text-[#73411F]"
                aria-hidden="true"
              />
              <p className="font-inter text-sm leading-relaxed text-[#4D4D4D]">
                {t("wormholeNote")}
              </p>
            </div>
          </div>

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

          <div className="mt-14 md:mt-16">
            <SectionHeading icon={Globe}>{t("othersTitle")}</SectionHeading>
            <p className="mb-6 max-w-2xl font-inter text-sm text-[#4D4D4D] md:text-base">
              {t("othersLead")}
            </p>
            <div className="border border-[#D3D2CD] bg-white">
              {others.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 p-6 md:gap-5 md:p-8 ${
                      index < others.length - 1
                        ? "border-b border-[#D3D2CD]"
                        : ""
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#D3D2CD] bg-[#F5F4F1] text-[#73411F]">
                      <Icon size={18} weight="regular" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-funnel-sans text-base font-semibold text-[#121212] md:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                        {item.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14 border border-[#D3D2CD] bg-[#FBF8F3] p-6 md:mt-16 md:p-10">
            <h2 className="font-funnel-sans text-2xl font-bold text-[#121212] md:text-3xl">
              {t("ctaTitle")}
            </h2>
            <CtaBlock
              downloadLabel={s("downloadCta")}
              underTheHoodLabel={t("underTheHood")}
              builtOnIrohLabel={t("builtOnIroh")}
            />
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
      feature: tHub("resumable"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.partial, tHub("partial")),
      ],
    },
    {
      feature: tHub("platforms"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.yes, tHub("yes")),
      ],
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

          <CtaBlock
            downloadLabel={s("downloadCta")}
            underTheHoodLabel={tHub("underTheHood")}
            builtOnIrohLabel={tHub("builtOnIroh")}
          />
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
      feature: tHub("noAccount"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.partial, tHub("partial")),
      ],
    },
    {
      feature: tHub("unlimitedSize"),
      values: [
        status(STATUS.yes, tHub("yes")),
        status(STATUS.yes, tHub("yes")),
      ],
    },
    {
      feature: tHub("openSource"),
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

          <CtaBlock
            downloadLabel={s("downloadCta")}
            underTheHoodLabel={tHub("underTheHood")}
            builtOnIrohLabel={tHub("builtOnIroh")}
          />
        </div>
      </section>
    </PageShell>
  );
}
