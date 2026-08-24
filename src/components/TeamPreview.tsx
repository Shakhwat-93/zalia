'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TEAM_CONTENT } from '@/data/content';

export default function TeamPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="team"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {TEAM_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {TEAM_CONTENT.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
          >
            {TEAM_CONTENT.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TEAM_CONTENT.members.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl border border-canvas-border hover:border-emerald-brand/50 overflow-hidden transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 flex flex-col justify-between p-6 sm:p-7"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-emerald-brand transition-colors duration-500" />

              <div>
                <div className="relative w-full aspect-[4/3] rounded-xl bg-canvas-warm border border-canvas-border overflow-hidden mb-6 flex flex-col items-center justify-center p-6 text-center group-hover:bg-emerald-brand transition-colors duration-500">
                  <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />

                  <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-canvas-border shadow-soft-sm flex items-center justify-center text-charcoal-900 font-serif text-2xl font-semibold tracking-wider group-hover:text-emerald-brand group-hover:scale-110 transition-all duration-500">
                    {member.initials}
                  </div>

                  <span className="relative z-10 text-[10.5px] font-sans font-semibold uppercase tracking-widest text-charcoal-500 group-hover:text-white/80 transition-colors duration-500 mt-3">
                    {member.department}
                  </span>
                </div>

                <div className="space-y-1 font-sans">
                  <span className="text-[10px] font-semibold text-emerald-brand uppercase tracking-wider block">
                    Executive Partner
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-charcoal-600">
                    {member.role}
                  </p>
                </div>

                <p className="text-xs text-charcoal-500 font-sans leading-relaxed mt-4 font-normal">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-canvas-border flex items-center justify-between text-xs font-sans font-semibold text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                <span className="text-[10px] uppercase tracking-wider">
                  Zalia Leadership
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
