import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Inbox,
  FileText,
  Users,
  ChevronRight,
} from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const supabase = createServerSupabaseClient();

  const [
    { count: totalProjects },
    { count: totalEnquiries },
    { count: totalTeamMembers },
    { data: recentProjects },
    { data: recentEnquiries },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*').order('sort_order', { ascending: true }).limit(4),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(4),
  ]);

  const cards = [
    {
      label: 'Projects',
      value: totalProjects ?? 0,
      href: '/admin/projects',
      icon: Building2,
    },
    {
      label: 'Contact Enquiries',
      value: totalEnquiries ?? 0,
      href: '/admin/contact',
      icon: Inbox,
    },
    {
      label: 'Pages',
      value: 7,
      href: '/admin/pages',
      icon: FileText,
    },
    {
      label: 'Team Members',
      value: totalTeamMembers ?? 0,
      href: '/admin/team',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 text-left">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-sans font-semibold text-charcoal-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-charcoal-500 font-sans mt-1">
          Manage your website content and enquiries.
        </p>
      </div>

      {/* 2. Four Clean Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <Link
              key={idx}
              href={c.href}
              className="p-5 rounded-2xl bg-white border border-canvas-border hover:border-neutral-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-charcoal-500">
                  {c.label}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] text-[#07381E] flex items-center justify-center group-hover:bg-[#07381E] group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-sans font-semibold text-charcoal-900">
                  {c.value}
                </span>
                <ChevronRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 3. Two Column Content: Recent Enquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-canvas-border p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-sans font-semibold text-charcoal-900">
              Recent Enquiries
            </h2>
            <Link
              href="/admin/contact"
              className="text-xs font-sans font-medium text-[#07381E] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-canvas-border">
            {!recentEnquiries || recentEnquiries.length === 0 ? (
              <p className="py-8 text-center text-xs text-charcoal-400">
                No enquiries received yet.
              </p>
            ) : (
              recentEnquiries.map((enq: any) => {
                const displayName = enq.full_name || enq.name || 'Anonymous Visitor';
                const isNew = enq.status === 'new';

                return (
                  <div
                    key={enq.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-sans font-medium text-charcoal-900 truncate">
                          {displayName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                            isNew
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-neutral-100 text-charcoal-600'
                          }`}
                        >
                          {enq.status || 'new'}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-400 font-sans truncate">
                        {enq.email} · {new Date(enq.created_at).toLocaleDateString('en-GB')}
                      </p>
                    </div>

                    <Link
                      href="/admin/contact"
                      className="px-3 py-1.5 rounded-lg border border-canvas-border text-xs font-sans font-medium text-charcoal-700 hover:bg-neutral-50 transition-colors shrink-0"
                    >
                      View
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Projects (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-canvas-border p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-sans font-semibold text-charcoal-900">
              Recent Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-sans font-medium text-[#07381E] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-2.5">
            {!recentProjects || recentProjects.length === 0 ? (
              <p className="py-8 text-center text-xs text-charcoal-400">
                No projects found.
              </p>
            ) : (
              recentProjects.map((p: any) => (
                <div
                  key={p.id}
                  className="p-2.5 rounded-xl border border-canvas-border flex items-center space-x-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                    <Image
                      src={p.image_url || '/images/featured-project.webp'}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-sans font-medium text-charcoal-900 truncate block">
                      {p.title}
                    </span>
                    <span className="text-xs text-charcoal-400 font-sans truncate block mt-0.5">
                      {p.location || 'London'}
                    </span>
                  </div>

                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="px-2.5 py-1 rounded-md border border-canvas-border text-xs font-sans font-medium text-charcoal-700 hover:bg-white transition-colors shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
