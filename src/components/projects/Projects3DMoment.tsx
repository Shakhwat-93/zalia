'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { Box } from 'lucide-react';

import Image from 'next/image';

const Hero3DModel = dynamic(() => import('@/components/3d/Hero3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full relative bg-canvas-warm flex items-center justify-center">
      <Image
        src="/images/hero-model.webp"
        alt="Architectural Residence"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 65vw"
      />
    </div>
  ),
});

export default function Projects3DMoment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border shadow-soft-sm">
            <Box className="w-3.5 h-3.5 text-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-700">
              3D SPATIAL PERSPECTIVE
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            SEE BEYOND
            <span className="block text-emerald-brand italic font-normal mt-1">
              THE FINISHED IMAGE.
            </span>
          </motion.h2>

          <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
            Drag to explore the architectural massing and spatial interplay in real-time WebGL.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border bg-canvas-warm shadow-soft-xl"
        >
          <Hero3DModel />
          <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[10.5px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-sm pointer-events-none">
            360° Real-Time WebGL Model
          </div>
        </motion.div>

      </div>
    </section>
  );
}
