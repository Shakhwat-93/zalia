'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-white text-charcoal-900 border-t border-canvas-border pt-16 sm:pt-20 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5 space-y-6">
            <Link href="#" className="inline-flex items-center space-x-3.5 group">
              <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Zalia Properties Ltd Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-wider text-charcoal-950 uppercase leading-none">
                  ZALIA
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-emerald-brand mt-0.5 leading-none">
                  PROPERTIES LTD
                </span>
              </div>
            </Link>

            <p className="text-sm text-charcoal-600 max-w-sm leading-relaxed font-normal">
              UK residential property acquisition, architectural renovation, and bespoke development.
              Transforming potential into exceptional homes of enduring quality.
            </p>

            <div className="pt-2 space-y-2 text-xs text-charcoal-600">
              <div className="flex items-center space-x-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                <span>{SITE_METADATA.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand">
                  {SITE_METADATA.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-charcoal-600">
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

          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-brand">
              Architectural Practice
            </h4>
            <div className="p-5 rounded-2xl bg-canvas-warm border border-canvas-border space-y-3">
              <div className="text-xs font-semibold text-charcoal-900">
                UK Residential Development &amp; Acquisition
              </div>
              <p className="text-[11.5px] text-charcoal-500 leading-relaxed">
                Every Zalia development is executed in compliance with UK Building Regulations, NHBC warranties, and heritage preservation standards.
              </p>
              <div className="text-[10px] font-semibold text-emerald-brand uppercase tracking-wider pt-1">
                Invest • Develop • Transform
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-canvas-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <div>
            &copy; {new Date().getFullYear()} Zalia Properties Ltd. {SITE_METADATA.registration}. All rights reserved.
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
