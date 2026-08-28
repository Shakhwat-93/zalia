'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ProjectItem } from '@/data/content';

interface ProjectResultProps {
  project: ProjectItem;
}

export default function ProjectResult({ project }: ProjectResultProps) {
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
            THE RESULT
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            A CONSIDERED
            <span className="block text-emerald-brand italic font-normal mt-1">
              RESIDENTIAL HOME.
            </span>
          </motion.h2>
          <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
            A considered transformation, shaped into a home for modern living.
          </p>
        </div>

        {/* Large Result Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[440px] sm:h-[580px] lg:h-[680px] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-xl bg-white group"
        >
          <Image
            src={project.image}
            alt={project.title + ' Transformed Result'}
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </motion.div>

        {/* Minimal Project Metadata Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-canvas-border text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-400 block">
              LOCATION
            </span>
            <span className="font-serif text-2xl font-medium text-charcoal-950">
              {project.location}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-400 block">
              DEVELOPMENT TYPE
            </span>
            <span className="font-serif text-2xl font-medium text-charcoal-950">
              {project.category}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-400 block">
              PORTFOLIO STATUS
            </span>
            <span className="font-serif text-2xl font-medium text-emerald-brand">
              {project.status}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
