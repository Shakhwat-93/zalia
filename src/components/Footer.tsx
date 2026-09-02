'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  return (
    <footer className="relative w-full bg-[#F7F8F6] py-6 sm:py-10 lg:py-14 px-3 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Dark Rounded Architectural Card Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1440px] mx-auto bg-[#07381E] text-white rounded-[1.75rem] sm:rounded-[2.25rem] lg:rounded-[2.75rem] overflow-hidden pt-12 sm:pt-16 lg:pt-20 px-6 sm:px-10 lg:px-14 flex flex-col justify-between shadow-2xl isolate"
      >
        {/* Top Section: Brand + Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 sm:pb-16">
          
          {/* Brand & Description Column */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <Link href="/" className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7658] rounded">
              <span className="font-sans text-2xl sm:text-3xl font-bold tracking-[0.14em] text-white uppercase block leading-none">
                ZALIA
              </span>
            </Link>

            <p className="text-sm sm:text-[14.5px] text-white/65 leading-relaxed font-normal max-w-sm pt-1">
              Zalia Properties creates exceptional homes by identifying potential, transforming spaces, and refining every detail.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 sm:justify-end lg:pl-10 text-left">
            
            {/* Column 1: Explore */}
            <div className="space-y-3.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/90 block">
                Explore
              </span>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/65">
                <li>
                  <Link href="/" className="hover:text-white transition-colors duration-200 block py-0.5">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors duration-200 block py-0.5">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/what-we-do" className="hover:text-white transition-colors duration-200 block py-0.5">
                    What We Do
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors duration-200 block py-0.5">
                    Our Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#approach" className="hover:text-white transition-colors duration-200 block py-0.5">
                    Our Approach
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-3.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/90 block">
                Company
              </span>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/65">
                <li>
                  <Link href="/about#story" className="hover:text-white transition-colors duration-200 block py-0.5">
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="hover:text-white transition-colors duration-200 block py-0.5">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors duration-200 block py-0.5">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Social */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/90 block">
                Social
              </span>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/65">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 block py-0.5"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 block py-0.5"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-6 sm:pt-8 pb-4 border-t border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45 font-sans">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Zalia Properties. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/#contact" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#contact" className="hover:text-white/80 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        {/* Huge Oversized Architectural ZALIA Wordmark */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none mt-1 sm:mt-2 -mb-2 sm:-mb-5 lg:-mb-8 flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-[22vw] sm:text-[23vw] lg:text-[24vw] leading-[0.74] tracking-[-0.04em] text-[#2F7658] uppercase whitespace-nowrap text-center w-full"
            aria-hidden="true"
          >
            ZALIA
          </motion.h2>
        </div>

      </div>
    </footer>
  );
}
