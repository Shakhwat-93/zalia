'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Hammer, Home, ArrowUpRight } from 'lucide-react';
import { SERVICES_CONTENT } from '@/data/content';

const iconMap = [Search, Hammer, Home];

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {SERVICES_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {SERVICES_CONTENT.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
          >
            {SERVICES_CONTENT.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
          {SERVICES_CONTENT.services.map((service, idx) => {
            const IconComponent = iconMap[idx] || Search;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 sm:p-10 rounded-2xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-sans text-xs font-semibold text-emerald-brand tracking-[0.14em] uppercase px-3 py-1 rounded-full bg-emerald-light border border-emerald-brand/10">
                      STEP {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-center text-charcoal-900 group-hover:bg-emerald-brand group-hover:text-white group-hover:border-emerald-brand transition-all duration-300 shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 mb-3 group-hover:text-emerald-brand transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-[14.5px] text-charcoal-600 font-sans leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-canvas-border flex items-center justify-between text-xs font-sans font-semibold text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                  <span className="uppercase tracking-[0.14em] text-[11px]">
                    Zalia Discipline
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
