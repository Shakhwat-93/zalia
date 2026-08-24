'use client';

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
