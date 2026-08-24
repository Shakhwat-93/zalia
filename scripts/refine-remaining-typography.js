const fs = require('fs');

// 1. Refine BrandStatement.tsx
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

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
                {BRAND_STATEMENT_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {BRAND_STATEMENT_CONTENT.statement}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-700 font-sans leading-relaxed font-normal"
            >
              {BRAND_STATEMENT_CONTENT.supportingText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-wrap gap-3 text-xs font-sans font-medium text-charcoal-600"
            >
              <div className="px-4 py-2 rounded-full bg-canvas-warm border border-canvas-border">
                Heritage Conservation
              </div>
              <div className="px-4 py-2 rounded-full bg-canvas-warm border border-canvas-border">
                Contemporary Glazed Pavilions
              </div>
              <div className="px-4 py-2 rounded-full bg-canvas-warm border border-canvas-border">
                Structural Reconfiguration
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border group bg-canvas-warm"
            >
              <Image
                src={BRAND_STATEMENT_CONTENT.image}
                alt="Zalia Properties Architectural Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/50 shadow-soft-md backdrop-blur-md font-sans">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-brand block">
                  HERITAGE • MODERNITY
                </span>
                <span className="text-xs font-serif text-charcoal-900 font-medium">
                  Victorian Structural Refinement with Glazed Pavilion
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 2. Refine FeaturedProject.tsx
fs.writeFileSync('src/components/FeaturedProject.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {FEATURED_PROJECT_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {FEATURED_PROJECT_CONTENT.heading}
          </motion.h2>
        </div>

        <div className="relative rounded-3xl bg-white border border-canvas-border overflow-hidden shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
          <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden bg-canvas-warm group">
            <Image
              src={FEATURED_PROJECT_CONTENT.project.image}
              alt={FEATURED_PROJECT_CONTENT.project.title}
              fill
              quality={95}
              className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-full glass-card border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-brand" />
              <span>{FEATURED_PROJECT_CONTENT.project.location}</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="space-y-2">
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.14em] text-emerald-brand">
                {FEATURED_PROJECT_CONTENT.project.category}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
                {FEATURED_PROJECT_CONTENT.project.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-2">
                {FEATURED_PROJECT_CONTENT.project.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-charcoal-400 block">
                DEVELOPMENT SCOPE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURED_PROJECT_CONTENT.project.scope.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-xs font-sans text-charcoal-700 bg-canvas-warm p-2.5 rounded-xl border border-canvas-border"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>Inquire About Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 3. Refine BeforeAfterSlider.tsx
fs.writeFileSync('src/components/BeforeAfterSlider.tsx', `'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BEFORE_AFTER_CONTENT } from '@/data/content';
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {BEFORE_AFTER_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {BEFORE_AFTER_CONTENT.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
          >
            {BEFORE_AFTER_CONTENT.subheading}
          </motion.p>
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
              src="/images/after-split.jpg"
              alt="Transformed Residential Home"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-emerald-brand text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-md z-10">
              AFTER • REIMAGINED
            </div>
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
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-charcoal-950 text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-md z-10">
              BEFORE • ORIGINAL
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: sliderPosition + '%' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-emerald-brand text-charcoal-900 flex items-center justify-center shadow-soft-lg">
              <ChevronsLeftRight className="w-5 h-5 text-emerald-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 4. Refine ApproachTimeline.tsx
fs.writeFileSync('src/components/ApproachTimeline.tsx', `'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { APPROACH_CONTENT } from '@/data/content';
import { CheckCircle2 } from 'lucide-react';

export default function ApproachTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {APPROACH_CONTENT.eyebrow}
            </span>
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

        <div className="relative border-l-2 border-canvas-border/80 ml-4 sm:ml-8 lg:ml-12 pl-6 sm:pl-10 lg:pl-16 space-y-12 sm:space-y-16">
          {APPROACH_CONTENT.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStep(idx)}
                className={'relative group p-8 sm:p-10 rounded-2xl border transition-all duration-500 cursor-pointer ' + (
                  isActive
                    ? 'bg-white border-emerald-brand/40 shadow-soft-xl translate-x-2'
                    : 'bg-white/60 border-canvas-border hover:bg-white hover:border-charcoal-200'
                )}
              >
                <div
                  className={'absolute -left-[35px] sm:-left-[51px] lg:-left-[75px] top-10 w-6 h-6 rounded-full border-4 transition-all duration-300 ' + (
                    isActive
                      ? 'bg-emerald-brand border-white shadow-md scale-125'
                      : 'bg-canvas-border border-canvas-warm group-hover:bg-charcoal-400'
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center space-x-3 font-sans">
                      <span
                        className={'text-xs font-semibold uppercase tracking-[0.14em] transition-colors ' + (
                          isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                        )}
                      >
                        STEP {step.number}
                      </span>
                      <span className="text-[11px] font-medium text-gold-deep">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3
                      className={'font-serif text-3xl sm:text-4xl font-medium transition-colors ' + (
                        isActive ? 'text-charcoal-950' : 'text-charcoal-700'
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-canvas-warm border border-canvas-border text-xs text-charcoal-700 font-sans font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-brand" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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

// 5. Refine AboutZalia.tsx
fs.writeFileSync('src/components/AboutZalia.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
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
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border group bg-canvas-warm"
            >
              <Image
                src={ABOUT_CONTENT.image}
                alt="Zalia Properties Architectural Residence"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute top-6 right-6 p-4 rounded-2xl glass-card border border-white/60 shadow-soft-md backdrop-blur-md max-w-xs font-sans">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-brand text-white flex items-center justify-center shadow-sm">
                    <Award className="w-4 h-4 text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                      UK Residential
                    </h4>
                    <p className="text-[10.5px] text-charcoal-500">
                      Curated Spatial Architecture
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
                {ABOUT_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {ABOUT_CONTENT.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-800 font-sans leading-relaxed font-normal"
            >
              {ABOUT_CONTENT.body}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal"
            >
              {ABOUT_CONTENT.extendedText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-canvas-border font-sans"
            >
              {ABOUT_CONTENT.stats.map((stat, i) => (
                <div key={i}>
                  <span className="block text-xs sm:text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-charcoal-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group"
              >
                <span>{ABOUT_CONTENT.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 6. Refine TeamPreview.tsx
fs.writeFileSync('src/components/TeamPreview.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {TEAM_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {TEAM_CONTENT.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
          >
            {TEAM_CONTENT.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TEAM_CONTENT.members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl border border-canvas-border hover:border-emerald-brand/50 overflow-hidden transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 flex flex-col justify-between p-6 sm:p-7"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-emerald-brand transition-colors duration-500" />

              <div>
                <div className="relative w-full aspect-[4/3] rounded-xl bg-canvas-warm border border-canvas-border overflow-hidden mb-6 flex flex-col items-center justify-center p-6 text-center group-hover:bg-emerald-brand transition-colors duration-500">
                  <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />

                  <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-canvas-border shadow-soft-sm flex items-center justify-center text-charcoal-900 font-serif text-2xl font-semibold tracking-wider group-hover:text-emerald-brand group-hover:scale-110 transition-all duration-500">
                    {member.initials}
                  </div>

                  <span className="relative z-10 text-[10.5px] font-sans font-semibold uppercase tracking-widest text-charcoal-500 group-hover:text-white/80 transition-colors duration-500 mt-3">
                    {member.department}
                  </span>
                </div>

                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-semibold text-emerald-brand uppercase tracking-wider block">
                    Executive Partner
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-charcoal-600">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs text-charcoal-500 font-sans leading-relaxed mt-4 font-normal">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-canvas-border flex items-center justify-between text-xs font-sans font-semibold text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                <span className="text-[10px] uppercase tracking-wider">
                  Zalia Leadership
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 7. Refine FinalCTA.tsx
fs.writeFileSync('src/components/FinalCTA.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
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
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
                {FINAL_CTA_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal-950 font-medium leading-[1.04] tracking-tight whitespace-pre-line"
            >
              {FINAL_CTA_CONTENT.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-charcoal-600 font-serif italic max-w-lg"
            >
              &ldquo;{FINAL_CTA_CONTENT.supportingText}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-lg hover:shadow-emerald-subtle group"
              >
                <span>{FINAL_CTA_CONTENT.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-canvas-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-charcoal-600 max-w-lg"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-brand shrink-0" />
                <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-brand shrink-0" />
                <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand">
                  {SITE_METADATA.phone}
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
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

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/50 text-center backdrop-blur-md shadow-soft-sm font-sans">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-brand block">
                  ZALIA PRIVATE CLIENT CONSULTATION
                </span>
                <span className="text-[10.5px] text-charcoal-500">
                  Confidential Property Appraisals &amp; Acquisitions
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

// 8. Refine Footer.tsx
fs.writeFileSync('src/components/Footer.tsx', `'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white text-charcoal-900 border-t border-canvas-border pt-16 sm:pt-20 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5 space-y-6">
            <Link href="#" className="inline-flex items-center space-x-3.5 group">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Zalia Properties Ltd Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-wider text-charcoal-950 uppercase leading-none">
                  ZALIA
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-emerald-brand mt-0.5 leading-none">
                  PROPERTIES LTD
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-600 max-w-sm leading-relaxed font-normal">
              UK residential property acquisition, architectural renovation, and bespoke development.
              Transforming potential into exceptional homes of enduring quality.
            </p>

            <div className="pt-2 space-y-2 text-xs text-charcoal-600">
              <div className="flex items-center space-x-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                <span>{SITE_METADATA.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand">
                  {SITE_METADATA.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-600">
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

          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Architectural Practice
            </h4>
            <div className="p-5 rounded-2xl bg-canvas-warm border border-canvas-border space-y-3">
              <div className="text-xs font-semibold text-charcoal-900">
                UK Residential Development &amp; Acquisition
              </div>
              <p className="text-[11.5px] text-charcoal-500 leading-relaxed">
                Every Zalia development is executed in compliance with UK Building Regulations, NHBC warranties, and heritage preservation standards.
              </p>
              <div className="text-[10px] font-semibold text-emerald-brand uppercase tracking-wider pt-1">
                Invest • Develop • Transform
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-canvas-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <div>
            &copy; {new Date().getFullYear()} Zalia Properties Ltd. {SITE_METADATA.registration}. All rights reserved.
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

console.log('All remaining components refined with Inter typography.');
