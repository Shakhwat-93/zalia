'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ProjectItem } from '@/data/content';

interface ProjectHeroProps {
  project: ProjectItem;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        {/* Back Link & Meta Header */}
        <motion.div style={{ y: heroY }} className="space-y-6 text-left">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-charcoal-600 hover:text-emerald-brand transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-canvas-warm border border-canvas-border text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {project.tag}
            </span>
            <span className="text-xs font-sans font-medium uppercase tracking-[0.16em] text-charcoal-500">
              {project.location} · {project.category}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.04] max-w-5xl">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-3xl pt-1">
            {project.description}
          </p>
        </motion.div>

        {/* Large Immersive Hero Architectural Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[440px] sm:h-[580px] lg:h-[720px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-soft-sm">
            {project.location} • Status: {project.status}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
