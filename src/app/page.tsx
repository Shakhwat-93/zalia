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
      {/* 01 — Route-Based Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Cinematic Hero Gateway */}
      <Hero onOpenContact={handleOpenContact} />

      {/* 03 — Brand / Trust Statement */}
      <BrandTrustStrip />

      {/* 04 — Short Who We Are Introduction (CTA -> /about) */}
      <WhyZalia onOpenContact={handleOpenContact} />

      {/* 05 — Short What We Do Overview (CTA -> /what-we-do) */}
      <WhatWeDo />

      {/* 06 — Featured Projects (CTA -> /projects) */}
      <FeaturedProjects onOpenContact={handleOpenContact} />

      {/* 07 — 3D Transformation / Potential Section */}
      <Property3DSection />

      {/* 08 — Before → After Split Inspection */}
      <BeforeAfterSlider />

      {/* 09 — Short Our Approach Preview (CTA -> /approach) */}
      <ApproachTimeline />

      {/* 10 — Short Team Preview (CTA -> /team) */}
      <TeamPreview />

      {/* 11 — Final Direct CTA (CTA -> /contact) */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 12 — Architectural Footer */}
      <Footer />

      {/* Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
