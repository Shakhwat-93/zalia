'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Edit2, Trash2 } from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  tag?: string;
  location: string;
  category: string;
  status_badge: string;
  description: string;
  image_url: string;
  featured: boolean;
  status: string;
  sort_order: number;
}

export default function ProjectsClientTable({
  initialProjects,
}: {
  initialProjects: ProjectRecord[];
}) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = initialProjects.filter((p) => {
    const matchFilter =
      filter === 'ALL' ||
      p.status_badge.toUpperCase() === filter ||
      p.status.toUpperCase() === filter;

    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const columns: Column<ProjectRecord>[] = [
    {
      key: 'title',
      header: 'Project Particulars',
      priority: 'high',
      render: (proj) => (
        <div className="flex items-center space-x-3.5 py-1">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border">
            <Image
              src={proj.image_url}
              alt={proj.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <span className="font-serif font-semibold text-charcoal-950 block truncate text-sm sm:text-[15px]">
              {proj.title}
            </span>
            <span className="text-[11px] font-sans text-charcoal-500 block truncate">
              {proj.location} · {proj.tag || 'PORTFOLIO'}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      priority: 'medium',
      render: (proj) => (
        <span className="text-xs font-sans text-charcoal-700">
          {proj.category}
        </span>
      ),
    },
    {
      key: 'status_badge',
      header: 'Development Status',
      priority: 'high',
      render: (proj) => <StatusBadge status={proj.status_badge} />,
    },
    {
      key: 'status',
      header: 'Visibility',
      priority: 'medium',
      render: (proj) => <StatusBadge status={proj.status} />,
    },
    {
      key: 'sort_order',
      header: 'Order',
      priority: 'low',
      render: (proj) => (
        <span className="font-mono text-xs text-charcoal-500">
          #{proj.sort_order}
        </span>
      ),
    },
  ];

  const actions: TableAction<ProjectRecord>[] = [
    {
      label: 'View Case Study',
      icon: ExternalLink,
      onClick: (proj) => {
        window.open(`/projects/${proj.slug}`, '_blank');
      },
    },
    {
      label: 'Edit Particulars',
      icon: Edit2,
      onClick: (proj) => {
        alert(`Edit modal for "${proj.title}" will open in CMS editor.`);
      },
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      data={filtered}
      keyExtractor={(item) => item.id}
      searchPlaceholder="Search by title, location, category..."
      filterOptions={[
        { label: 'All Projects', value: 'ALL' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Current Developments', value: 'CURRENT' },
      ]}
      activeFilter={filter}
      onFilterChange={setFilter}
      onSearchChange={setSearch}
      actions={actions}
      pageSize={8}
      emptyMessage="No projects match your active search or filter."
    />
  );
}
