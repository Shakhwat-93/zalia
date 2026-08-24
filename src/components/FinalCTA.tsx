'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FINAL_CTA_CONTENT, SITE_METADATA } from '@/data/content';

interface FinalCTAProps {
  onOpenContact: () => void;
}

export default function FinalCTA({ onOpenContact }: FinalCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal-950 font-medium leading-[1.04] tracking-tight whitespace-pre-line"
            >
              HAVE A PROPERTY
              <span className="block text-emerald-brand italic font-normal mt-2">
                WITH POTENTIAL?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-charcoal-600 font-sans"
            >
              Let&apos;s start a conversation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-lg group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={FINAL_CTA_CONTENT.image}
                alt="Zalia Properties Floating Architectural Villa"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
