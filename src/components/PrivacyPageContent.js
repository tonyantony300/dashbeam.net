"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  PRIVACY_LAST_UPDATED,
  PRIVACY_SOURCE_URL,
  privacyPolicy,
} from "@/content/privacyPolicy";
import { GITHUB_REPO_URL } from "@/lib/seo";

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#73411F] underline underline-offset-[3px] hover:opacity-80"
    >
      {children}
    </a>
  );
}

function BulletList({ items, labeled = false }) {
  return (
    <ul className="mt-4 flex flex-col gap-3 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
      {items.map((item) => {
        const key = labeled ? item.label : item;
        return (
          <li key={key} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#73411F]"
              aria-hidden="true"
            />
            <span>
              {labeled ? (
                <>
                  <strong className="font-semibold text-[#121212]">
                    {item.label}
                  </strong>
                  : {item.text}
                </>
              ) : (
                item
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function NumberedList({ items }) {
  return (
    <ol className="mt-4 flex list-decimal flex-col gap-3 pl-5 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
      {items.map((item) => (
        <li key={item.label}>
          <strong className="font-semibold text-[#121212]">{item.label}</strong>
          : {item.text}
        </li>
      ))}
    </ol>
  );
}

function SectionBody({ section }) {
  return (
    <>
      {section.paragraphs?.map((p) => (
        <p
          key={p}
          className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base"
        >
          {p}
        </p>
      ))}

      {section.bullets && <BulletList items={section.bullets} labeled />}
      {section.numbered && <NumberedList items={section.numbered} />}
      {section.plainBullets && <BulletList items={section.plainBullets} />}

      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mt-8">
          <h3 className="font-funnel-sans text-xl font-bold text-[#121212] md:text-2xl">
            {sub.title}
          </h3>
          {sub.paragraphs?.map((p) => (
            <p
              key={p}
              className="mt-3 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base"
            >
              {p}
            </p>
          ))}
          {sub.bullets && <BulletList items={sub.bullets} />}
          {sub.subheadings?.map((block) => (
            <div key={block.heading} className="mt-5">
              <h4 className="font-funnel-sans text-base font-semibold text-[#121212] md:text-lg">
                {block.heading}
              </h4>
              <BulletList items={block.bullets} />
            </div>
          ))}
        </div>
      ))}

      {section.paragraphsAfter?.map((p) => (
        <p
          key={p}
          className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base"
        >
          {p}
        </p>
      ))}

      {section.id === "open-source" && (
        <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
          Source:{" "}
          <ExternalLink href={GITHUB_REPO_URL}>
            {GITHUB_REPO_URL.replace("https://", "")}
          </ExternalLink>
        </p>
      )}

      {section.id === "contact" && (
        <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
          <ExternalLink href={`${GITHUB_REPO_URL}/issues`}>
            GitHub issues
          </ExternalLink>
          {" · "}
          <Link
            href="/contact"
            className="text-[#73411F] underline underline-offset-[3px] hover:opacity-80"
          >
            Contact form
          </Link>
        </p>
      )}

      {section.id === "how-it-works" && (
        <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
          Learn more about{" "}
          <ExternalLink href="https://www.iroh.computer">Iroh</ExternalLink>.
        </p>
      )}

      {section.id === "third-party" && (
        <p className="mt-4 font-inter text-sm leading-relaxed text-[#4D4D4D] md:text-base">
          See also{" "}
          <ExternalLink href="https://www.iroh.computer">
            iroh.computer
          </ExternalLink>
          .
        </p>
      )}
    </>
  );
}

export default function PrivacyPageContent() {
  const t = useTranslations("privacyPage");

  return (
    <div className="w-full font-funnel-sans">
      <section className="relative w-full overflow-hidden bg-dark text-zinc-100">
        <div
          className="absolute inset-0 pointer-events-none isolate"
          aria-hidden="true"
        >
          <div className="absolute inset-0 dark-grain opacity-40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[800px] px-5 py-12 md:px-10 md:py-16 lg:py-20">
          <h1 className="font-funnel-sans text-[40px] font-bold leading-[1.1] tracking-tight text-accent md:text-[52px]">
            {t("title")}
          </h1>
          <p className="mt-4 font-inter text-sm text-zinc-400 md:text-base">
            {t("lastUpdated", { date: PRIVACY_LAST_UPDATED })}
          </p>
          <p className="mt-6 font-inter text-base leading-relaxed text-zinc-300 md:text-lg">
            {privacyPolicy.intro}
          </p>
        </div>
      </section>

      <section className="w-full px-5 py-12 md:px-10 md:py-16 lg:px-[60px] lg:py-20">
        <div className="mx-auto w-full max-w-[800px]">
          {privacyPolicy.sections.map((section, index) => (
            <article
              key={section.id}
              id={section.id}
              className={`scroll-mt-28 ${
                index > 0 ? "mt-12 border-t border-[#D3D2CD] pt-12 md:mt-14 md:pt-14" : ""
              }`}
            >
              <h2 className="font-funnel-sans text-2xl font-bold text-[#121212] md:text-3xl">
                {section.title}
              </h2>
              <SectionBody section={section} />
            </article>
          ))}

          <p className="mt-14 border-t border-[#D3D2CD] pt-8 font-inter text-sm text-[#4D4D4D]">
            {t("sourceNote")}{" "}
            <ExternalLink href={PRIVACY_SOURCE_URL}>
              {t("sourceLink")}
            </ExternalLink>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
