'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CAPABILITIES = [
  {
    number: '01',
    title: 'ACQUIRE',
    anchor: '#acquire',
  },
  {
    number: '02',
    title: 'TRANSFORM',
    anchor: '#transform',
  },
  {
    number: '03',
    title: 'CREATE',
    anchor: '#create',
  },
];

export default function CoreCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          WHAT WE DO
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CAPABILITIES.map((cap, idx) => (
            <motion.a
              key={cap.number}
              href={cap.anchor}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 sm:p-10 rounded-3xl bg-canvas-warm border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1 hover:shadow-soft-lg flex flex-col justify-between"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block mb-6">
                {cap.number}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                {cap.title}
              </h2>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
