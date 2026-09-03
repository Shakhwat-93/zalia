import React from 'react';
import { Plus } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import TeamClientTable from './TeamClientTable';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const supabase = createServerSupabaseClient();

  const { data: members, count } = await supabase
    .from('team_members')
    .select('*', { count: 'exact' })
    .order('sort_order', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Executive Team"
        description="Directorial leadership, roles, biographies, and authentic portraits."
        totalCount={count ?? 0}
        countLabel="directors"
        breadcrumbs={[{ label: 'Content' }, { label: 'Team' }]}
      />

      <TeamClientTable initialMembers={members || []} />
    </div>
  );
}
