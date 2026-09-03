'use client';

import React, { useState } from 'react';
import { ExternalLink, Edit2 } from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface SectionRecord {
  id: string;
  section_key: string;
  title: string;
  eyebrow?: string;
  headline?: string;
  status: string;
  sort_order: number;
}

const DEFAULT_SECTIONS: SectionRecord[] = [
  { id: '1', section_key: 'hero', title: 'Hero Gateway', eyebrow: 'ZALIA PROPERTIES LTD', headline: 'WE BUY. WE TRANSFORM. WE CREATE.', status: 'published', sort_order: 1 },
  { id: '2', section_key: 'trust_strip', title: 'Brand Trust Strip', eyebrow: 'STANDARDS', headline: 'UK Residential · Thoughtful Development · Quality Renovation', status: 'published', sort_order: 2 },
  { id: '3', section_key: 'intro', title: 'Company Introduction', eyebrow: 'ABOUT ZALIA', headline: 'WE SEE MORE IN EVERY PROPERTY', status: 'published', sort_order: 3 },
  { id: '4', section_key: 'pillars', title: 'Three Pillars Overview', eyebrow: 'WHAT WE DO', headline: 'FROM POTENTIAL TO POSSIBILITY', status: 'published', sort_order: 4 },
  { id: '5', section_key: 'projects', title: 'Featured Projects Highlight', eyebrow: 'OUR PORTFOLIO', headline: 'SELECTED DEVELOPMENTS', status: 'published', sort_order: 5 },
  { id: '6', section_key: 'statement', title: 'Editorial Perspective', eyebrow: 'ZALIA PERSPECTIVE', headline: 'WE SEE POTENTIAL WHERE OTHERS SEE POSSIBILITY', status: 'published', sort_order: 6 },
  { id: '7', section_key: 'cta', title: 'Direct Consultation Invitation', eyebrow: 'START A CONVERSATION', headline: 'HAVE A PROPERTY WITH POTENTIAL?', status: 'published', sort_order: 7 },
  { id: '8', section_key: 'footer', title: 'Architectural Footer', eyebrow: 'FOOTER', headline: 'ZALIA SIGNATURE WORDMARK', status: 'published', sort_order: 8 },
];

export default function HomepageClientTable({
  initialSections,
}: {
  initialSections: SectionRecord[];
}) {
  const sections = initialSections.length > 0 ? initialSections : DEFAULT_SECTIONS;
  const [search, setSearch] = useState('');

  const filtered = sections.filter((s) => {
    return (
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.section_key.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: Column<SectionRecord>[] = [
    {
      key: 'title',
      header: 'Section Name',
      priority: 'high',
      render: (s) => (
        <div className="py-1">
          <span className="font-serif font-semibold text-charcoal-950 block text-sm sm:text-[15px]">
            {s.title}
          </span>
          <span className="font-mono text-xs text-charcoal-400 block">
            id: #{s.section_key}
          </span>
        </div>
      ),
    },
    {
      key: 'eyebrow',
      header: 'Eyebrow Tag',
      priority: 'medium',
      render: (s) => (
        <span className="text-xs font-sans uppercase tracking-wider text-charcoal-500">
          {s.eyebrow || '—'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      priority: 'high',
      render: (s) => <StatusBadge status={s.status} />,
    },
    {
      key: 'sort_order',
      header: 'Page Order',
      priority: 'low',
      render: (s) => (
        <span className="font-mono text-xs text-charcoal-500">
          Stage 0{s.sort_order}
        </span>
      ),
    },
  ];

  const actions: TableAction<SectionRecord>[] = [
    {
      label: 'Preview on Home',
      icon: ExternalLink,
      onClick: () => {
        window.open('/', '_blank');
      },
    },
    {
      label: 'Edit Content Block',
      icon: Edit2,
      onClick: (s) => {
        alert(`Section editor for "${s.title}" will open in CMS editor.`);
      },
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      data={filtered}
      keyExtractor={(item) => item.id}
      searchPlaceholder="Search homepage sections..."
      onSearchChange={setSearch}
      actions={actions}
      pageSize={8}
      emptyMessage="No sections match your search."
    />
  );
}
