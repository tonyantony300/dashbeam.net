import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/seo";
import { CompareWormholeContent } from "@/components/ComparePageContent";
import { buildWormholeFaqs } from "@/constants/compareFaqs";

function CompareWormholeJsonLd({ faqs, breadcrumbs }) {
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

export default async function CompareWormholePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "comparePage.wormhole",
  });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const faqs = buildWormholeFaqs(t);

  const breadcrumbs = [
    { name: "DashBeam", url: absoluteUrl(locale) },
    { name: tFooter("compare"), url: absoluteUrl(locale, "compare") },
    { name: t("title"), url: absoluteUrl(locale, "compare/wormhole") },
  ];

  return (
    <>
      <CompareWormholeJsonLd faqs={faqs} breadcrumbs={breadcrumbs} />
      <CompareWormholeContent />
    </>
  );
}
