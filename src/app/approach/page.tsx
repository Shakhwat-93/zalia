'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ApproachHero from '@/components/approach/ApproachHero';
import ApproachStages from '@/components/approach/ApproachStages';
import Property3DSection from '@/components/Property3DSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function ApproachPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Route-Based Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Approach Hero */}
      <ApproachHero />

      {/* 03 — 5-Phase Detailed Stages */}
      <ApproachStages />

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
