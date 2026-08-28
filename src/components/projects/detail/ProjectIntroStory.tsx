'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ProjectItem } from '@/data/content';

interface ProjectIntroStoryProps {
  project: ProjectItem;
}

export default function ProjectIntroStory({ project }: ProjectIntroStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20 lg:space-y-28">
        
        {/* Editorial Introduction */}
        <div className="max-w-4xl space-y-6 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            THE PROJECT
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            SEEING WHAT
            <span className="block text-emerald-brand italic font-normal mt-1">
              COULD BE.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal pt-2"
          >
            Every project begins by understanding what exists — and what it could become. The existing property had strong residential character and spatial integrity, presenting an ideal canvas for architectural modernization and refined living zones.
          </motion.p>
        </div>

        {/* The Starting Point & Before Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              THE STARTING POINT
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 leading-tight">
              Unlocking Unrealized Volume & Spatial Flow
            </h3>

            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
              Prior to acquisition, the layout constrained natural light and lacked modern environmental performance. Our development blueprint focused on opening axial sightlines, integrating double-height glass apertures, and specifying enduring natural masonry.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ y: imageY }}
              className="relative h-[380px] sm:h-[460px] lg:h-[520px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={project.beforeImage || '/images/before-split.jpg'}
                alt={project.title + ' Starting Point'}
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-charcoal-950/90 backdrop-blur-md text-[10.5px] font-sans font-semibold uppercase tracking-wider text-white shadow-sm">
                INITIAL PROPERTY CONDITION
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
