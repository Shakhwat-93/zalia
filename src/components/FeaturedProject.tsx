'use client';

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
