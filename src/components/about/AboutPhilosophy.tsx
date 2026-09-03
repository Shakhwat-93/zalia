'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AboutPhilosophyProps {
  philosophy?: {
    eyebrow?: string;
    heading?: string;
    body_p1?: string;
    body_p2?: string;
    image_url?: string;
  };
}

export default function AboutPhilosophy({ philosophy }: AboutPhilosophyProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const displayEyebrow = philosophy?.eyebrow || 'OUR PHILOSOPHY';
  const displayHeading = philosophy?.heading || "WE DON'T SIMPLY DEVELOP.\nWE REIMAGINE LIVING.";
  const displayP1 =
    philosophy?.body_p1 ||
    'We believe every property has an opportunity to become something better. Our approach combines careful acquisition, thoughtful transformation and a focus on creating quality homes.';
  const displayP2 = philosophy?.body_p2 || '';
  const displayImage = philosophy?.image_url || '/images/brand-statement.webp';

  const headingLines = displayHeading.split('\n');

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Architectural Image */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-white group"
            >
              <Image
                src={displayImage}
                alt="Zalia Properties Architectural Philosophy"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          {/* Right: Philosophy Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {displayEyebrow}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {headingLines[0]}
              {headingLines[1] && (
                <span className="block text-emerald-brand italic font-normal mt-2">
                  {headingLines.slice(1).join(' ')}
                </span>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              {displayP1}
            </motion.p>

            {displayP2 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
              >
                {displayP2}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2"
            >
              <a
                href="#principles"
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>Our Approach</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
