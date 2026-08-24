'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WORDS = [
  'IDENTIFY',
  'ACQUIRE',
  'TRANSFORM',
  'REFINE',
  'CREATE',
];

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          OUR APPROACH
        </div>

        <div className="flex flex-wrap gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-6 items-baseline">
          {WORDS.map((word, idx) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center space-x-6 sm:space-x-8"
            >
              <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium tracking-tight hover:text-emerald-brand transition-colors cursor-default">
                {word}
              </span>
              {idx < WORDS.length - 1 && (
                <span className="text-charcoal-300 font-serif text-3xl sm:text-4xl font-light hidden sm:inline">
                  /
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
