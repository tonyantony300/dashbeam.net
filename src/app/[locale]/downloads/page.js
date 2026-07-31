"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsPageContent from "@/components/DownloadsPageContent";

export default function DownloadsPage() {
  return (
    <div className="theme-light flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <DownloadsPageContent />
      </main>
      <Footer />
    </div>
  );
}
