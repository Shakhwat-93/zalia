'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomeIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              WHO WE ARE
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              WE SEE MORE
              <span className="block text-emerald-brand italic font-normal mt-1">
                IN EVERY PROPERTY.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              We look beyond what a property is today to understand what it could become tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="pt-2"
            >
              <Link
                href="/about"
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>Discover Who We Are</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right Architectural Image Frame */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[360px] sm:h-[440px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src="/images/about-zalia.png"
                alt="Zalia Properties Architectural Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
