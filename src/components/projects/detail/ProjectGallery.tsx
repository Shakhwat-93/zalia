'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProjectItem } from '@/data/content';

interface ProjectGalleryProps {
  project: ProjectItem;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const galleryImages = [
    project.image,
    '/images/about-zalia.png',
    '/images/brand-statement.png',
    '/images/what-we-do.jpg',
  ];

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev ?? 0) + 1) % galleryImages.length);
  }, [activeImageIndex, galleryImages.length]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => ((prev ?? 0) - 1 + galleryImages.length) % galleryImages.length);
  }, [activeImageIndex, galleryImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            VISUAL PORTFOLIO
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            ARCHITECTURAL
            <span className="block text-emerald-brand italic font-normal mt-1">
              STUDY & CRAFT.
            </span>
          </motion.h2>
        </div>

        {/* Asymmetric Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {galleryImages.map((src, idx) => (
            <motion.div
              key={src + idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveImageIndex(idx)}
              className={'relative rounded-3xl overflow-hidden border border-canvas-border bg-canvas-warm cursor-pointer shadow-soft-md hover:shadow-soft-xl transition-all duration-350 group ' + (
                idx === 0 || idx === 3 ? 'h-[400px] sm:h-[500px]' : 'h-[320px] sm:h-[400px]'
              )}
            >
              <Image
                src={src}
                alt={project.title + ' Gallery View ' + (idx + 1)}
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/20 transition-colors flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-charcoal-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal-950/96 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white hover:text-charcoal-950 flex items-center justify-center transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white hover:text-charcoal-950 flex items-center justify-center transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white hover:text-charcoal-950 flex items-center justify-center transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative max-w-5xl max-h-[85vh] w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={galleryImages[activeImageIndex]}
                alt={project.title}
                fill
                quality={98}
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
