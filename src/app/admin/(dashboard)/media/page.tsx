import React from 'react';
import { UploadCloud } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import MediaClientGrid from './MediaClientGrid';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  const supabase = createServerSupabaseClient();
  const { data: assets, count } = await supabase
    .from('media_assets')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Media Library"
        description="Centralized architectural photography, high-res renders, and executive portraits."
        totalCount={count ?? 0}
        countLabel="media assets"
        breadcrumbs={[{ label: 'Assets' }, { label: 'Media Library' }]}
        secondaryAction={{
          label: 'Storage Bucket',
          href: '#storage',
        }}
      />

      <MediaClientGrid initialAssets={assets || []} />
    </div>
  );
}
