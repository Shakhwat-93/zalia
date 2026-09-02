'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Building2, Sparkles, Compass, ChevronDown } from 'lucide-react';
import { HERO_CONTENT } from '@/data/content';

interface HeroProps {
  onOpenContact?: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState('London & Prime UK');
  const [selectedType, setSelectedType] = useState('Residential Transformation');
  const [selectedStandard, setSelectedStandard] = useState('Turnkey & Architectural');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-24 sm:pt-28 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 bg-canvas overflow-hidden flex flex-col items-center justify-center min-h-[100svh]"
    >
      {/* Outer Rounded Luxury Hero Card */}
      <motion.div
        style={{ scale: heroScale }}
        className="relative w-full max-w-[1440px] rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-canvas-border shadow-soft-2xl min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-charcoal-950 isolate"
      >
        {/* Full-bleed Architectural Villa Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <Image
            src={HERO_CONTENT.image}
            alt="Zalia Properties Architectural Villa"
            fill
            priority
            quality={95}
            className="object-cover object-center scale-100"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          {/* Gradients for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-charcoal-950/40" />
        </div>

        {/* Top Row: Eyebrow + Top-Right Trust Badge */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Eyebrow Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-soft-sm text-white"
          >
            <Compass className="w-3.5 h-3.5 text-gold-accent" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em]">
              ACQUIRE • TRANSFORM • CREATE
            </span>
          </motion.div>

          {/* Top-Right Glass Trust Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-soft-sm text-white font-sans"
          >
            {/* Monogram Avatars */}
            <div className="flex -space-x-1.5 overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-emerald-brand border-2 border-white/60 flex items-center justify-center text-[9px] font-bold text-white">
                ZS
              </div>
              <div className="w-6 h-6 rounded-full bg-gold-accent border-2 border-white/60 flex items-center justify-center text-[9px] font-bold text-charcoal-950">
                SS
              </div>
              <div className="w-6 h-6 rounded-full bg-charcoal-800 border-2 border-white/60 flex items-center justify-center text-[9px] font-bold text-white">
                IS
              </div>
            </div>

            <div className="text-left pl-1">
              <span className="block text-[11px] font-semibold leading-none text-white">
                Mayfair, London
              </span>
              <span className="text-[9.5px] text-white/75 uppercase tracking-wider leading-none mt-0.5 block">
                UK Residential Development
              </span>
            </div>
          </motion.div>
        </div>

        {/* Middle: Dominant Headline & Narrative */}
        <div className="relative z-10 max-w-2xl space-y-6 my-auto py-8 sm:py-12 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.04]"
          >
            <span className="block text-white">WE BUY.</span>
            <span className="block text-emerald-light italic font-normal">WE TRANSFORM.</span>
            <span className="block text-white">WE CREATE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-white/90 font-sans leading-relaxed font-normal max-w-xl"
          >
            We identify residential properties with potential and transform them into exceptional homes designed for modern British living.
          </motion.p>
        </div>

        {/* Bottom Floating Glass Filter Bar - Pixel-Perfect & Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full max-w-5xl mx-auto rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-xl border border-white/90 shadow-2xl p-2 sm:p-2.5 font-sans"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 lg:gap-3">
            
            {/* Field 1: Location */}
            <div className="flex-1 flex items-center space-x-3 px-3.5 py-2 rounded-xl sm:rounded-full hover:bg-canvas-warm/70 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9.5px] font-semibold uppercase tracking-wider text-charcoal-400 leading-none mb-1">
                  Location
                </span>
                <span className="text-xs font-semibold text-charcoal-900 block truncate">
                  {selectedLocation}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-charcoal-950 transition-colors shrink-0" />
            </div>

            <div className="hidden lg:block w-px h-8 bg-charcoal-200/50" />

            {/* Field 2: Development Scope */}
            <div className="flex-1 flex items-center space-x-3 px-3.5 py-2 rounded-xl sm:rounded-full hover:bg-canvas-warm/70 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gold-light flex items-center justify-center text-gold-accent shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9.5px] font-semibold uppercase tracking-wider text-charcoal-400 leading-none mb-1">
                  Development Scope
                </span>
                <span className="text-xs font-semibold text-charcoal-900 block truncate">
                  {selectedType}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-charcoal-950 transition-colors shrink-0" />
            </div>

            <div className="hidden lg:block w-px h-8 bg-charcoal-200/50" />

            {/* Field 3: Standard */}
            <div className="flex-1 flex items-center space-x-3 px-3.5 py-2 rounded-xl sm:rounded-full hover:bg-canvas-warm/70 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[9.5px] font-semibold uppercase tracking-wider text-charcoal-400 leading-none mb-1">
                  Standard
                </span>
                <span className="text-xs font-semibold text-charcoal-900 block truncate">
                  {selectedStandard}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-charcoal-950 transition-colors shrink-0" />
            </div>

            {/* Action CTA Button - Perfectly aligned on right */}
            <div className="lg:pl-2 shrink-0">
              <Link
                href="/projects"
                className="w-full lg:w-auto inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-emerald-brand hover:bg-charcoal-950 text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-md group shrink-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
