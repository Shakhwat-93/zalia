import React from 'react';
import { UploadCloud } from 'lucide-react';
import PageHeader from '@/components/admin/PageHeader';
import MediaClientGrid from './MediaClientGrid';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Media Library"
        description="High-resolution photography, WebP architectural renders, and director portraits."
        totalCount={18}
        countLabel="optimized assets"
        breadcrumbs={[{ label: 'Media' }, { label: 'Library' }]}
        primaryAction={{
          label: 'Upload Media',
          href: '#upload',
          icon: UploadCloud,
        }}
      />

      <MediaClientGrid />
    </div>
  );
}
