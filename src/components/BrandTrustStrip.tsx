'use client';

import { motion } from 'framer-motion';
import { BRAND_STRIP_POINTS } from '@/data/content';

export default function BrandTrustStrip() {
  return (
    <section className="relative w-full bg-white border-y border-canvas-border py-8 sm:py-10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {BRAND_STRIP_POINTS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-center space-x-3.5 group"
            >
              <span className="font-mono text-xs font-semibold text-emerald-brand tracking-widest">
                {item.number}
              </span>
              <span className="h-3 w-px bg-canvas-border" />
              <span className="text-[11.5px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-800 group-hover:text-emerald-brand transition-colors">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
