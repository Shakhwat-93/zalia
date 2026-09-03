'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const DEFAULT_PILLARS = [
  {
    number: '01',
    title: 'ACQUIRE',
    sentence: 'Identify residential properties with genuine potential.',
    is_active: true,
  },
  {
    number: '02',
    title: 'TRANSFORM',
    sentence: 'Reimagine spaces through thoughtful design and renovation.',
    is_active: true,
  },
  {
    number: '03',
    title: 'CREATE',
    sentence: 'Deliver refined homes with lasting quality.',
    is_active: true,
  },
];

interface HomePillarsProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    primary_cta_label?: string;
    primary_cta_href?: string;
    metadata?: {
      pillars?: typeof DEFAULT_PILLARS;
    };
  };
}

export default function HomePillars({ data }: HomePillarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const eyebrow = data?.eyebrow || 'WHAT WE DO';
  const headline = data?.headline || 'FROM POTENTIAL TO POSSIBILITY.';
  const ctaLabel = data?.primary_cta_label || 'Explore What We Do';
  const ctaHref = data?.primary_cta_href || '/what-we-do';
  const pillars = (data?.metadata?.pillars || DEFAULT_PILLARS).filter(
    (p) => p.is_active !== false
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {eyebrow}
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {headline.includes('TO POSSIBILITY') ? (
                <>
                  FROM POTENTIAL
                  <span className="block text-emerald-brand italic font-normal mt-1">
                    TO POSSIBILITY.
                  </span>
                </>
              ) : (
                headline
              )}
            </motion.h2>
          </div>

          <Link
            href={ctaHref}
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Three Minimal Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.number || idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-canvas-border bg-white p-8 sm:p-10 space-y-6 shadow-soft-sm hover:shadow-soft-xl hover:border-emerald-brand/35 transition-all duration-350 flex flex-col justify-between group text-left"
            >
              <div className="space-y-4">
                <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 tracking-tight">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-2 border-t border-canvas-border/80">
                {pillar.sentence}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
