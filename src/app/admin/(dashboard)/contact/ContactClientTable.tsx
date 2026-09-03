'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Eye, CheckCircle2, Calendar, X } from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';

interface SubmissionRecord {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  enquiry_type: string;
  property_location?: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ContactClientTable({
  initialSubmissions,
}: {
  initialSubmissions: SubmissionRecord[];
}) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState<SubmissionRecord | null>(null);

  const filtered = initialSubmissions.filter((s) => {
    const matchFilter = filter === 'ALL' || s.status.toLowerCase() === filter.toLowerCase();
    const matchSearch =
      !search ||
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.property_location && s.property_location.toLowerCase().includes(search.toLowerCase())) ||
      s.message.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const columns: Column<SubmissionRecord>[] = [
    {
      key: 'full_name',
      header: 'Enquiry Contact',
      priority: 'high',
      render: (sub) => (
        <div className="py-1">
          <span className="font-serif font-semibold text-charcoal-950 block text-sm sm:text-[15px]">
            {sub.full_name}
          </span>
          <span className="text-xs font-sans text-charcoal-500 block">
            {sub.email}
          </span>
        </div>
      ),
    },
    {
      key: 'enquiry_type',
      header: 'Nature',
      priority: 'medium',
      render: (sub) => (
        <span className="text-xs font-sans text-charcoal-700">
          {sub.enquiry_type}
        </span>
      ),
    },
    {
      key: 'property_location',
      header: 'Location / Area',
      priority: 'low',
      render: (sub) => (
        <span className="text-xs font-sans text-charcoal-500">
          {sub.property_location || 'Not Specified'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      priority: 'high',
      render: (sub) => <StatusBadge status={sub.status} />,
    },
    {
      key: 'created_at',
      header: 'Received',
      priority: 'low',
      render: (sub) => (
        <span className="text-xs font-sans text-charcoal-500">
          {new Date(sub.created_at).toLocaleDateString('en-GB')}
        </span>
      ),
    },
  ];

  const actions: TableAction<SubmissionRecord>[] = [
    {
      label: 'View Particulars',
      icon: Eye,
      onClick: (sub) => {
        setActiveEnquiry(sub);
      },
    },
    {
      label: 'Email Lead',
      icon: Mail,
      onClick: (sub) => {
        window.location.href = `mailto:${sub.email}?subject=Zalia Properties — Regarding Your Enquiry`;
      },
    },
  ];

  return (
    <>
      <ResponsiveTable
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search enquiries by name, email, location..."
        filterOptions={[
          { label: 'All Enquiries', value: 'ALL' },
          { label: 'New', value: 'new' },
          { label: 'Reviewed', value: 'reviewed' },
          { label: 'Archived', value: 'archived' },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        actions={actions}
        onRowClick={(sub) => setActiveEnquiry(sub)}
        pageSize={10}
        emptyMessage="No contact submissions match your active filter."
      />

      {/* Enquiry Detail Drawer / Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#07381E]/40 backdrop-blur-xs"
            onClick={() => setActiveEnquiry(null)}
          />

          <div className="relative w-full max-w-xl bg-white border border-canvas-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-canvas-border pb-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <h3 className="font-serif text-2xl font-medium text-charcoal-950">
                    {activeEnquiry.full_name}
                  </h3>
                  <StatusBadge status={activeEnquiry.status} />
                </div>
                <span className="text-xs text-charcoal-400 font-sans block mt-1">
                  Received {new Date(activeEnquiry.created_at).toLocaleString('en-GB')}
                </span>
              </div>

              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[10.5px] uppercase tracking-wider text-charcoal-400 font-semibold block">
                  Email Address
                </span>
                <a
                  href={`mailto:${activeEnquiry.email}`}
                  className="text-charcoal-950 font-medium hover:text-[#07381E] block truncate"
                >
                  {activeEnquiry.email}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[10.5px] uppercase tracking-wider text-charcoal-400 font-semibold block">
                  Telephone
                </span>
                <span className="text-charcoal-950 font-medium block">
                  {activeEnquiry.phone || 'Not Provided'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[10.5px] uppercase tracking-wider text-charcoal-400 font-semibold block">
                  Enquiry Nature
                </span>
                <span className="text-charcoal-950 font-medium block">
                  {activeEnquiry.enquiry_type}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[10.5px] uppercase tracking-wider text-charcoal-400 font-semibold block">
                  Property Location
                </span>
                <span className="text-charcoal-950 font-medium block">
                  {activeEnquiry.property_location || 'Not Specified'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-500 block">
                Submission Message &amp; Particulars:
              </span>
              <div className="p-4 rounded-xl bg-[#F7F8F6] border border-canvas-border text-charcoal-800 text-sm font-sans leading-relaxed whitespace-pre-wrap">
                {activeEnquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="px-4 py-2.5 rounded-xl border border-canvas-border text-xs font-sans font-semibold text-charcoal-700 hover:bg-canvas-warm"
              >
                Close Particulars
              </button>

              <a
                href={`mailto:${activeEnquiry.email}?subject=Zalia Properties — Response to your enquiry`}
                className="px-5 py-2.5 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-colors shadow-soft-sm"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
