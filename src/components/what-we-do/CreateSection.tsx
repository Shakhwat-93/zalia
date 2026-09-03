'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CreateSectionProps {
  create?: {
    pillar?: string;
    title?: string;
    description?: string;
    points?: string[];
    image_url?: string;
  };
}

export default function CreateSection({ create }: CreateSectionProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const displayPillar = create?.pillar || '03 — CREATE';
  const displayTitle = create?.title || 'Delivering Exceptional Finished Homes';
  const displayDesc =
    create?.description ||
    'Every home is brought to completion with tactile natural materials, bespoke cabinetry, and tailored finishes designed for enduring longevity.';
  const displayImage = create?.image_url || '/images/brand-statement.webp';
  const points = create?.points || [
    'Turnkey delivery with comprehensive documentation',
    'Natural Portuguese limestone, bespoke oak joinery, and artisanal metalwork',
    'Concealed architectural climate control and ambient lighting scenes',
  ];

  return (
    <section
      id="create"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-6 text-left">
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

            <div className="pt-2">
              <Link
                href="/projects"
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>Explore Our Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Image (60% priority) */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[520px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-white group"
            >
              <Image
                src={displayImage}
                alt="Zalia Create Finished Living Space"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
