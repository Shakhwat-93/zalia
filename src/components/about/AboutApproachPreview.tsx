'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { number: '01', title: 'IDENTIFY' },
  { number: '02', title: 'ACQUIRE' },
  { number: '03', title: 'TRANSFORM' },
  { number: '04', title: 'REFINE' },
  { number: '05', title: 'CREATE' },
];

export default function AboutApproachPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              METHODOLOGY
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              HOW WE WORK
            </motion.h2>
          </div>

          <Link
            href="/approach"
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Explore Our Approach</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5-step horizontal process */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-2xl bg-canvas-warm border border-canvas-border space-y-4 group hover:border-emerald-brand/40 transition-all duration-300 shadow-soft-sm"
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
