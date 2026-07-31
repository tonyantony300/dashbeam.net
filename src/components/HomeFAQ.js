"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section, SectionOpener } from "@/components/Section";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { tx } from "@/lib/tx";

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

export default function HomeFAQ() {
  const t = useTranslations("faq");
  const [showAll, setShowAll] = useState(false);

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
            className="text-brand-brown underline underline-offset-[3px] transition-opacity hover:opacity-80"
            href="https://www.iroh.computer/docs/faq"
            rel="noopener noreferrer"
            target="_blank"
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
            className="text-brand-brown underline underline-offset-[3px] transition-opacity hover:opacity-80"
            href={compareHrefForKey(key)}
          >
            {chunks}
          </Link>
        ),
      });
    }
    return t(`items.${key}.answer`);
  };

  const visibleKeys = showAll
    ? FAQ_KEYS
    : FAQ_KEYS.slice(0, INITIAL_VISIBLE_COUNT);
  const hasHiddenItems = FAQ_KEYS.length > INITIAL_VISIBLE_COUNT;

  return (
    <Section>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
        <aside className="flex flex-col">
          <SectionOpener
            className="mb-0 md:mb-0"
            deck={tx(
              t,
              "deck",
              "How transfers work, what they cost, and what leaves your machine.",
            )}
            eyebrow={tx(t, "eyebrow", "Questions")}
            title={tx(t, "headline", t("title"))}
          />
          <Button
            className="mt-6 self-start font-sans"
            render={<Link href="/contact" />}
            variant="outline"
          >
            {tx(t, "stillStuck", "Still stuck? Contact us")}
          </Button>
        </aside>

        {/* On desktop the first card's top border picks up the eyebrow's
            hairline: the 11px leading-none eyebrow centres its rule at 5.5px,
            so dropping the column 5px puts the border on that same line. */}
        <div className="flex flex-col gap-2.5 lg:mt-[5px]">
          <Accordion className="flex flex-col gap-2.5" multiple>
            {visibleKeys.map((key) => (
              <AccordionItem
                className="overflow-hidden rounded-card border border-border bg-card transition-colors duration-150 data-[panel-open]:border-primary/25 data-[panel-open]:bg-muted"
                key={key}
                value={key}
              >
                <AccordionTrigger className="px-5 py-5 font-sans text-base font-medium tracking-[-0.01em] focus-visible:ring-offset-0 md:text-[17px]">
                  {t(`items.${key}.question`)}
                </AccordionTrigger>
                <AccordionPanel className="max-w-[68ch] px-5 pb-5 font-sans text-[15px] leading-[1.7] text-muted-foreground md:text-base">
                  {renderAnswer(key)}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          {hasHiddenItems && (
            <Button
              className="h-auto self-start font-sans text-sm font-medium sm:h-auto"
              onClick={() => setShowAll((prev) => !prev)}
              variant="ghost"
            >
              <span>{showAll ? t("viewFewer") : t("viewMore")}</span>
              <ChevronDown
                aria-hidden="true"
                className={`transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
