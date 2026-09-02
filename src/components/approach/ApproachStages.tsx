'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, KeyRound, Compass, Sparkles, Home } from 'lucide-react';

const DETAILED_STAGES = [
  {
    number: '01',
    name: 'IDENTIFY',
    title: "Understand The Property's Potential",
    icon: Search,
    summary:
      'We look past cosmetic decay, awkward floorplans, and dated finishes to uncover inherent volume, daylight orientation, and structural possibilities.',
    details: [
      'Comprehensive spatial volume & daylight orientation audit',
      'Structural feasibility and load-bearing layout exploration',
      'Unlocking overlooked residential potential in prime UK enclaves',
    ],
  },
  {
    number: '02',
    name: 'ACQUIRE',
    title: 'Select Opportunities With Genuine Potential',
    icon: KeyRound,
    summary:
      'Disciplined property acquisition backed by rigorous underwriting. We only commit to properties where our architectural vision can unlock meaningful value.',
    details: [
      'Strict residential underwriting and heritage compliance review',
      'Direct, off-market, and discreet acquisition networks',
      'Decisive institutional capitalization with long-term perspective',
    ],
  },
  {
    number: '03',
    name: 'TRANSFORM',
    title: 'Reimagine The Space Through Thoughtful Design',
    icon: Compass,
    summary:
      'Structural reconfiguration that liberates interior flow. Introducing floor-to-ceiling glass pavilions, double-height volumes, and courtyard integration.',
    details: [
      'Removal of compartmentalized walls in favor of fluid living zones',
      'Seamless glass apertures, skylights, and indoor-outdoor transitions',
      'Harmonizing heritage masonry with clean architectural lines',
    ],
  },
  {
    number: '04',
    name: 'REFINE',
    title: 'Focus On Materials, Details And Quality',
    icon: Sparkles,
    summary:
      'Every tactile touchpoint is selected with permanence in mind. Natural Portuguese limestone, oiled oak joinery, slimline steel fenestration, and silent acoustic envelopes.',
    details: [
      'Authentic natural stone, bespoke cabinetry, and tailored steelwork',
      'Concealed architectural climate control, lighting scenes, and audio',
      'Micro-level tolerances and artisanal finishes throughout',
    ],
  },
  {
    number: '05',
    name: 'CREATE',
    title: 'Deliver Exceptional Homes',
    icon: Home,
    summary:
      'The culmination of the process: complete, turnkey residences designed around effortless luxury, timeless British character, and enduring longevity.',
    details: [
      'Turnkey move-in readiness with curated interior detailing',
      'Homes conceived for daily warmth and generational resilience',
      'An elevated residential standard true to the Zalia signature',
    ],
  },
];

export default function ApproachStages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 lg:space-y-24">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            THE FIVE PHASES
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            HOW A PROPERTY
            <span className="block text-emerald-brand italic font-normal mt-1">
              BECOMES A ZALIA HOME.
            </span>
          </motion.h2>
        </div>

        {/* 5 Stages Alternating Editorial Cards */}
        <div className="space-y-8 lg:space-y-12">
          {DETAILED_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl sm:rounded-[2.25rem] bg-white border border-canvas-border p-8 sm:p-12 lg:p-14 shadow-soft-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start group hover:border-emerald-brand/40 transition-all duration-400"
              >
                {/* Left Step Indicator & Title */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-emerald-brand tracking-widest px-3 py-1 rounded-full bg-[#EBF2EE]">
                      PHASE {stage.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-canvas-warm flex items-center justify-center text-emerald-brand">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-400 block">
                      {stage.name}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 leading-tight">
                      {stage.title}
                    </h3>
                  </div>
                </div>

                {/* Right Summary & Specific Details */}
                <div className="lg:col-span-7 space-y-6 text-left lg:border-l lg:border-canvas-border lg:pl-12">
                  <p className="text-base sm:text-lg text-charcoal-700 font-sans leading-relaxed font-normal">
                    {stage.summary}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {stage.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand mt-2 shrink-0" />
                        <span className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
