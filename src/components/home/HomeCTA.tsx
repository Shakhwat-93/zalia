'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HomeCTAProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    primary_cta_label?: string;
    primary_cta_href?: string;
  };
}

export default function HomeCTA({ data }: HomeCTAProps) {
  const eyebrow = data?.eyebrow || 'START A DIALOGUE';
  const headline = data?.headline || 'HAVE A PROPERTY WITH POTENTIAL?';
  const description = data?.subheadline || "Let's start a conversation.";
  const ctaLabel = data?.primary_cta_label || 'Get In Touch';
  const ctaHref = data?.primary_cta_href || '/contact';

  return (
    <section className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand mx-auto">
          {eyebrow}
        </div>

        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-charcoal-950 font-medium leading-[1.04] tracking-tight">
          {headline.includes('WITH POTENTIAL?') ? (
            <>
              HAVE A PROPERTY
              <span className="block text-emerald-brand italic font-normal mt-2">
                WITH POTENTIAL?
              </span>
            </>
          ) : (
            headline
          )}
        </h2>

        <p className="text-lg sm:text-xl text-charcoal-600 font-sans font-normal">
          {description}
        </p>

        <div className="pt-2">
          <Link
            href={ctaHref}
            className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-lg group"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
