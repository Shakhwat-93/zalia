'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import MobileAdminMenu from './MobileAdminMenu';

interface AdminLayoutShellProps {
  children: React.ReactNode;
  adminName?: string;
  adminEmail?: string;
  adminRole?: string;
  unreadCount?: number;
}

export default function AdminLayoutShell({
  children,
  adminName = 'Zalia Administrator',
  adminEmail = 'admin@zaliaproperties.com',
  adminRole = 'Superadmin',
  unreadCount = 0,
}: AdminLayoutShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F7F8F6] text-[#111713] flex flex-row overflow-x-hidden font-sans antialiased">
      
      {/* 1. Desktop Fixed Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-40">
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          unreadSubmissionsCount={unreadCount}
          adminName={adminName}
          adminEmail={adminEmail}
        />
      </div>

      {/* 2. Mobile / Tablet Drawer */}
      <MobileAdminMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        unreadSubmissionsCount={unreadCount}
        adminName={adminName}
        adminEmail={adminEmail}
      />

      {/* 3. Main Content Stack */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        
        {/* Sticky Top Header */}
        <AdminHeader
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          adminName={adminName}
          adminRole={adminRole}
          unreadCount={unreadCount}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8 overflow-x-hidden">
          {children}
        </main>

        {/* Admin Footer */}
        <footer className="w-full px-6 py-4 border-t border-canvas-border text-center sm:text-left text-xs text-charcoal-400 font-sans flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
          <span>&copy; {new Date().getFullYear()} Zalia Properties Ltd. All rights reserved.</span>
          <span className="text-[11px] font-mono text-emerald-800">Zalia CMS Platform v2.0 · Live</span>
        </footer>

      </div>

    </div>
  );
}
