'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProjectsIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-10 text-left">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          PORTFOLIO PHILOSOPHY
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          A DIFFERENT
          <span className="block text-emerald-brand italic font-normal mt-2">
            WAY TO SEE PROPERTY.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-3xl pt-2"
        >
          Every project begins with potential — and the opportunity to create something considered, functional and lasting.
        </motion.p>
      </div>
    </section>
  );
}
