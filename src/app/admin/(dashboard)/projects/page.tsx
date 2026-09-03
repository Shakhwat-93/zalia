import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, ExternalLink, Plus, MapPin } from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import StatusBadge from '@/components/admin/StatusBadge';
import ProjectsClientTable from './ProjectsClientTable';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const supabase = createServerSupabaseClient();

  const { data: projects, count } = await supabase
    .from('projects')
    .select('*', { count: 'exact' })
    .order('sort_order', { ascending: true });

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title="Projects Portfolio"
        description="Manage prime residential developments, status badges, case studies, and photography."
        totalCount={count ?? 0}
        countLabel="projects"
        breadcrumbs={[{ label: 'Projects' }]}
        primaryAction={{
          label: 'Add Project',
          href: '/admin/projects/new',
          icon: <Plus className="w-4 h-4 text-white" />,
        }}
        secondaryAction={{
          label: 'Export Catalog',
          href: '#export',
        }}
      />

      <ProjectsClientTable initialProjects={projects || []} />
    </div>
  );
}
