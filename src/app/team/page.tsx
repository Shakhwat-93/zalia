'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TeamHero from '@/components/team/TeamHero';
import TeamGrid from '@/components/team/TeamGrid';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function TeamPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Route-Based Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Team Hero */}
      <TeamHero />

      {/* 03 — Full Executive & Leadership Grid */}
      <TeamGrid />

      {/* 04 — Reusable Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 05 — Architectural Footer */}
      <Footer />

      {/* Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
