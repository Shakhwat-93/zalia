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
          <span className="font-sans font-medium text-charcoal-950 block text-sm">
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
      header: 'Meta Description',
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
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden sm:block">
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
      </div>

      {/* Mobile Stacked Cards Layout */}
      <div className="block sm:hidden space-y-3">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-canvas-border text-xs font-sans text-charcoal-900 focus:outline-none focus:border-[#07381E]"
          />
        </div>

        {filtered.map((p) => {
          const editHref =
            p.slug === 'home'
              ? '/admin/homepage'
              : p.slug === 'team'
              ? '/admin/team'
              : p.slug === 'projects'
              ? '/admin/projects'
              : p.slug === 'contact'
              ? '/admin/contact'
              : `/admin/pages/${p.slug}`;

          return (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-white border border-canvas-border shadow-2xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-sans font-medium text-charcoal-950 text-sm block">
                    {p.title}
                  </span>
                  <span className="font-mono text-xs text-[#07381E] block">
                    /{p.slug === 'home' ? '' : p.slug}
                  </span>
                </div>
                <StatusBadge status={p.status} />
              </div>

              {p.description && (
                <p className="text-xs text-charcoal-500 font-sans line-clamp-2">
                  {p.description}
                </p>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-canvas-border/50 text-xs">
                <a
                  href={p.slug === 'home' ? '/' : `/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 text-charcoal-600 hover:text-charcoal-950 rounded-lg text-xs font-medium"
                >
                  View
                </a>
                <a
                  href={editHref}
                  className="px-3.5 py-1.5 bg-[#07381E] text-white rounded-lg text-xs font-medium hover:bg-[#052B17] transition-colors"
                >
                  Edit Page
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
