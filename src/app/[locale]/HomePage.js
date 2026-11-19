"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WaysToSend from "@/components/WaysToSend";
import VideoExplainer from "@/components/VideoExplainer";
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
        <VideoExplainer />
        <PartnerSection />
        <Section className="pt-0">
          <DonateCard className="w-full" />
        </Section>
        <WaysToSend />
        <AvailableAs />
        <FeaturesSection />
        <CompareHubMatrixSection />
        <CommunitySection />
        <HomeFAQ />
      </main>

      <Footer />
    </div>
  );
}
