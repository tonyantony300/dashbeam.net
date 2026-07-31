"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  PRIVACY_LAST_UPDATED,
  PRIVACY_SOURCE_URL,
  privacyPolicy,
} from "@/content/privacyPolicy";
import { GITHUB_REPO_URL } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";

/* The legal copy is a prose column, not a full-width band. */
const PROSE = "max-w-[800px]";
const BODY = "font-sans text-sm leading-relaxed text-muted-foreground md:text-base";
const LINK =
  "text-brand-brown underline underline-offset-[3px] transition-opacity hover:opacity-80";

function ExternalLink({ href, children }) {
  return (
    <a className={LINK} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

function BulletList({ items, labeled = false }) {
  return (
    <ul className={`mt-4 flex flex-col gap-3 ${BODY}`}>
      {items.map((item) => {
        const key = labeled ? item.label : item;
        return (
          <li key={key} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brown"
              aria-hidden="true"
            />
            <span>
              {labeled ? (
                <>
                  <strong className="font-semibold text-foreground">
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
    <ol className={`mt-4 flex list-decimal flex-col gap-3 pl-5 ${BODY}`}>
      {items.map((item) => (
        <li key={item.label}>
          <strong className="font-semibold text-foreground">
            {item.label}
          </strong>
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
        <p key={p} className={`mt-4 ${BODY}`}>
          {p}
        </p>
      ))}

      {section.bullets && <BulletList items={section.bullets} labeled />}
      {section.numbered && <NumberedList items={section.numbered} />}
      {section.plainBullets && <BulletList items={section.plainBullets} />}

      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mt-8">
          <h3 className="font-heading text-xl font-medium tracking-[-0.01em] text-foreground md:text-2xl">
            {sub.title}
          </h3>
          {sub.paragraphs?.map((p) => (
            <p key={p} className={`mt-3 ${BODY}`}>
              {p}
            </p>
          ))}
          {sub.bullets && <BulletList items={sub.bullets} />}
          {sub.subheadings?.map((block) => (
            <div key={block.heading} className="mt-5">
              <h4 className="font-sans text-base font-semibold text-foreground md:text-lg">
                {block.heading}
              </h4>
              <BulletList items={block.bullets} />
            </div>
          ))}
        </div>
      ))}

      {section.paragraphsAfter?.map((p) => (
        <p key={p} className={`mt-4 ${BODY}`}>
          {p}
        </p>
      ))}

      {section.id === "open-source" && (
        <p className={`mt-4 ${BODY}`}>
          Source:{" "}
          <ExternalLink href={GITHUB_REPO_URL}>
            {GITHUB_REPO_URL.replace("https://", "")}
          </ExternalLink>
        </p>
      )}

      {section.id === "contact" && (
        <p className={`mt-4 ${BODY}`}>
          <ExternalLink href={`${GITHUB_REPO_URL}/issues`}>
            GitHub issues
          </ExternalLink>
          {" · "}
          <Link className={LINK} href="/contact">
            Contact form
          </Link>
        </p>
      )}

      {section.id === "how-it-works" && (
        <p className={`mt-4 ${BODY}`}>
          Learn more about{" "}
          <ExternalLink href="https://www.iroh.computer">Iroh</ExternalLink>.
        </p>
      )}

      {section.id === "third-party" && (
        <p className={`mt-4 ${BODY}`}>
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
    <>
      <PageHero
        containerClassName={PROSE}
        lead={privacyPolicy.intro}
        meta={t("lastUpdated", { date: PRIVACY_LAST_UPDATED })}
        title={t("title")}
        tone="inverse"
      />

      <Section containerClassName={PROSE}>
        {privacyPolicy.sections.map((section, index) => (
          <article
            key={section.id}
            id={section.id}
            className={`scroll-mt-28 ${
              index > 0
                ? "mt-12 border-t border-border pt-12 md:mt-14 md:pt-14"
                : ""
            }`}
          >
            <h2 className="font-heading text-2xl font-medium tracking-[-0.015em] text-foreground md:text-3xl">
              {section.title}
            </h2>
            <SectionBody section={section} />
          </article>
        ))}

        <p className="mt-14 border-t border-border pt-8 font-sans text-sm text-muted-foreground">
          {t("sourceNote")}{" "}
          <ExternalLink href={PRIVACY_SOURCE_URL}>
            {t("sourceLink")}
          </ExternalLink>
          .
        </p>
      </Section>
    </>
  );
}
