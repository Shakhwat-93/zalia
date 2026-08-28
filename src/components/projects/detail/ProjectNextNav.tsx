'use client';

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
