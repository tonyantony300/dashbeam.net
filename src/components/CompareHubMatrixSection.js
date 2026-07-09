"use client";

import { useTranslations } from "next-intl";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import { buildCompareHubTable } from "@/lib/compareHubTable";

export default function CompareHubMatrixSection() {
  const t = useTranslations("comparePage.hub");
  const s = useTranslations("comparePage.shared");
  const { columns, sections } = buildCompareHubTable(t, s);

  return (
    <section
      id="compare-section"
      className="home-section scroll-mt-24 hidden lg:block"
    >
      <div className="home-section__container">
        <div className="px-5 pt-10">
          <h2 className="home-section__heading">{t("tableTitle")}</h2>
        </div>
        <ComparisonMatrix
          columns={columns}
          sections={sections}
          highlightColumnIndex={0}
        />
      </div>
    </section>
  );
}
