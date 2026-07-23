"use client";

import { useTranslations } from "next-intl";

export default function AnnouncementBanner() {
  const t = useTranslations("hero");

  return (
    <div
      role="status"
      className="w-full bg-dark px-5 py-3 text-center md:px-10 lg:px-[60px]"
    >
      <p className="mx-auto max-w-[1200px] font-funnel-sans text-xs leading-tight text-white md:text-sm lg:text-left">
        <span aria-hidden="true">📣 </span>
        {t("announcement")}
      </p>
    </div>
  );
}
