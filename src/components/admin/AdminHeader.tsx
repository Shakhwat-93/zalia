'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, Bell, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  adminName?: string;
  adminRole?: string;
  unreadCount?: number;
}

export default function AdminHeader({
  onOpenMobileMenu,
  adminName = 'Zalia Administrator',
  adminRole = 'Superadmin',
  unreadCount = 0,
}: AdminHeaderProps) {
  return (
    <header className="h-16 w-full bg-white border-b border-canvas-border px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Left Area: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-[#07381E]/20"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar matching reference image */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects, submissions, settings..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F7F8F6] border border-canvas-border text-xs sm:text-sm font-sans placeholder-charcoal-400 text-charcoal-900 focus:outline-none focus:bg-white focus:border-[#07381E] focus:ring-2 focus:ring-[#07381E]/10 transition-all"
          />
        </div>
      </div>

      {/* Right Area: System Status, Live Web Link, Notifications, User Profile */}
      <div className="flex items-center space-x-2.5 sm:space-x-4">
        
        {/* Live System Status Indicator (Desktop only) */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#EBF2EE] border border-[#07381E]/15 text-[11px] font-sans font-medium text-[#07381E]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>PostgreSQL Live · London UK</span>
        </div>

        {/* Public Website Preview Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-canvas-border hover:border-charcoal-300 text-charcoal-600 hover:text-charcoal-950 text-xs font-sans font-medium transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-charcoal-400" />
        </Link>

        {/* Notification Bell with Badge */}
        <Link
          href="/admin/contact"
          className="relative p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors"
          title="Inbound Enquiries"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#07381E]" />
          )}
        </Link>

        {/* User Profile Pill matching reference image */}
        <div className="flex items-center space-x-2.5 pl-2 sm:pl-3 border-l border-canvas-border">
          <div className="w-8 h-8 rounded-full bg-[#07381E] text-white flex items-center justify-center font-serif text-xs font-semibold shadow-2xs">
            ZA
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-charcoal-950 leading-none">
              {adminName}
            </span>
            <span className="text-[10px] text-charcoal-500 font-sans leading-none mt-1 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-[#07381E]" />
              <span>{adminRole}</span>
            </span>
          </div>
        </div>

      </div>

    </header>
  );
}
