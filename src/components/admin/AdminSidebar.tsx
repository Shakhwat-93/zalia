'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Home,
  FileText,
  Building2,
  Users,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  unreadSubmissionsCount?: number;
  onNavigate?: () => void;
  adminName?: string;
  adminEmail?: string;
}

export interface NavItem {
  label: string;
  href: string;
  altHrefs?: string[];
  icon: React.ComponentType<{ className?: string }>;
  hasBadge?: boolean;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export const NAV_STRUCTURE: NavGroup[] = [
  {
    items: [
      {
        label: 'Dashboard',
        href: '/admin/dashboard',
        altHrefs: ['/admin'],
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Content',
    items: [
      {
        label: 'Homepage',
        href: '/admin/homepage',
        icon: Home,
      },
      {
        label: 'Pages',
        href: '/admin/pages',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Portfolio',
    items: [
      {
        label: 'Projects',
        href: '/admin/projects',
        icon: Building2,
      },
      {
        label: 'Team',
        href: '/admin/team',
        icon: Users,
      },
    ],
  },
  {
    title: 'Enquiries',
    items: [
      {
        label: 'Contact Submissions',
        href: '/admin/contact',
        icon: Inbox,
        hasBadge: true,
      },
    ],
  },
  {
    title: 'Media',
    items: [
      {
        label: 'Media Library',
        href: '/admin/media',
        icon: ImageIcon,
      },
    ],
  },
  {
    title: 'System',
    items: [
      {
        label: 'Settings',
        href: '/admin/settings',
        icon: Settings,
      },
    ],
  },
];

export default function AdminSidebar({
  isCollapsed = false,
  onToggleCollapse,
  unreadSubmissionsCount = 0,
  onNavigate,
  adminName = 'Zalia Administrator',
  adminEmail = 'admin@zaliaproperties.com',
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (href: string, altHrefs?: string[]) => {
    if (pathname === href) return true;
    if (altHrefs && altHrefs.includes(pathname)) return true;
    if (href !== '/admin' && href !== '/admin/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside
      className={`h-full bg-white border-r border-canvas-border flex flex-col justify-between transition-all duration-200 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* 1. Header / Clean Logo & Brand */}
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-canvas-border">
          <Link
            href="/admin/dashboard"
            onClick={onNavigate}
            className="flex items-center space-x-3 overflow-hidden focus:outline-none"
          >
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Zalia Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate text-left">
                <span className="font-sans text-sm font-semibold tracking-tight text-charcoal-950 leading-none">
                  Zalia Properties
                </span>
                <span className="text-[11px] font-sans font-medium text-charcoal-400 mt-0.5 leading-none">
                  CMS Admin
                </span>
              </div>
            )}
          </Link>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-1 rounded-md text-charcoal-400 hover:text-charcoal-900 hover:bg-neutral-100 transition-colors hidden lg:flex items-center justify-center shrink-0"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* 2. Navigation Groups */}
        <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAV_STRUCTURE.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && group.title && (
                <span className="px-3 text-[11px] font-sans font-medium text-charcoal-400 block mb-1">
                  {group.title}
                </span>
              )}

              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href, item.altHrefs);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        title={isCollapsed ? item.label : undefined}
                        className={`flex items-center ${
                          isCollapsed ? 'justify-center px-0' : 'justify-between px-3'
                        } py-2 rounded-lg text-sm font-sans transition-colors group relative ${
                          active
                            ? 'bg-[#EBF2EE] text-[#07381E] font-medium'
                            : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-neutral-50 font-normal'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              active ? 'text-[#07381E]' : 'text-charcoal-400 group-hover:text-charcoal-700'
                            }`}
                          />
                          {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </div>

                        {!isCollapsed && item.hasBadge && unreadSubmissionsCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full text-[11px] font-semibold bg-[#07381E] text-white">
                            {unreadSubmissionsCount}
                          </span>
                        )}

                        {isCollapsed && item.hasBadge && unreadSubmissionsCount > 0 && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#07381E]" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* 3. Footer / User & Logout */}
      <div className="p-3 border-t border-canvas-border bg-white">
        {!isCollapsed ? (
          <div className="p-2 rounded-lg flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div className="flex items-center space-x-2.5 truncate text-left">
              <div className="w-8 h-8 rounded-full bg-[#EBF2EE] text-[#07381E] flex items-center justify-center font-sans text-xs font-medium shrink-0">
                {adminName.slice(0, 2).toUpperCase()}
              </div>
              <div className="truncate">
                <span className="text-xs font-medium text-charcoal-900 block truncate leading-tight">
                  {adminName}
                </span>
                <span className="text-[11px] text-charcoal-400 font-sans block truncate leading-tight mt-0.5">
                  {adminEmail}
                </span>
              </div>
            </div>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                title="Sign Out"
                className="p-1.5 rounded-md text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 py-1">
            <div className="w-8 h-8 rounded-full bg-[#EBF2EE] text-[#07381E] flex items-center justify-center font-sans text-xs font-medium">
              {adminName.slice(0, 2).toUpperCase()}
            </div>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                title="Sign Out"
                className="p-1.5 rounded-md text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </aside>
  );
}
