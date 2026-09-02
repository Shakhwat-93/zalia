'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function HomeStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-36 lg:py-48 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-emerald-brand mx-auto">
          ZALIA PERSPECTIVE
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-charcoal-950 leading-[1.04] tracking-tight"
        >
          PROPERTY HAS POTENTIAL.
          <span className="block text-emerald-brand italic font-normal mt-3">
            WE SEE WHAT IT CAN BECOME.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
