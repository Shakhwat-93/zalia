'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Edit2, ExternalLink, Trash2 } from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface MemberRecord {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio?: string;
  image_url?: string;
  status: string;
  sort_order: number;
}

export default function TeamClientTable({
  initialMembers,
}: {
  initialMembers: MemberRecord[];
}) {
  const [search, setSearch] = useState('');

  const filtered = initialMembers.filter((m) => {
    return (
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: Column<MemberRecord>[] = [
    {
      key: 'name',
      header: 'Leader Particulars',
      priority: 'high',
      render: (m) => (
        <div className="flex items-center space-x-3.5 py-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border flex items-center justify-center">
            {m.image_url ? (
              <Image
                src={m.image_url}
                alt={m.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <span className="font-serif text-xs font-semibold text-charcoal-800">
                {m.initials}
              </span>
            )}
          </div>
          <div>
            <span className="font-serif font-semibold text-charcoal-950 block text-sm sm:text-[15px]">
              {m.name}
            </span>
            <span className="text-[11px] font-sans text-charcoal-500 block">
              {m.role}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Executive Role',
      priority: 'medium',
      render: (m) => (
        <span className="text-xs font-sans text-charcoal-700">
          {m.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Publishing Status',
      priority: 'high',
      render: (m) => <StatusBadge status={m.status} />,
    },
    {
      key: 'sort_order',
      header: 'Roster Order',
      priority: 'low',
      render: (m) => (
        <span className="font-mono text-xs text-charcoal-500">
          #{m.sort_order}
        </span>
      ),
    },
  ];

  const actions: TableAction<MemberRecord>[] = [
    {
      label: 'View on Website',
      icon: ExternalLink,
      onClick: () => {
        window.open('/team', '_blank');
      },
    },
    {
      label: 'Edit Bio & Portrait',
      icon: Edit2,
      onClick: (m) => {
        alert(`Edit modal for director "${m.name}" will open in CMS editor.`);
      },
    },
  ];

  return (
    <ResponsiveTable
      columns={columns}
      data={filtered}
      keyExtractor={(item) => item.id}
      searchPlaceholder="Search team by name or role..."
      onSearchChange={setSearch}
      actions={actions}
      pageSize={8}
      emptyMessage="No team members match your active search."
    />
  );
}
