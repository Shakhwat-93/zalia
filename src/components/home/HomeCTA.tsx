import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section className="relative w-full bg-white py-24 sm:py-32 lg:py-40 border-b border-canvas-border overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand mx-auto">
          START A DIALOGUE
        </div>

        <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-charcoal-950 font-medium leading-[1.04] tracking-tight">
          HAVE A PROPERTY
          <span className="block text-emerald-brand italic font-normal mt-2">
            WITH POTENTIAL?
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-charcoal-600 font-sans font-normal">
          Let&apos;s start a conversation.
        </p>

        <div className="pt-2">
          <Link
            href="/contact"
            className="btn-magnetic inline-flex items-center space-x-3 px-9 py-4 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-lg group"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
