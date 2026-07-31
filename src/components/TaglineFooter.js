"use client";

import { useTranslations } from "next-intl";

export default function TaglineFooter() {
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center py-10 px-5 w-full md:px-10 lg:px-[60px]">
      <div className="w-full max-w-[800px]">
        <p className="font-fanwood-text text-lg text-center text-ink italic md:text-xl">
          {`"${t("taglineFooter.quote")}"`}
        </p>
      </div>
    </section>
  );
}
