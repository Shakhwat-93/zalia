import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import ContactClientTable from './ContactClientTable';

export const dynamic = 'force-dynamic';

export default async function AdminContactPage() {
  const supabase = createServerSupabaseClient();

  const { data: submissions, count } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Contact Submissions"
        description="Inbound property acquisition enquiries, partnership proposals, and investor communications."
        totalCount={count ?? 0}
        countLabel="enquiries"
        breadcrumbs={[{ label: 'Communication' }, { label: 'Contact Submissions' }]}
        secondaryAction={{
          label: 'Export CSV',
          href: '#export',
        }}
      />

      <ContactClientTable initialSubmissions={submissions || []} />
    </div>
  );
}
