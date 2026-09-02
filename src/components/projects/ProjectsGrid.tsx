'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';

interface ProjectsGridProps {
  onOpenContact: () => void;
}

export default function ProjectsGrid({ onOpenContact }: ProjectsGridProps) {
  const [filter, setFilter] = useState<'ALL' | 'CURRENT' | 'COMPLETED'>('ALL');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const filteredProjects = FEATURED_PROJECTS_CONTENT.filter((p) => {
    if (filter === 'ALL') return true;
    return p.status === filter;
  });

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-20">
        
        {/* Header with Minimal Filter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-canvas-border">
          <div className="space-y-3">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              SELECTED WORKS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              ARCHITECTURAL PORTFOLIO
            </motion.h2>
          </div>

          {/* Minimal 3-Tab Filter */}
          <div className="flex items-center space-x-1.5 p-1.5 rounded-full bg-white border border-canvas-border shadow-soft-sm self-start sm:self-auto font-sans">
            {(['ALL', 'CURRENT', 'COMPLETED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={'px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ' + (
                  filter === tab
                    ? 'bg-[#07381E] text-white shadow-xs'
                    : 'text-charcoal-500 hover:text-charcoal-950'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="space-y-12 sm:space-y-16">
          {filteredProjects.map((project, idx) => {
            const isFeaturedLarge = project.featured;

            if (isFeaturedLarge) {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border bg-white p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-soft-xl group"
                >
                  <Link
                    href={'/projects/' + project.slug}
                    className="lg:col-span-7 relative h-[360px] sm:h-[480px] lg:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden bg-canvas-warm block"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={95}
                      className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10.5px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm">
                      {project.status}
                    </div>
                  </Link>

                  <div className="lg:col-span-5 space-y-6 lg:pl-4 text-left">
                    <div className="space-y-3">
                      <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand block">
                        {project.location} · {project.category}
                      </span>
                      <Link href={'/projects/' + project.slug} className="block group-hover:text-emerald-brand transition-colors">
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-950 leading-[1.08]">
                          {project.title}
                        </h3>
                      </Link>
                      <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-canvas-border flex flex-wrap items-center gap-4">
                      <Link
                        href={'/projects/' + project.slug}
                        className="btn-magnetic inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>

                      <button
                        onClick={onOpenContact}
                        className="inline-flex items-center space-x-2 text-[12.5px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-600 hover:text-charcoal-950 transition-colors"
                      >
                        <span>Inquire</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl sm:rounded-[2rem] overflow-hidden border border-canvas-border bg-white p-6 sm:p-8 space-y-6 shadow-soft-md hover:shadow-soft-xl hover:border-emerald-brand/30 transition-all duration-350 group"
              >
                <Link
                  href={'/projects/' + project.slug}
                  className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-canvas-warm block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    quality={95}
                    className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10.5px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm">
                    {project.status}
                  </div>
                </Link>

                <div className="space-y-3 text-left">
                  <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand block">
                    {project.location} · {project.category}
                  </span>
                  <Link href={'/projects/' + project.slug} className="block group-hover:text-emerald-brand transition-colors">
                    <h4 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950">
                      {project.title}
                    </h4>
                  </Link>
                  <p className="text-sm sm:text-base text-charcoal-600 font-sans leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-canvas-border flex items-center justify-between">
                  <Link
                    href={'/projects/' + project.slug}
                    className="inline-flex items-center space-x-2 text-[12.5px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <button
                    onClick={onOpenContact}
                    className="text-xs font-sans font-medium uppercase tracking-wider text-charcoal-400 hover:text-charcoal-700 transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
