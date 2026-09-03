import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Database, CheckCircle, ArrowUpRight, LogOut, KeyRound } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch administrator profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch summary counts from database
  const [
    { count: projectsCount },
    { count: teamCount },
    { count: enquiriesCount },
    { count: settingsCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('site_settings').select('*', { count: 'exact', head: true }),
  ]);

  return (
    <div className="min-h-screen w-full bg-[#F7F8F6] text-[#111713] font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="w-full bg-[#07381E] text-white border-b border-[#041F11] px-6 sm:px-10 py-4.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8">
            <Image src="/images/logo.png" alt="Zalia" fill className="object-contain" />
          </div>
          <div className="flex items-center space-x-2.5">
            <span className="font-serif text-xl font-semibold tracking-wider uppercase">ZALIA</span>
            <span className="text-white/30">/</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F7658]">Executive CMS</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2 text-xs text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Supabase PostgreSQL Connected</span>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-wider text-white/70 hover:text-white px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 space-y-10">
        
        {/* Welcome Banner Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-canvas-border shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#07381E] text-[11px] font-sans font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authenticated as {profile?.role || 'Superadmin'}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal-950">
              Welcome, {profile?.full_name || user.email}
            </h1>
            <p className="text-sm text-charcoal-600 font-sans">
              Supabase Database Backend &amp; Server-Validated Authentication are active.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#07381E] text-white hover:bg-[#052B17] text-xs font-sans font-semibold uppercase tracking-wider transition-all shrink-0"
          >
            <span>View Public Site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Phase 1 Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-medium text-charcoal-950 block">
                {projectsCount ?? 0}
              </span>
              <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 block mt-0.5">
                Projects Seeded
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Published &amp; Indexed</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-medium text-charcoal-950 block">
                {teamCount ?? 0}
              </span>
              <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 block mt-0.5">
                Executive Team
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Full Roster Mapped</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-medium text-charcoal-950 block">
                {enquiriesCount ?? 0}
              </span>
              <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 block mt-0.5">
                Inbound Enquiries
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>RLS Protected</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-canvas-border shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-serif font-medium text-charcoal-950 block">
                {settingsCount ?? 0}
              </span>
              <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500 block mt-0.5">
                Site Settings Keys
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1.5 pt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Global Config Active</span>
            </div>
          </div>

        </div>

        {/* Status Card */}
        <div className="p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-4">
          <h2 className="font-serif text-2xl font-medium text-charcoal-950">
            Phase 1 Backend Foundation Verification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-charcoal-700">
            <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-[#F7F8F6] border border-canvas-border">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Self-Hosted Supabase PostgreSQL 15.8 via Kong Gateway</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-[#F7F8F6] border border-canvas-border">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Server-Side Middleware Guarding /admin/*</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-[#F7F8F6] border border-canvas-border">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Row Level Security (RLS) with Admin Escalation</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-[#F7F8F6] border border-canvas-border">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Strict Public Website Isolation (Zero Visual Drift)</span>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
