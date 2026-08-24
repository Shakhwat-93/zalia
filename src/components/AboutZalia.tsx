'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';
import { ABOUT_CONTENT } from '@/data/content';

interface AboutZaliaProps {
  onOpenContact: () => void;
}

export default function AboutZalia({ onOpenContact }: AboutZaliaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border group bg-canvas-warm"
            >
              <Image
                src={ABOUT_CONTENT.image}
                alt="Zalia Properties Architectural Residence"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute top-6 right-6 p-4 rounded-2xl glass-card border border-white/60 shadow-soft-md backdrop-blur-md max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-brand text-white flex items-center justify-center shadow-sm">
                    <Award className="w-4 h-4 text-gold-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                      UK Residential
                    </h4>
                    <p className="text-[10px] text-charcoal-500">
                      Curated Spatial Architecture
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
                {ABOUT_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {ABOUT_CONTENT.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-800 leading-relaxed font-normal"
            >
              {ABOUT_CONTENT.body}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal"
            >
              {ABOUT_CONTENT.extendedText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-canvas-border"
            >
              {ABOUT_CONTENT.stats.map((stat, i) => (
                <div key={i}>
                  <span className="block text-xs sm:text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-charcoal-400 uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4"
            >
              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group"
              >
                <span>{ABOUT_CONTENT.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
