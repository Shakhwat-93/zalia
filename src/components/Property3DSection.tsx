'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { TRANSFORMATION_3D_CONTENT } from '@/data/content';
import { Layers, Box } from 'lucide-react';

const Transformation3DCanvas = dynamic(
  () => import('@/components/3d/Transformation3DCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full relative bg-canvas-warm flex items-center justify-center">
        <Image
          src="/images/3d-transformation.webp"
          alt="Architectural Metamorphosis"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 65vw"
        />
      </div>
    ),
  }
);

export default function Property3DSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'exploded' | '3d'>('3d');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-14">
        
        {/* Header with Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              {TRANSFORMATION_3D_CONTENT.eyebrow}
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              {TRANSFORMATION_3D_CONTENT.heading}
            </motion.h2>
            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
              {TRANSFORMATION_3D_CONTENT.subheading}
            </p>
          </div>

          <div className="flex items-center space-x-2 p-1 rounded-full bg-white border border-canvas-border shadow-soft-sm self-start sm:self-auto">
            <button
              onClick={() => setViewMode('3d')}
              className={'flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === '3d'
                  ? 'bg-emerald-brand text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D</span>
            </button>
            <button
              onClick={() => setViewMode('exploded')}
              className={'flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === 'exploded'
                  ? 'bg-charcoal-950 text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded View</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas + 4 Stages List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 relative w-full h-[480px] sm:h-[580px] lg:h-[640px] rounded-3xl bg-white border border-canvas-border overflow-hidden shadow-soft-xl">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative">
                <Transformation3DCanvas activeStage={activeStage} />
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={TRANSFORMATION_3D_CONTENT.image}
                  alt="Zalia Exploded 3D Architectural Model"
                  fill
                  quality={85}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-3.5">
            {TRANSFORMATION_3D_CONTENT.stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStage(idx)}
                  className={'text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ' + (
                    isActive
                      ? 'bg-white border-emerald-brand shadow-soft-md'
                      : 'bg-white/60 border-canvas-border hover:border-charcoal-300'
                  )}
                >
                  <span className={'font-mono text-xs font-semibold uppercase tracking-widest block mb-1 ' + (
                    isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                  )}>
                    STAGE {stage.stage}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal-950 mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-charcoal-500 font-sans leading-relaxed">
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
