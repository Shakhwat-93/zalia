'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BRAND_STATEMENT_CONTENT } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.98]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
                {BRAND_STATEMENT_CONTENT.eyebrow}
              </span>
            </div>

            <div className="space-y-2 overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl xl:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
              >
                PROPERTY HAS POTENTIAL.
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl xl:text-6xl text-emerald-brand font-normal italic leading-[1.08] tracking-tight"
              >
                WE SEE WHAT IT CAN BECOME.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl font-serif text-charcoal-800 leading-relaxed italic border-l-2 border-gold-brand pl-6"
            >
              &ldquo;{BRAND_STATEMENT_CONTENT.subHeadline}&rdquo;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal"
            >
              {BRAND_STATEMENT_CONTENT.expandedCopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4 flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-charcoal-700"
            >
              <a
                href="#approach"
                className="inline-flex items-center space-x-2 text-charcoal-950 hover:text-emerald-brand transition-colors group"
              >
                <span>Read Our Methodology</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY, scale: imageScale }}
              className="relative h-[400px] sm:h-[500px] lg:h-[560px] w-full rounded-2xl overflow-hidden shadow-soft-xl border border-canvas-border group bg-canvas-warm"
            >
              <Image
                src={BRAND_STATEMENT_CONTENT.image}
                alt="Zalia Properties Victorian Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-soft-md">
                <div>
                  <p className="text-[11px] font-semibold text-charcoal-900 uppercase tracking-wider">
                    Victorian Heritage Transformation
                  </p>
                  <p className="text-[10px] text-charcoal-500">
                    Integration of Contemporary Light Corridor &amp; Glass Wing
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-brand font-semibold px-2 py-0.5 rounded bg-emerald-light">
                  CASE 01
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
