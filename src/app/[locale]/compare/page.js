import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/seo";
import { CompareHubContent } from "@/components/ComparePageContent";

function CompareHubJsonLd({ breadcrumbs }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ComparePage({ params }) {
  const { locale } = await params;
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const breadcrumbs = [
    { name: "AltSendme", url: absoluteUrl(locale) },
    { name: tFooter("compare"), url: absoluteUrl(locale, "compare") },
  ];

  return (
    <>
      <CompareHubJsonLd breadcrumbs={breadcrumbs} />
      <CompareHubContent />
    </>
  );
}
