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
    <footer className="relative w-full bg-[#07381E] text-white border-t border-[#07381E] pt-16 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative w-9 h-9 p-1 rounded-lg bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Zalia Properties Ltd Logo"
                  fill
                  className="object-contain p-0.5 brightness-0 invert"
                  sizes="36px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-semibold tracking-wider text-white uppercase leading-none">
                  ZALIA
                </span>
                <span className="text-[8.5px] font-semibold uppercase tracking-[0.24em] text-white/70 mt-1 leading-none">
                  PROPERTIES LTD
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed font-normal pt-2">
              UK residential property acquisition, architectural renovation, and bespoke development.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-white/70">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors uppercase tracking-wider block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-3 text-xs text-white/70">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              Contact
            </div>
            <p className="leading-relaxed">{SITE_METADATA.address}</p>
            <p>
              <a href={'mailto:' + SITE_METADATA.email} className="hover:text-white transition-colors">
                {SITE_METADATA.email}
              </a>
            </p>
            <p>
              <a href={'tel:' + SITE_METADATA.phone} className="hover:text-white transition-colors">
                {SITE_METADATA.phone}
              </a>
            </p>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Zalia Properties Ltd. {SITE_METADATA.registration}.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
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
