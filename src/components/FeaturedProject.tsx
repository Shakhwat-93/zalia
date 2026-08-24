'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { FEATURED_PROJECT_CONTENT } from '@/data/content';

interface FeaturedProjectProps {
  onOpenContact: () => void;
}

export default function FeaturedProject({ onOpenContact }: FeaturedProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 0.98]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
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

          <div className="flex items-center space-x-4 text-xs font-mono text-charcoal-500 uppercase tracking-widest">
            <span>PORTFOLIO SPECIFICATION</span>
            <span>•</span>
            <span className="text-emerald-brand font-semibold">LONDON MONOGRAPH</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-white border border-canvas-border shadow-soft-xl overflow-hidden group"
        >
          <div className="relative w-full h-[400px] sm:h-[540px] lg:h-[680px] overflow-hidden bg-charcoal-950">
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              className="relative w-full h-full"
            >
              <Image
                src={FEATURED_PROJECT_CONTENT.image}
                alt="Zalia Properties Featured London Residence"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-103"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent pointer-events-none" />

            <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
              <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-charcoal-950 text-[11px] font-mono font-semibold uppercase tracking-wider shadow-sm">
                {FEATURED_PROJECT_CONTENT.tag}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-brand text-white text-[11px] font-mono font-semibold uppercase tracking-wider shadow-sm flex items-center space-x-1.5">
                <MapPin className="w-3 h-3" />
                <span>{FEATURED_PROJECT_CONTENT.location}</span>
              </span>
            </div>

            <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 z-10 text-white">
              <div className="max-w-3xl space-y-3">
                <span className="text-[11px] font-mono text-gold-accent font-semibold uppercase tracking-widest block">
                  {FEATURED_PROJECT_CONTENT.category}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                  {FEATURED_PROJECT_CONTENT.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
                {FEATURED_PROJECT_CONTENT.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {FEATURED_PROJECT_CONTENT.scope.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-canvas-warm border border-canvas-border text-charcoal-700 text-xs font-mono font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <div className="text-left lg:text-right">
                <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-widest block">
                  Completion Year
                </span>
                <span className="font-serif text-2xl text-charcoal-900 font-semibold">
                  {FEATURED_PROJECT_CONTENT.year}
                </span>
              </div>

              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group"
              >
                <span>Explore Project &amp; Acquire</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
