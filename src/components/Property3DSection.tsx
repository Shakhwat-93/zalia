'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TRANSFORMATION_3D_CONTENT } from '@/data/content';
import { Layers, Sparkles, ChevronRight, Box, Cpu, Info, CheckCircle2 } from 'lucide-react';

const Transformation3DCanvas = dynamic(
  () => import('@/components/3d/Transformation3DCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-charcoal-400 font-mono">
          Initializing 3D Spatial Canvas...
        </span>
      </div>
    ),
  }
);

// Architectural Hotspot Pins mapped to key layers of the exploded villa
const HOTSPOTS = [
  {
    id: 1,
    x: '43%',
    y: '18%',
    stage: 3,
    title: 'Exploded Slate Truss & Rafters',
    tag: 'ROOF ENVELOPE',
    detail: 'Engineered timber rafters with high-performance acoustic and thermal insulation membranes.',
  },
  {
    id: 2,
    x: '52%',
    y: '33%',
    stage: 1,
    title: 'Engineered Steel Cantilever',
    tag: 'STRUCTURAL SPAN',
    detail: '4.8m column-free architectural overhang enabling seamless floor-to-ceiling glass integration.',
  },
  {
    id: 3,
    x: '48%',
    y: '72%',
    stage: 2,
    title: 'Double-Height Glass Curtain Wall',
    tag: 'THERMAL GLAZING',
    detail: 'Slimline thermally broken aluminum profiles with low-E acoustic glazing (U-value 0.8 W/m²K).',
  },
  {
    id: 4,
    x: '18%',
    y: '58%',
    stage: 0,
    title: 'Restored Victorian Brickwork',
    tag: 'HERITAGE MASONRY',
    detail: 'Traditional lime mortar repointing preserving original 19th-century London residential facade.',
  },
  {
    id: 5,
    x: '24%',
    y: '85%',
    stage: 2,
    title: 'Illuminated Limestone Plinth',
    tag: 'TERRACE LANDSCAPING',
    detail: 'Natural Portland limestone steps with integrated low-voltage warm LED linear lighting.',
  },
];

const STAGE_METRICS = [
  { label: 'Spatial Volume', value: '+45% Natural Daylighting', sub: 'Baseline Analysis' },
  { label: 'Structural Span', value: '4.8m Column-Free', sub: 'Steel Cantilever' },
  { label: 'Efficiency Rating', value: 'EPC A+ Certified', sub: 'Triple Glazed' },
  { label: 'Project Status', value: '100% Turnkey Legacy', sub: 'Enduring Value' },
];

export default function Property3DSection() {
  const [activeStage, setActiveStage] = useState(0);
  const [viewMode, setViewMode] = useState<'exploded' | '3d'>('exploded');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="transformation"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header & Dual View Switcher */}
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

          {/* Premium View Switcher Pill */}
          <div className="flex items-center space-x-2 bg-canvas-warm p-1.5 rounded-full border border-canvas-border shadow-soft-sm self-start lg:self-auto">
            <button
              onClick={() => setViewMode('exploded')}
              className={'flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === 'exploded'
                  ? 'bg-charcoal-950 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded Anatomy</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={'flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ' + (
                viewMode === '3d'
                  ? 'bg-emerald-brand text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-950'
              )}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D WebGL</span>
            </button>
          </div>
        </div>

        {/* Master Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 3D Showcase & Hotspot Interaction */}
          <div className="lg:col-span-8 relative w-full h-[480px] sm:h-[580px] lg:h-[660px] rounded-3xl bg-canvas-warm border border-canvas-border overflow-hidden shadow-soft-xl group">
            {viewMode === '3d' ? (
              <div className="w-full h-full relative">
                <Transformation3DCanvas activeStage={activeStage} />
                
                {/* 3D Engine Header Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3.5 py-2 rounded-full glass-card border border-white/60 text-[11px] font-mono text-charcoal-800 shadow-sm backdrop-blur-md">
                  <Cpu className="w-3.5 h-3.5 text-emerald-brand" />
                  <span>Real-Time WebGL • Three.js Engine</span>
                </div>

                <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-[10px] font-mono text-white shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-brand animate-ping" />
                  <span>STAGE 0{activeStage + 1} SIMULATION</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl glass-card border border-white/60 flex items-center justify-between shadow-soft-sm backdrop-blur-md">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-brand block">
                      CURRENT LAYER STATE
                    </span>
                    <h4 className="text-xs font-semibold text-charcoal-900">
                      {TRANSFORMATION_3D_CONTENT.stages[activeStage].title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-charcoal-500 bg-white px-2.5 py-1 rounded-full border border-canvas-border">
                    Drag to Orbit 360°
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={TRANSFORMATION_3D_CONTENT.image}
                  alt="Zalia Exploded 3D Architectural Model"
                  fill
                  quality={95}
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono text-charcoal-900 border border-canvas-border shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                  <span>High-Fidelity Architectural Anatomy</span>
                </div>

                {/* Interactive Hotspot Pins */}
                {HOTSPOTS.map((spot) => {
                  const isSelected = activeHotspot === spot.id;
                  const isStageMatch = activeStage === spot.stage;

                  return (
                    <div
                      key={spot.id}
                      style={{ top: spot.y, left: spot.x }}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    >
                      <button
                        onClick={() => {
                          setActiveHotspot(isSelected ? null : spot.id);
                          setActiveStage(spot.stage);
                        }}
                        className="relative group/pin flex items-center justify-center focus:outline-none"
                        aria-label={spot.title}
                      >
                        {/* Outer Pulsing Ring */}
                        <span
                          className={`absolute w-8 h-8 rounded-full transition-all duration-500 ${
                            isSelected || isStageMatch
                              ? 'bg-emerald-brand/40 scale-125 animate-ping'
                              : 'bg-charcoal-950/20 group-hover/pin:scale-110'
                          }`}
                        />
                        
                        {/* Center Pin Button */}
                        <span
                          className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 shadow-md ${
                            isSelected || isStageMatch
                              ? 'bg-emerald-brand border-white text-white scale-110'
                              : 'bg-white border-charcoal-900 text-charcoal-900 hover:bg-emerald-brand hover:text-white hover:border-white'
                          }`}
                        >
                          {spot.id}
                        </span>
                      </button>

                      {/* Hotspot Floating Tooltip Card */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-9 w-64 p-3.5 rounded-2xl glass-card border border-white/70 shadow-soft-xl backdrop-blur-xl z-30 pointer-events-auto text-left space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-brand font-semibold">
                                {spot.tag}
                              </span>
                              <span className="text-[9px] font-mono text-charcoal-400">
                                Layer 0{spot.id}
                              </span>
                            </div>
                            <h5 className="text-xs font-semibold text-charcoal-950 font-serif leading-tight">
                              {spot.title}
                            </h5>
                            <p className="text-[10px] text-charcoal-600 leading-relaxed">
                              {spot.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Bottom Architectural Spec Footer Strip */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-charcoal-950/90 backdrop-blur-md text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-soft-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-brand/80 text-white flex items-center justify-center shrink-0">
                      <Info className="w-4 h-4 text-gold-accent" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gold-accent uppercase tracking-widest block">
                        METRIC: {STAGE_METRICS[activeStage].label}
                      </span>
                      <h4 className="text-xs font-medium text-white">
                        {STAGE_METRICS[activeStage].value}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] font-mono text-charcoal-300 self-end sm:self-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                    <span>Click numbered pins to inspect structural layers</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive 4-Stage Controller */}
          <div className="lg:col-span-4 flex flex-col space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-canvas-border mb-1">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-emerald-brand">
                TRANSFORMATION METHODOLOGY
              </span>
              <span className="text-[10px] font-mono text-charcoal-400">
                0{activeStage + 1} / 04
              </span>
            </div>

            {TRANSFORMATION_3D_CONTENT.stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.stage}
                  onClick={() => {
                    setActiveStage(idx);
                    const matchingSpot = HOTSPOTS.find((h) => h.stage === idx);
                    if (matchingSpot) setActiveHotspot(matchingSpot.id);
                  }}
                  className={'text-left p-5 sm:p-5.5 rounded-2xl border transition-all duration-400 relative overflow-hidden group ' + (
                    isActive
                      ? 'bg-canvas-warm border-emerald-brand shadow-soft-lg translate-x-1.5'
                      : 'bg-white border-canvas-border hover:border-charcoal-300 hover:bg-canvas-warm/40'
                  )}
                >
                  <div
                    className={'absolute top-0 bottom-0 left-0 w-1.5 transition-all duration-300 ' + (
                      isActive ? 'bg-emerald-brand' : 'bg-transparent'
                    )}
                  />

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={'text-xs font-mono font-semibold tracking-wider transition-colors ' + (
                          isActive ? 'text-emerald-brand' : 'text-charcoal-400'
                        )}
                      >
                        STAGE {stage.stage}
                      </span>
                      {isActive && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-brand/10 text-emerald-brand border border-emerald-brand/20">
                          Active Phase
                        </span>
                      )}
                    </div>

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
                    className={'text-xs leading-relaxed mt-2 font-normal transition-colors ' + (
                      isActive ? 'text-charcoal-600' : 'text-charcoal-400'
                    )}
                  >
                    {stage.description}
                  </p>

                  {/* Highlighted Metric Badge on Active Card */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-3 mt-3 border-t border-canvas-border/80 flex items-center justify-between text-[11px] font-mono text-charcoal-700"
                    >
                      <div className="flex items-center space-x-1.5 text-emerald-brand font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{STAGE_METRICS[idx].value}</span>
                      </div>
                      <span className="text-[10px] text-charcoal-400">
                        {STAGE_METRICS[idx].sub}
                      </span>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}