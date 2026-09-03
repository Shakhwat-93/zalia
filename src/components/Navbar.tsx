'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X, Phone, Mail, MapPin } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(NAVIGATION_LINKS);

  useEffect(() => {
    async function loadDynamicNav() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase
          .from('navigation')
          .select('label, href, sort_order, is_active')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          setNavLinks(data);
        }
      } catch {
        // Fallback silently to static NAVIGATION_LINKS
      }
    }
    loadDynamicNav();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={'fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-luxury ' + (
          isScrolled
            ? 'bg-white/94 backdrop-blur-md border-b border-black/[0.06] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] py-3 sm:py-3.5'
            : 'bg-white/80 backdrop-blur-[10px] border-b border-black/[0.03] py-4 sm:py-5 lg:py-6'
        )}
      >
        <div className="max-w-[1440px] w-[calc(100%-32px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] mx-auto flex items-center justify-between">
          {/* Brand Logo & Logotype */}
          <Link
            href="/"
            className="group flex items-center space-x-3 sm:space-x-3.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand rounded-lg p-1 -m-1"
            aria-label="Zalia Properties Ltd Homepage"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Zalia Properties Ltd Logo"
                fill
                priority
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[18px] sm:text-[20px] font-semibold tracking-[0.14em] text-charcoal-950 uppercase leading-none">
                ZALIA
              </span>
              <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.24em] text-emerald-brand mt-1 leading-none">
                PROPERTIES LTD
              </span>
            </div>
          </Link>

          {/* Desktop Route-Based Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-6 2xl:gap-8 mx-6"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(link.href + '/');

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={'whitespace-nowrap text-[12.5px] font-sans font-medium uppercase tracking-[0.14em] transition-colors duration-200 relative py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-brand rounded group ' + (
                    isActive
                      ? 'text-emerald-brand font-semibold'
                      : 'text-charcoal-700 hover:text-charcoal-950'
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={'absolute bottom-0 left-0 h-[1.5px] bg-emerald-brand transition-all duration-300 ease-luxury ' + (
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Block */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            {/* Desktop CTA Pill Button linking to /contact */}
            <Link
              href="/contact"
              onClick={onOpenContact}
              className="btn-magnetic hidden sm:inline-flex items-center space-x-2.5 h-[46px] px-6 sm:px-7 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-[13px] font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand focus-visible:ring-offset-2"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden inline-flex items-center justify-center space-x-2 h-[42px] px-3.5 sm:px-4 rounded-full bg-canvas-warm border border-canvas-border text-charcoal-900 hover:border-emerald-brand/50 hover:bg-white transition-all text-xs font-sans font-medium uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-brand"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="text-[11px] font-sans font-semibold uppercase tracking-widest hidden xs:inline">
                {mobileMenuOpen ? 'CLOSE' : 'MENU'}
              </span>
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-charcoal-900" />
              ) : (
                <div className="w-4 h-3 flex flex-col justify-between">
                  <span className="w-full h-[1.5px] bg-charcoal-900 rounded-full" />
                  <span className="w-full h-[1.5px] bg-charcoal-900 rounded-full" />
                  <span className="w-3/4 h-[1.5px] bg-emerald-brand rounded-full ml-auto" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl xl:hidden flex flex-col justify-between p-6 sm:p-10 pt-28 sm:pt-32 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="max-w-xl w-full mx-auto space-y-6">
              <div className="flex items-center space-x-2 pb-2 border-b border-canvas-border">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand" />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-emerald-brand">
                  NAVIGATION DIRECTORY
                </span>
              </div>

              <nav className="flex flex-col space-y-3 sm:space-y-4">
                {navLinks.map((link, idx) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname === link.href || pathname.startsWith(link.href + '/');

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={'group flex items-center justify-between py-2 transition-colors ' + (
                          isActive ? 'text-emerald-brand' : 'text-charcoal-900 hover:text-emerald-brand'
                        )}
                      >
                        <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                          {link.label}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-charcoal-300 group-hover:text-emerald-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="max-w-xl w-full mx-auto pt-8 border-t border-canvas-border space-y-6"
            >
              <Link
                href="/contact"
                onClick={() => {
                  closeMobileMenu();
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full py-4 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-[13px] font-sans font-semibold uppercase tracking-[0.16em] flex items-center justify-center space-x-2.5 shadow-md transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-600 font-sans">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                  <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand truncate">
                    {SITE_METADATA.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                  <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand">
                    {SITE_METADATA.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5 sm:col-span-2 text-[11px] text-charcoal-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-brand shrink-0" />
                  <span>{SITE_METADATA.address}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
