'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import WhatWeDoHero from '@/components/what-we-do/WhatWeDoHero';
import CoreCapabilities from '@/components/what-we-do/CoreCapabilities';
import AcquireSection from '@/components/what-we-do/AcquireSection';
import TransformSection from '@/components/what-we-do/TransformSection';
import CreateSection from '@/components/what-we-do/CreateSection';
import TransformationJourney from '@/components/what-we-do/TransformationJourney';
import ValuePrinciples from '@/components/what-we-do/ValuePrinciples';
import ProjectTransition from '@/components/what-we-do/ProjectTransition';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function WhatWeDoPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Reusable Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — What We Do Hero */}
      <WhatWeDoHero />

      {/* 03 — Three Core Capabilities */}
      <CoreCapabilities />

      {/* 04 — Acquire Section */}
      <AcquireSection />

      {/* 05 — Transform Section */}
      <TransformSection />

      {/* 06 — Create Section */}
      <CreateSection />

      {/* 07 — 3D Transformation Journey */}
      <TransformationJourney />

      {/* 08 — How We Add Value */}
      <ValuePrinciples />

      {/* 09 — Featured Project Transition */}
      <ProjectTransition />

      {/* 10 — Reusable Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 11 — Reusable Footer */}
      <Footer />

      {/* Global Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
