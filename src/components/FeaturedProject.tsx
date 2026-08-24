'use client';

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
              OUR PROJECTS
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            SELECTED WORK
          </motion.h2>
        </div>

        <div className="relative rounded-3xl bg-white border border-canvas-border overflow-hidden shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
          <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden bg-canvas-warm group">
            <Image
              src={FEATURED_PROJECT_CONTENT.image}
              alt={FEATURED_PROJECT_CONTENT.title}
              fill
              quality={95}
              className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-full glass-card border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-emerald-brand" />
              <span>{FEATURED_PROJECT_CONTENT.location}</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <div className="space-y-2">
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.14em] text-emerald-brand">
                {FEATURED_PROJECT_CONTENT.category}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
                {FEATURED_PROJECT_CONTENT.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-2">
                {FEATURED_PROJECT_CONTENT.description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-charcoal-400 block">
                DEVELOPMENT SCOPE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURED_PROJECT_CONTENT.scope.map((item, idx) => (
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
