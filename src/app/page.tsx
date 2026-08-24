'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandStatement from '@/components/BrandStatement';
import WhatWeDo from '@/components/WhatWeDo';
import Property3DSection from '@/components/Property3DSection';
import FeaturedProject from '@/components/FeaturedProject';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ApproachTimeline from '@/components/ApproachTimeline';
import AboutZalia from '@/components/AboutZalia';
import TeamPreview from '@/components/TeamPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false);

  const handleOpenContact = () => setContactOpen(true);
  const handleCloseContact = () => setContactOpen(false);

  return (
    <main className="relative min-h-screen bg-white text-charcoal-900 overflow-hidden">
      {/* 01 Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 Hero Section with 3D Architectural Pavilion */}
      <Hero onOpenContact={handleOpenContact} />

      {/* 03 Brand Statement with Editorial Line-by-Line Reveal */}
      <BrandStatement />

      {/* 04 What We Do (Acquire, Transform, Create) */}
      <WhatWeDo />

      {/* 05 3D Property Transformation Metamorphosis */}
      <Property3DSection />

      {/* 06 Featured Project (London UK Mews & Glass Pavilion) */}
      <FeaturedProject onOpenContact={handleOpenContact} />

      {/* 07 Before -> After Interactive Elevation Slider */}
      <BeforeAfterSlider />

      {/* 08 Our Approach (5-Step Disciplined Value Timeline) */}
      <ApproachTimeline />

      {/* 09 About Zalia */}
      <AboutZalia onOpenContact={handleOpenContact} />

      {/* 10 Team Preview (Zaki, Selina, Issac, Amelia) */}
      <TeamPreview />

      {/* 11 Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 12 Footer */}
      <Footer />

      {/* Private Consultation Modal */}
      <ContactModal isOpen={contactOpen} onClose={handleCloseContact} />
    </main>
  );
}