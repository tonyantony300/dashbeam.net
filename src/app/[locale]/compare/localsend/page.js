import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/seo";
import { CompareLocalSendContent } from "@/components/ComparePageContent";
import { buildLocalsendFaqs } from "@/constants/compareFaqs";

function CompareLocalSendJsonLd({ faqs, breadcrumbs }) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function CompareLocalSendPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "comparePage.localsend",
  });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const faqs = buildLocalsendFaqs(t);

  const breadcrumbs = [
    { name: "DashBeam", url: absoluteUrl(locale) },
    { name: tFooter("compare"), url: absoluteUrl(locale, "compare") },
    { name: t("title"), url: absoluteUrl(locale, "compare/localsend") },
  ];

  return (
    <>
      <CompareLocalSendJsonLd faqs={faqs} breadcrumbs={breadcrumbs} />
      <CompareLocalSendContent />
    </>
  );
}
