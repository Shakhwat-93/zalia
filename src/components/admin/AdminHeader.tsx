'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  adminName?: string;
  adminRole?: string;
  unreadCount?: number;
}

export default function AdminHeader({
  onOpenMobileMenu,
  adminName = 'Admin',
}: AdminHeaderProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path === '/admin' || path === '/admin/dashboard') return 'Dashboard';
    if (path.startsWith('/admin/homepage')) return 'Homepage';
    if (path.startsWith('/admin/pages')) return 'Pages';
    if (path.startsWith('/admin/projects')) return 'Projects';
    if (path.startsWith('/admin/team')) return 'Team';
    if (path.startsWith('/admin/contact')) return 'Contact Submissions';
    if (path.startsWith('/admin/media')) return 'Media Library';
    if (path.startsWith('/admin/settings')) return 'Settings';
    return 'Admin';
  };

  const title = getPageTitle(pathname);

  return (
    <header className="h-16 w-full bg-white border-b border-canvas-border px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu Trigger (min 44px) + Current Section Name */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileMenu}
          className="w-11 h-11 rounded-lg text-charcoal-600 hover:text-charcoal-950 hover:bg-neutral-100 transition-colors lg:hidden flex items-center justify-center focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-left">
          <span className="text-base font-sans font-semibold text-charcoal-900">
            {title}
          </span>
        </div>
      </div>

      {/* Right: View Website + Admin Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* View Website Link */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-canvas-border hover:bg-neutral-50 text-charcoal-700 hover:text-charcoal-950 text-xs font-sans font-medium transition-colors"
        >
          <span>View Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-charcoal-400" />
        </Link>

        {/* User Profile Pill */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#EBF2EE] text-[#07381E] flex items-center justify-center font-sans text-xs font-semibold">
            {adminName.slice(0, 2).toUpperCase()}
          </div>
          <span className="hidden sm:block text-xs font-medium text-charcoal-900">
            {adminName}
          </span>
        </div>
      </div>
    </header>
  );
}
