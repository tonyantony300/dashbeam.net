"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import AvailableAs from "@/components/AvailableAs";
import HomeFAQ from "@/components/HomeFAQ";
import FeaturesSection from "@/components/FeaturesSection";
import CompareHubMatrixSection from "@/components/CompareHubMatrixSection";
import PartnerSection from "@/components/PartnerSection";
import CommunitySection from "@/components/CommunitySection";
import DonateCard from "@/components/DonateCard";

export default function HomePage() {
  return (
    <div className="absolute inset-x-0 mx-auto min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <HeroSection />
        <HowItWorks />
        <AvailableAs />
        <FeaturesSection />
        <CompareHubMatrixSection />
        <PartnerSection />
        <CommunitySection />
        <HomeFAQ />
      </main>

      <section className="home-section scroll-mt-24">
        <div className="home-section__container">
          <DonateCard className="w-full" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
