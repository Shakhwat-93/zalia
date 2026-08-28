const fs = require('fs');

// Ensure directories exist
if (!fs.existsSync('src/app/projects')) fs.mkdirSync('src/app/projects', { recursive: true });
if (!fs.existsSync('src/components/projects')) fs.mkdirSync('src/components/projects', { recursive: true });

// 1. HERO COMPONENT (Section 04 & 05)
fs.writeFileSync('src/components/projects/ProjectsHero.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

export default function ProjectsHero() {
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
              OUR PROJECTS
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.02]">
            PROPERTY,
            <span className="block text-emerald-brand italic font-normal mt-1 sm:mt-2">
              REIMAGINED.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-2xl pt-2">
            A selection of residential properties identified, transformed and thoughtfully developed by Zalia Properties.
          </p>

          <div className="pt-2">
            <a
              href="#portfolio"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Large Immersive Hero Architectural Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[680px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src="/images/featured-project.jpg"
              alt="Zalia Properties Architectural Portfolio"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-soft-sm">
            London & Prime UK • Residential Transformations
          </div>
        </motion.div>

      </div>
    </section>
  );
}
`);

// 2. PROJECT INTRO (Section 06)
fs.writeFileSync('src/components/projects/ProjectsIntro.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectsIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-10 text-left">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          PORTFOLIO PHILOSOPHY
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          A DIFFERENT
          <span className="block text-emerald-brand italic font-normal mt-2">
            WAY TO SEE PROPERTY.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-3xl pt-2"
        >
          Every project begins with potential — and the opportunity to create something considered, functional and lasting.
        </motion.p>
      </div>
    </section>
  );
}
`);

// 3. PROJECT PORTFOLIO GRID (Section 07, 08, 13, 14, 15)
fs.writeFileSync('src/components/projects/ProjectsGrid.tsx', `'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS_CONTENT, ProjectItem } from '@/data/content';

interface ProjectsGridProps {
  onOpenContact: () => void;
}

export default function ProjectsGrid({ onOpenContact }: ProjectsGridProps) {
  const [filter, setFilter] = useState<'ALL' | 'CURRENT' | 'COMPLETED'>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const filteredProjects = FEATURED_PROJECTS_CONTENT.filter((p) => {
    if (filter === 'ALL') return true;
    return p.status === filter;
  });

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-20">
        
        {/* Header with Minimal Filter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-canvas-border">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              SELECTED WORKS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              ARCHITECTURAL PORTFOLIO
            </motion.h2>
          </div>

          {/* Minimal 3-Tab Filter */}
          <div className="flex items-center space-x-1.5 p-1.5 rounded-full bg-white border border-canvas-border shadow-soft-sm self-start sm:self-auto font-sans">
            {(['ALL', 'CURRENT', 'COMPLETED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={'px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ' + (
                  filter === tab
                    ? 'bg-charcoal-950 text-white shadow-xs'
                    : 'text-charcoal-500 hover:text-charcoal-950'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project, idx) => {
            const isFeaturedLarge = project.featured;

            if (isFeaturedLarge) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border bg-white p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-soft-xl group"
                >
                  <div className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden bg-canvas-warm">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={95}
                      className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10.5px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm">
                      {project.status}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6 lg:pl-4 text-left">
                    <div className="space-y-3">
                      <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand block">
                        {project.location} · {project.category}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-950 leading-[1.08]">
                        {project.title}
                      </h3>
                      <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
                      <button
                        onClick={onOpenContact}
                        className="btn-magnetic inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
                      >
                        <span>Inquire About Project</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl sm:rounded-[2rem] overflow-hidden border border-canvas-border bg-white p-6 sm:p-8 space-y-6 shadow-soft-md hover:shadow-soft-xl hover:border-emerald-brand/30 transition-all duration-350 group"
              >
                <div className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-canvas-warm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={95}
                    className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10.5px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm">
                    {project.status}
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand block">
                    {project.location} · {project.category}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center space-x-2 text-[12.5px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                  >
                    <span>View Project Inquiries</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
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

// 4. BEFORE / AFTER TRANSFORMATION (Section 16, 17, 18)
fs.writeFileSync('src/components/projects/ProjectsBeforeAfter.tsx', `'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ChevronsLeftRight, ArrowRight } from 'lucide-react';
import { BEFORE_AFTER_CONTENT } from '@/data/content';

export default function ProjectsBeforeAfter() {
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
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              TRANSFORMATION
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              FROM WHAT WAS
              <span className="block text-emerald-brand italic font-normal mt-1">
                TO WHAT&apos;S POSSIBLE.
              </span>
            </motion.h2>
            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
              Thoughtful development can reveal what a property was always capable of becoming.
            </p>
          </div>

          <Link
            href="/what-we-do"
            className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Explore Our Approach</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Interactive Comparison Slider */}
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
              src={BEFORE_AFTER_CONTENT.afterImage}
              alt="Transformed Residential Home"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-emerald-brand text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-md z-10">
              {BEFORE_AFTER_CONTENT.afterLabel}
            </div>
          </div>

          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: 'inset(0 ' + (100 - sliderPosition) + '% 0 0)' }}
          >
            <Image
              src={BEFORE_AFTER_CONTENT.beforeImage}
              alt="Original Unmodernised Property"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-charcoal-950 text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-md z-10">
              {BEFORE_AFTER_CONTENT.beforeLabel}
            </div>
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

// 5. PROJECT STORYTELLING PILLARS (Section 19)
fs.writeFileSync('src/components/projects/ProjectsPillars.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PILLARS = [
  {
    title: 'DESIGN',
    tagline: 'Every space should have purpose.',
    description: 'We orchestrate spatial flow, light corridors and contemporary proportions that elevate everyday living.',
  },
  {
    title: 'MATERIAL',
    tagline: 'Natural materials create lasting character.',
    description: 'Tactile limestone, oiled English oak and high-performance architectural glass engineered for permanence.',
  },
  {
    title: 'DETAIL',
    tagline: 'Small decisions shape the finished home.',
    description: 'Obsessive attention from bespoke architectural joinery to acoustic sealing and refined turnkey finishes.',
  },
];

export default function ProjectsPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="max-w-3xl space-y-3 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            OUR DISCIPLINES
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            DISCIPLINED
            <span className="block text-emerald-brand italic font-normal mt-1">
              VALUE CREATION.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-soft-xl space-y-6 text-left"
            >
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
                {pillar.title}
              </h3>
              <p className="text-sm font-sans font-semibold uppercase tracking-wider text-emerald-brand">
                {pillar.tagline}
              </p>
              <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 6. 3D PROJECT MOMENT (Section 20 & 21)
fs.writeFileSync('src/components/projects/Projects3DMoment.tsx', `'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { Box } from 'lucide-react';

const Hero3DModel = dynamic(() => import('@/components/3d/Hero3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Projects3DMoment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm">
            <Box className="w-3.5 h-3.5 text-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-700">
              3D SPATIAL PERSPECTIVE
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            SEE BEYOND
            <span className="block text-emerald-brand italic font-normal mt-1">
              THE FINISHED IMAGE.
            </span>
          </motion.h2>

          <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
            Drag to explore the architectural massing and spatial interplay in real-time WebGL.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border bg-canvas-warm shadow-soft-xl"
        >
          <Hero3DModel />
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10.5px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-sm pointer-events-none">
            360° Real-Time WebGL Model
          </div>
        </motion.div>

      </div>
    </section>
  );
}
`);

// 7. NEXT TRANSITION (Section 22)
fs.writeFileSync('src/components/projects/ProjectsNextTransition.tsx', `'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ProjectsNextTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand mx-auto">
          WHAT LIES AHEAD
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          MORE TO COME.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
        >
          Explore the thinking and architectural methodology behind every transformation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4"
        >
          <Link
            href="/what-we-do"
            className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
          >
            <span>Our Approach</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
`);

// 8. PROJECTS PAGE (src/app/projects/page.tsx)
fs.writeFileSync('src/app/projects/page.tsx', `'use client';

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
`);

// 9. SEO METADATA LAYOUT (src/app/projects/layout.tsx)
fs.writeFileSync('src/app/projects/layout.tsx', `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | Zalia Properties Ltd',
  description:
    'Explore the architectural portfolio and residential property transformations developed by Zalia Properties Ltd across prime UK regions.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
`);

console.log('Projects page and components generated.');
