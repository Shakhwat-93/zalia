import React from 'react';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export const dynamic = 'force-dynamic';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function AdminEditProjectPage({ params }: EditProjectPageProps) {
  const supabase = createServerSupabaseClient();
  const { id } = params;

  // Query project by ID or fallback by slug
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .or(`id.eq.${id},slug.eq.${id}`)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      <PageHeader
        title={`Edit: ${project.title}`}
        description={`Update architectural particulars, gallery images, before/after comparisons, and status.`}
        breadcrumbs={[
          { label: 'Projects', href: '/admin/projects' },
          { label: project.title },
        ]}
        secondaryAction={{
          label: 'View Public Page',
          href: `/projects/${project.slug}`,
        }}
      />

      <ProjectForm initialData={project} isNew={false} />
    </div>
  );
}
