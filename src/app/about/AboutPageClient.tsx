'use client';

import React, { useState } from 'react';
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

interface AboutPageClientProps {
  pageData?: any;
}

export default function AboutPageClient({ pageData }: AboutPageClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const content = pageData?.content || {};

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* Reusable Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 05 — Page Hero */}
      <AboutHero
        eyebrow={pageData?.hero_eyebrow}
        heading={pageData?.hero_heading}
        description={pageData?.hero_description}
        image={pageData?.hero_image_url}
      />

      {/* 08 — Introduction / Our Story */}
      <AboutStory intro={content.intro} />

      {/* 09 — Brand Philosophy */}
      <AboutPhilosophy philosophy={content.philosophy} />

      {/* 11 — What Makes Zalia Different */}
      <AboutPrinciples principles={content.principles} />

      {/* 13 — Architectural Story */}
      <AboutVisualStory visualStory={content.visual_story} />

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
