import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import SettingsNav from '@/components/admin/SettingsNav';
import FooterClientManager from './FooterClientManager';

export const dynamic = 'force-dynamic';

export default async function AdminFooterSettingsPage() {
  const supabase = createServerSupabaseClient();

  const [
    { data: footerLinks, count: linkCount },
    { data: settings },
  ] = await Promise.all([
    supabase.from('footer').select('*', { count: 'exact' }).order('sort_order', { ascending: true }),
    supabase.from('site_settings').select('*').in('category', ['footer', 'social']),
  ]);

  const settingsMap: Record<string, string> = {};
  settings?.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Footer &amp; Legal Architecture"
        description="Manage architectural footer description, navigation column links, social channels, and copyright statement."
        totalCount={linkCount ?? 8}
        countLabel="footer links"
        breadcrumbs={[
          { label: 'System' },
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Footer' },
        ]}
      />

      <SettingsNav />

      <FooterClientManager
        initialLinks={footerLinks || []}
        initialSettings={settingsMap}
      />
    </div>
  );
}
