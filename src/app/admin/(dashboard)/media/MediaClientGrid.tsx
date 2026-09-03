'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Search, ExternalLink, Image as ImageIcon } from 'lucide-react';

const MEDIA_ITEMS = [
  { name: 'hero-model.webp', path: '/images/hero-model.webp', size: '102.8 KB', type: 'WebP', dims: '1536x1024', tag: 'Hero LCP' },
  { name: 'about-zalia.webp', path: '/images/about-zalia.webp', size: '153.7 KB', type: 'WebP', dims: '1536x1024', tag: 'Story' },
  { name: 'brand-statement.webp', path: '/images/brand-statement.webp', size: '255.0 KB', type: 'WebP', dims: '1536x1024', tag: 'Philosophy' },
  { name: 'featured-project.webp', path: '/images/featured-project.webp', size: '124.5 KB', type: 'WebP', dims: '1536x1024', tag: 'Project' },
  { name: '3d-transformation.webp', path: '/images/3d-transformation.webp', size: '136.5 KB', type: 'WebP', dims: '1536x1024', tag: '3D Fallback' },
  { name: 'before-split.webp', path: '/images/before-split.webp', size: '118.2 KB', type: 'WebP', dims: '1536x1024', tag: 'Comparison' },
  { name: 'after-split.webp', path: '/images/after-split.webp', size: '122.4 KB', type: 'WebP', dims: '1536x1024', tag: 'Comparison' },
  { name: 'what-we-do.webp', path: '/images/what-we-do.webp', size: '142.1 KB', type: 'WebP', dims: '1536x1024', tag: 'Capabilities' },
  { name: 'cta-model.webp', path: '/images/cta-model.webp', size: '98.5 KB', type: 'WebP', dims: '1536x1024', tag: 'CTA' },
  { name: 'logo.png', path: '/images/logo.png', size: '38.5 KB', type: 'PNG', dims: '400x400', tag: 'Brand Emblem' },
  { name: 'Zaki shamseer.webp', path: '/images/Zaki shamseer.webp', size: '86.4 KB', type: 'WebP', dims: '800x1000', tag: 'Executive' },
  { name: 'Selina Shamseer.webp', path: '/images/Selina Shamseer.webp', size: '74.2 KB', type: 'WebP', dims: '800x1000', tag: 'Executive' },
  { name: 'Sayek AHMED.webp', path: '/images/Sayek AHMED.webp', size: '68.9 KB', type: 'WebP', dims: '800x1000', tag: 'Executive' },
  { name: 'Abdullah Al Faruq.webp', path: '/images/Abdullah Al Faruq.webp', size: '72.1 KB', type: 'WebP', dims: '800x1000', tag: 'Executive' },
  { name: 'Md. Shahinur Rahman Utsha.webp', path: '/images/Md. Shahinur Rahman Utsha.webp', size: '79.3 KB', type: 'WebP', dims: '800x1000', tag: 'Executive' },
  { name: 'Mithu Huda.webp', path: '/images/Mithu Huda.webp', size: '64.8 KB', type: 'WebP', dims: '800x1000', tag: 'Executive' },
];

export default function MediaClientGrid() {
  const [search, setSearch] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const filtered = MEDIA_ITEMS.filter((item) => {
    return (
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase())
    );
  });

  const copyUrl = (path: string, name: string) => {
    navigator.clipboard.writeText(path);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Search & Upload Bar */}
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-canvas-border shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media by filename or tag..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-xs font-sans text-charcoal-900 focus:outline-none focus:bg-white focus:border-[#07381E]"
          />
        </div>

        <div className="text-xs text-charcoal-500 font-sans">
          All images pre-encoded in WebP format (<span className="text-[#07381E] font-semibold">&lt; 150KB</span>)
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="group rounded-2xl bg-white border border-canvas-border shadow-soft-sm overflow-hidden flex flex-col justify-between hover:border-[#07381E]/40 transition-all duration-200"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-4/3 w-full bg-charcoal-100 overflow-hidden">
              <Image
                src={item.path}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-104 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-sans font-semibold uppercase tracking-wider text-white">
                {item.tag}
              </span>
            </div>

            {/* Meta & Actions */}
            <div className="p-3.5 space-y-2 text-left bg-white">
              <div className="space-y-0.5">
                <span className="text-xs font-serif font-semibold text-charcoal-950 block truncate">
                  {item.name}
                </span>
                <span className="text-[10.5px] font-sans text-charcoal-400 block">
                  {item.dims} · {item.size}
                </span>
              </div>

              <div className="pt-2 border-t border-canvas-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyUrl(item.path, item.name)}
                  className="inline-flex items-center space-x-1 text-[11px] font-sans font-medium text-charcoal-600 hover:text-[#07381E] transition-colors"
                >
                  {copiedName === item.name ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-charcoal-400" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>

                <a
                  href={item.path}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded text-charcoal-400 hover:text-charcoal-950 transition-colors"
                  title="Open original"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
