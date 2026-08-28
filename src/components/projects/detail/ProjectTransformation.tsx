'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CONCEPTS = [
  {
    number: '01',
    title: 'SPACE',
    description: 'Creating an intuitive, fluid connection between formal living and courtyard daylighting.',
  },
  {
    number: '02',
    title: 'LIGHT',
    description: 'Framing double-height floor-to-ceiling glass to draw London natural illumination deep inside.',
  },
  {
    number: '03',
    title: 'MATERIAL',
    description: 'Specifying honed English limestone, dark-stained timber and slimline architectural steel.',
  },
  {
    number: '04',
    title: 'DETAIL',
    description: 'Bespoke architectural joinery, acoustic floor dampening, and concealed climate engineering.',
  },
];

export default function ProjectTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            DEVELOPMENT DISCIPLINE
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            TRANSFORMING
            <span className="block text-emerald-brand italic font-normal mt-1">
              THE POTENTIAL.
            </span>
          </motion.h2>
          <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
            Through thoughtful design, renovation and structural precision, the residence was reshaped around modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CONCEPTS.map((concept, idx) => (
            <motion.div
              key={concept.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1 hover:shadow-soft-lg space-y-4 text-left"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                {concept.number}
              </span>
              <h3 className="font-serif text-2xl font-medium text-charcoal-950">
                {concept.title}
              </h3>
              <p className="text-sm text-charcoal-600 font-sans leading-relaxed font-normal">
                {concept.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
