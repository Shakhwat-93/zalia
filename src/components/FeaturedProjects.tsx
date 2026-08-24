'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';

interface FeaturedProjectsProps {
  onOpenContact: () => void;
}

export default function FeaturedProjects({ onOpenContact }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const [leadProject, ...supportingProjects] = FEATURED_PROJECTS_CONTENT;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              FEATURED PROJECTS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              A SELECTION OF OUR WORK
            </motion.h2>
          </div>

          <button
            onClick={onOpenContact}
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto"
          >
            <span>Inquire About Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 1 Large Main Project Card */}
        {leadProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-canvas-border bg-canvas-warm shadow-soft-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 group"
          >
            <div className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden bg-canvas-warm">
              <Image
                src={leadProject.image}
                alt={leadProject.title}
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <div className="space-y-2">
                <div className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-emerald-brand">
                  {leadProject.location} · {leadProject.category}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
                  {leadProject.title}
                </h3>
                <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
                  {leadProject.description}
                </p>
              </div>

              <div className="pt-4 border-t border-canvas-border">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center space-x-2 text-[13px] font-sans font-medium uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2 Supporting Smaller Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportingProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden border border-canvas-border bg-white p-6 sm:p-8 space-y-6 shadow-soft-md group hover:shadow-soft-xl hover:border-emerald-brand/30 transition-all duration-350"
            >
              <div className="relative h-[280px] sm:h-[340px] w-full rounded-2xl overflow-hidden bg-canvas-warm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-emerald-brand">
                  {project.location} · {project.category}
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-charcoal-600 font-sans leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-canvas-border">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center space-x-2 text-[12.5px] font-sans font-medium uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
