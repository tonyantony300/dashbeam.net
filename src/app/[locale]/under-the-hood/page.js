"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnderTheHoodPageContent from "@/components/UnderTheHoodPageContent";

export default function UnderTheHoodPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <UnderTheHoodPageContent />
      </main>
      <Footer />
    </div>
  );
}
