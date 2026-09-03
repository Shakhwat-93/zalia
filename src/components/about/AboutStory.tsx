'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AboutStoryProps {
  intro?: {
    eyebrow?: string;
    heading?: string;
    narrative?: string;
  };
}

export default function AboutStory({ intro }: AboutStoryProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const displayEyebrow = intro?.eyebrow || 'OUR STORY';
  const displayHeading = intro?.heading || 'PROPERTY HAS POTENTIAL.\nWE SEE WHAT IT CAN BECOME.';
  const displayNarrative =
    intro?.narrative ||
    'Zalia Properties identifies residential properties with potential and transforms them through thoughtful development, renovation and design.';

  const headingLines = displayHeading.split('\n');

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-10 text-left">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          {displayEyebrow}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          {headingLines[0]}
          {headingLines[1] && (
            <span className="block text-emerald-brand italic font-normal mt-2">
              {headingLines.slice(1).join(' ')}
            </span>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-3xl pt-2"
        >
          {displayNarrative}
        </motion.p>
      </div>
    </section>
  );
}
