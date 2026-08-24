'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
        >
          FROM POTENTIAL
          <span className="block text-emerald-brand italic font-normal mt-2">
            TO POSSIBILITY.
          </span>
        </motion.h2>

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
          </div>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: sliderPosition + '%' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-charcoal-900 flex items-center justify-center shadow-soft-lg">
              <ChevronsLeftRight className="w-4 h-4 text-emerald-brand" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
