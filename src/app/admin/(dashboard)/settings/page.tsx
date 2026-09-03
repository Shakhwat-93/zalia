import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import SettingsNav from '@/components/admin/SettingsNav';
import SettingsClientForm from './SettingsClientForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const supabase = createServerSupabaseClient();

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .order('category', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Global Configuration"
        description="Brand identity, typography hierarchy, direct headquarters contact, and default search meta tags."
        breadcrumbs={[{ label: 'System' }, { label: 'Settings' }]}
      />

      <SettingsNav />

      <SettingsClientForm initialSettings={settings || []} />
    </div>
  );
}
