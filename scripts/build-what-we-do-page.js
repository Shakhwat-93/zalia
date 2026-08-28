const fs = require('fs');

// Ensure directories exist
if (!fs.existsSync('src/app/what-we-do')) fs.mkdirSync('src/app/what-we-do', { recursive: true });
if (!fs.existsSync('src/components/what-we-do')) fs.mkdirSync('src/components/what-we-do', { recursive: true });

// 1. HERO COMPONENT (Section 05)
fs.writeFileSync('src/components/what-we-do/WhatWeDoHero.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

export default function WhatWeDoHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-20">
        
        {/* Editorial Text Header */}
        <motion.div style={{ y: heroY }} className="max-w-3xl space-y-6 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm">
            <Compass className="w-3.5 h-3.5 text-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-700">
              WHAT WE DO
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.02]">
            FROM POTENTIAL
            <span className="block text-emerald-brand italic font-normal mt-1 sm:mt-2">
              TO POSSIBILITY.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-2xl pt-2">
            We identify residential properties with potential, transform them thoughtfully, and create homes designed for modern living.
          </p>

          <div className="pt-2">
            <Link
              href="/#projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Large Architectural Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[680px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src="/images/what-we-do.jpg"
              alt="Zalia Properties Architectural Scope"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-soft-sm">
            Acquisition • Structural Transformation • Turnkey Creation
          </div>
        </motion.div>

      </div>
    </section>
  );
}
`);

// 2. THREE CORE CAPABILITIES (Section 08)
fs.writeFileSync('src/components/what-we-do/CoreCapabilities.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CAPABILITIES = [
  {
    number: '01',
    title: 'ACQUIRE',
    anchor: '#acquire',
  },
  {
    number: '02',
    title: 'TRANSFORM',
    anchor: '#transform',
  },
  {
    number: '03',
    title: 'CREATE',
    anchor: '#create',
  },
];

export default function CoreCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          WHAT WE DO
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CAPABILITIES.map((cap, idx) => (
            <motion.a
              key={cap.number}
              href={cap.anchor}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 sm:p-10 rounded-3xl bg-canvas-warm border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1 hover:shadow-soft-lg flex flex-col justify-between"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block mb-6">
                {cap.number}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                {cap.title}
              </h2>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 3. ACQUIRE SECTION (Section 09 & 10)
fs.writeFileSync('src/components/what-we-do/AcquireSection.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function AcquireSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="acquire"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              01 — ACQUIRE
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              FINDING
              <span className="block text-emerald-brand italic font-normal mt-1">
                THE POTENTIAL.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              We identify residential properties where thoughtful development can unlock something more.
            </motion.p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-white group"
            >
              <Image
                src="/images/before-split.jpg"
                alt="Zalia Acquisition Property Potential"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
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

// 4. TRANSFORM SECTION (Section 12 & 13)
fs.writeFileSync('src/components/what-we-do/TransformSection.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function TransformSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="transform"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Image (60% priority) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src="/images/after-split.jpg"
                alt="Zalia Transform Architecture"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-5 space-y-8 text-left order-1 lg:order-2">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              02 — TRANSFORM
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              TRANSFORMING
              <span className="block text-emerald-brand italic font-normal mt-1">
                WITH PURPOSE.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              Through thoughtful renovation, development and design, we reshape properties around the way people live today.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
`);

// 5. CREATE SECTION (Section 15 & 16)
fs.writeFileSync('src/components/what-we-do/CreateSection.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CreateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="create"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              03 — CREATE
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              CREATING
              <span className="block text-emerald-brand italic font-normal mt-1">
                EXCEPTIONAL HOMES.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              We focus on quality, functionality and thoughtful design to create refined homes for modern living.
            </motion.p>

            <div className="pt-2">
              <Link
                href="/#projects"
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>View Our Projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Completed Property Visual */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-white group"
            >
              <Image
                src="/images/featured-project.jpg"
                alt="Zalia Completed Finished Residential Home"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
`);

// 6. 3D TRANSFORMATION JOURNEY (Section 17 & 18)
fs.writeFileSync('src/components/what-we-do/TransformationJourney.tsx', `'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
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

const JOURNEY_STAGES = [
  {
    number: '01',
    title: 'IDENTIFY',
    description: 'A simplified architectural property appears and baseline structural viability is established.',
  },
  {
    number: '02',
    title: 'TRANSFORM',
    description: 'Architectural elements begin changing with high-performance double-height glazing and extensions.',
  },
  {
    number: '03',
    title: 'REFINE',
    description: 'Materials, limestone cladding, joinery and ambient illumination become thoroughly refined.',
  },
  {
    number: '04',
    title: 'CREATE',
    description: 'The final premium residence is revealed — a property, reimagined.',
  },
];

export default function TransformationJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'exploded'>('3d');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
        
        {/* Header with Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              THE JOURNEY
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              FROM PROPERTY
              <span className="block text-emerald-brand italic font-normal mt-1">
                TO HOME.
              </span>
            </motion.h2>
          </div>

          <div className="flex items-center space-x-2 p-1 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm self-start sm:self-auto">
            <button
              onClick={() => setViewMode('3d')}
              className={'flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === '3d'
                  ? 'bg-emerald-brand text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D</span>
            </button>
            <button
              onClick={() => setViewMode('exploded')}
              className={'flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === 'exploded'
                  ? 'bg-charcoal-950 text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded View</span>
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas + 4 Stages List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl bg-canvas-warm border border-canvas-border overflow-hidden shadow-soft-xl">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative">
                <Transformation3DCanvas activeStage={activeStage} />
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src="/images/3d-transformation.png"
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

          <div className="lg:col-span-4 flex flex-col space-y-3.5">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.number}
                  onClick={() => setActiveStage(idx)}
                  className={'text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ' + (
                    isActive
                      ? 'bg-canvas-warm border-emerald-brand shadow-soft-md'
                      : 'bg-white border-canvas-border hover:border-charcoal-300'
                  )}
                >
                  <span className={'font-mono text-xs font-semibold uppercase tracking-widest block mb-1 ' + (
                    isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                  )}>
                    STAGE {stage.number}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal-950 mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-charcoal-500 font-sans leading-relaxed">
                    {stage.description}
                  </p>
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

// 7. VALUE PRINCIPLES (Section 22)
fs.writeFileSync('src/components/what-we-do/ValuePrinciples.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PRINCIPLES = [
  {
    number: '01',
    title: 'DESIGN',
    description: 'Every decision should have purpose.',
  },
  {
    number: '02',
    title: 'QUALITY',
    description: 'Materials, details and execution matter.',
  },
  {
    number: '03',
    title: 'LONG-TERM THINKING',
    description: 'Create homes with lasting value and relevance.',
  },
];

export default function ValuePrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            HOW WE ADD VALUE
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            THOUGHTFUL
            <span className="block text-emerald-brand italic font-normal mt-1">
              AT EVERY STAGE.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PRINCIPLES.map((principle, idx) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 sm:p-10 rounded-3xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-soft-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                  {principle.number}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {principle.title}
                </h3>

                <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-canvas-border flex items-center justify-between text-xs font-sans font-medium text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                <span className="uppercase tracking-widest text-[10.5px]">Zalia Standard</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 8. FEATURED PROJECT TRANSITION (Section 24 & 25)
fs.writeFileSync('src/components/what-we-do/ProjectTransition.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ProjectTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              OUR PROJECTS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              SEE THE WORK
              <span className="block text-emerald-brand italic font-normal mt-1">
                IN PRACTICE.
              </span>
            </motion.h2>
          </div>

          <Link
            href="/#projects"
            className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] sm:h-[560px] lg:h-[660px] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-xl bg-canvas-warm group"
        >
          <Image
            src="/images/about-zalia.png"
            alt="Zalia Finished Residential Living"
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </motion.div>

      </div>
    </section>
  );
}
`);

// 9. WHAT WE DO PAGE (src/app/what-we-do/page.tsx)
fs.writeFileSync('src/app/what-we-do/page.tsx', `'use client';

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
`);

// 10. SEO LAYOUT (src/app/what-we-do/layout.tsx)
fs.writeFileSync('src/app/what-we-do/layout.tsx', `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Do | Zalia Properties Ltd',
  description:
    'Discover how Zalia Properties Ltd acquires, transforms, and creates quality UK residential homes through thoughtful architectural development.',
};

export default function WhatWeDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
`);

console.log('What We Do page and components generated.');
