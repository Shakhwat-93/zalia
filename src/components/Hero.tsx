'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Building2, Sparkles, Compass, ChevronDown } from 'lucide-react';
import { HERO_CONTENT } from '@/data/content';

interface HeroProps {
  onOpenContact: () => void;
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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-24 sm:pt-28 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 bg-canvas overflow-hidden flex flex-col items-center justify-center min-h-[100svh]"
    >
      {/* Outer Rounded Luxury Hero Card */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative w-full max-w-[1440px] rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-canvas-border shadow-soft-2xl min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 lg:p-14"
      >
        {/* Full-bleed Architectural Villa Background */}
        <div className="absolute inset-0 w-full h-full -z-10 bg-charcoal-950">
          <Image
            src={HERO_CONTENT.image}
            alt="Zalia Properties Architectural Villa"
            fill
            priority
            quality={95}
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-editorial"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          {/* Subtle Ambient Vignette & Gradient for Sharp Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-charcoal-950/30 pointer-events-none" />
        </div>

        {/* Top Row: Eyebrow + Top-Right Trust Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10">
          {/* Eyebrow Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-soft-sm text-white"
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
            className="hidden sm:inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-soft-sm text-white font-sans"
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
        <div className="max-w-2xl space-y-6 my-auto py-8 sm:py-12 z-10 text-left">
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
            className="text-base sm:text-lg text-white/85 font-sans leading-relaxed font-normal max-w-xl"
          >
            We identify residential properties with potential and transform them into exceptional homes designed for modern British living.
          </motion.p>
        </div>

        {/* Bottom Floating Glass Search / Exploration Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full p-2.5 sm:p-3 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-xl border border-white/80 shadow-soft-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 items-center text-charcoal-900 font-sans"
        >
          {/* Field 1: Location */}
          <div className="lg:col-span-3 px-4 py-2.5 rounded-xl sm:rounded-full hover:bg-canvas-warm/70 transition-colors flex items-center space-x-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">
                Location
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-[13px] font-medium text-charcoal-950 truncate">
                  {selectedLocation}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-charcoal-950 transition-colors ml-1 shrink-0" />
              </div>
            </div>
          </div>

          <span className="hidden lg:block h-8 w-px bg-canvas-border" />

          {/* Field 2: Development Scope */}
          <div className="lg:col-span-3 px-4 py-2.5 rounded-xl sm:rounded-full hover:bg-canvas-warm/70 transition-colors flex items-center space-x-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gold-light flex items-center justify-center text-gold-accent shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">
                Development Scope
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-[13px] font-medium text-charcoal-950 truncate">
                  {selectedType}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-charcoal-950 transition-colors ml-1 shrink-0" />
              </div>
            </div>
          </div>

          <span className="hidden lg:block h-8 w-px bg-canvas-border" />

          {/* Field 3: Standard */}
          <div className="lg:col-span-3 px-4 py-2.5 rounded-xl sm:rounded-full hover:bg-canvas-warm/70 transition-colors flex items-center space-x-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-charcoal-400">
                Standard
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-[13px] font-medium text-charcoal-950 truncate">
                  {selectedStandard}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-charcoal-950 transition-colors ml-1 shrink-0" />
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="lg:col-span-3 flex justify-end">
            <button
              onClick={onOpenContact}
              className="w-full btn-magnetic inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-full bg-emerald-brand text-white hover:bg-charcoal-950 text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-md group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
