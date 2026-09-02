'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomeCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand mx-auto">
          START A DIALOGUE
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-charcoal-950 font-medium leading-[1.04] tracking-tight"
        >
          HAVE A PROPERTY
          <span className="block text-emerald-brand italic font-normal mt-2">
            WITH POTENTIAL?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-charcoal-600 font-sans font-normal"
        >
          Let&apos;s start a conversation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="pt-2"
        >
          <Link
            href="/contact"
            className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-lg group"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
