'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectHero from '@/components/projects/detail/ProjectHero';
import ProjectIntroStory from '@/components/projects/detail/ProjectIntroStory';
import ProjectTransformation from '@/components/projects/detail/ProjectTransformation';
import ProjectGallery from '@/components/projects/detail/ProjectGallery';
import ProjectsBeforeAfter from '@/components/projects/ProjectsBeforeAfter';
import Projects3DMoment from '@/components/projects/Projects3DMoment';
import ProjectResult from '@/components/projects/detail/ProjectResult';
import ProjectNextNav from '@/components/projects/detail/ProjectNextNav';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

interface ProjectDetailClientProps {
  project: any;
  nextProject: any;
}

export default function ProjectDetailClient({
  project,
  nextProject,
}: ProjectDetailClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* Reusable Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 05 & 06 — Project Hero */}
      <ProjectHero project={project} />

      {/* 08, 09, 10 — Project Introduction & The Starting Point */}
      <ProjectIntroStory project={project} />

      {/* 11 & 12 — Transformation Concepts */}
      <ProjectTransformation />

      {/* 13, 14, 15 — Editorial Image Gallery & Lightbox */}
      <ProjectGallery project={project} />

      {/* 16 — Before / After Comparison Feature */}
      <ProjectsBeforeAfter
        beforeImage={project.before_image_url}
        afterImage={project.after_image_url}
      />

      {/* 17 & 18 — 3D Spatial Moment */}
      <Projects3DMoment />

      {/* 19 & 20 — The Result & Minimal Summary */}
      <ProjectResult project={project} />

      {/* 21 & 22 — Next Project Navigation */}
      <ProjectNextNav nextProject={nextProject} />

      {/* 23 — Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 25 — Footer */}
      <Footer />

      {/* Global Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
