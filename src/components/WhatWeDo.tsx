'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CONCEPTS = [
  {
    number: '01',
    title: 'ACQUIRE',
    description: 'Find properties with potential.',
  },
  {
    number: '02',
    title: 'TRANSFORM',
    description: 'Reimagine them through thoughtful development.',
  },
  {
    number: '03',
    title: 'CREATE',
    description: 'Deliver refined homes for modern living.',
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {CONCEPTS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 group"
            >
              <span className="font-sans text-xs font-semibold text-emerald-brand uppercase tracking-[0.2em] block">
                {item.number}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 transition-colors group-hover:text-emerald-brand">
                {item.title}
              </h3>
              <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
