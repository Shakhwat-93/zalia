'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Edit2,
  ExternalLink,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  Save
} from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import AdminModal from '@/components/admin/AdminModal';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import MediaPickerField from '@/components/admin/MediaPickerField';

export interface MemberRecord {
  id: string;
  name: string;
  role: string;
  initials?: string;
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
  const supabase = createBrowserSupabaseClient();

  const [members, setMembers] = useState<MemberRecord[]>(initialMembers);
  const [search, setSearch] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberRecord | null>(null);
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStatus, setFormStatus] = useState('published');
  const [formOrder, setFormOrder] = useState(1);

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<MemberRecord | null>(null);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const openAddModal = () => {
    setEditingMember(null);
    setFormName('');
    setFormRole('');
    setFormBio('');
    setFormImageUrl('/images/Zaki shamseer.webp');
    setFormStatus('published');
    setFormOrder(members.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (m: MemberRecord) => {
    setEditingMember(m);
    setFormName(m.name);
    setFormRole(m.role);
    setFormBio(m.bio || '');
    setFormImageUrl(m.image_url || '');
    setFormStatus(m.status);
    setFormOrder(m.sort_order);
    setIsModalOpen(true);
  };

  const computeInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Reorder Members
  const moveMember = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === members.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newMembers = [...members];
    const [moved] = newMembers.splice(index, 1);
    newMembers.splice(targetIndex, 0, moved);

    const reordered = newMembers.map((m, idx) => ({
      ...m,
      sort_order: idx + 1,
    }));

    setMembers(reordered);
    setIsProcessing(true);

    try {
      const updates = reordered.map((m) =>
        supabase.from('team_members').update({ sort_order: m.sort_order }).eq('id', m.id)
      );
      await Promise.all(updates);
      showNotification('Leadership roster order updated.');
    } catch (err) {
      console.error('Failed to update order:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle Visibility
  const toggleVisibility = async (member: MemberRecord) => {
    const nextStatus = member.status === 'published' ? 'draft' : 'published';
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? { ...m, status: nextStatus } : m))
    );

    try {
      await supabase.from('team_members').update({ status: nextStatus }).eq('id', member.id);
      showNotification(`"${member.name}" is now ${nextStatus === 'published' ? 'Published' : 'Draft'}.`);
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  // Save Member (Create or Edit)
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const payload = {
      name: formName.trim(),
      role: formRole.trim(),
      bio: formBio.trim(),
      image_url: formImageUrl.trim(),
      initials: computeInitials(formName),
      status: formStatus,
      sort_order: Number(formOrder),
    };

    try {
      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update(payload)
          .eq('id', editingMember.id);
        if (error) throw error;

        setMembers((prev) =>
          prev.map((m) => (m.id === editingMember.id ? { ...m, ...payload } : m))
        );
        showNotification(`Updated details for "${payload.name}".`);
      } else {
        const { data, error } = await supabase
          .from('team_members')
          .insert([payload])
          .select('*')
          .single();
        if (error) throw error;
        if (data) {
          setMembers((prev) => [...prev, data]);
          showNotification(`Added "${payload.name}" to leadership directory.`);
        }
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to save team member:', err);
      alert('Error saving team member: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete Member
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsProcessing(true);

    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', deleteTarget.id);
      if (error) throw error;

      setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      showNotification(`Removed "${deleteTarget.name}" from directory.`);
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Failed to delete member:', err);
      alert('Error deleting member: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const filtered = members.filter((m) => {
    return (
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  const columns: Column<MemberRecord>[] = [
    {
      key: 'sort_order',
      header: 'Order',
      priority: 'high',
      render: (m) => {
        const index = members.findIndex((item) => item.id === m.id);
        return (
          <div className="flex items-center space-x-1">
            <button
              type="button"
              disabled={index === 0 || isProcessing}
              onClick={() => moveMember(index, 'up')}
              className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
              title="Move up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-semibold text-charcoal-600 px-0.5">
              #{m.sort_order}
            </span>
            <button
              type="button"
              disabled={index === members.length - 1 || isProcessing}
              onClick={() => moveMember(index, 'down')}
              className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
              title="Move down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    },
    {
      key: 'name',
      header: 'Team Member',
      priority: 'high',
      render: (m) => (
        <div className="flex items-center space-x-3.5 py-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border flex items-center justify-center shadow-2xs">
            {m.image_url ? (
              <Image
                src={m.image_url}
                alt={m.name}
                fill
                className="object-cover object-top"
                sizes="40px"
              />
            ) : (
              <span className="font-sans text-xs font-semibold text-charcoal-800">
                {m.initials || computeInitials(m.name)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <span className="font-sans font-medium text-charcoal-950 block text-sm truncate">
              {m.name}
            </span>
            <span className="text-xs font-sans text-charcoal-500 block truncate">
              {m.role}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      priority: 'medium',
      render: (m) => (
        <span className="text-xs font-sans font-medium text-charcoal-700">
          {m.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      priority: 'high',
      render: (m) => (
        <button
          type="button"
          onClick={() => toggleVisibility(m)}
          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
            m.status === 'published'
              ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20'
              : 'bg-stone-100 text-stone-500 border-stone-200'
          }`}
        >
          {m.status === 'published' ? (
            <>
              <Eye className="w-3 h-3" />
              <span>Published</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              <span>Draft</span>
            </>
          )}
        </button>
      ),
    },
  ];

  const actions: TableAction<MemberRecord>[] = [
    {
      label: 'Edit Details',
      icon: Edit2,
      onClick: (m) => {
        openEditModal(m);
      },
    },
    {
      label: 'View on Website',
      icon: ExternalLink,
      onClick: () => {
        window.open('/team', '_blank');
      },
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: (m) => {
        setDeleteTarget(m);
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-charcoal-500 font-sans">
          Showing {members.length} team members
        </span>

        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-medium flex items-center space-x-1.5 transition-all shadow-soft-sm"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Team Member</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <ResponsiveTable
          columns={columns}
          data={filtered}
          keyExtractor={(item) => item.id}
          searchPlaceholder="Search leadership by name or role..."
          onSearchChange={setSearch}
          actions={actions}
          pageSize={8}
          emptyMessage="No team members match your active search."
        />
      </div>

      {/* Mobile Stacked Cards Layout */}
      <div className="block sm:hidden space-y-3">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Search team..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-canvas-border text-xs font-sans text-charcoal-900 focus:outline-none focus:border-[#07381E]"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-canvas-border text-xs text-charcoal-500">
            No team members found.
          </div>
        ) : (
          filtered.map((m) => {
            const isPublished = m.status === 'published';
            return (
              <div
                key={m.id}
                className="p-4 rounded-xl bg-white border border-canvas-border shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border flex items-center justify-center">
                      {m.image_url ? (
                        <Image
                          src={m.image_url}
                          alt={m.name}
                          fill
                          className="object-cover object-top"
                          sizes="40px"
                        />
                      ) : (
                        <span className="font-sans text-xs font-semibold text-charcoal-800">
                          {m.initials || computeInitials(m.name)}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-sans font-medium text-charcoal-950 text-xs block">
                        {m.name}
                      </span>
                      <span className="text-[11px] font-sans text-charcoal-500 block">
                        {m.role}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleVisibility(m)}
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors ${
                      isPublished
                        ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20'
                        : 'bg-stone-100 text-stone-500 border-stone-200'
                    }`}
                  >
                    {isPublished ? <Eye className="w-2.5 h-2.5" /> : <EyeOff className="w-2.5 h-2.5" />}
                    <span>{isPublished ? 'Published' : 'Draft'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-canvas-border/50 text-xs">
                  <span className="font-mono text-[10px] text-charcoal-400">Order #{m.sort_order}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(m)}
                      className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(m)}
                      className="px-3 py-1 bg-[#07381E] text-white rounded-lg text-xs font-medium hover:bg-[#052B17] transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asForm={true}
        onSubmit={handleSaveMember}
        maxWidth="lg"
        title={editingMember ? `Edit ${editingMember.name}` : 'Add Team Member'}
        description="Update member role, portrait photo, and biography."
        footer={
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 w-full">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-canvas-border text-charcoal-700 hover:bg-canvas-warm text-xs font-medium transition-colors min-h-[44px] sm:min-h-0 flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-2xs disabled:opacity-50 min-h-[44px] sm:min-h-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{editingMember ? 'Save Changes' : 'Add Member'}</span>
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Zaki Shamseer"
              className="w-full min-w-0 px-4 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] box-border"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
              Executive Role (Verified actual title only) *
            </label>
            <input
              type="text"
              required
              value={formRole}
              onChange={(e) => setFormRole(e.target.value)}
              placeholder="e.g. Founder & Managing Director"
              className="w-full min-w-0 px-4 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] box-border"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
              Biography (Optional)
            </label>
            <textarea
              rows={3}
              value={formBio}
              onChange={(e) => setFormBio(e.target.value)}
              placeholder="Executive background and leadership focus..."
              className="w-full min-w-0 px-4 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E] box-border resize-y"
            />
          </div>

          <MediaPickerField
            label="Portrait Photography"
            value={formImageUrl}
            onChange={(url) => setFormImageUrl(url)}
            description="800x1000 WebP portrait"
            aspectRatio="portrait"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
                Display Order
              </label>
              <input
                type="number"
                min={1}
                value={formOrder}
                onChange={(e) => setFormOrder(Number(e.target.value))}
                className="w-full min-w-0 px-3 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E] box-border"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
                Publishing Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full min-w-0 px-3 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E] box-border"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Remove Director?"
        message={`Are you sure you want to remove "${deleteTarget?.name}" (${deleteTarget?.role}) from the leadership directory?`}
        confirmLabel="Remove Director"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isProcessing}
      />
    </div>
  );
}
