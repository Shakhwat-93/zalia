const fs = require('fs');

// 1. HERO COMPONENT
fs.writeFileSync('src/components/Hero.tsx', `'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Box, Image as ImageIcon } from 'lucide-react';
import { HERO_CONTENT } from '@/data/content';

const Hero3DModel = dynamic(() => import('@/components/3d/Hero3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
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
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 12,
        y: (e.clientY / innerHeight - 0.5) * 12,
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
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left: Quiet, confident typography */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left"
        >
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            ZALIA PROPERTIES
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-medium tracking-tight text-charcoal-950 leading-[1.04]">
            <span className="block">WE BUY.</span>
            <span className="block text-emerald-brand italic font-normal">WE TRANSFORM.</span>
            <span className="block">WE CREATE.</span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-md">
            We see the potential in residential property and transform it into exceptional homes.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenContact}
              className="px-6 py-4 rounded-full text-charcoal-700 hover:text-charcoal-950 text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-colors"
            >
              Let&apos;s Talk
            </button>
          </div>
        </motion.div>

        {/* Right: Dominant Architectural Visual (70% priority) */}
        <div className="lg:col-span-7 relative w-full h-[420px] sm:h-[540px] lg:h-[640px] flex items-center justify-center">
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-canvas-warm border border-canvas-border shadow-soft-xl flex flex-col justify-between group">
            
            {/* Minimal Switcher */}
            <div className="absolute top-4 right-4 z-20 flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md border border-canvas-border shadow-sm">
              <button
                onClick={() => setActiveTab('render')}
                className={'flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                  activeTab === 'render'
                    ? 'bg-charcoal-950 text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-950'
                )}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Render</span>
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={'flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                  activeTab === '3d'
                    ? 'bg-emerald-brand text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-950'
                )}
              >
                <Box className="w-3 h-3" />
                <span>3D</span>
              </button>
            </div>

            {/* Visual Canvas */}
            <div className="relative w-full h-full flex-1 overflow-hidden">
              {activeTab === 'render' ? (
                <motion.div
                  style={{
                    scale: imageScale,
                    x: mousePos.x * 0.3,
                    y: mousePos.y * 0.3,
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={HERO_CONTENT.image}
                    alt="Zalia Properties Architectural Villa"
                    fill
                    priority
                    quality={95}
                    className="object-cover object-center transition-transform duration-1000 ease-editorial"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full pt-8 pb-8 relative">
                  <Hero3DModel />
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
`);

// 2. WHAT WE DO (Clean 3 concepts)
fs.writeFileSync('src/components/WhatWeDo.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CONCEPTS = [
  {
    number: '01',
    title: 'ACQUIRE',
    description: 'Find properties with potential.',
  },
  {
    number: '02',
    title: 'TRANSFORM',
    description: 'Reimagine them through thoughtful development.',
  },
  {
    number: '03',
    title: 'CREATE',
    description: 'Deliver refined homes for modern living.',
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {CONCEPTS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 group"
            >
              <span className="font-sans text-xs font-semibold text-emerald-brand uppercase tracking-[0.2em] block">
                {item.number}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 transition-colors group-hover:text-emerald-brand">
                {item.title}
              </h3>
              <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 3. BRAND STATEMENT (Editorial & Spacious)
fs.writeFileSync('src/components/BrandStatement.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BRAND_STATEMENT_CONTENT } from '@/data/content';

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              PROPERTY HAS POTENTIAL.
              <span className="block text-emerald-brand font-normal italic mt-2">
                WE SEE WHAT IT CAN BECOME.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              We look beyond what a property is today to understand what it could become tomorrow.
            </motion.p>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={BRAND_STATEMENT_CONTENT.image}
                alt="Zalia Properties Architectural Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 4. 3D TRANSFORMATION (3 simple stages)
fs.writeFileSync('src/components/Property3DSection.tsx', `'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { TRANSFORMATION_3D_CONTENT } from '@/data/content';
import { Layers, Box } from 'lucide-react';

const Transformation3DCanvas = dynamic(
  () => import('@/components/3d/Transformation3DCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
      </div>
    ),
  }
);

const STAGES = [
  {
    number: '01',
    title: 'SEE THE POTENTIAL',
  },
  {
    number: '02',
    title: 'TRANSFORM',
  },
  {
    number: '03',
    title: 'CREATE',
  },
];

export default function Property3DSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'exploded' | '3d'>('exploded');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            THE ARCHITECTURAL METAMORPHOSIS
          </motion.h2>

          <div className="flex items-center space-x-2 p-1 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm">
            <button
              onClick={() => setViewMode('exploded')}
              className={'flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === 'exploded'
                  ? 'bg-charcoal-950 text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={'flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === '3d'
                  ? 'bg-emerald-brand text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl bg-canvas-warm border border-canvas-border overflow-hidden shadow-soft-xl">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative">
                <Transformation3DCanvas activeStage={activeStage} />
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={TRANSFORMATION_3D_CONTENT.image}
                  alt="Zalia Exploded 3D Architectural Model"
                  fill
                  quality={95}
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-4">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.number}
                  onClick={() => setActiveStage(idx)}
                  className={'text-left p-6 rounded-2xl border transition-all duration-300 ' + (
                    isActive
                      ? 'bg-canvas-warm border-emerald-brand shadow-soft-md'
                      : 'bg-white border-canvas-border hover:border-charcoal-300'
                  )}
                >
                  <span className={'text-xs font-sans font-semibold uppercase tracking-[0.2em] block mb-1 ' + (
                    isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                  )}>
                    {stage.number}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950">
                    {stage.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 5. FEATURED PROJECT (Minimal & Stripped down)
fs.writeFileSync('src/components/FeaturedProject.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECT_CONTENT } from '@/data/content';

interface FeaturedProjectProps {
  onOpenContact: () => void;
}

export default function FeaturedProject({ onOpenContact }: FeaturedProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          LONDON · RESIDENTIAL
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7 space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {FEATURED_PROJECT_CONTENT.title}
            </motion.h2>
            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal max-w-xl">
              A comprehensive heritage transformation marrying traditional brickwork with clean-line glass architecture.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <button
              onClick={onOpenContact}
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>View Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] sm:h-[560px] lg:h-[680px] w-full rounded-3xl overflow-hidden border border-canvas-border shadow-soft-xl bg-canvas-warm group"
        >
          <Image
            src={FEATURED_PROJECT_CONTENT.image}
            alt={FEATURED_PROJECT_CONTENT.title}
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
`);

// 6. BEFORE / AFTER (Clean & Visual)
fs.writeFileSync('src/components/BeforeAfterSlider.tsx', `'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          FROM POTENTIAL
          <span className="block text-emerald-brand italic font-normal mt-2">
            TO POSSIBILITY.
          </span>
        </motion.h2>

        <div
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[640px] rounded-3xl overflow-hidden border border-canvas-border shadow-soft-xl cursor-ew-resize select-none bg-canvas-warm"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/after-split.jpg"
              alt="Transformed Residential Home"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: 'inset(0 ' + (100 - sliderPosition) + '% 0 0)' }}
          >
            <Image
              src="/images/before-split.jpg"
              alt="Original Unmodernised Property"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: sliderPosition + '%' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-charcoal-900 flex items-center justify-center shadow-soft-lg">
              <ChevronsLeftRight className="w-4 h-4 text-emerald-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 7. OUR APPROACH (5 powerful words)
fs.writeFileSync('src/components/ApproachTimeline.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WORDS = [
  'IDENTIFY',
  'ACQUIRE',
  'TRANSFORM',
  'REFINE',
  'CREATE',
];

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          OUR APPROACH
        </div>

        <div className="flex flex-wrap gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-6 items-baseline">
          {WORDS.map((word, idx) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-6 sm:space-x-8"
            >
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium tracking-tight hover:text-emerald-brand transition-colors cursor-default">
                {word}
              </span>
              {idx < WORDS.length - 1 && (
                <span className="text-charcoal-300 font-serif text-3xl sm:text-4xl font-light hidden sm:inline">
                  /
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 8. ABOUT ZALIA (Clean statement + single paragraph)
fs.writeFileSync('src/components/AboutZalia.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT } from '@/data/content';

interface AboutZaliaProps {
  onOpenContact: () => void;
}

export default function AboutZalia({ onOpenContact }: AboutZaliaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={ABOUT_CONTENT.image}
                alt="Zalia Properties Residence"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              WE SEE MORE
              <span className="block text-emerald-brand italic font-normal mt-2">
                IN EVERY PROPERTY.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-700 font-sans leading-relaxed font-normal max-w-lg"
            >
              Zalia Properties focuses on residential properties with potential — combining thoughtful acquisition, intelligent development and careful transformation to create quality homes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>About Zalia</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 9. TEAM PREVIEW (Clean Name + Role)
fs.writeFileSync('src/components/TeamPreview.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TEAM_CONTENT } from '@/data/content';

export default function TeamPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          THE PEOPLE BEHIND ZALIA
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {TEAM_CONTENT.members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 group"
            >
              <div className="relative w-full aspect-square rounded-2xl bg-white border border-canvas-border flex items-center justify-center text-charcoal-900 font-serif text-3xl font-medium tracking-wider group-hover:text-emerald-brand group-hover:border-emerald-brand/40 transition-all duration-400 shadow-soft-sm">
                {member.initials}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-sans text-charcoal-500 font-normal">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 10. FINAL CTA (Quiet, Minimal Question)
fs.writeFileSync('src/components/FinalCTA.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FINAL_CTA_CONTENT, SITE_METADATA } from '@/data/content';

interface FinalCTAProps {
  onOpenContact: () => void;
}

export default function FinalCTA({ onOpenContact }: FinalCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal-950 font-medium leading-[1.04] tracking-tight whitespace-pre-line"
            >
              HAVE A PROPERTY
              <span className="block text-emerald-brand italic font-normal mt-2">
                WITH POTENTIAL?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-charcoal-600 font-sans"
            >
              Let&apos;s start a conversation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-lg group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={FINAL_CTA_CONTENT.image}
                alt="Zalia Properties Floating Architectural Villa"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 11. FOOTER (Quiet, Minimal White Footer)
fs.writeFileSync('src/components/Footer.tsx', `'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white text-charcoal-900 border-t border-canvas-border pt-16 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <Link href="#" className="inline-flex items-center space-x-3 group">
              <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Zalia Properties Ltd Logo"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold tracking-wider text-charcoal-950 uppercase leading-none">
                  ZALIA
                </span>
                <span className="text-[8.5px] font-semibold uppercase tracking-[0.24em] text-emerald-brand mt-0.5 leading-none">
                  PROPERTIES LTD
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-600 max-w-sm leading-relaxed font-normal pt-2">
              UK residential property acquisition, architectural renovation, and bespoke development.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-charcoal-600">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-charcoal-950 transition-colors uppercase tracking-wider block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3 text-xs text-charcoal-600">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Contact
            </div>
            <p>{SITE_METADATA.address}</p>
            <p>
              <a href={'mailto:' + SITE_METADATA.email} className="hover:text-charcoal-950 transition-colors">
                {SITE_METADATA.email}
              </a>
            </p>
            <p>
              <a href={'tel:' + SITE_METADATA.phone} className="hover:text-charcoal-950 transition-colors">
                {SITE_METADATA.phone}
              </a>
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-canvas-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <div>
            &copy; {new Date().getFullYear()} Zalia Properties Ltd. {SITE_METADATA.registration}.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-charcoal-600 hover:text-emerald-brand transition-colors p-2 rounded-full hover:bg-canvas-warm"
            aria-label="Back to top"
          >
            <span className="uppercase tracking-widest text-[10px] font-semibold">Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
`);

console.log('Clean minimal homepage refinement complete.');
