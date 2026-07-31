"use client";

import { useTranslations } from "next-intl";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import { buildCompareHubTable } from "@/lib/compareHubTable";
import { Section, SectionOpener } from "@/components/Section";
import { tx } from "@/lib/tx";

export default function CompareHubMatrixSection() {
  const t = useTranslations("comparePage.hub");
  const s = useTranslations("comparePage.shared");
  const { columns, sections } = buildCompareHubTable(t, s);

  return (
    <Section className="hidden lg:block" id="compare-section">
      <SectionOpener
        deck={tx(
          t,
          "tableDeck",
          "How DashBeam lines up against the other ways to move a file.",
        )}
        eyebrow={tx(t, "eyebrow", "Comparison")}
        title={t("tableTitle")}
      />
      <ComparisonMatrix
        columns={columns}
        highlightColumnIndex={0}
        sections={sections}
      />
    </Section>
  );
}
