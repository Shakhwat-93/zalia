'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';

export default function HomeProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Only 3 featured projects on the homepage
  const selectedProjects = FEATURED_PROJECTS_CONTENT.slice(0, 3);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              PORTFOLIO HIGHLIGHTS
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              SELECTED PROJECTS
            </motion.h2>
          </div>

          <Link
            href="/projects"
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Compact Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selectedProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl overflow-hidden border border-canvas-border bg-white p-6 space-y-6 shadow-soft-sm hover:shadow-soft-xl hover:border-emerald-brand/35 transition-all duration-350 group flex flex-col justify-between"
            >
              <div className="space-y-5 text-left">
                <Link
                  href={'/projects/' + project.slug}
                  className="relative h-[260px] sm:h-[300px] w-full rounded-2xl overflow-hidden bg-canvas-warm block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="lazy"
                    quality={85}
                    className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10px] font-sans font-semibold uppercase tracking-wider text-charcoal-900 shadow-sm">
                    {project.status}
                  </div>
                </Link>

                <div className="space-y-2">
                  <div className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-emerald-brand">
                    {project.location} · {project.category}
                  </div>
                  <Link href={'/projects/' + project.slug} className="block group-hover:text-emerald-brand transition-colors">
                    <h3 className="font-serif text-2xl font-medium text-charcoal-950 leading-tight">
                      {project.title}
                    </h3>
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-canvas-border text-left">
                <Link
                  href={'/projects/' + project.slug}
                  className="inline-flex items-center space-x-2 text-[12.5px] font-sans font-medium uppercase tracking-[0.14em] text-charcoal-950 group-hover:text-emerald-brand transition-colors"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
