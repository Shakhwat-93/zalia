const fs = require('fs');

fs.writeFileSync('src/components/3d/Hero3DModel.tsx', `'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function ArchitecturalVolume({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.current.y * 0.2 + 0.1,
      delta * 2
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -pointer.current.x * 0.15,
      delta * 2
    );
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.15}>
      <RoundedBox args={[3.2, 0.12, 2.4]} radius={0.02} smoothness={4} position={[0, -0.8, 0]}>
        <meshStandardMaterial color="#f4f3ee" roughness={0.6} metalness={0.05} />
      </RoundedBox>

      <RoundedBox args={[2.2, 1.4, 1.8]} radius={0.04} smoothness={4} position={[0.2, 0, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.88}
          opacity={1}
          transparent
          roughness={0.05}
          ior={1.45}
          thickness={0.6}
          specularColor="#ffffff"
        />
      </RoundedBox>

      <RoundedBox args={[1.0, 1.3, 1.0]} radius={0.02} smoothness={4} position={[-0.1, 0, -0.2]}>
        <meshStandardMaterial color="#0b3b2c" roughness={0.4} metalness={0.1} />
      </RoundedBox>

      <RoundedBox args={[3.0, 0.08, 2.2]} radius={0.02} smoothness={4} position={[0.3, 0.76, 0.1]}>
        <meshStandardMaterial color="#121316" roughness={0.3} metalness={0.4} />
      </RoundedBox>

      <group position={[0.3, 0.84, 0.1]}>
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.02, 0]}>
            <boxGeometry args={[0.04, 0.04, 2.0]} />
            <meshStandardMaterial color="#c5a880" roughness={0.4} metalness={0.3} />
          </mesh>
        ))}
      </group>

      <mesh position={[-0.9, -0.05, 0.9]}>
        <cylinderGeometry args={[0.025, 0.025, 1.5, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[1.4, -0.05, 0.9]}>
        <cylinderGeometry args={[0.025, 0.025, 1.5, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[1.4, -0.05, -0.9]}>
        <cylinderGeometry args={[0.025, 0.025, 1.5, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

export default function Hero3DModel() {
  const pointer = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.2, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
        <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#faf5eb" />
        <pointLight position={[0, 1, 0]} intensity={0.8} color="#c5a880" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <ArchitecturalVolume pointer={pointer} />
        </Float>

        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.35}
          scale={6}
          blur={2.4}
          far={3}
          color="#0b3b2c"
        />
      </Canvas>
    </div>
  );
}
`);

fs.writeFileSync('src/components/Hero.tsx', `'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HERO_CONTENT } from '@/data/content';

const Hero3DModel = dynamic(() => import('@/components/3d/Hero3DModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-brand border-t-transparent animate-spin" />
    </div>
  ),
});

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex items-center justify-center bg-canvas overflow-hidden pt-24 pb-16 lg:py-0"
    >
      <div className="absolute inset-0 bg-architectural-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-emerald-light/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-gold-light/60 blur-3xl pointer-events-none -z-10" />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10"
      >
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-canvas-border w-fit shadow-soft-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal-700">
              {HERO_CONTENT.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl xl:text-7xl font-medium tracking-tight text-charcoal-950 leading-[1.04]"
          >
            <span className="block text-charcoal-950 font-normal">
              {HERO_CONTENT.headlineLine1}
            </span>
            <span className="block text-emerald-brand font-medium italic">
              {HERO_CONTENT.headlineLine2}
            </span>
            <span className="block text-charcoal-950 font-normal">
              {HERO_CONTENT.headlineLine3}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 max-w-xl font-normal leading-relaxed tracking-normal"
          >
            {HERO_CONTENT.supportingCopy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-soft-md hover:shadow-emerald-subtle group"
            >
              <span>{HERO_CONTENT.primaryCTA}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenContact}
              className="btn-magnetic inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-canvas-warm border border-canvas-border text-charcoal-900 hover:border-emerald-brand hover:text-emerald-brand text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-soft-sm"
            >
              <span>{HERO_CONTENT.secondaryCTA}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 border-t border-canvas-border grid grid-cols-3 gap-4 max-w-lg"
          >
            <div>
              <span className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                Mayfair, London
              </span>
              <span className="text-[11px] text-charcoal-400 uppercase tracking-widest">
                Headquarters
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                Residential
              </span>
              <span className="text-[11px] text-charcoal-400 uppercase tracking-widest">
                Specialisation
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-emerald-brand uppercase tracking-wider">
                Turnkey
              </span>
              <span className="text-[11px] text-charcoal-400 uppercase tracking-widest">
                Architecture
              </span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-6 relative w-full h-[460px] sm:h-[560px] lg:h-[640px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              scale: imageScale,
              x: mousePos.x * 0.4,
              y: mousePos.y * 0.4,
            }}
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-soft-xl bg-canvas-warm border border-canvas-border group"
          >
            <Image
              src={HERO_CONTENT.image}
              alt="Zalia Properties Architectural Villa Transformation"
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-card border border-white/40 flex items-center justify-between shadow-soft-md backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-brand text-white flex items-center justify-center shadow-sm">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-charcoal-900 uppercase tracking-wider">
                    Architectural Model 01
                  </h4>
                  <p className="text-[11px] text-charcoal-600">
                    Contemporary Limestone &amp; Glass Pavilion
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-2.5 py-1 rounded bg-canvas-warm text-charcoal-700 border border-canvas-border">
                UK • RESIDENTIAL
              </span>
            </div>
          </motion.div>

          <div className="hidden xl:block absolute -top-8 -right-8 w-64 h-64 z-30 pointer-events-auto">
            <div className="w-full h-full relative rounded-2xl glass-card border border-canvas-border shadow-soft-xl overflow-hidden p-2">
              <div className="absolute top-2.5 left-3 z-10 flex items-center space-x-1.5">
                <Sparkles className="w-3 h-3 text-gold-accent" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-charcoal-600">
                  3D Spatial Form
                </span>
              </div>
              <Hero3DModel />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
`);

fs.writeFileSync('src/components/BrandStatement.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BRAND_STATEMENT_CONTENT } from '@/data/content';
import { ArrowUpRight } from 'lucide-react';

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.98]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-emerald-brand" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
                {BRAND_STATEMENT_CONTENT.eyebrow}
              </span>
            </div>

            <div className="space-y-2 overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl xl:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
              >
                PROPERTY HAS POTENTIAL.
              </motion.h2>
              <motion.h2
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-5xl xl:text-6xl text-emerald-brand font-normal italic leading-[1.08] tracking-tight"
              >
                WE SEE WHAT IT CAN BECOME.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl font-serif text-charcoal-800 leading-relaxed italic border-l-2 border-gold-brand pl-6"
            >
              &ldquo;{BRAND_STATEMENT_CONTENT.subHeadline}&rdquo;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal"
            >
              {BRAND_STATEMENT_CONTENT.expandedCopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4 flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider text-charcoal-700"
            >
              <a
                href="#approach"
                className="inline-flex items-center space-x-2 text-charcoal-950 hover:text-emerald-brand transition-colors group"
              >
                <span>Read Our Methodology</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY, scale: imageScale }}
              className="relative h-[400px] sm:h-[500px] lg:h-[560px] w-full rounded-2xl overflow-hidden shadow-soft-xl border border-canvas-border group bg-canvas-warm"
            >
              <Image
                src={BRAND_STATEMENT_CONTENT.image}
                alt="Zalia Properties Victorian Transformation"
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-between shadow-soft-md">
                <div>
                  <p className="text-[11px] font-semibold text-charcoal-900 uppercase tracking-wider">
                    Victorian Heritage Transformation
                  </p>
                  <p className="text-[10px] text-charcoal-500">
                    Integration of Contemporary Light Corridor &amp; Glass Wing
                  </p>
                </div>
                <span className="text-[10px] font-mono text-emerald-brand font-semibold px-2 py-0.5 rounded bg-emerald-light">
                  CASE 01
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`);

fs.writeFileSync('src/components/WhatWeDo.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Building2, Hammer, Key, Check } from 'lucide-react';
import { SERVICES_CONTENT } from '@/data/content';

const iconMap = [Building2, Hammer, Key];

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-36 border-t border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-emerald-brand" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-emerald-brand">
              {SERVICES_CONTENT.eyebrow}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            {SERVICES_CONTENT.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-normal"
          >
            {SERVICES_CONTENT.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SERVICES_CONTENT.services.map((service, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white p-8 sm:p-10 rounded-2xl border border-canvas-border hover:border-emerald-brand/40 transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-emerald-brand transition-colors duration-500" />
                <div className="absolute inset-0 bg-emerald-light/0 group-hover:bg-emerald-light/20 transition-colors duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-8 border-b border-canvas-border">
                    <span className="font-serif text-3xl sm:text-4xl text-charcoal-300 group-hover:text-emerald-brand transition-colors duration-300 font-light">
                      {service.number}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-canvas-warm group-hover:bg-emerald-brand group-hover:text-white text-charcoal-800 flex items-center justify-center transition-all duration-300 shadow-soft-sm group-hover:rotate-3">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-brand block">
                      {service.tagline}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950 group-hover:text-emerald-brand transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-charcoal-600 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-canvas-border/80 space-y-2.5">
                    {service.focus.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2.5 text-xs text-charcoal-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal-400 group-hover:text-emerald-brand transition-colors">
                  <span>Phase {service.number}</span>
                  <div className="flex items-center space-x-1 transition-transform duration-300 group-hover:translate-x-1">
                    <span className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
`);

console.log('Hero & Services generated.');