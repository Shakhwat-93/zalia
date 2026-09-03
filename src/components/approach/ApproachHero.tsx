'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ApproachHeroProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  image?: string;
}

export default function ApproachHero({
  eyebrow,
  heading,
  description,
  image,
}: ApproachHeroProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const displayEyebrow = eyebrow || 'OUR APPROACH';
  const displayHeading = heading || 'A DISCIPLINED\nPHILOSOPHY.';
  const displayDesc =
    description ||
    'From initial acquisition through spatial reconfiguration and bespoke craft, our five-stage methodology turns overlooked properties into exceptional British residences.';
  const displayImage = image || '/images/hero-floating-villa.webp';

  const headingLines = displayHeading.split('\n');

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        {/* Editorial Text Block */}
        <motion.div style={{ y: heroY }} className="space-y-6 max-w-4xl text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            {displayEyebrow}
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.02]">
            {headingLines[0]}
            {headingLines[1] && (
              <span className="block text-emerald-brand italic font-normal mt-1">
                {headingLines.slice(1).join(' ')}
              </span>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-2xl pt-2">
            {displayDesc}
          </p>
        </motion.div>

        {/* Large Architectural Photography Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[400px] sm:h-[520px] lg:h-[640px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src={displayImage}
              alt="Zalia Properties Architectural Method"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
