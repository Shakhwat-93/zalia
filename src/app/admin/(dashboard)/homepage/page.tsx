import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import HomepageClientCMS from './HomepageClientCMS';

export const dynamic = 'force-dynamic';

export default async function AdminHomepagePage() {
  const supabase = createServerSupabaseClient();

  const [
    { data: sections, count: sectionCount },
    { data: projects },
  ] = await Promise.all([
    supabase
      .from('homepage_sections')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true }),
    supabase
      .from('projects')
      .select('id, slug, title, location, category, status_badge, image_url, featured, sort_order')
      .order('sort_order', { ascending: true }),
  ]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Homepage Experience CMS"
        description="Manage headlines, brand narrative, 3 pillars, featured projects, and section sequence."
        totalCount={sectionCount ?? 6}
        countLabel="sections"
        breadcrumbs={[{ label: 'Content' }, { label: 'Homepage' }]}
        secondaryAction={{
          label: 'Preview Live Home',
          href: '/',
        }}
      />

      <HomepageClientCMS
        initialSections={sections || []}
        initialProjects={projects || []}
      />
    </div>
  );
}
