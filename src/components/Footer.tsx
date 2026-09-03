'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

const DEFAULT_EXPLORE_LINKS = [
  { label: 'Our Projects', href: '/projects' },
  { label: 'Our Approach', href: '/approach' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Who We Are', href: '/about' },
];

const DEFAULT_COMPANY_LINKS = [
  { label: 'Philosophy', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Acquisitions', href: '/contact' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const [description, setDescription] = useState(
    'Zalia Properties creates exceptional homes by identifying potential, transforming spaces, and refining every detail.'
  );
  const [copyright, setCopyright] = useState(
    `© ${new Date().getFullYear()} Zalia Properties Ltd. All rights reserved. Registered in England & Wales.`
  );
  const [exploreLinks, setExploreLinks] = useState(DEFAULT_EXPLORE_LINKS);
  const [companyLinks, setCompanyLinks] = useState(DEFAULT_COMPANY_LINKS);
  const [email, setEmail] = useState('contact@zaliaproperties.com');
  const [address, setAddress] = useState('Mayfair, London W1J');

  useEffect(() => {
    async function loadFooterCMS() {
      try {
        const supabase = createBrowserSupabaseClient();

        // 1. Fetch footer links
        const { data: links } = await supabase
          .from('footer')
          .select('section_title, label, href, sort_order')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (links && links.length > 0) {
          const explore = links.filter((l) => l.section_title === 'Explore');
          const company = links.filter((l) => l.section_title === 'Company');
          if (explore.length > 0) setExploreLinks(explore);
          if (company.length > 0) setCompanyLinks(company);
        }

        // 2. Fetch footer narrative settings
        const { data: settings } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['footer_description', 'copyright_text', 'email', 'address']);

        if (settings) {
          settings.forEach((s) => {
            if (s.key === 'footer_description' && s.value) setDescription(s.value);
            if (s.key === 'copyright_text' && s.value) setCopyright(s.value);
            if (s.key === 'email' && s.value) setEmail(s.value);
            if (s.key === 'address' && s.value) setAddress(s.value);
          });
        }
      } catch {
        // Fallback silently to static defaults
      }
    }
    loadFooterCMS();
  }, []);

  return (
    <footer className="relative w-full bg-[#F7F8F6] py-6 sm:py-10 lg:py-14 px-3 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Dark Rounded Architectural Card Container */}
      <div className="relative w-full max-w-[1440px] mx-auto bg-[#07381E] text-white rounded-[1.75rem] sm:rounded-[2.25rem] lg:rounded-[2.75rem] overflow-hidden pt-12 sm:pt-16 lg:pt-20 px-6 sm:px-10 lg:px-14 flex flex-col justify-between shadow-2xl isolate">
        
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
              {description}
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 sm:justify-end lg:pl-10 text-left">
            
            {/* Column 1: Explore */}
            <div className="space-y-3.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/90 block">
                Explore
              </span>
              <ul className="space-y-2.5 text-sm text-white/60">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors duration-200 block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-3.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/90 block">
                Company
              </span>
              <ul className="space-y-2.5 text-sm text-white/60">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors duration-200 block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Channels */}
            <div className="col-span-2 sm:col-span-1 space-y-3.5">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-white/90 block">
                Get In Touch
              </span>
              <ul className="space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors duration-200 block">
                    Contact Mayfair HQ
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors duration-200 block truncate">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="text-white/40 block text-xs pt-1">
                    {address}
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Middle Legal & Copyright Row */}
        <div className="w-full pt-6 pb-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="text-center sm:text-left">
            {copyright}
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-white/80 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        {/* Huge Oversized Architectural ZALIA Wordmark — Anchored in Code */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none mt-1 sm:mt-2 -mb-2 sm:-mb-5 lg:-mb-8 flex justify-center">
          <h2
            className="font-sans font-black text-[22vw] sm:text-[23vw] lg:text-[24vw] leading-[0.74] tracking-[-0.04em] text-[#2F7658] uppercase whitespace-nowrap text-center w-full select-none"
            aria-hidden="true"
          >
            ZALIA
          </h2>
        </div>

      </div>
    </footer>
  );
}
