import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/seo";
import { CompareBlipContent } from "@/components/ComparePageContent";

function CompareBlipJsonLd({ faqs, breadcrumbs }) {
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

export default async function CompareBlipPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comparePage.blip" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const faqs = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
  ];

  const breadcrumbs = [
    { name: "AltSendme", url: absoluteUrl(locale) },
    { name: tFooter("compare"), url: absoluteUrl(locale, "compare") },
    { name: t("title"), url: absoluteUrl(locale, "compare/blip") },
  ];

  return (
    <>
      <CompareBlipJsonLd faqs={faqs} breadcrumbs={breadcrumbs} />
      <CompareBlipContent />
    </>
  );
}
