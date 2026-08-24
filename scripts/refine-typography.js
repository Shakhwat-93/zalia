const fs = require('fs');

// 1. Refine Navbar.tsx
fs.writeFileSync('src/components/Navbar.tsx', `'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X, Phone, Mail, MapPin } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'services', 'transformation', 'projects', 'approach', 'team', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={'fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-luxury ' + (
          isScrolled
            ? 'bg-white/94 backdrop-blur-md border-b border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] py-3 sm:py-3.5'
            : 'bg-white/80 backdrop-blur-[10px] border-b border-black/[0.03] py-4 sm:py-5 lg:py-6'
        )}
      >
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] mx-auto flex items-center justify-between">
          {/* Brand Logo & Logotype */}
          <Link
            href="#"
            className="group flex items-center space-x-3 sm:space-x-3.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand rounded-lg p-1 -m-1"
            aria-label="Zalia Properties Ltd Homepage"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Zalia Properties Ltd Logo"
                fill
                priority
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[18px] sm:text-[20px] font-semibold tracking-[0.14em] text-charcoal-950 uppercase leading-none">
                ZALIA
              </span>
              <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-emerald-brand mt-1 leading-none">
                PROPERTIES LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Inter 500, 12.5px, 0.14em tracking) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-6 2xl:gap-8 mx-6"
          >
            {NAVIGATION_LINKS.map((link) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={'whitespace-nowrap text-[12.5px] font-sans font-medium uppercase tracking-[0.14em] transition-colors duration-200 relative py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-brand rounded group ' + (
                    isActive
                      ? 'text-emerald-brand'
                      : 'text-charcoal-700 hover:text-charcoal-950'
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={'absolute bottom-0 left-0 h-[1.5px] bg-emerald-brand transition-all duration-300 ease-luxury ' + (
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Block */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            {/* Desktop CTA Pill Button (Inter 600, 13px, 0.14em tracking) */}
            <button
              onClick={onOpenContact}
              className="btn-magnetic hidden sm:inline-flex items-center space-x-2.5 h-[46px] px-6 sm:px-7 rounded-full bg-charcoal-950 hover:bg-emerald-brand text-white text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand focus-visible:ring-offset-2"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center space-x-2 h-[42px] px-3.5 sm:px-4 rounded-full bg-canvas-warm border border-canvas-border text-charcoal-900 hover:border-emerald-brand/50 hover:bg-white transition-all text-xs font-sans font-medium uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-[11px] font-sans font-semibold uppercase tracking-widest hidden xs:inline">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-charcoal-900" />
              ) : (
                <div className="w-4 h-3 flex flex-col justify-between">
                  <span className="w-full h-[1.5px] bg-charcoal-900 rounded-full" />
                  <span className="w-full h-[1.5px] bg-charcoal-900 rounded-full" />
                  <span className="w-3/4 h-[1.5px] bg-emerald-brand rounded-full ml-auto" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl xl:hidden flex flex-col justify-between p-6 sm:p-10 pt-28 sm:pt-32 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="max-w-xl w-full mx-auto space-y-6">
              <div className="flex items-center space-x-2 pb-2 border-b border-canvas-border">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
                  NAVIGATION DIRECTORY
                </span>
              </div>

              <nav className="flex flex-col space-y-3 sm:space-y-4">
                {NAVIGATION_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2 text-charcoal-900 hover:text-emerald-brand transition-colors"
                    >
                      <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                        {link.label}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-charcoal-300 group-hover:text-emerald-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="max-w-xl w-full mx-auto pt-8 border-t border-canvas-border space-y-6"
            >
              <button
                onClick={() => {
                  closeMobileMenu();
                  onOpenContact();
                }}
                className="w-full py-4 rounded-full bg-charcoal-950 hover:bg-emerald-brand text-white text-[13px] font-sans font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2.5 shadow-md transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-600 font-sans">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                  <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand truncate">
                    {SITE_METADATA.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                  <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand">
                    {SITE_METADATA.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5 sm:col-span-2 text-[11px] text-charcoal-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                  <span>{SITE_METADATA.address}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`);

// 2. Refine Hero.tsx
fs.writeFileSync('src/components/Hero.tsx', `'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Box, Image as ImageIcon, Sparkles } from 'lucide-react';
import { HERO_CONTENT } from '@/data/content';

const Hero3DModel = dynamic(() => import('@/components/3d/Hero3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
      <span className="text-[11px] font-sans font-medium text-charcoal-400 uppercase tracking-widest">
        Loading 3D Scene...
      </span>
    </div>
  ),
});

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'render' | '3d'>('render');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 16,
        y: (e.clientY / innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center bg-canvas overflow-hidden pt-28 pb-16 lg:py-0"
    >
      {/* Background Architectural Atmosphere */}
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 right-12 w-[480px] h-[480px] rounded-full bg-emerald-light/35 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 left-12 w-[380px] h-[380px] rounded-full bg-gold-light/50 blur-3xl pointer-events-none -z-10" />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10"
      >
        {/* Left Column: Hero Narrative & Action */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-7 text-left z-20">
          {/* Eyebrow Label (Inter 600, 11px, 0.16em tracking) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border w-fit shadow-soft-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-pulse" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-charcoal-700">
              {HERO_CONTENT.eyebrow}
            </span>
          </motion.div>

          {/* Master Headline (Cormorant Serif + Tight Line Height) */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl xl:text-7xl font-medium tracking-tight text-charcoal-950 leading-[1.04]"
          >
            <span className="block text-charcoal-950 font-normal">
              {HERO_CONTENT.headlineLine1}
            </span>
            <span className="block text-emerald-brand font-medium italic">
              {HERO_CONTENT.headlineLine2}
            </span>
            <span className="block text-charcoal-950 font-normal">
              {HERO_CONTENT.headlineLine3}
            </span>
          </motion.h1>

          {/* Supporting Copy (Inter 400, 16px-18px, 1.6 leading, max-w-xl) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 max-w-xl font-normal leading-relaxed tracking-normal font-sans"
          >
            {HERO_CONTENT.supportingCopy}
          </motion.p>

          {/* Buttons (Inter 600, 13px, 0.14em tracking) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-1"
          >
            <a
              href="#projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-md hover:shadow-emerald-subtle group"
            >
              <span>{HERO_CONTENT.primaryCTA}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenContact}
              className="btn-magnetic inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-canvas-warm border border-canvas-border text-charcoal-900 hover:border-emerald-brand hover:text-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm"
            >
              <span>{HERO_CONTENT.secondaryCTA}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Metadata Statistics (Inter 500/600, clean numbers) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 border-t border-canvas-border grid grid-cols-3 gap-4 max-w-lg font-sans"
          >
            <div>
              <span className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                Mayfair, London
              </span>
              <span className="text-[11px] text-charcoal-400 uppercase tracking-wider">
                Headquarters
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                Residential
              </span>
              <span className="text-[11px] text-charcoal-400 uppercase tracking-wider">
                Specialisation
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-emerald-brand uppercase tracking-wider">
                Turnkey
              </span>
              <span className="text-[11px] text-charcoal-400 uppercase tracking-wider">
                Architecture
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Unified Architectural Showcase */}
        <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[560px] lg:h-[620px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-soft-xl bg-canvas-warm border border-canvas-border flex flex-col justify-between"
          >
            {/* Top Bar Switcher Pill */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-canvas-border text-[10.5px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-700 shadow-sm pointer-events-auto">
                <Sparkles className="w-3 h-3 text-gold-accent" />
                <span>ARCHITECTURAL SPECIFICATION</span>
              </div>

              <div className="inline-flex items-center p-1 rounded-full bg-white/95 backdrop-blur-md border border-canvas-border shadow-sm pointer-events-auto font-sans">
                <button
                  onClick={() => setActiveTab('render')}
                  className={'flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                    activeTab === 'render'
                      ? 'bg-charcoal-950 text-white shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-950'
                  )}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Render</span>
                </button>
                <button
                  onClick={() => setActiveTab('3d')}
                  className={'flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                    activeTab === '3d'
                      ? 'bg-emerald-brand text-white shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-950'
                  )}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Live 3D</span>
                </button>
              </div>
            </div>

            {/* Display Area */}
            <div className="relative w-full h-full flex-1 overflow-hidden">
              {activeTab === 'render' ? (
                <motion.div
                  style={{
                    scale: imageScale,
                    x: mousePos.x * 0.35,
                    y: mousePos.y * 0.35,
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={HERO_CONTENT.image}
                    alt="Zalia Properties Architectural Villa Transformation"
                    fill
                    priority
                    quality={95}
                    className="object-cover object-center transition-transform duration-1000 ease-editorial"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              ) : (
                <div className="w-full h-full pt-12 pb-16 relative">
                  <Hero3DModel />
                </div>
              )}
            </div>

            {/* Bottom Metadata Strip */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl glass-card border border-white/60 flex items-center justify-between shadow-soft-sm backdrop-blur-md font-sans">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-brand text-white flex items-center justify-center shadow-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11.5px] font-semibold text-charcoal-900 uppercase tracking-wider font-sans">
                    {activeTab === 'render' ? 'Architectural Model 01' : '3D Spatial Pavilion'}
                  </h4>
                  <p className="text-[10.5px] text-charcoal-500 font-sans">
                    {activeTab === 'render' ? 'Contemporary Limestone & Glass Pavilion' : 'Interactive Real-Time WebGL Space'}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest px-2.5 py-1 rounded bg-canvas-warm text-charcoal-700 border border-canvas-border">
                {activeTab === 'render' ? 'UK • RESIDENTIAL' : 'DRAG TO ORBIT 360°'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
`);

// 3. Refine WhatWeDo.tsx (Inter headings & body)
fs.writeFileSync('src/components/WhatWeDo.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Hammer, Home, ArrowUpRight } from 'lucide-react';
import { WHAT_WE_DO_CONTENT } from '@/data/content';

const iconMap = [Search, Hammer, Home];

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {WHAT_WE_DO_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {WHAT_WE_DO_CONTENT.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
          >
            {WHAT_WE_DO_CONTENT.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {WHAT_WE_DO_CONTENT.services.map((service, idx) => {
            const IconComponent = iconMap[idx] || Search;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 sm:p-10 rounded-2xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-sans text-xs font-semibold text-emerald-brand tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-emerald-light border border-emerald-brand/10">
                      STEP {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal-900 group-hover:bg-emerald-brand group-hover:text-white group-hover:border-emerald-brand transition-all duration-300 shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 mb-3 group-hover:text-emerald-brand transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-[14.5px] text-charcoal-600 font-sans leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-canvas-border flex items-center justify-between text-xs font-sans font-semibold text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                  <span className="uppercase tracking-[0.14em] text-[11px]">
                    Zalia Discipline
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

console.log('Typography system refined.');