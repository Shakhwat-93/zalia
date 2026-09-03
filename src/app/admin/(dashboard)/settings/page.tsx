import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import SettingsClientForm from './SettingsClientForm';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const supabase = createServerSupabaseClient();

  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .order('category', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Global Site Settings"
        description="Headquarters direct contact channels, company registration, and brand credentials."
        breadcrumbs={[{ label: 'System' }, { label: 'Settings' }]}
      />

      <SettingsClientForm initialSettings={settings || []} />
    </div>
  );
}
