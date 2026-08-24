const fs = require('fs');

// 1. BRAND TRUST STRIP (Section 03)
fs.writeFileSync('src/components/BrandTrustStrip.tsx', `'use client';

import { motion } from 'framer-motion';
import { BRAND_STRIP_POINTS } from '@/data/content';

export default function BrandTrustStrip() {
  return (
    <section className="relative w-full bg-white border-y border-canvas-border py-8 sm:py-10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {BRAND_STRIP_POINTS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-center space-x-3.5 group"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest">
                {item.number}
              </span>
              <span className="h-3 w-px bg-canvas-border" />
              <span className="text-[11.5px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-800 group-hover:text-emerald-brand transition-colors">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 2. WHY ZALIA / WHO WE ARE (Section 04)
fs.writeFileSync('src/components/WhyZalia.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WHY_ZALIA_CONTENT } from '@/data/content';

interface WhyZaliaProps {
  onOpenContact: () => void;
}

export default function WhyZalia({ onOpenContact }: WhyZaliaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="who-we-are"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {WHY_ZALIA_CONTENT.eyebrow}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight whitespace-pre-line"
            >
              {WHY_ZALIA_CONTENT.heading}
            </motion.h2>

            <div className="space-y-4">
              <p className="text-lg text-emerald-brand font-serif italic">
                {WHY_ZALIA_CONTENT.tagline}
              </p>
              <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg">
                {WHY_ZALIA_CONTENT.body}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>{WHY_ZALIA_CONTENT.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={WHY_ZALIA_CONTENT.image}
                alt="Zalia Properties Architectural Transformation"
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

// 3. WHAT WE DO (Section 05 - 3 large service columns)
fs.writeFileSync('src/components/WhatWeDo.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_CONTENT } from '@/data/content';

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="space-y-3">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            {SERVICES_CONTENT.eyebrow}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {SERVICES_CONTENT.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES_CONTENT.services.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 sm:p-10 rounded-2xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-soft-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                  {service.number}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                  {service.description}
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

// 4. FEATURED PROJECTS (Section 06 - 1 Large + 2 Supporting)
fs.writeFileSync('src/components/FeaturedProjects.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';

interface FeaturedProjectsProps {
  onOpenContact: () => void;
}

export default function FeaturedProjects({ onOpenContact }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [leadProject, ...supportingProjects] = FEATURED_PROJECTS_CONTENT;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              FEATURED PROJECTS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              A SELECTION OF OUR WORK
            </motion.h2>
          </div>

          <button
            onClick={onOpenContact}
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto"
          >
            <span>Inquire About Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 1 Large Main Project Card */}
        {leadProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-canvas-border bg-canvas-warm shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 group"
          >
            <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden bg-canvas-warm">
              <Image
                src={leadProject.image}
                alt={leadProject.title}
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <div className="space-y-2">
                <div className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-emerald-brand">
                  {leadProject.location} · {leadProject.category}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
                  {leadProject.title}
                </h3>
                <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
                  {leadProject.description}
                </p>
              </div>

              <div className="pt-4 border-t border-canvas-border">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center space-x-2 text-[13px] font-sans font-medium uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2 Supporting Smaller Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportingProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden border border-canvas-border bg-white p-6 sm:p-8 space-y-6 shadow-soft-md group hover:shadow-soft-xl hover:border-emerald-brand/30 transition-all duration-350"
            >
              <div className="relative h-[280px] sm:h-[340px] w-full rounded-2xl overflow-hidden bg-canvas-warm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-emerald-brand">
                  {project.location} · {project.category}
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-charcoal-600 font-sans leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-canvas-border">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center space-x-2 text-[12.5px] font-sans font-medium uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
`);

// 5. 3D TRANSFORMATION EXPERIENCE (Section 07 - 4 stages)
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

export default function Property3DSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'exploded' | '3d'>('3d');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
        
        {/* Header with Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {TRANSFORMATION_3D_CONTENT.eyebrow}
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {TRANSFORMATION_3D_CONTENT.heading}
            </motion.h2>
            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
              {TRANSFORMATION_3D_CONTENT.subheading}
            </p>
          </div>

          <div className="flex items-center space-x-2 p-1 rounded-full bg-white border border-canvas-border shadow-soft-sm self-start sm:self-auto">
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

        {/* 3D Canvas + 4 Stages List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl bg-white border border-canvas-border overflow-hidden shadow-soft-xl">
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

          <div className="lg:col-span-4 flex flex-col space-y-3.5">
            {TRANSFORMATION_3D_CONTENT.stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStage(idx)}
                  className={'text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ' + (
                    isActive
                      ? 'bg-white border-emerald-brand shadow-soft-md'
                      : 'bg-white/60 border-canvas-border hover:border-charcoal-300'
                  )}
                >
                  <span className={'font-mono text-xs font-semibold uppercase tracking-widest block mb-1 ' + (
                    isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                  )}>
                    STAGE {stage.stage}
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

// 6. BEFORE / AFTER (Section 08 - FROM BEFORE TO BEYOND)
fs.writeFileSync('src/components/BeforeAfterSlider.tsx', `'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { BEFORE_AFTER_CONTENT } from '@/data/content';

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
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        <div className="space-y-3">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            {BEFORE_AFTER_CONTENT.eyebrow}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight whitespace-pre-line"
          >
            {BEFORE_AFTER_CONTENT.heading}
          </motion.h2>
        </div>

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

// 7. OUR APPROACH (Section 09 - 5 horizontal steps on desktop / vertical on mobile)
fs.writeFileSync('src/components/ApproachTimeline.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { APPROACH_CONTENT } from '@/data/content';

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="space-y-3">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            {APPROACH_CONTENT.eyebrow}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {APPROACH_CONTENT.heading}
          </motion.h2>
        </div>

        {/* Desktop Horizontal Process / Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
          {APPROACH_CONTENT.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white border border-canvas-border space-y-4 group hover:border-emerald-brand/40 transition-all duration-300 shadow-soft-sm"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 8. MASTER PAGE (src/app/page.tsx)
fs.writeFileSync('src/app/page.tsx', `'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandTrustStrip from '@/components/BrandTrustStrip';
import WhyZalia from '@/components/WhyZalia';
import WhatWeDo from '@/components/WhatWeDo';
import FeaturedProjects from '@/components/FeaturedProjects';
import Property3DSection from '@/components/Property3DSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ApproachTimeline from '@/components/ApproachTimeline';
import AboutZalia from '@/components/AboutZalia';
import TeamPreview from '@/components/TeamPreview';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* 01 — Compact Premium Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 02 — Cinematic Hero */}
      <Hero onOpenContact={handleOpenContact} />

      {/* 03 — Brand / Trust Strip */}
      <BrandTrustStrip />

      {/* 04 — Why Zalia / Who We Are */}
      <WhyZalia onOpenContact={handleOpenContact} />

      {/* 05 — What We Do */}
      <WhatWeDo />

      {/* 06 — Featured Projects (1 large + 2 supporting) */}
      <FeaturedProjects onOpenContact={handleOpenContact} />

      {/* 07 — 3D Transformation Experience */}
      <Property3DSection />

      {/* 08 — Before → After Interactive Slider */}
      <BeforeAfterSlider />

      {/* 09 — Our Approach (5 Steps) */}
      <ApproachTimeline />

      {/* 10 — About / Philosophy */}
      <AboutZalia onOpenContact={handleOpenContact} />

      {/* 11 — Leadership Team Preview */}
      <TeamPreview />

      {/* 12 — Final Direct CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 13 — Minimal White Footer */}
      <Footer />

      {/* Global Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
`);

console.log('13-section rebuild script created.');
