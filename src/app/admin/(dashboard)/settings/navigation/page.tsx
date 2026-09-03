import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import SettingsNav from '@/components/admin/SettingsNav';
import NavigationClientManager from './NavigationClientManager';

export const dynamic = 'force-dynamic';

export default async function AdminNavigationSettingsPage() {
  const supabase = createServerSupabaseClient();

  const { data: navItems, count } = await supabase
    .from('navigation')
    .select('*', { count: 'exact' })
    .order('sort_order', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Primary Header Navigation"
        description="Configure header menu order, routing URLs, label typography, and visibility toggles."
        totalCount={count ?? 7}
        countLabel="navigation links"
        breadcrumbs={[
          { label: 'System' },
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Navigation' },
        ]}
      />

      <SettingsNav />

      <NavigationClientManager initialNavItems={navItems || []} />
    </div>
  );
}
