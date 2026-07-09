"use client";

import { useTranslations } from "next-intl";

export default function Testimonial() {
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center py-10 px-5 w-full md:px-10 lg:px-[60px]">
      <h2 className="font-swear-display text-[32px] leading-[1.2] text-center text-foreground font-normal mb-8 max-w-[600px] md:text-[40px] md:mb-10 lg:mb-12">
        {t("testimonial.title")}
      </h2>

      <div className="flex flex-col items-center gap-4 max-w-[800px]">
        <div className="flex items-center gap-2 font-federo text-xl text-center text-foreground font-medium md:text-2xl">
          <div className="flex items-center gap-1">
            {/* 4 full stars */}
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ))}
            {/* 1 half star */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="half-star-clip">
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#000"
                clipPath="url(#half-star-clip)"
              />
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="none"
                stroke="#000"
                strokeWidth="1"
              />
            </svg>
          </div>
          <strong>{t("testimonial.rating")}</strong>
        </div>
        <p className="font-fanwood-text text-lg text-center text-foreground italic md:text-xl">
          {`"${t("testimonial.quote")}"`}
        </p>
      </div>
    </section>
  );
}
