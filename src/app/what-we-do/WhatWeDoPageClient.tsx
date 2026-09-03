'use client';

import React, { useState } from 'react';
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

interface WhatWeDoPageClientProps {
  pageData?: any;
}

export default function WhatWeDoPageClient({ pageData }: WhatWeDoPageClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  const content = pageData?.content || {};

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Reusable Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — What We Do Hero */}
      <WhatWeDoHero
        eyebrow={pageData?.hero_eyebrow}
        heading={pageData?.hero_heading}
        description={pageData?.hero_description}
        image={pageData?.hero_image_url}
      />

      {/* 03 — Three Core Capabilities */}
      <CoreCapabilities />

      {/* 04 — Acquire Section */}
      <AcquireSection acquire={content.acquire} />

      {/* 05 — Transform Section */}
      <TransformSection transform={content.transform} />

      {/* 06 — Create Section */}
      <CreateSection create={content.create} />

      {/* 07 — 3D Transformation Journey with Dynamic Supporting Text */}
      <TransformationJourney journeyStages={content.journey_3d} />

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
