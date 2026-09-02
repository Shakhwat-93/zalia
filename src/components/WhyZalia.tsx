'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WHY_ZALIA_CONTENT } from '@/data/content';

interface WhyZaliaProps {
  onOpenContact: () => void;
}

export default function WhyZalia({ onOpenContact }: WhyZaliaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      id="who-we-are"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {WHY_ZALIA_CONTENT.eyebrow}
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight whitespace-pre-line"
            >
              {WHY_ZALIA_CONTENT.heading}
            </motion.h2>

            <div className="space-y-4">
              <p className="text-lg text-emerald-brand font-serif italic">
                {WHY_ZALIA_CONTENT.tagline}
              </p>
              <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg">
                {WHY_ZALIA_CONTENT.body}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>Discover More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative h-[420px] sm:h-[500px] lg:h-[580px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={WHY_ZALIA_CONTENT.image}
                alt="Zalia Properties Architectural Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
