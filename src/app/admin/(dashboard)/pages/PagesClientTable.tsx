'use client';

import React, { useState } from 'react';
import { ExternalLink, Edit2 } from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface PageRecord {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: string;
  created_at: string;
}

export default function PagesClientTable({
  initialPages,
}: {
  initialPages: PageRecord[];
}) {
  const [search, setSearch] = useState('');

  const filtered = initialPages.filter((p) => {
    return (
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: Column<PageRecord>[] = [
    {
      key: 'title',
      header: 'Page & Route Path',
      priority: 'high',
      render: (p) => (
        <div className="py-1">
          <span className="font-serif font-semibold text-charcoal-950 block text-sm sm:text-[15px]">
            {p.title}
          </span>
          <span className="font-mono text-xs text-[#07381E] block mt-0.5">
            /{p.slug === 'home' ? '' : p.slug}
          </span>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'SEO Meta Description',
      priority: 'medium',
      render: (p) => (
        <span className="text-xs font-sans text-charcoal-500 line-clamp-2 max-w-md">
          {p.description || 'No description provided.'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      priority: 'high',
      render: (p) => <StatusBadge status={p.status} />,
    },
  ];

  const actions: TableAction<PageRecord>[] = [
    {
      label: 'Open Public URL',
      icon: ExternalLink,
      onClick: (p) => {
        const path = p.slug === 'home' ? '/' : `/${p.slug}`;
        window.open(path, '_blank');
      },
    },
    {
      label: 'Edit Page CMS',
      icon: Edit2,
      onClick: (p) => {
        if (p.slug === 'home') {
          window.location.href = '/admin/homepage';
        } else if (p.slug === 'team') {
          window.location.href = '/admin/team';
        } else if (p.slug === 'projects') {
          window.location.href = '/admin/projects';
        } else if (p.slug === 'contact') {
          window.location.href = '/admin/contact';
        } else {
          window.location.href = `/admin/pages/${p.slug}`;
        }
      },
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      data={filtered}
      keyExtractor={(item) => item.id}
      searchPlaceholder="Search pages by title or slug..."
      onSearchChange={setSearch}
      actions={actions}
      pageSize={10}
      emptyMessage="No pages match your search."
    />
  );
}
