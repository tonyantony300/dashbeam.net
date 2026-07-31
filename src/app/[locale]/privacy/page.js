"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyPageContent from "@/components/PrivacyPageContent";

export default function PrivacyPage() {
  return (
    <div className="theme-light flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <PrivacyPageContent />
      </main>
      <Footer />
    </div>
  );
}
