const fs = require('fs');
const path = require('path');

// Ensure directory exists
if (!fs.existsSync('src/components/about')) {
  fs.mkdirSync('src/components/about', { recursive: true });
}

// 1. ABOUT HERO
fs.writeFileSync('src/components/about/AboutHero.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-20">
        
        {/* Top Header Block */}
        <motion.div style={{ y: heroY }} className="max-w-3xl space-y-6 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm">
            <Compass className="w-3.5 h-3.5 text-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-700">
              WHO WE ARE
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.02]">
            WE SEE MORE
            <span className="block text-emerald-brand italic font-normal mt-1 sm:mt-2">
              IN EVERY PROPERTY.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-2xl pt-2">
            We look beyond what a property is today to understand what it could become tomorrow.
          </p>

          <div className="pt-2">
            <a
              href="#story"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>Discover Our Approach</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Immersive Architectural Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[680px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src="/images/about-zalia.png"
              alt="Zalia Properties Architectural Living"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-soft-sm">
            Mayfair, London • Residential Spatial Architecture
          </div>
        </motion.div>

      </div>
    </section>
  );
}
`);

// 2. ABOUT STORY (Section 08)
fs.writeFileSync('src/components/about/AboutStory.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-8 sm:space-y-10 text-left">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
          OUR STORY
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          PROPERTY HAS POTENTIAL.
          <span className="block text-emerald-brand italic font-normal mt-2">
            WE SEE WHAT IT CAN BECOME.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-3xl pt-2"
        >
          Zalia Properties identifies residential properties with potential and transforms them through thoughtful development, renovation and design.
        </motion.p>
      </div>
    </section>
  );
}
`);

// 3. ABOUT PHILOSOPHY (Section 09)
fs.writeFileSync('src/components/about/AboutPhilosophy.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

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
                src="/images/brand-statement.png"
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
              OUR PHILOSOPHY
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              WE DON&apos;T SIMPLY
              <span className="block text-charcoal-950">BUY PROPERTY.</span>
              <span className="block text-emerald-brand italic font-normal mt-2">
                WE SEE POTENTIAL.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-lg"
            >
              We believe every property has an opportunity to become something better. Our approach combines careful acquisition, thoughtful transformation and a focus on creating quality homes.
            </motion.p>

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
`);

// 4. ABOUT PRINCIPLES (Section 11)
fs.writeFileSync('src/components/about/AboutPrinciples.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PRINCIPLES = [
  {
    number: '01',
    title: 'SEE THE POTENTIAL',
    description: 'We look beyond the existing property to understand what it could become.',
  },
  {
    number: '02',
    title: 'TRANSFORM WITH PURPOSE',
    description: 'We approach renovation and development with care, design and practicality.',
  },
  {
    number: '03',
    title: 'CREATE QUALITY',
    description: 'We focus on creating refined homes designed for modern living.',
  },
];

export default function AboutPrinciples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="principles"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-20">
        <div className="max-w-3xl space-y-3">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            WHAT MAKES ZALIA DIFFERENT
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            A THOUGHTFUL WAY
            <span className="block text-emerald-brand italic font-normal mt-1">
              TO DEVELOP PROPERTY.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PRINCIPLES.map((principle, idx) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 sm:p-10 rounded-3xl bg-canvas-warm border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-soft-xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                  {principle.number}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {principle.title}
                </h3>

                <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-canvas-border flex items-center justify-between text-xs font-sans font-medium text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                <span className="uppercase tracking-widest text-[10.5px]">Zalia Principle</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`);

// 5. ABOUT VISUAL STORY (Section 13)
fs.writeFileSync('src/components/about/AboutVisualStory.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutVisualStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              ARCHITECTURAL METAMORPHOSIS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              FROM WHAT IS
              <span className="block text-emerald-brand italic font-normal mt-1">
                TO WHAT COULD BE.
              </span>
            </motion.h2>
            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
              Every project begins with potential and ends with a home thoughtfully shaped for modern life.
            </p>
          </div>

          <Link
            href="/#projects"
            className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Explore Our Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] sm:h-[560px] lg:h-[660px] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-xl bg-white group"
        >
          <Image
            src="/images/3d-transformation.png"
            alt="Zalia Properties Architectural Transformation"
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </motion.div>

      </div>
    </section>
  );
}
`);

// 6. ABOUT APPROACH PREVIEW (Section 16)
fs.writeFileSync('src/components/about/AboutApproachPreview.tsx', `'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { number: '01', title: 'IDENTIFY' },
  { number: '02', title: 'ACQUIRE' },
  { number: '03', title: 'TRANSFORM' },
  { number: '04', title: 'REFINE' },
  { number: '05', title: 'CREATE' },
];

export default function AboutApproachPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              METHODOLOGY
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              HOW WE WORK
            </motion.h2>
          </div>

          <Link
            href="/#approach"
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Explore Our Approach</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5-step horizontal process */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-2xl bg-canvas-warm border border-canvas-border space-y-4 group hover:border-emerald-brand/40 transition-all duration-300 shadow-soft-sm"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
`);

// 7. ABOUT TEAM (Section 17 & 18)
fs.writeFileSync('src/components/about/AboutTeam.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TEAM_CONTENT } from '@/data/content';

interface AboutTeamProps {
  onOpenContact: () => void;
}

export default function AboutTeam({ onOpenContact }: AboutTeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              OUR LEADERSHIP
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              THE PEOPLE
              <span className="block text-emerald-brand italic font-normal mt-1">
                BEHIND ZALIA.
              </span>
            </motion.h2>
          </div>

          <button
            onClick={onOpenContact}
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Meet The Team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-column leadership roster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {TEAM_CONTENT.members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 group"
            >
              <div className="relative w-full aspect-square rounded-3xl bg-white border border-canvas-border flex items-center justify-center text-charcoal-900 font-serif text-3xl font-medium tracking-wider group-hover:text-emerald-brand group-hover:border-emerald-brand/40 transition-all duration-400 shadow-soft-sm">
                {member.initials}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-sans text-charcoal-500 font-normal">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
`);

// 8. ABOUT STATEMENT (Section 19)
fs.writeFileSync('src/components/about/AboutStatement.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-28 sm:py-36 lg:py-52 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-emerald-brand mx-auto">
          ZALIA PERSPECTIVE
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-charcoal-950 leading-[1.04] tracking-tight"
        >
          WE SEE POTENTIAL
          <span className="block text-emerald-brand italic font-normal mt-2">
            WHERE OTHERS SEE POSSIBILITY.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
`);

// 9. ABOUT PAGE (src/app/about/page.tsx)
fs.writeFileSync('src/app/about/page.tsx', `'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutPhilosophy from '@/components/about/AboutPhilosophy';
import AboutPrinciples from '@/components/about/AboutPrinciples';
import AboutVisualStory from '@/components/about/AboutVisualStory';
import AboutApproachPreview from '@/components/about/AboutApproachPreview';
import AboutTeam from '@/components/about/AboutTeam';
import AboutStatement from '@/components/about/AboutStatement';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* Reusable Navbar with active state */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 05 — Page Hero */}
      <AboutHero />

      {/* 08 — Introduction / Our Story */}
      <AboutStory />

      {/* 09 — Brand Philosophy */}
      <AboutPhilosophy />

      {/* 11 — What Makes Zalia Different */}
      <AboutPrinciples />

      {/* 13 — Architectural Story */}
      <AboutVisualStory />

      {/* 16 — Our Approach Preview */}
      <AboutApproachPreview />

      {/* 17 & 18 — Leadership Team Introduction */}
      <AboutTeam onOpenContact={handleOpenContact} />

      {/* 19 — Final Philosophy Statement */}
      <AboutStatement />

      {/* 20 — Reusable Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 21 — Reusable Footer */}
      <Footer />

      {/* Global Interactive Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
`);

console.log('About page modular components generated.');
