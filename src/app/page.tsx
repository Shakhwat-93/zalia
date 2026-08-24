'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandTrustStrip from '@/components/BrandTrustStrip';
import WhyZalia from '@/components/WhyZalia';
import WhatWeDo from '@/components/WhatWeDo';
import FeaturedProjects from '@/components/FeaturedProjects';
import Property3DSection from '@/components/Property3DSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ApproachTimeline from '@/components/ApproachTimeline';
import AboutZalia from '@/components/AboutZalia';
import TeamPreview from '@/components/TeamPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Compact Premium Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Cinematic Hero */}
      <Hero onOpenContact={handleOpenContact} />

      {/* 03 — Brand / Trust Strip */}
      <BrandTrustStrip />

      {/* 04 — Why Zalia / Who We Are */}
      <WhyZalia onOpenContact={handleOpenContact} />

      {/* 05 — What We Do */}
      <WhatWeDo />

      {/* 06 — Featured Projects (1 large + 2 supporting) */}
      <FeaturedProjects onOpenContact={handleOpenContact} />

      {/* 07 — 3D Transformation Experience */}
      <Property3DSection />

      {/* 08 — Before → After Interactive Slider */}
      <BeforeAfterSlider />

      {/* 09 — Our Approach (5 Steps) */}
      <ApproachTimeline />

      {/* 10 — About / Philosophy */}
      <AboutZalia onOpenContact={handleOpenContact} />

      {/* 11 — Leadership Team Preview */}
      <TeamPreview />

      {/* 12 — Final Direct CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 13 — Minimal White Footer */}
      <Footer />

      {/* Global Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
