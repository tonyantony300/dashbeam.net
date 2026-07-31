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
import { Section } from "@/components/Section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <HeroSection />
        <HowItWorks />
        <AvailableAs />
        <FeaturesSection />
        <CompareHubMatrixSection />
        <PartnerSection />
        <CommunitySection />
        <HomeFAQ />

        <Section className="pt-0">
          <DonateCard className="w-full" />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
