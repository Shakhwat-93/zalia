import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import MediaClientGrid from './MediaClientGrid';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  let assets: any[] = [];
  let count = 0;

  try {
    const supabase = createServerSupabaseClient();
    const { data, count: exactCount, error } = await supabase
      .from('media_assets')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (!error && data) {
      assets = data;
      count = exactCount ?? data.length;
    }
  } catch (err) {
    console.error('Failed to load media assets in AdminMediaPage:', err);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Media Library"
        description="Centralized architectural photography, high-res renders, and executive portraits."
        totalCount={count}
        countLabel="media assets"
        breadcrumbs={[{ label: 'Assets' }, { label: 'Media Library' }]}
        secondaryAction={{
          label: 'Storage Bucket',
          href: '#storage',
        }}
      />

      <MediaClientGrid initialAssets={assets} />
    </div>
  );
}
