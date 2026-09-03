'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface MobileAdminMenuProps {
  isOpen: boolean;
  onClose: () => void;
  unreadSubmissionsCount?: number;
  adminName?: string;
  adminEmail?: string;
}

export default function MobileAdminMenu({
  isOpen,
  onClose,
  unreadSubmissionsCount = 0,
  adminName,
  adminEmail,
}: MobileAdminMenuProps) {
  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#07381E]/40 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-[280px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Close Button Header */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-500 hover:text-charcoal-950 hover:bg-canvas-warm transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Sidebar in Full Mode */}
        <div className="h-full w-full">
          <AdminSidebar
            isCollapsed={false}
            onNavigate={onClose}
            unreadSubmissionsCount={unreadSubmissionsCount}
            adminName={adminName}
            adminEmail={adminEmail}
          />
        </div>
      </div>
    </div>
  );
}
