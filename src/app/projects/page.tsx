'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsIntro from '@/components/projects/ProjectsIntro';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectsBeforeAfter from '@/components/projects/ProjectsBeforeAfter';
import ProjectsPillars from '@/components/projects/ProjectsPillars';
import Projects3DMoment from '@/components/projects/Projects3DMoment';
import ProjectsNextTransition from '@/components/projects/ProjectsNextTransition';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function ProjectsPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Reusable Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Projects Hero */}
      <ProjectsHero />

      {/* 03 — Editorial Intro */}
      <ProjectsIntro />

      {/* 04 — Data-Driven Project Grid */}
      <ProjectsGrid onOpenContact={handleOpenContact} />

      {/* 05 — Before / After Feature */}
      <ProjectsBeforeAfter />

      {/* 06 — Project Disciplines & Pillars */}
      <ProjectsPillars />

      {/* 07 — 3D Architectural Moment */}
      <Projects3DMoment />

      {/* 08 — Next Transition */}
      <ProjectsNextTransition />

      {/* 09 — Reusable Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 10 — Reusable Footer */}
      <Footer />

      {/* Global Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
