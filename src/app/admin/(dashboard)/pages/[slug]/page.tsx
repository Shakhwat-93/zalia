import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import PageHeader from '@/components/admin/PageHeader';
import AboutPageEditor from '@/components/admin/AboutPageEditor';
import WhatWeDoPageEditor from '@/components/admin/WhatWeDoPageEditor';
import ApproachPageEditor from '@/components/admin/ApproachPageEditor';

export const dynamic = 'force-dynamic';

interface PageEditorProps {
  params: {
    slug: string;
  };
}

export default async function AdminDedicatedPageEditor({ params }: PageEditorProps) {
  const { slug } = params;

  if (slug === 'team') {
    redirect('/admin/team');
  }

  const supabase = createServerSupabaseClient();
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title={`Edit Page: ${page.title}`}
        description={`Manage copy, photography assets, and publishing status for /${slug === 'home' ? '' : slug}.`}
        breadcrumbs={[
          { label: 'Pages', href: '/admin/pages' },
          { label: page.title },
        ]}
        secondaryAction={{
          label: 'View Live Page',
          href: slug === 'home' ? '/' : `/${slug}`,
        }}
      />

      {slug === 'about' && <AboutPageEditor initialData={page} />}
      {slug === 'what-we-do' && <WhatWeDoPageEditor initialData={page} />}
      {slug === 'approach' && <ApproachPageEditor initialData={page} />}
    </div>
  );
}
