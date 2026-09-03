import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import PagesClientTable from './PagesClientTable';

export const dynamic = 'force-dynamic';

export default async function AdminPagesPage() {
  const supabase = createServerSupabaseClient();

  const { data: pages, count } = await supabase
    .from('pages')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Site Pages Registry"
        description="Public App Router routes, meta page configurations, and publication states."
        totalCount={count ?? 0}
        countLabel="pages"
        breadcrumbs={[{ label: 'Content' }, { label: 'Pages' }]}
      />

      <PagesClientTable initialPages={pages || []} />
    </div>
  );
}
