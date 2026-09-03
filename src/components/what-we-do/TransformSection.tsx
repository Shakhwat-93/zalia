'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface TransformSectionProps {
  transform?: {
    pillar?: string;
    title?: string;
    description?: string;
    points?: string[];
    image_url?: string;
  };
}

export default function TransformSection({ transform }: TransformSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const displayPillar = transform?.pillar || '02 — TRANSFORM';
  const displayTitle = transform?.title || 'Unlocking Light, Flow & Spatial Volume';
  const displayDesc =
    transform?.description ||
    'We strip back awkward layouts and introduce structural interventions that optimize natural daylight and establish contemporary architectural flow.';
  const displayImage = transform?.image_url || '/images/after-split.webp';
  const points = transform?.points || [
    'Floor-to-ceiling glass apertures and modern rear extensions',
    'Harmonizing heritage brickwork with minimalist steel fenestration',
    'Spatial reconfiguration engineered for fluid modern living',
  ];

  return (
    <section
      id="transform"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Image (60% priority) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={displayImage}
                alt="Zalia Transform Architecture"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-5 space-y-6 text-left order-1 lg:order-2">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {displayPillar}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {displayTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              {displayDesc}
            </motion.p>

            {points && points.length > 0 && (
              <ul className="space-y-2.5 pt-2 text-xs font-sans text-charcoal-700">
                {points.map((pt: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
