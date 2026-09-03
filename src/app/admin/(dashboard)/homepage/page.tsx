import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import HomepageClientTable from './HomepageClientTable';

export const dynamic = 'force-dynamic';

export default async function AdminHomepagePage() {
  const supabase = createServerSupabaseClient();

  const { data: sections, count } = await supabase
    .from('homepage_sections')
    .select('*', { count: 'exact' })
    .order('sort_order', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Homepage Sections"
        description="Configure headlines, call-to-action buttons, order, and publishing status for the homepage."
        totalCount={count ?? 8}
        countLabel="sections"
        breadcrumbs={[{ label: 'Content' }, { label: 'Homepage' }]}
        secondaryAction={{
          label: 'Preview Home',
          href: '/',
        }}
      />

      <HomepageClientTable initialSections={sections || []} />
    </div>
  );
}
