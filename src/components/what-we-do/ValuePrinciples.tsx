'use client';

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
