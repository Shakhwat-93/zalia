'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { TRANSFORMATION_3D_CONTENT } from '@/data/content';
import { Layers, Sparkles, ChevronRight, Box, Cpu } from 'lucide-react';

const Transformation3DCanvas = dynamic(
  () => import('@/components/3d/Transformation3DCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-charcoal-400 font-mono">
          Initializing 3D Architectural Space...
        </span>
      </div>
    ),
  }
);

export default function Property3DSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'exploded'>('exploded');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-36 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
                {TRANSFORMATION_3D_CONTENT.eyebrow}
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {TRANSFORMATION_3D_CONTENT.heading}
            </motion.h2>
          </div>

          <div className="flex items-center space-x-2 bg-canvas-warm p-1.5 rounded-full border border-canvas-border shadow-soft-sm self-start lg:self-auto">
            <button
              onClick={() => setViewMode('exploded')}
              className={'flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === 'exploded'
                  ? 'bg-charcoal-950 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded View</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={'flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === '3d'
                  ? 'bg-emerald-brand text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-2xl bg-canvas-warm border border-canvas-border overflow-hidden shadow-soft-xl group">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative">
                <Transformation3DCanvas activeStage={activeStage} />
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-md glass-card text-[11px] font-mono text-charcoal-700 shadow-sm">
                  <Cpu className="w-3.5 h-3.5 text-emerald-brand" />
                  <span>Real-time WebGL Engine</span>
                </div>
                <div className="absolute bottom-4 left-4 z-10 text-[10px] text-charcoal-500 font-mono bg-white/80 px-2.5 py-1 rounded backdrop-blur-sm">
                  Drag to orbit • Interactive stages
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={TRANSFORMATION_3D_CONTENT.image}
                  alt="Zalia Exploded 3D Architectural Model"
                  fill
                  quality={95}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-mono text-charcoal-900 border border-canvas-border shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                  <span>High-Fidelity Architectural Render</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-xl bg-charcoal-950/80 backdrop-blur-md text-white flex items-center justify-between">
                  <span className="text-xs font-mono">
                    UK RESIDENTIAL ELEVATION • EXPLODED ANATOMY
                  </span>
                  <span className="text-[10px] font-mono text-gold-accent uppercase tracking-widest">
                    Bespoke Joinery &amp; Cantilever
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
              TRANSFORMATION STAGES
            </div>

            {TRANSFORMATION_3D_CONTENT.stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStage(idx)}
                  className={'text-left p-5 sm:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group ' + (
                    isActive
                      ? 'bg-canvas-warm border-emerald-brand shadow-soft-md scale-[1.02]'
                      : 'bg-white border-canvas-border hover:border-charcoal-300 hover:bg-canvas-subtle/50'
                  )}
                >
                  <div
                    className={'absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300 ' + (
                      isActive ? 'bg-emerald-brand' : 'bg-transparent'
                    )}
                  />

                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={'text-xs font-mono font-semibold tracking-wider transition-colors ' + (
                        isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                      )}
                    >
                      STAGE {stage.stage}
                    </span>
                    <ChevronRight
                      className={'w-4 h-4 transition-transform duration-300 ' + (
                        isActive
                          ? 'text-emerald-brand translate-x-1'
                          : 'text-charcoal-300 group-hover:text-charcoal-600'
                      )}
                    />
                  </div>

                  <h3
                    className={'font-serif text-lg sm:text-xl font-medium transition-colors ' + (
                      isActive ? 'text-charcoal-950' : 'text-charcoal-700'
                    )}
                  >
                    {stage.title}
                  </h3>

                  <p
                    className={'text-xs leading-relaxed mt-2 transition-colors ' + (
                      isActive ? 'text-charcoal-600' : 'text-charcoal-400'
                    )}
                  >
                    {stage.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
