'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight text-left"
          >
            THE PEOPLE BEHIND ZALIA
          </motion.h2>

          <Link
            href="/team"
            className="btn-magnetic inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group self-start sm:self-auto shrink-0"
          >
            <span>Meet The Team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
          {TEAM_CONTENT.members.slice(0, 3).map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 group"
            >
              <div className="relative w-full aspect-square rounded-2xl bg-white border border-canvas-border overflow-hidden flex items-center justify-center text-charcoal-900 font-serif text-3xl font-medium tracking-wider group-hover:border-emerald-brand/40 transition-all duration-400 shadow-soft-sm">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    loading="lazy"
                    quality={82}
                    className="object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <span className="group-hover:text-emerald-brand transition-colors">
                    {member.initials}
                  </span>
                )}
              </div>

              <div className="space-y-1 text-left">
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
