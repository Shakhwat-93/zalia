'use client';

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
