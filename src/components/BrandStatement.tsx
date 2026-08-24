'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BRAND_STATEMENT_CONTENT } from '@/data/content';

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
                {BRAND_STATEMENT_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight whitespace-pre-line"
            >
              {BRAND_STATEMENT_CONTENT.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-700 font-sans leading-relaxed font-normal"
            >
              {BRAND_STATEMENT_CONTENT.subHeadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-wrap gap-3 text-xs font-sans font-medium text-charcoal-600"
            >
              <div className="px-4 py-2 rounded-full bg-canvas-warm border border-canvas-border">
                Heritage Conservation
              </div>
              <div className="px-4 py-2 rounded-full bg-canvas-warm border border-canvas-border">
                Contemporary Glazed Pavilions
              </div>
              <div className="px-4 py-2 rounded-full bg-canvas-warm border border-canvas-border">
                Structural Reconfiguration
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border group bg-canvas-warm"
            >
              <Image
                src={BRAND_STATEMENT_CONTENT.image}
                alt="Zalia Properties Architectural Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/50 shadow-soft-md backdrop-blur-md font-sans">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-emerald-brand block">
                  HERITAGE • MODERNITY
                </span>
                <span className="text-xs font-serif text-charcoal-900 font-medium">
                  Victorian Structural Refinement with Glazed Pavilion
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
