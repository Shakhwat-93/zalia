'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';
import { BEFORE_AFTER_CONTENT } from '@/data/content';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderBoundsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const handleMove = useCallback((clientX: number) => {
    if (!sliderBoundsRef.current) return;
    const rect = sliderBoundsRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
              {BEFORE_AFTER_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
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
            className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal"
          >
            {BEFORE_AFTER_CONTENT.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-charcoal-900 select-none"
        >
          <div
            ref={sliderBoundsRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative w-full h-[400px] sm:h-[540px] lg:h-[680px] cursor-ew-resize overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/after-split.jpg"
                alt="Transformed Residence by Zalia Properties"
                fill
                quality={95}
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute top-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-emerald-brand/90 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-widest flex items-center space-x-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
                <span>AFTER • TRANSFORMED</span>
              </div>
            </div>

            <div
              className="absolute inset-0 h-full overflow-hidden z-20 pointer-events-none"
              style={{ width: sliderPosition + '%' }}
            >
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 h-full"
                  style={{
                    width: sliderBoundsRef.current
                      ? sliderBoundsRef.current.clientWidth + 'px'
                      : '100vw',
                  }}
                >
                  <Image
                    src="/images/before-split.jpg"
                    alt="Original Property State"
                    fill
                    quality={95}
                    className="object-cover object-center"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </div>
              </div>
              <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-white text-[11px] font-mono uppercase tracking-widest shadow-sm">
                BEFORE • ORIGINAL
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: sliderPosition + '%' }}
            >
              <div className="h-full w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] relative -translate-x-1/2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border-2 border-emerald-brand flex items-center justify-center shadow-lg text-emerald-brand transition-transform hover:scale-110 pointer-events-auto">
                  <ChevronsLeftRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-canvas-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-charcoal-600">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-emerald-brand" />
              <span>Interactive Elevation Comparative Study</span>
            </div>
            <span className="text-charcoal-400">
              Click or drag the divider horizontally to view transformation
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
