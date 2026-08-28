const fs = require('fs');

// Ensure directory exists
if (!fs.existsSync('src/app/projects/[slug]')) fs.mkdirSync('src/app/projects/[slug]', { recursive: true });
if (!fs.existsSync('src/components/projects/detail')) fs.mkdirSync('src/components/projects/detail', { recursive: true });

// 1. DETAIL HERO COMPONENT (Section 05 & 06)
fs.writeFileSync('src/components/projects/detail/ProjectHero.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ProjectItem } from '@/data/content';

interface ProjectHeroProps {
  project: ProjectItem;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 bg-canvas overflow-hidden border-b border-canvas-border"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12 lg:space-y-16">
        
        {/* Back Link & Meta Header */}
        <motion.div style={{ y: heroY }} className="space-y-6 text-left">
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-charcoal-600 hover:text-emerald-brand transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-canvas-warm border border-canvas-border text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-emerald-brand">
              {project.tag}
            </span>
            <span className="text-xs font-sans font-medium uppercase tracking-[0.16em] text-charcoal-500">
              {project.location} · {project.category}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-charcoal-950 leading-[1.04] max-w-5xl">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 font-sans leading-relaxed font-normal max-w-3xl pt-1">
            {project.description}
          </p>
        </motion.div>

        {/* Large Immersive Hero Architectural Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[440px] sm:h-[580px] lg:h-[720px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-2xl bg-canvas-warm group"
        >
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </motion.div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-900 shadow-soft-sm">
            {project.location} • Status: {project.status}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
`);

// 2. PROJECT INTRO & STORY (Section 08, 09, 10)
fs.writeFileSync('src/components/projects/detail/ProjectIntroStory.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ProjectItem } from '@/data/content';

interface ProjectIntroStoryProps {
  project: ProjectItem;
}

export default function ProjectIntroStory({ project }: ProjectIntroStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20 lg:space-y-28">
        
        {/* Editorial Introduction */}
        <div className="max-w-4xl space-y-6 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            THE PROJECT
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            SEEING WHAT
            <span className="block text-emerald-brand italic font-normal mt-1">
              COULD BE.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed font-normal pt-2"
          >
            Every project begins by understanding what exists — and what it could become. The existing property had strong residential character and spatial integrity, presenting an ideal canvas for architectural modernization and refined living zones.
          </motion.p>
        </div>

        {/* The Starting Point & Before Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              THE STARTING POINT
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950 leading-tight">
              Unlocking Unrealized Volume & Spatial Flow
            </h3>

            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
              Prior to acquisition, the layout constrained natural light and lacked modern environmental performance. Our development blueprint focused on opening axial sightlines, integrating double-height glass apertures, and specifying enduring natural masonry.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ y: imageY }}
              className="relative h-[380px] sm:h-[460px] lg:h-[520px] w-full rounded-3xl overflow-hidden shadow-soft-xl border border-canvas-border bg-canvas-warm group"
            >
              <Image
                src={project.beforeImage || '/images/before-split.jpg'}
                alt={project.title + ' Starting Point'}
                fill
                quality={95}
                className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-charcoal-950/90 backdrop-blur-md text-[10.5px] font-sans font-semibold uppercase tracking-wider text-white shadow-sm">
                INITIAL PROPERTY CONDITION
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
`);

// 3. TRANSFORMATION & DISCIPLINES (Section 11 & 12)
fs.writeFileSync('src/components/projects/detail/ProjectTransformation.tsx', `'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CONCEPTS = [
  {
    number: '01',
    title: 'SPACE',
    description: 'Creating an intuitive, fluid connection between formal living and courtyard daylighting.',
  },
  {
    number: '02',
    title: 'LIGHT',
    description: 'Framing double-height floor-to-ceiling glass to draw London natural illumination deep inside.',
  },
  {
    number: '03',
    title: 'MATERIAL',
    description: 'Specifying honed English limestone, dark-stained timber and slimline architectural steel.',
  },
  {
    number: '04',
    title: 'DETAIL',
    description: 'Bespoke architectural joinery, acoustic floor dampening, and concealed climate engineering.',
  },
];

export default function ProjectTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            DEVELOPMENT DISCIPLINE
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            TRANSFORMING
            <span className="block text-emerald-brand italic font-normal mt-1">
              THE POTENTIAL.
            </span>
          </motion.h2>
          <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
            Through thoughtful design, renovation and structural precision, the residence was reshaped around modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CONCEPTS.map((concept, idx) => (
            <motion.div
              key={concept.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-canvas-border hover:border-emerald-brand/40 transition-all duration-350 hover:-translate-y-1 hover:shadow-soft-lg space-y-4 text-left"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest block">
                {concept.number}
              </span>
              <h3 className="font-serif text-2xl font-medium text-charcoal-950">
                {concept.title}
              </h3>
              <p className="text-sm text-charcoal-600 font-sans leading-relaxed font-normal">
                {concept.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
`);

// 4. GALLERY & LIGHTBOX (Section 13, 14, 15)
fs.writeFileSync('src/components/projects/detail/ProjectGallery.tsx', `'use client';

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
`);

// 5. THE RESULT & SUMMARY STRIP (Section 19 & 20)
fs.writeFileSync('src/components/projects/detail/ProjectResult.tsx', `'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ProjectItem } from '@/data/content';

interface ProjectResultProps {
  project: ProjectItem;
}

export default function ProjectResult({ project }: ProjectResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas-warm py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        <div className="max-w-3xl space-y-3 text-left">
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
            THE RESULT
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-medium leading-[1.08] tracking-tight"
          >
            A CONSIDERED
            <span className="block text-emerald-brand italic font-normal mt-1">
              RESIDENTIAL HOME.
            </span>
          </motion.h2>
          <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal pt-1">
            A considered transformation, shaped into a home for modern living.
          </p>
        </div>

        {/* Large Result Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[440px] sm:h-[580px] lg:h-[680px] w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-canvas-border shadow-soft-xl bg-white group"
        >
          <Image
            src={project.image}
            alt={project.title + ' Transformed Result'}
            fill
            quality={95}
            className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </motion.div>

        {/* Minimal Project Metadata Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-canvas-border text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-400 block">
              LOCATION
            </span>
            <span className="font-serif text-2xl font-medium text-charcoal-950">
              {project.location}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-400 block">
              DEVELOPMENT TYPE
            </span>
            <span className="font-serif text-2xl font-medium text-charcoal-950">
              {project.category}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-charcoal-400 block">
              PORTFOLIO STATUS
            </span>
            <span className="font-serif text-2xl font-medium text-emerald-brand">
              {project.status}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
`);

// 6. NEXT PROJECT TRANSITION (Section 21 & 22)
fs.writeFileSync('src/components/projects/detail/ProjectNextNav.tsx', `'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectItem } from '@/data/content';

interface ProjectNextNavProps {
  nextProject: ProjectItem;
}

export default function ProjectNextNav({ nextProject }: ProjectNextNavProps) {
  return (
    <section className="relative w-full bg-white py-24 sm:py-32 lg:py-44 border-b border-canvas-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl sm:rounded-[2.5rem] bg-canvas-warm border border-canvas-border p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-soft-lg">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
              NEXT CASE STUDY
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal-950 leading-tight">
              {nextProject.title}
            </h3>

            <p className="text-base text-charcoal-600 font-sans leading-relaxed font-normal">
              {nextProject.location} · {nextProject.category}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href={'/projects/' + nextProject.slug}
                className="btn-magnetic inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm group"
              >
                <span>View Next Project</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-white border border-canvas-border text-charcoal-800 hover:border-charcoal-400 text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300"
              >
                <span>All Projects</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[300px] sm:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-soft-md group">
            <Image
              src={nextProject.image}
              alt={nextProject.title}
              fill
              quality={95}
              className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-104"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
`);

// 7. DYNAMIC PROJECT DETAIL MASTER PAGE (src/app/projects/[slug]/page.tsx)
fs.writeFileSync('src/app/projects/[slug]/page.tsx', `'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectHero from '@/components/projects/detail/ProjectHero';
import ProjectIntroStory from '@/components/projects/detail/ProjectIntroStory';
import ProjectTransformation from '@/components/projects/detail/ProjectTransformation';
import ProjectGallery from '@/components/projects/detail/ProjectGallery';
import ProjectsBeforeAfter from '@/components/projects/ProjectsBeforeAfter';
import Projects3DMoment from '@/components/projects/Projects3DMoment';
import ProjectResult from '@/components/projects/detail/ProjectResult';
import ProjectNextNav from '@/components/projects/detail/ProjectNextNav';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { slug } = params;

  // Find project by slug or fallback by id (e.g. project-01)
  const currentIndex = FEATURED_PROJECTS_CONTENT.findIndex(
    (p) => p.slug === slug || p.id === slug
  );

  if (currentIndex === -1) {
    notFound();
  }

  const project = FEATURED_PROJECTS_CONTENT[currentIndex];
  const nextProject =
    FEATURED_PROJECTS_CONTENT[(currentIndex + 1) % FEATURED_PROJECTS_CONTENT.length];

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);

  return (
    <main className="min-h-screen bg-canvas text-charcoal-950 selection:bg-emerald-brand selection:text-white relative">
      {/* Reusable Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* 05 & 06 — Project Hero */}
      <ProjectHero project={project} />

      {/* 08, 09, 10 — Project Introduction & The Starting Point */}
      <ProjectIntroStory project={project} />

      {/* 11 & 12 — Transformation Concepts */}
      <ProjectTransformation />

      {/* 13, 14, 15 — Editorial Image Gallery & Lightbox */}
      <ProjectGallery project={project} />

      {/* 16 — Before / After Comparison Feature */}
      <ProjectsBeforeAfter />

      {/* 17 & 18 — 3D Spatial Moment */}
      <Projects3DMoment />

      {/* 19 & 20 — The Result & Minimal Summary */}
      <ProjectResult project={project} />

      {/* 21 & 22 — Next Project Navigation */}
      <ProjectNextNav nextProject={nextProject} />

      {/* 23 — Final CTA */}
      <FinalCTA onOpenContact={handleOpenContact} />

      {/* 25 — Footer */}
      <Footer />

      {/* Global Contact Drawer */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </main>
  );
}
`);

console.log('Project detail page and case study components generated.');
