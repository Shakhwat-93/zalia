'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

export default function WhatWeDoHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-20">
        
        {/* Editorial Text Header */}
        <motion.div style={{ y: heroY }} className="max-w-3xl space-y-6 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm">
            <Compass className="w-3.5 h-3.5 text-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-700">
              WHAT WE DO
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.02]">
            FROM POTENTIAL
            <span className="block text-emerald-brand italic font-normal mt-1 sm:mt-2">
              TO POSSIBILITY.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-2xl pt-2">
            We identify residential properties with potential, transform them thoughtfully, and create homes designed for modern living.
          </p>

          <div className="pt-2">
            <Link
              href="/#projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Large Architectural Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[680px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src="/images/what-we-do.jpg"
              alt="Zalia Properties Architectural Scope"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-soft-sm">
            Acquisition • Structural Transformation • Turnkey Creation
          </div>
        </motion.div>

      </div>
    </section>
  );
}
