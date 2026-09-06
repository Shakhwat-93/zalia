'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Eye,
  CheckCircle2,
  Calendar,
  X,
  Archive,
  Check,
  RotateCcw,
  Trash2,
  Globe,
  MessageSquare,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import AdminModal from '@/components/admin/AdminModal';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

export interface SubmissionRecord {
  id: string;
  name?: string;
  full_name?: string;
  email: string;
  phone?: string;
  subject?: string;
  enquiry_type?: string;
  property_location?: string;
  message: string;
  source_page?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export default function ContactClientTable({
  initialSubmissions,
}: {
  initialSubmissions: SubmissionRecord[];
}) {
  const supabase = createBrowserSupabaseClient();

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(initialSubmissions);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState<SubmissionRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SubmissionRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const getDisplayName = (s: SubmissionRecord) => s.name || s.full_name || 'Anonymous Visitor';
  const getDisplaySubject = (s: SubmissionRecord) => s.subject || s.enquiry_type || 'General Enquiry';

  // Update Status
  const updateStatus = async (id: string, nextStatus: 'new' | 'read' | 'replied' | 'archived') => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s))
      );

      if (activeEnquiry && activeEnquiry.id === id) {
        setActiveEnquiry((prev) => (prev ? { ...prev, status: nextStatus } : null));
      }

      showNotification(`Enquiry status updated to "${nextStatus.toUpperCase()}".`);
    } catch (err: any) {
      console.error('Failed to update status:', err);
      alert('Error updating status: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete Submission
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', deleteTarget.id);

      if (error) throw error;

      setSubmissions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      if (activeEnquiry?.id === deleteTarget.id) {
        setActiveEnquiry(null);
      }
      showNotification('Enquiry submission permanently removed.');
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Failed to delete enquiry:', err);
      alert('Error deleting enquiry: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  // Filtering
  const filtered = submissions.filter((s) => {
    const statusLower = (s.status || '').toLowerCase();
    const filterLower = filter.toLowerCase();

    let matchFilter = true;
    if (filter !== 'ALL') {
      if (filterLower === 'new') {
        matchFilter = statusLower === 'new';
      } else if (filterLower === 'read') {
        matchFilter = statusLower === 'read' || statusLower === 'reviewed';
      } else if (filterLower === 'replied') {
        matchFilter = statusLower === 'replied' || statusLower === 'contacted';
      } else if (filterLower === 'archived') {
        matchFilter = statusLower === 'archived';
      }
    }

    const name = getDisplayName(s).toLowerCase();
    const subject = getDisplaySubject(s).toLowerCase();
    const location = (s.property_location || '').toLowerCase();
    const message = (s.message || '').toLowerCase();
    const email = (s.email || '').toLowerCase();
    const q = search.toLowerCase();

    const matchSearch =
      !search ||
      name.includes(q) ||
      email.includes(q) ||
      subject.includes(q) ||
      location.includes(q) ||
      message.includes(q);

    return matchFilter && matchSearch;
  });

  // Counts for pills
  const newCount = submissions.filter((s) => (s.status || '').toLowerCase() === 'new').length;
  const readCount = submissions.filter((s) => ['read', 'reviewed'].includes((s.status || '').toLowerCase())).length;
  const repliedCount = submissions.filter((s) => ['replied', 'contacted'].includes((s.status || '').toLowerCase())).length;
  const archivedCount = submissions.filter((s) => (s.status || '').toLowerCase() === 'archived').length;

  const columns: Column<SubmissionRecord>[] = [
    {
      key: 'name',
      header: 'Enquiry Contact',
      priority: 'high',
      render: (sub) => {
        const isUnread = sub.status === 'new';
        return (
          <div className="py-1 flex items-start space-x-2.5">
            {isUnread && (
              <span className="w-2 h-2 rounded-full bg-[#07381E] mt-1.5 shrink-0" title="New unread enquiry" />
            )}
            <div>
              <span className={`font-sans text-charcoal-950 block text-sm ${isUnread ? 'font-semibold text-[#07381E]' : 'font-medium'}`}>
                {getDisplayName(sub)}
              </span>
              <span className="text-xs font-sans text-charcoal-500 block">
                {sub.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'subject',
      header: 'Nature / Subject',
      priority: 'medium',
      render: (sub) => (
        <span className="text-xs font-sans font-medium text-charcoal-700">
          {getDisplaySubject(sub)}
        </span>
      ),
    },
    {
      key: 'property_location',
      header: 'Location / Area',
      priority: 'low',
      render: (sub) => (
        <span className="text-xs font-sans text-charcoal-500">
          {sub.property_location || '—'}
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
          {new Date(sub.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
    },
  ];

  const actions: TableAction<SubmissionRecord>[] = [
    {
      label: 'Open Details',
      icon: Eye,
      onClick: (sub) => {
        setActiveEnquiry(sub);
        if (sub.status === 'new') {
          updateStatus(sub.id, 'read');
        }
      },
    },
    {
      label: 'Mark as Read',
      icon: Check,
      onClick: (sub) => updateStatus(sub.id, 'read'),
    },
    {
      label: 'Mark as Replied',
      icon: Send,
      onClick: (sub) => updateStatus(sub.id, 'replied'),
    },
    {
      label: 'Archive',
      icon: Archive,
      onClick: (sub) => updateStatus(sub.id, 'archived'),
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: (sub) => setDeleteTarget(sub),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Tabs with Live Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-canvas-border pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: 'All', value: 'ALL', count: submissions.length },
            { label: 'Unread', value: 'new', count: newCount, highlight: newCount > 0 },
            { label: 'Read', value: 'read', count: readCount },
            { label: 'Replied', value: 'replied', count: repliedCount },
            { label: 'Archived', value: 'archived', count: archivedCount },
          ].map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilter(tab.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#07381E] text-white shadow-2xs font-semibold'
                    : 'bg-white border border-canvas-border text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm font-medium'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-mono leading-none ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : tab.highlight
                      ? 'bg-emerald-100 text-[#07381E] font-semibold'
                      : 'bg-canvas-warm text-charcoal-500'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {newCount > 0 && (
          <span className="text-xs font-sans text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>{newCount} awaiting review</span>
          </span>
        )}
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block">
        <ResponsiveTable
          columns={columns}
          data={filtered}
          keyExtractor={(item) => item.id}
          searchPlaceholder="Search enquiries by name, email, subject..."
          onSearchChange={setSearch}
          actions={actions}
          onRowClick={(sub) => {
            setActiveEnquiry(sub);
            if (sub.status === 'new') {
              updateStatus(sub.id, 'read');
            }
          }}
          pageSize={10}
          emptyMessage="No contact submissions match your active filter."
        />
      </div>

      {/* Dedicated Mobile Card Layout (Touch friendly, no horizontal scrolling) */}
      <div className="block sm:hidden space-y-3">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search enquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-canvas-border text-xs font-sans text-charcoal-900 focus:outline-none focus:border-[#07381E]"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-canvas-border text-xs text-charcoal-500">
            No submissions found.
          </div>
        ) : (
          filtered.map((sub) => {
            const isUnread = sub.status === 'new';
            return (
              <div
                key={sub.id}
                onClick={() => {
                  setActiveEnquiry(sub);
                  if (sub.status === 'new') {
                    updateStatus(sub.id, 'read');
                  }
                }}
                className={`p-4 rounded-xl bg-white border transition-all active:scale-[0.99] space-y-2.5 shadow-2xs ${
                  isUnread
                    ? 'border-emerald-300 ring-1 ring-emerald-100 bg-[#F7F8F6]'
                    : 'border-canvas-border'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-sans text-sm font-semibold text-charcoal-950 block">
                      {getDisplayName(sub)}
                    </span>
                    <span className="text-xs font-sans text-charcoal-500 block truncate">
                      {sub.email}
                    </span>
                  </div>
                  <StatusBadge status={sub.status} />
                </div>

                <div className="text-xs text-charcoal-600 font-sans line-clamp-2 bg-canvas-warm/70 p-2.5 rounded-lg">
                  {sub.message}
                </div>

                <div className="flex items-center justify-between text-[11px] font-sans text-charcoal-400 pt-1 border-t border-canvas-border/50">
                  <span className="font-medium text-charcoal-700">
                    {getDisplaySubject(sub)}
                  </span>
                  <span>
                    {new Date(sub.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Enquiry Detail Drawer / Modal */}
      {activeEnquiry && (
        <AdminModal
          isOpen={Boolean(activeEnquiry)}
          onClose={() => setActiveEnquiry(null)}
          maxWidth="xl"
          title={
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-sans text-base sm:text-lg font-semibold text-charcoal-950 truncate">
                {getDisplayName(activeEnquiry)}
              </span>
              <StatusBadge status={activeEnquiry.status} />
            </div>
          }
          description={`Received ${new Date(activeEnquiry.created_at).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}`}
          footer={
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 w-full">
              <button
                type="button"
                onClick={() => setDeleteTarget(activeEnquiry)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg text-xs font-sans font-medium text-rose-600 hover:bg-rose-50 flex items-center justify-center space-x-1.5 transition-colors min-h-[44px] sm:min-h-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Submission</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveEnquiry(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-canvas-border text-xs font-sans font-medium text-charcoal-700 hover:bg-canvas-warm transition-colors min-h-[44px] sm:min-h-0 flex items-center justify-center"
                >
                  Close
                </button>

                <a
                  href={`mailto:${activeEnquiry.email}?subject=Zalia Properties — Response to your enquiry`}
                  onClick={() => updateStatus(activeEnquiry.id, 'replied')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-2xs min-h-[44px] sm:min-h-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          }
        >
          <div className="space-y-5 text-left">
            {/* Particulars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[11px] text-charcoal-500 font-medium flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#07381E]" />
                  <span>Email Address</span>
                </span>
                <a
                  href={`mailto:${activeEnquiry.email}?subject=Zalia Properties — Regarding Your Enquiry`}
                  className="text-charcoal-950 font-medium hover:text-[#07381E] block truncate"
                >
                  {activeEnquiry.email}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[11px] text-charcoal-500 font-medium flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#07381E]" />
                  <span>Telephone</span>
                </span>
                {activeEnquiry.phone ? (
                  <a
                    href={`tel:${activeEnquiry.phone}`}
                    className="text-charcoal-950 font-medium hover:text-[#07381E] block"
                  >
                    {activeEnquiry.phone}
                  </a>
                ) : (
                  <span className="text-charcoal-400 italic block">Not Provided</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[11px] text-charcoal-500 font-medium flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#07381E]" />
                  <span>Subject</span>
                </span>
                <span className="text-charcoal-950 font-medium block break-words">
                  {getDisplaySubject(activeEnquiry)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-canvas-warm space-y-1">
                <span className="text-[11px] text-charcoal-500 font-medium flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#07381E]" />
                  <span>Property Location</span>
                </span>
                <span className="text-charcoal-950 font-medium block truncate">
                  {activeEnquiry.property_location || 'Not Specified'}
                </span>
              </div>

              {activeEnquiry.source_page && (
                <div className="sm:col-span-2 p-2.5 rounded-xl bg-canvas-warm/70 flex items-center justify-between text-[11px] text-charcoal-500">
                  <span className="flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>Submitted From:</span>
                  </span>
                  <span className="font-mono text-charcoal-800">{activeEnquiry.source_page}</span>
                </div>
              )}
            </div>

            {/* Submission Message */}
            <div className="space-y-1.5">
              <span className="text-xs font-sans font-medium text-charcoal-600 block">
                Message:
              </span>
              <div className="p-4 rounded-xl bg-[#F7F8F6] border border-canvas-border text-charcoal-900 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap break-words">
                {activeEnquiry.message}
              </div>
            </div>

            {/* Status Management Quick Controls */}
            <div className="p-3.5 rounded-xl bg-canvas-warm border border-canvas-border space-y-2">
              <span className="text-[11px] font-sans font-medium text-charcoal-600 block">
                Update Status:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  disabled={isProcessing || activeEnquiry.status === 'new'}
                  onClick={() => updateStatus(activeEnquiry.id, 'new')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                    activeEnquiry.status === 'new'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-white border border-canvas-border text-charcoal-700 hover:bg-stone-50'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Mark as New</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing || activeEnquiry.status === 'read'}
                  onClick={() => updateStatus(activeEnquiry.id, 'read')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                    activeEnquiry.status === 'read'
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-white border border-canvas-border text-charcoal-700 hover:bg-stone-50'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>Mark as Read</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing || activeEnquiry.status === 'replied'}
                  onClick={() => updateStatus(activeEnquiry.id, 'replied')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                    activeEnquiry.status === 'replied'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-white border border-canvas-border text-charcoal-700 hover:bg-stone-50'
                  }`}
                >
                  <Send className="w-3 h-3" />
                  <span>Mark as Replied</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing || activeEnquiry.status === 'archived'}
                  onClick={() => updateStatus(activeEnquiry.id, 'archived')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors ${
                    activeEnquiry.status === 'archived'
                      ? 'bg-stone-200 text-stone-800 border border-stone-300'
                      : 'bg-white border border-canvas-border text-charcoal-700 hover:bg-stone-50'
                  }`}
                >
                  <Archive className="w-3 h-3" />
                  <span>Archive</span>
                </button>
              </div>
            </div>
          </div>
        </AdminModal>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Enquiry Submission?"
        message={`Are you sure you want to permanently delete the enquiry from "${deleteTarget ? getDisplayName(deleteTarget) : ''}" (${deleteTarget?.email})? This action cannot be undone.`}
        confirmLabel="Permanently Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isProcessing}
      />
    </div>
  );
}
