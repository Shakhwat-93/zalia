'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Building2, Hammer, Key, Check } from 'lucide-react';
import { SERVICES_CONTENT } from '@/data/content';

const iconMap = [Building2, Hammer, Key];

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-36 border-t border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
              {SERVICES_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
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
            className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal"
          >
            {SERVICES_CONTENT.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES_CONTENT.services.map((service, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white p-8 sm:p-10 rounded-2xl border border-canvas-border hover:border-emerald-brand/40 transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-emerald-brand transition-colors duration-500" />
                <div className="absolute inset-0 bg-emerald-light/0 group-hover:bg-emerald-light/20 transition-colors duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-8 border-b border-canvas-border">
                    <span className="font-serif text-3xl sm:text-4xl text-charcoal-300 group-hover:text-emerald-brand transition-colors duration-300 font-light">
                      {service.number}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-canvas-warm group-hover:bg-emerald-brand group-hover:text-white text-charcoal-800 flex items-center justify-center transition-all duration-300 shadow-soft-sm group-hover:rotate-3">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-brand block">
                      {service.tagline}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-charcoal-600 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-canvas-border/80 space-y-2.5">
                    {service.focus.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2.5 text-xs text-charcoal-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                  <span>Phase {service.number}</span>
                  <div className="flex items-center space-x-1 transition-transform duration-300 group-hover:translate-x-1">
                    <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
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
