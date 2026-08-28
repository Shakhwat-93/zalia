'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutPhilosophy from '@/components/about/AboutPhilosophy';
import AboutPrinciples from '@/components/about/AboutPrinciples';
import AboutVisualStory from '@/components/about/AboutVisualStory';
import AboutApproachPreview from '@/components/about/AboutApproachPreview';
import AboutTeam from '@/components/about/AboutTeam';
import AboutStatement from '@/components/about/AboutStatement';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* Reusable Navbar with active state */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 05 — Page Hero */}
      <AboutHero />

      {/* 08 — Introduction / Our Story */}
      <AboutStory />

      {/* 09 — Brand Philosophy */}
      <AboutPhilosophy />

      {/* 11 — What Makes Zalia Different */}
      <AboutPrinciples />

      {/* 13 — Architectural Story */}
      <AboutVisualStory />

      {/* 16 — Our Approach Preview */}
      <AboutApproachPreview />

      {/* 17 & 18 — Leadership Team Introduction */}
      <AboutTeam onOpenContact={handleOpenContact} />

      {/* 19 — Final Philosophy Statement */}
      <AboutStatement />

      {/* 20 — Reusable Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 21 — Reusable Footer */}
      <Footer />

      {/* Global Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
