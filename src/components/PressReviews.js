"use client";

import { useTranslations } from "next-intl";
import { PRESS_LINKS } from "@/lib/seo";

export default function PressReviews() {
  const t = useTranslations();

  const reviews = [
    {
      name: "Softpedia",
      url: PRESS_LINKS.softpediaMac,
    },
    {
      name: "Neowin",
      url: PRESS_LINKS.neowin,
    },
    {
      name: "XDA Developers",
      url: PRESS_LINKS.xda,
    },
    {
      name: "DEV Community",
      url: PRESS_LINKS.devto,
    },
  ];

  return (
    <section className="flex flex-col items-center py-10 px-5 w-full md:px-10 lg:px-[60px]">
      <h2 className="font-funnel-sans text-[28px] leading-[1.2] text-center text-[#452815] font-bold mb-6 max-w-[600px] md:text-[36px] md:mb-8">
        {t("pressReviews.title")}
      </h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-[800px]">
        {reviews.map((review) => (
          <a
            key={review.name}
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-sm text-[#452815] hover:underline underline-offset-[3px] transition-opacity hover:opacity-70 px-4 py-2 border border-[#452815]/30 rounded-md"
          >
            {review.name}
          </a>
        ))}
      </div>
    </section>
  );
}
