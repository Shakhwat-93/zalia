const fs = require('fs');

fs.writeFileSync('src/lib/utils.ts', `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`);

fs.writeFileSync('src/components/SmoothScroll.tsx', `'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
`);

fs.writeFileSync('src/components/CustomCursor.tsx', `'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches;
    if (!isFine) return;

    setIsPointerDevice(true);
    setMounted(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .hover-target');
      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor-text');
        if (customText) {
          setHoverText(customText);
        } else {
          setHoverText(null);
        }
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isPointerDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? (hoverText ? 72 : 38) : 24,
          height: isHovered ? (hoverText ? 72 : 38) : 24,
          borderColor: isHovered ? 'rgba(11, 59, 44, 0.4)' : 'rgba(18, 19, 22, 0.2)',
          backgroundColor: isHovered
            ? (hoverText ? 'rgba(11, 59, 44, 0.95)' : 'rgba(11, 59, 44, 0.08)')
            : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="flex items-center justify-center rounded-full border border-solid backdrop-blur-[1px] transition-all"
      >
        {hoverText && (
          <span className="text-[9px] font-medium tracking-widest text-white uppercase">
            {hoverText}
          </span>
        )}
      </motion.div>

      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="h-1.5 w-1.5 rounded-full bg-charcoal-900"
      />
    </div>
  );
}
`);

fs.writeFileSync('src/components/ContactModal.tsx', `'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { SITE_METADATA } from '@/data/content';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'residential-transformation',
    location: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white p-8 sm:p-12 shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-canvas-border">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-brand">
                  DIRECT ENQUIRY
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-charcoal-900 mt-1">
                  Let&apos;s Start a Conversation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2.5 text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-subtle transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex-1">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center text-emerald-brand">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif text-charcoal-900">Enquiry Received</h4>
                  <p className="text-sm text-charcoal-600 max-w-sm leading-relaxed">
                    Thank you for reaching out to Zalia Properties. A member of our acquisitions and development team will review your property details and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-charcoal-900 text-white text-xs font-medium uppercase tracking-widest hover:bg-emerald-brand transition-colors"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alexander Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-emerald-brand focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="alexander@domain.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-emerald-brand focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+44 (0) 7900 000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-emerald-brand focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Interest Area
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-emerald-brand focus:bg-white transition-all"
                      >
                        <option value="residential-transformation">Residential Transformation</option>
                        <option value="property-acquisition">Direct Property Sale / Acquisition</option>
                        <option value="joint-venture">Joint Development Venture</option>
                        <option value="general-enquiry">General Advisory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                        Property Location / Postcode
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kensington, SW7"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-emerald-brand focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                      Property Overview &amp; Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the property, current condition, or any architectural goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-canvas-warm border border-canvas-border rounded-lg text-charcoal-900 focus:outline-none focus:border-emerald-brand focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full py-4 px-6 bg-charcoal-950 hover:bg-emerald-brand text-white rounded-lg text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 shadow-md"
                  >
                    <span>Submit Confidential Inquiry</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-canvas-border space-y-2 text-xs text-charcoal-600">
              <div className="flex items-center space-x-3">
                <Mail className="w-3.5 h-3.5 text-emerald-brand" />
                <a href={'mailto:' + SITE_METADATA.email} className="hover:text-emerald-brand">
                  {SITE_METADATA.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-3.5 h-3.5 text-emerald-brand" />
                <a href={'tel:' + SITE_METADATA.phone} className="hover:text-emerald-brand">
                  {SITE_METADATA.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-brand" />
                <span>{SITE_METADATA.address}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
`);

fs.writeFileSync('src/components/Navbar.tsx', `'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Phone, Mail } from 'lucide-react';
import { NAVIGATION_LINKS, SITE_METADATA } from '@/data/content';

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' + (
          isScrolled
            ? 'glass-nav border-b border-canvas-border py-3.5 shadow-soft-sm'
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          <Link href="#" className="group flex items-center space-x-3.5">
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
              <span className="font-serif text-lg sm:text-xl font-semibold tracking-wider text-charcoal-950 uppercase leading-none">
                ZALIA
              </span>
              <span className="text-[9px] font-sans font-medium uppercase tracking-[0.25em] text-emerald-brand mt-0.5 leading-none">
                PROPERTIES LTD
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-charcoal-700 hover:text-emerald-brand transition-colors duration-200 relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-brand transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-charcoal-950 text-white hover:bg-emerald-brand text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-soft-sm hover:shadow-emerald-subtle group"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-charcoal-800 hover:bg-canvas-subtle transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between p-8 pt-28 overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="text-[10px] font-semibold tracking-widest uppercase text-emerald-brand mb-2">
                Navigation
              </div>
              <div className="flex flex-col space-y-4">
                {NAVIGATION_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-2xl sm:text-3xl text-charcoal-900 hover:text-emerald-brand transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-canvas-border space-y-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-4 rounded-xl bg-emerald-brand text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 text-xs text-charcoal-600">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-emerald-brand" />
                  <span>{SITE_METADATA.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-emerald-brand" />
                  <span>{SITE_METADATA.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`);

console.log('UI files generated.');