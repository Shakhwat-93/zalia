'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div style={{ y: heroY }} className="space-y-6 max-w-4xl text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            CONNECT WITH ZALIA
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.02]">
            LET&apos;S START A
            <span className="block text-emerald-brand italic font-normal mt-1">
              CONVERSATION.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-2xl pt-2">
            Whether you are considering a direct property sale, presenting an off-market opportunity, or exploring joint development, our acquisitions team treats every enquiry with discretion and rigor.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
