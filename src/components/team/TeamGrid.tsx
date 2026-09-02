'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { TEAM_CONTENT } from '@/data/content';

export default function TeamGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-20 sm:py-28 lg:py-36 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-canvas-border">
          <div className="space-y-2 text-left">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              EXECUTIVE ROSTER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal-950">
              DIRECTORS &amp; LEADS
            </h2>
          </div>
          <span className="text-xs font-sans font-semibold uppercase tracking-widest text-charcoal-500 self-start sm:self-auto">
            {TEAM_CONTENT.members.length} LEADERS • UK RESIDENTIAL
          </span>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {TEAM_CONTENT.members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-white border border-canvas-border p-6 sm:p-7 space-y-6 shadow-soft-sm hover:shadow-soft-xl hover:border-emerald-brand/40 transition-all duration-400 group text-left"
            >
              {/* Portrait Aspect Ratio */}
              <div className="relative w-full aspect-[4/5] rounded-2xl bg-canvas-warm overflow-hidden flex items-center justify-center text-charcoal-900 font-serif text-3xl font-medium">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    loading="lazy"
                    quality={82}
                    className="object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-104"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <span className="group-hover:text-emerald-brand transition-colors">
                    {member.initials}
                  </span>
                )}
              </div>

              {/* Information Block */}
              <div className="space-y-1.5 pt-1">
                <h3 className="font-serif text-2xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-charcoal-500 font-normal">
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
