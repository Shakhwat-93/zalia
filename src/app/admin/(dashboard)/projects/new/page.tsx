import React from 'react';
import PageHeader from '@/components/admin/PageHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export const dynamic = 'force-dynamic';

export default function AdminNewProjectPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Create New Project"
        description="Draft a prime residential transformation case study with verified location, gallery assets, and before/after comparisons."
        breadcrumbs={[
          { label: 'Projects', href: '/admin/projects' },
          { label: 'New Project' },
        ]}
      />

      <ProjectForm isNew={true} />
    </div>
  );
}
