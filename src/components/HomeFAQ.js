"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const FAQ_KEYS = [
  "faq1",
  "faq2",
  "faq3",
  "faq4",
  "faq5",
  "faq6",
  "faq7",
  "faq8",
  "faq9",
];
const INITIAL_VISIBLE_COUNT = 5;

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 3V13M3 8H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ expanded }) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`text-section-text transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeFAQ() {
  const t = useTranslations("faq");
  const [openItems, setOpenItems] = useState(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const compareHrefForKey = (key) => {
    if (key === "faq7") return "/compare/localsend";
    if (key === "faq8") return "/compare/blip";
    return "/compare";
  };

  const renderAnswer = (key) => {
    if (key === "faq1") {
      return t.rich(`items.${key}.answer`, {
        link: (chunks) => (
          <a
            href="https://www.iroh.computer/docs/faq"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
          >
            {chunks}
          </a>
        ),
      });
    }
    if (key === "faq5" || key === "faq7" || key === "faq8") {
      return t.rich(`items.${key}.answer`, {
        compareLink: (chunks) => (
          <Link
            href={compareHrefForKey(key)}
            className="underline hover:opacity-80 transition-opacity"
          >
            {chunks}
          </Link>
        ),
      });
    }
    return t(`items.${key}.answer`);
  };

  const hasHiddenItems = FAQ_KEYS.length > INITIAL_VISIBLE_COUNT;

  return (
    <section className="home-section">
      <div className="home-section__container">
        <div className="home-faq__panel">
          <div className="home-faq__title-col">
            <h2 className="home-faq__title">{t("title")}</h2>
          </div>

          <div className="home-faq__content">
            <div className="home-faq__spacer" />

            {FAQ_KEYS.map((key, index) => {
              const questionId = `home-faq-question-${index}`;
              const answerId = `home-faq-answer-${index}`;
              const isOpen = openItems.has(questionId);
              const isHidden = !showAll && index >= INITIAL_VISIBLE_COUNT;

              return (
                <div
                  key={key}
                  className={`home-faq__item ${isHidden ? "hidden" : ""}`}
                >
                  <h3 className="m-0">
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleItem(questionId)}
                      className="home-faq__toggle"
                    >
                      <span className="home-faq__question">
                        {t(`items.${key}.question`)}
                      </span>
                      <span
                        className={`home-faq__icon ${isOpen ? "rotate-45" : ""}`}
                      >
                        <PlusIcon />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                    className="home-faq__answer"
                  >
                    {renderAnswer(key)}
                  </div>
                </div>
              );
            })}

            {hasHiddenItems && (
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="home-faq__more"
              >
                <span>{showAll ? t("viewFewer") : t("viewMore")}</span>
                <ChevronDownIcon expanded={showAll} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
