'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white text-charcoal-900 border-t border-canvas-border pt-16 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <Link href="#" className="inline-flex items-center space-x-3 group">
              <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Zalia Properties Ltd Logo"
                  fill
                  className="object-contain"
                  sizes="36px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold tracking-wider text-charcoal-950 uppercase leading-none">
                  ZALIA
                </span>
                <span className="text-[8.5px] font-semibold uppercase tracking-[0.24em] text-emerald-brand mt-0.5 leading-none">
                  PROPERTIES LTD
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-600 max-w-sm leading-relaxed font-normal pt-2">
              UK residential property acquisition, architectural renovation, and bespoke development.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-charcoal-600">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-charcoal-950 transition-colors uppercase tracking-wider block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3 text-xs text-charcoal-600">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Contact
            </div>
            <p>{SITE_METADATA.address}</p>
            <p>
              <a href={'mailto:' + SITE_METADATA.email} className="hover:text-charcoal-950 transition-colors">
                {SITE_METADATA.email}
              </a>
            </p>
            <p>
              <a href={'tel:' + SITE_METADATA.phone} className="hover:text-charcoal-950 transition-colors">
                {SITE_METADATA.phone}
              </a>
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-canvas-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <div>
            &copy; {new Date().getFullYear()} Zalia Properties Ltd. {SITE_METADATA.registration}.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-charcoal-600 hover:text-emerald-brand transition-colors p-2 rounded-full hover:bg-canvas-warm"
            aria-label="Back to top"
          >
            <span className="uppercase tracking-widest text-[10px] font-semibold">Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
