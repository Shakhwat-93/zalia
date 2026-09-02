'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-24 sm:pt-28 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-canvas overflow-hidden flex flex-col items-center justify-center min-h-[92svh] lg:min-h-[96svh]"
    >
      <motion.div
        style={{ scale: heroScale }}
        className="relative w-full max-w-[1440px] mx-auto h-[620px] sm:h-[720px] lg:h-[800px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between p-7 sm:p-12 lg:p-16 border border-white/10 isolate"
      >
        {/* Background Architectural Canvas with Subtle Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-floating-villa.jpg"
            alt="Zalia Properties Architectural Villa"
            fill
            priority
            quality={95}
            className="object-cover object-center brightness-[0.78] contrast-[1.05]"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55 pointer-events-none" />
          <div className="absolute inset-0 bg-[#07381E]/15 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Top Header Eyebrow Badges */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-sans"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#EBF2EE]" />
            <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]">
              ZALIA PROPERTIES LTD
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-sans text-[11px] font-medium tracking-wider uppercase"
          >
            <span>Mayfair, London • UK Residential</span>
          </motion.div>
        </div>

        {/* Hero Narrative & Primary CTAs */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 max-w-2xl space-y-6 sm:space-y-8 my-auto py-6 text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-white leading-[1.02]"
          >
            <span className="block text-white">WE BUY.</span>
            <span className="block text-[#EBF2EE] italic font-normal">WE TRANSFORM.</span>
            <span className="block text-white">WE CREATE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg lg:text-xl text-white/90 font-sans leading-relaxed font-normal max-w-xl"
          >
            We identify residential properties with potential and transform them into exceptional homes.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href="/projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white text-charcoal-950 hover:bg-[#07381E] hover:text-white text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-xl group"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300"
            >
              <span>Let&apos;s Talk</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Subtle Bottom Architectural Note */}
        <div className="relative z-10 text-left pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/60 font-sans">
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px]">
            Acquisition • Renovation • Development
          </span>
          <span className="hidden md:inline tracking-wider uppercase text-[10.5px]">
            Prime London &amp; Home Counties
          </span>
        </div>
      </motion.div>
    </section>
  );
}
