'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ApproachHero from '@/components/approach/ApproachHero';
import ApproachStages from '@/components/approach/ApproachStages';
import Property3DSection from '@/components/Property3DSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

interface ApproachPageClientProps {
  pageData?: any;
}

export default function ApproachPageClient({ pageData }: ApproachPageClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const content = pageData?.content || {};

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Route-Based Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Approach Hero */}
      <ApproachHero
        eyebrow={pageData?.hero_eyebrow}
        heading={pageData?.hero_heading}
        description={pageData?.hero_description}
        image={pageData?.hero_image_url}
      />

      {/* 03 — 5-Phase Detailed Stages */}
      <ApproachStages stages={content.stages} />

      {/* 04 — Interactive 3D Metamorphosis */}
      <Property3DSection />

      {/* 05 — Before → After Split Inspection */}
      <BeforeAfterSlider />

      {/* 06 — Reusable Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 07 — Architectural Footer */}
      <Footer />

      {/* Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
