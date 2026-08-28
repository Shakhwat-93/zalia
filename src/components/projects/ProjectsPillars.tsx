'use client';

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
