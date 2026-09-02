'use client';

import Navbar from '@/components/Navbar';
import ContactHero from '@/components/contact/ContactHero';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Route-Based Navbar */}
      <Navbar />

      {/* 02 — Contact Hero */}
      <ContactHero />

      {/* 03 — Channels & Dedicated Interactive Form */}
      <ContactSection />

      {/* 04 — Architectural Footer */}
      <Footer />
    </main>
  );
}
