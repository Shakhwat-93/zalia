import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Inbox,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const supabase = createServerSupabaseClient();

  // 1. Fetch real metric counts from PostgreSQL
  const [
    { count: totalProjects },
    { count: publishedProjects },
    { count: draftProjects },
    { count: totalEnquiries },
    { count: newEnquiries },
    { count: totalTeamMembers },
    { data: recentProjects },
    { data: recentEnquiries },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).neq('status', 'published'),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*').order('sort_order', { ascending: true }).limit(4),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(4),
  ]);

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects ?? 0,
      subtext: `${publishedProjects ?? 0} Published · ${draftProjects ?? 0} In Progress`,
      icon: Building2,
      href: '/admin/projects',
      badge: 'Portfolio',
    },
    {
      title: 'Inbound Enquiries',
      value: totalEnquiries ?? 0,
      subtext: `${newEnquiries ?? 0} New Awaiting Review`,
      icon: Inbox,
      href: '/admin/contact',
      badge: newEnquiries && newEnquiries > 0 ? `${newEnquiries} Unread` : 'All Caught Up',
      badgeHighlight: Boolean(newEnquiries && newEnquiries > 0),
    },
    {
      title: 'Executive Team',
      value: totalTeamMembers ?? 0,
      subtext: 'Active Directorial Leadership',
      icon: Users,
      href: '/admin/team',
      badge: 'Leadership',
    },
    {
      title: 'Site Pages',
      value: 7,
      subtext: 'App Router Routes Monitored',
      icon: Layers,
      href: '/admin/pages',
      badge: 'App Router',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      
      {/* Page Header matching reference */}
      <PageHeader
        title="Dashboard Overview"
        description="Real-time performance metrics and content inventory for Zalia Properties Ltd."
        primaryAction={{
          label: 'New Project',
          href: '/admin/projects',
          icon: Building2,
        }}
        secondaryAction={{
          label: 'Review Enquiries',
          href: '/admin/contact',
          icon: Inbox,
        }}
      />

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-canvas-border shadow-soft-sm hover:shadow-soft-md hover:border-[#07381E]/30 transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center transition-colors group-hover:bg-[#07381E] group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    stat.badgeHighlight
                      ? 'bg-red-50 text-red-800 border-red-200'
                      : 'bg-canvas-warm text-charcoal-600 border-canvas-border'
                  }`}
                >
                  {stat.badge}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-serif font-medium text-charcoal-950 block">
                  {stat.value}
                </span>
                <span className="text-xs font-sans font-medium text-charcoal-500 block">
                  {stat.title}
                </span>
              </div>

              <div className="pt-2 border-t border-canvas-border flex items-center justify-between text-[11px] text-charcoal-500 font-sans">
                <span className="truncate">{stat.subtext}</span>
                <ChevronRight className="w-3.5 h-3.5 text-charcoal-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two-Column Section: Recent Enquiries + Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left: Inbound Enquiries Card */}
        <div className="lg:col-span-7 bg-white border border-canvas-border rounded-2xl sm:rounded-3xl shadow-soft-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                INBOUND LEADS
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950">
                Recent Enquiries
              </h2>
            </div>

            <Link
              href="/admin/contact"
              className="inline-flex items-center space-x-1.5 text-xs font-sans font-semibold text-[#07381E] hover:text-[#052B17] transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-canvas-border">
            {!recentEnquiries || recentEnquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-charcoal-400">
                No contact submissions recorded yet.
              </div>
            ) : (
              recentEnquiries.map((sub: any) => (
                <div
                  key={sub.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-sm font-serif font-semibold text-charcoal-950 truncate">
                        {sub.full_name}
                      </span>
                      <StatusBadge status={sub.status} />
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-500 font-sans">
                      <span className="inline-flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-charcoal-400" />
                        <span className="truncate">{sub.email}</span>
                      </span>

                      {sub.property_location && (
                        <span className="inline-flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-charcoal-400" />
                          <span className="truncate">{sub.property_location}</span>
                        </span>
                      )}

                      <span className="inline-flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-charcoal-400" />
                        <span>{new Date(sub.created_at).toLocaleDateString('en-GB')}</span>
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-600 line-clamp-1 italic font-sans pt-0.5">
                      &ldquo;{sub.message}&rdquo;
                    </p>
                  </div>

                  <Link
                    href="/admin/contact"
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-canvas-border hover:bg-canvas-warm text-xs font-medium text-charcoal-700 transition-colors shrink-0"
                  >
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Portfolio Projects Summary Card */}
        <div className="lg:col-span-5 bg-white border border-canvas-border rounded-2xl sm:rounded-3xl shadow-soft-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                PORTFOLIO
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950">
                Active Projects
              </h2>
            </div>

            <Link
              href="/admin/projects"
              className="inline-flex items-center space-x-1.5 text-xs font-sans font-semibold text-[#07381E] hover:text-[#052B17] transition-colors"
            >
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {!recentProjects || recentProjects.length === 0 ? (
              <div className="py-8 text-center text-xs text-charcoal-400">
                No projects found.
              </div>
            ) : (
              recentProjects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-2xl bg-canvas-warm border border-canvas-border flex items-center space-x-3.5 group hover:border-[#07381E]/30 transition-colors"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal-100 shrink-0">
                    <Image
                      src={proj.image_url}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-serif font-medium text-charcoal-950 truncate block">
                        {proj.title}
                      </span>
                      <StatusBadge status={proj.status_badge} className="shrink-0 scale-90" />
                    </div>
                    <span className="text-[11px] font-sans text-charcoal-500 block truncate mt-0.5">
                      {proj.location} · {proj.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/projects"
              className="w-full py-3 rounded-xl border border-canvas-border hover:bg-canvas-warm text-charcoal-800 text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Explore All Projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
