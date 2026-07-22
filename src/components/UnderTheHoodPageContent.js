"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { DownloadSimple } from "@phosphor-icons/react";
import GithubIcon from "@/components/GithubIcon";
import { Link } from "@/i18n/routing";

const CONCEPT_IDS = [
  "blobs",
  "tickets",
  "peerDiscovery",
  "quic",
  "relays",
];

const BLOB_ITEM_KEYS = ["blob", "link", "hashSeq", "provider"];
const QUIC_POWER_KEYS = [
  "encryption",
  "multiplexing",
  "headOfLine",
  "priorities",
  "congestion",
  "datagram",
  "zeroRtt",
];

export default function UnderTheHoodPageContent() {
  const t = useTranslations("underTheHoodPage");

  return (
    <div className="w-full font-funnel-sans">
      <section className="relative w-full overflow-hidden bg-dark text-zinc-100">
        <div className="absolute inset-0 pointer-events-none isolate" aria-hidden="true">
          <div className="absolute inset-0 dark-grain opacity-40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-12 md:px-10 md:py-16  lg:px-0 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h1 className="font-funnel-sans text-[40px] font-bold leading-[1.1] tracking-tight text-accent md:text-[52px] lg:text-[60px]">
                {t("title")}
              </h1>
              <p className="mt-6 font-inter text-base leading-relaxed text-zinc-300 md:text-lg">
                {t("intro")}
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/underthehoodasset.svg"
                alt={t("heroAlt")}
                width={1600}
                height={900}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="font-funnel-sans text-2xl font-bold text-[#121212] md:text-3xl">
            {t("conceptsTitle")}
          </h2>

          <div className="mt-10 border border-[#D3D2CD] md:mt-14">
            {CONCEPT_IDS.map((id, index) => (
              <article
                key={id}
                id={`concept-${id}`}
                className={`scroll-mt-28 bg-white p-8 md:p-10 lg:p-12 ${
                  index < CONCEPT_IDS.length - 1 ? "border-b border-[#D3D2CD]" : ""
                }`}
              >
                <h3 className="font-funnel-sans text-2xl font-bold text-[#121212] md:text-3xl">
                  {index + 1}. {t(`sections.${id}.title`)}
                </h3>

                {id === "blobs" && (
                  <>
                    <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                      {t("sections.blobs.intro")}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                      {BLOB_ITEM_KEYS.map((key) => (
                        <li key={key} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#73411F]" aria-hidden="true" />
                          <span>{t(`sections.blobs.items.${key}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {id === "tickets" && (
                  <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                    {t("sections.tickets.body")}
                  </p>
                )}

                {id === "peerDiscovery" && (
                  <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                    {t("sections.peerDiscovery.body")}
                  </p>
                )}

                {id === "quic" && (
                  <>
                    <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                      {t("sections.quic.intro")}
                    </p>
                    <p className="mt-4 font-inter text-sm font-medium text-[#121212] md:text-base">
                      {t("sections.quic.powersLabel")}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                      {QUIC_POWER_KEYS.map((key) => (
                        <li key={key} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#73411F]" aria-hidden="true" />
                          <span>{t(`sections.quic.powers.${key}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {id === "relays" && (
                  <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
                    {t.rich("sections.relays.body", {
                      link: (chunks) => (
                        <a
                          href="https://docs.iroh.computer/iroh-services/relays/public"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#73411F] underline underline-offset-[3px] hover:text-[#121212]"
                        >
                          {chunks}
                        </a>
                      ),
                    })}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
            <Link
              href="/downloads"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#121212] px-6 text-sm font-medium text-white transition-colors hover:bg-[#2a2a2a] md:text-base"
            >
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              {t("downloadCta")}
            </Link>
            <a
              href="https://github.com/tonyantony300/dashbeam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#D3D2CD] bg-white px-6 text-sm font-medium text-[#121212] transition-colors hover:border-[#73411F] hover:text-[#73411F] md:text-base"
            >
              <GithubIcon size={18} className="shrink-0" />
              {t("githubCta")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
