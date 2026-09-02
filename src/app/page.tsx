'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeIntro from '@/components/home/HomeIntro';
import HomePillars from '@/components/home/HomePillars';
import HomeProjects from '@/components/home/HomeProjects';
import HomeStatement from '@/components/home/HomeStatement';
import HomeCTA from '@/components/home/HomeCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* SECTION 01 — Route-Based Navbar */}
      <Navbar />

      {/* SECTION 02 — Exact Original Cinematic Hero */}
      <Hero />

      {/* SECTION 03 — Short Company Introduction */}
      <HomeIntro />

      {/* SECTION 04 — What We Do: Short Overview (3 Pillars) */}
      <HomePillars />

      {/* SECTION 05 — Selected Projects (3 Highlights) */}
      <HomeProjects />

      {/* SECTION 06 — Company / Brand Statement */}
      <HomeStatement />

      {/* SECTION 07 — Final Contact CTA */}
      <HomeCTA />

      {/* SECTION 08 — Architectural Footer with Oversized Wordmark */}
      <Footer />
    </main>
  );
}
