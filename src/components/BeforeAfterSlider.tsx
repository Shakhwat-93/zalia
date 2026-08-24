'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BEFORE_AFTER_CONTENT } from '@/data/content';
import { ChevronsLeftRight } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {BEFORE_AFTER_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {BEFORE_AFTER_CONTENT.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal"
          >
            {BEFORE_AFTER_CONTENT.description}
          </motion.p>
        </div>

        <div
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[640px] rounded-3xl overflow-hidden border border-canvas-border shadow-soft-xl cursor-ew-resize select-none bg-canvas-warm"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/after-split.jpg"
              alt="Transformed Residential Home"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-emerald-brand text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-md z-10">
              AFTER • REIMAGINED
            </div>
          </div>

          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: 'inset(0 ' + (100 - sliderPosition) + '% 0 0)' }}
          >
            <Image
              src="/images/before-split.jpg"
              alt="Original Unmodernised Property"
              fill
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-charcoal-950 text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] shadow-md z-10">
              BEFORE • ORIGINAL
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: sliderPosition + '%' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-emerald-brand text-charcoal-900 flex items-center justify-center shadow-soft-lg">
              <ChevronsLeftRight className="w-5 h-5 text-emerald-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
