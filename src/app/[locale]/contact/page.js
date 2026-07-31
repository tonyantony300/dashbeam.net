"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

