import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPageContent from "@/components/PrivacyPageContent";
import { PRIVACY_LAST_UPDATED, privacyPolicy } from "@/content/privacyPolicy";
import { privacyPolicyUk } from "@/content/privacyPolicyUk";

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const isUkrainian = locale === "uk";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <PrivacyPageContent
          policy={isUkrainian ? privacyPolicyUk : privacyPolicy}
          lastUpdated={new Intl.DateTimeFormat(isUkrainian ? "uk" : "en-US", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(PRIVACY_LAST_UPDATED))}
          language={isUkrainian ? "uk" : "en"}
        />
      </main>
      <Footer />
    </div>
  );
}
