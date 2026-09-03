'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sliders, Navigation, PanelBottom } from 'lucide-react';

const TABS = [
  {
    label: 'Global Settings & SEO',
    href: '/admin/settings',
    icon: Sliders,
    exact: true,
  },
  {
    label: 'Primary Navigation',
    href: '/admin/settings/navigation',
    icon: Navigation,
    exact: false,
  },
  {
    label: 'Footer & Socials',
    href: '/admin/settings/footer',
    icon: PanelBottom,
    exact: false,
  },
];

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-canvas-border pb-1">
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                  : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-charcoal-400'}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
