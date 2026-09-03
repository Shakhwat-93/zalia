'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Home,
  Layers,
  Building2,
  Users,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink
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
  title: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: 'MAIN',
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
    title: 'CONTENT',
    items: [
      {
        label: 'Homepage',
        href: '/admin/homepage',
        icon: Home,
      },
      {
        label: 'Pages',
        href: '/admin/pages',
        icon: Layers,
      },
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
    title: 'COMMUNICATION',
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
    title: 'MEDIA',
    items: [
      {
        label: 'Media Library',
        href: '/admin/media',
        icon: ImageIcon,
      },
    ],
  },
  {
    title: 'SYSTEM',
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
      className={`h-full bg-white border-r border-canvas-border flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? 'w-[78px]' : 'w-[260px]'
      }`}
    >
      {/* 1. Header / Brand */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-canvas-border">
          <Link
            href="/admin/dashboard"
            onClick={onNavigate}
            className="flex items-center space-x-3 overflow-hidden focus:outline-none"
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Zalia Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-serif text-lg font-semibold tracking-wider text-charcoal-950 uppercase leading-none">
                  ZALIA
                </span>
                <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#07381E] mt-0.5 leading-none">
                  PROPERTIES CMS
                </span>
              </div>
            )}
          </Link>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors hidden lg:flex items-center justify-center shrink-0"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* 2. Navigation Groups */}
        <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              {!isCollapsed && (
                <span className="px-3 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-400 block mb-1.5">
                  {group.title}
                </span>
              )}

              <ul className="space-y-1">
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
                        } py-2.5 rounded-xl text-xs font-sans font-medium transition-all duration-200 group relative ${
                          active
                            ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                            : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
                        }`}
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              active ? 'text-white' : 'text-charcoal-500 group-hover:text-charcoal-900'
                            }`}
                          />
                          {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </div>

                        {!isCollapsed && item.hasBadge && unreadSubmissionsCount > 0 && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                              active ? 'bg-white text-[#07381E]' : 'bg-[#07381E] text-white'
                            }`}
                          >
                            {unreadSubmissionsCount}
                          </span>
                        )}

                        {isCollapsed && item.hasBadge && unreadSubmissionsCount > 0 && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
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
      <div className="p-3 border-t border-canvas-border space-y-2 bg-white">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-xl bg-canvas-warm flex items-center justify-between">
            <div className="flex items-center space-x-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-[#07381E] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0">
                ZA
              </div>
              <div className="truncate">
                <span className="text-xs font-semibold text-charcoal-950 block truncate leading-tight">
                  {adminName}
                </span>
                <span className="text-[10px] text-charcoal-500 font-sans block truncate leading-tight mt-0.5">
                  {adminEmail}
                </span>
              </div>
            </div>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                title="Sign Out"
                className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#07381E] text-white flex items-center justify-center font-serif text-xs font-semibold">
              ZA
            </div>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                title="Sign Out"
                className="p-2 rounded-lg text-charcoal-400 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {!isCollapsed && (
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-[11px] font-sans font-medium text-charcoal-500 hover:text-[#07381E] hover:bg-canvas-warm transition-colors"
          >
            <span>Visit Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </aside>
  );
}
