'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
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
      <div className="absolute inset-0 bg-architectural-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
                {FINAL_CTA_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-charcoal-950 font-medium leading-[1.04] tracking-tight whitespace-pre-line"
            >
              {FINAL_CTA_CONTENT.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-charcoal-600 font-serif italic max-w-lg"
            >
              &ldquo;{FINAL_CTA_CONTENT.supportingText}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-soft-lg hover:shadow-emerald-subtle group"
              >
                <span>{FINAL_CTA_CONTENT.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-canvas-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal-600 max-w-lg"
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-brand shrink-0" />
                <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand font-mono">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-brand shrink-0" />
                <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand font-mono">
                  {SITE_METADATA.phone}
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
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

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/50 text-center backdrop-blur-md shadow-soft-sm">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-emerald-brand block">
                  ZALIA PRIVATE CLIENT CONSULTATION
                </span>
                <span className="text-[10px] text-charcoal-500">
                  Confidential Property Appraisals &amp; Acquisitions
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
