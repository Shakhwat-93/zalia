'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Box, Image as ImageIcon } from 'lucide-react';
import { HERO_CONTENT } from '@/data/content';

const Hero3DModel = dynamic(() => import('@/components/3d/Hero3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
    </div>
  ),
});

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'render' | '3d'>('render');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 12,
        y: (e.clientY / innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center bg-canvas overflow-hidden pt-28 pb-16 lg:py-0"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left: Quiet, confident typography */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="lg:col-span-5 flex flex-col justify-center space-y-8 text-left"
        >
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            ZALIA PROPERTIES
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-medium tracking-tight text-charcoal-950 leading-[1.04]">
            <span className="block">WE BUY.</span>
            <span className="block text-emerald-brand italic font-normal">WE TRANSFORM.</span>
            <span className="block">WE CREATE.</span>
          </h1>

          <p className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal max-w-md">
            We see the potential in residential property and transform it into exceptional homes.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenContact}
              className="px-6 py-4 rounded-full text-charcoal-700 hover:text-charcoal-950 text-[13px] font-sans font-medium uppercase tracking-[0.14em] transition-colors"
            >
              Let&apos;s Talk
            </button>
          </div>
        </motion.div>

        {/* Right: Dominant Architectural Visual (70% priority) */}
        <div className="lg:col-span-7 relative w-full h-[420px] sm:h-[540px] lg:h-[640px] flex items-center justify-center">
          <div className="relative w-full h-full rounded-3xl overflow-hidden bg-canvas-warm border border-canvas-border shadow-soft-xl flex flex-col justify-between group">
            
            {/* Minimal Switcher */}
            <div className="absolute top-4 right-4 z-20 flex items-center p-1 rounded-full bg-white/90 backdrop-blur-md border border-canvas-border shadow-sm">
              <button
                onClick={() => setActiveTab('render')}
                className={'flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                  activeTab === 'render'
                    ? 'bg-charcoal-950 text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-950'
                )}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Render</span>
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={'flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 ' + (
                  activeTab === '3d'
                    ? 'bg-emerald-brand text-white shadow-xs'
                    : 'text-charcoal-600 hover:text-charcoal-950'
                )}
              >
                <Box className="w-3 h-3" />
                <span>3D</span>
              </button>
            </div>

            {/* Visual Canvas */}
            <div className="relative w-full h-full flex-1 overflow-hidden">
              {activeTab === 'render' ? (
                <motion.div
                  style={{
                    scale: imageScale,
                    x: mousePos.x * 0.3,
                    y: mousePos.y * 0.3,
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={HERO_CONTENT.image}
                    alt="Zalia Properties Architectural Villa"
                    fill
                    priority
                    quality={95}
                    className="object-cover object-center transition-transform duration-1000 ease-editorial"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full pt-8 pb-8 relative">
                  <Hero3DModel />
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
