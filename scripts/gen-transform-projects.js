const fs = require('fs');

fs.writeFileSync('src/components/3d/Transformation3DCanvas.tsx', `'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Transformation3DCanvasProps {
  activeStage: number;
}

function HouseModel({ activeStage }: { activeStage: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const extensionRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;

    if (extensionRef.current) {
      const targetExtensionScale = activeStage >= 1 ? 1 : 0.001;
      const targetExtensionY = activeStage >= 1 ? 0 : -0.5;
      extensionRef.current.scale.lerp(
        new THREE.Vector3(targetExtensionScale, targetExtensionScale, targetExtensionScale),
        delta * 3
      );
      extensionRef.current.position.y = THREE.MathUtils.lerp(
        extensionRef.current.position.y,
        targetExtensionY,
        delta * 3
      );
    }

    if (roofRef.current) {
      const targetRoofY = activeStage === 3 ? 1.4 : 0.85;
      roofRef.current.position.y = THREE.MathUtils.lerp(
        roofRef.current.position.y,
        targetRoofY,
        delta * 3
      );
    }

    if (lightsRef.current) {
      const targetIntensity = activeStage >= 2 ? 2.5 : 0.5;
      lightsRef.current.intensity = THREE.MathUtils.lerp(
        lightsRef.current.intensity,
        targetIntensity,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={1.2}>
      <RoundedBox args={[4.2, 0.1, 3.2]} radius={0.02} smoothness={4} position={[0, -0.9, 0]}>
        <meshStandardMaterial color="#f4f3ee" roughness={0.7} />
      </RoundedBox>

      <RoundedBox args={[2.0, 1.5, 1.8]} radius={0.03} smoothness={4} position={[-0.8, 0, 0]}>
        <meshStandardMaterial
          color={activeStage === 0 ? '#b88969' : '#a87a5b'}
          roughness={0.8}
        />
      </RoundedBox>

      <mesh position={[-0.8, 1.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.5, 0.8, 4]} />
        <meshStandardMaterial color="#374151" roughness={0.6} />
      </mesh>

      <group ref={extensionRef} position={[0.9, 0, 0]}>
        <RoundedBox args={[1.8, 1.4, 2.2]} radius={0.03} smoothness={4} position={[0, 0, 0.2]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.92}
            opacity={1}
            transparent
            roughness={0.08}
            ior={1.5}
            thickness={0.5}
          />
        </RoundedBox>

        <mesh position={[0.85, 0, 1.25]}>
          <boxGeometry args={[0.06, 1.4, 0.06]} />
          <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.85, 0, 1.25]}>
          <boxGeometry args={[0.06, 1.4, 0.06]} />
          <meshStandardMaterial color="#121316" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.7, 1.28]}>
          <boxGeometry args={[1.8, 0.04, 0.04]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        <mesh position={[0, -0.3, 0.2]}>
          <boxGeometry args={[1.2, 0.3, 1.0]} />
          <meshStandardMaterial color="#0b3b2c" roughness={0.5} />
        </mesh>
      </group>

      <group ref={roofRef} position={[0.9, 0.85, 0.2]}>
        <RoundedBox args={[2.2, 0.08, 2.6]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#1a1c1e" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[2.0, 0.02, 2.4]} />
          <meshStandardMaterial color="#c5a880" roughness={0.6} />
        </mesh>
      </group>

      <pointLight ref={lightsRef} position={[0.8, 0.2, 0.2]} color="#ffeedd" distance={5} />
    </group>
  );
}

export default function Transformation3DCanvas({ activeStage }: Transformation3DCanvasProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [2.5, 2.2, 4.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 10, 6]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#faf5eb" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <HouseModel activeStage={activeStage} />
        </Float>

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={4}
          color="#0b3b2c"
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
`);

fs.writeFileSync('src/components/Property3DSection.tsx', `'use client';

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
`);

fs.writeFileSync('src/components/FeaturedProject.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { FEATURED_PROJECT_CONTENT } from '@/data/content';

interface FeaturedProjectProps {
  onOpenContact: () => void;
}

export default function FeaturedProject({ onOpenContact }: FeaturedProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 0.98]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-40 border-t border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
                OUR PROJECTS
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
            >
              SELECTED WORK
            </motion.h2>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-charcoal-500 uppercase tracking-widest">
            <span>PORTFOLIO SPECIFICATION</span>
            <span>•</span>
            <span className="text-emerald-brand font-semibold">LONDON MONOGRAPH</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-white border border-canvas-border shadow-soft-xl overflow-hidden group"
        >
          <div className="relative w-full h-[400px] sm:h-[540px] lg:h-[680px] overflow-hidden bg-charcoal-950">
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              className="relative w-full h-full"
            >
              <Image
                src={FEATURED_PROJECT_CONTENT.image}
                alt="Zalia Properties Featured London Residence"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-103"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent pointer-events-none" />

            <div className="absolute top-6 left-6 flex items-center space-x-2 z-10">
              <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-charcoal-950 text-[11px] font-mono font-semibold uppercase tracking-wider shadow-sm">
                {FEATURED_PROJECT_CONTENT.tag}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-brand text-white text-[11px] font-mono font-semibold uppercase tracking-wider shadow-sm flex items-center space-x-1.5">
                <MapPin className="w-3 h-3" />
                <span>{FEATURED_PROJECT_CONTENT.location}</span>
              </span>
            </div>

            <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 z-10 text-white">
              <div className="max-w-3xl space-y-3">
                <span className="text-[11px] font-mono text-gold-accent font-semibold uppercase tracking-widest block">
                  {FEATURED_PROJECT_CONTENT.category}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                  {FEATURED_PROJECT_CONTENT.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal">
                {FEATURED_PROJECT_CONTENT.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {FEATURED_PROJECT_CONTENT.scope.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-canvas-warm border border-canvas-border text-charcoal-700 text-xs font-mono font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <div className="text-left lg:text-right">
                <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-widest block">
                  Completion Year
                </span>
                <span className="font-serif text-2xl text-charcoal-900 font-semibold">
                  {FEATURED_PROJECT_CONTENT.year}
                </span>
              </div>

              <button
                onClick={onOpenContact}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group"
              >
                <span>Explore Project &amp; Acquire</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`);

fs.writeFileSync('src/components/BeforeAfterSlider.tsx', `'use client';

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
`);

console.log('Transformation and Projects generated.');