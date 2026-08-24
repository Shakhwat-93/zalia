'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { APPROACH_CONTENT } from '@/data/content';
import { CheckCircle2 } from 'lucide-react';

export default function ApproachTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="approach"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
              {APPROACH_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {APPROACH_CONTENT.heading}
          </motion.h2>
        </div>

        <div className="relative border-l-2 border-canvas-border/80 ml-4 sm:ml-8 lg:ml-12 pl-6 sm:pl-10 lg:pl-16 space-y-12 sm:space-y-16">
          {APPROACH_CONTENT.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStep(idx)}
                className={'relative group p-8 sm:p-10 rounded-2xl border transition-all duration-500 cursor-pointer ' + (
                  isActive
                    ? 'bg-white border-emerald-brand/40 shadow-soft-xl translate-x-2'
                    : 'bg-white/60 border-canvas-border hover:bg-white hover:border-charcoal-200'
                )}
              >
                <div
                  className={'absolute -left-[35px] sm:-left-[51px] lg:-left-[75px] top-10 w-6 h-6 rounded-full border-4 transition-all duration-300 ' + (
                    isActive
                      ? 'bg-emerald-brand border-white shadow-md scale-125'
                      : 'bg-canvas-border border-canvas-warm group-hover:bg-charcoal-400'
                  )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  <div className="lg:col-span-4 space-y-2">
                    <div className="flex items-center space-x-3">
                      <span
                        className={'font-mono text-xs font-semibold uppercase tracking-widest transition-colors ' + (
                          isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                        )}
                      >
                        STEP {step.number}
                      </span>
                      <span className="text-[11px] font-sans font-medium text-gold-deep">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3
                      className={'font-serif text-3xl sm:text-4xl font-medium transition-colors ' + (
                        isActive ? 'text-charcoal-950' : 'text-charcoal-700'
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
                      {step.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-canvas-warm border border-canvas-border text-xs text-charcoal-700 font-mono"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-brand" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
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
