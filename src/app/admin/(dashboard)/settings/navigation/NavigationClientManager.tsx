'use client';

import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  Eye,
  EyeOff,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import AdminModal from '@/components/admin/AdminModal';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  sort_order: number;
  is_active: boolean;
  is_external: boolean;
}

export default function NavigationClientManager({
  initialNavItems,
}: {
  initialNavItems: NavigationItem[];
}) {
  const [items, setItems] = useState<NavigationItem[]>(initialNavItems);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modal states for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [formLabel, setFormLabel] = useState('');
  const [formHref, setFormHref] = useState('');
  const [formIsExternal, setFormIsExternal] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<NavigationItem | null>(null);

  const supabase = createBrowserSupabaseClient();

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // 1. Reordering (Move Up / Down)
  const moveItem = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === items.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    // Re-assign sort_orders sequentially 1..N
    const updated = newItems.map((item, idx) => ({
      ...item,
      sort_order: idx + 1,
    }));

    setItems(updated);
    setIsSaving(true);

    try {
      const updates = updated.map((item) =>
        supabase
          .from('navigation')
          .update({ sort_order: item.sort_order })
          .eq('id', item.id)
      );
      await Promise.all(updates);
      showNotification('Navigation order updated successfully!');
    } catch (err) {
      console.error('Failed to update navigation order:', err);
      alert('Error updating order.');
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Toggle Active State
  const toggleActive = async (item: NavigationItem) => {
    const nextState = !item.is_active;
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_active: nextState } : i))
    );

    try {
      await supabase
        .from('navigation')
        .update({ is_active: nextState })
        .eq('id', item.id);
      showNotification(`"${item.label}" is now ${nextState ? 'visible' : 'hidden'}.`);
    } catch (err) {
      console.error('Failed to toggle active state:', err);
    }
  };

  // 3. Open Modal for Create or Edit
  const openEditModal = (item?: NavigationItem) => {
    if (item) {
      setEditingItem(item);
      setFormLabel(item.label);
      setFormHref(item.href);
      setFormIsExternal(item.is_external);
      setFormIsActive(item.is_active);
    } else {
      setEditingItem(null);
      setFormLabel('');
      setFormHref('/');
      setFormIsExternal(false);
      setFormIsActive(true);
    }
    setIsModalOpen(true);
  };

  // 4. Save Modal Form (Insert / Update)
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('navigation')
          .update({
            label: formLabel,
            href: formHref,
            is_external: formIsExternal,
            is_active: formIsActive,
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        setItems((prev) =>
          prev.map((i) =>
            i.id === editingItem.id
              ? {
                  ...i,
                  label: formLabel,
                  href: formHref,
                  is_external: formIsExternal,
                  is_active: formIsActive,
                }
              : i
          )
        );
        showNotification(`Updated navigation item "${formLabel}".`);
      } else {
        // Insert new item
        const nextOrder = items.length + 1;
        const { data, error } = await supabase
          .from('navigation')
          .insert([
            {
              label: formLabel,
              href: formHref,
              is_external: formIsExternal,
              is_active: formIsActive,
              sort_order: nextOrder,
            },
          ])
          .select('*')
          .single();

        if (error) throw error;
        if (data) {
          setItems((prev) => [...prev, data]);
        }
        showNotification(`Added new navigation item "${formLabel}".`);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save navigation item:', err);
      alert('Error saving navigation item.');
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Delete Item
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('navigation')
        .delete()
        .eq('id', deleteTarget.id);

      if (error) throw error;

      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      showNotification(`Removed "${deleteTarget.label}" from navigation.`);
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete item:', err);
      alert('Error deleting navigation item.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl text-left">
      
      {/* Top Action Bar & Live Preview */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-canvas-border shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E] block">
            HEADER MENU STRUCTURE
          </span>
          <p className="text-xs text-charcoal-500 font-sans mt-0.5">
            Reorder with the arrow controls or edit routing URLs directly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openEditModal()}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-medium transition-all shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Navigation Reorderable Table */}
      <div className="bg-white border border-canvas-border rounded-3xl shadow-soft-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-canvas-border bg-[#F7F8F6]/60 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-500">
                <th className="w-20 px-4 py-3.5 text-center">Order</th>
                <th className="px-4 py-3.5">Menu Label</th>
                <th className="px-4 py-3.5">Target Route (URL)</th>
                <th className="px-4 py-3.5 text-center">Visibility</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-canvas-border text-xs sm:text-sm font-sans text-charcoal-800">
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-[#F7F8F6]/80 transition-colors ${
                    !item.is_active ? 'opacity-60 bg-stone-50/50' : ''
                  }`}
                >
                  {/* Reorder Buttons & Badge */}
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <button
                        type="button"
                        disabled={index === 0 || isSaving}
                        onClick={() => moveItem(index, 'up')}
                        title="Move item up"
                        className="p-1 rounded-md text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm disabled:opacity-20 disabled:pointer-events-none transition-colors"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-mono text-xs font-semibold text-charcoal-600 px-1">
                        #{item.sort_order}
                      </span>

                      <button
                        type="button"
                        disabled={index === items.length - 1 || isSaving}
                        onClick={() => moveItem(index, 'down')}
                        title="Move item down"
                        className="p-1 rounded-md text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm disabled:opacity-20 disabled:pointer-events-none transition-colors"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Menu Label */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-sans font-medium text-charcoal-950 text-sm">
                        {item.label}
                      </span>
                      {item.is_external && (
                        <ExternalLink className="w-3 h-3 text-charcoal-400" />
                      )}
                    </div>
                  </td>

                  {/* Target URL */}
                  <td className="px-4 py-3.5">
                    <code className="text-xs font-mono text-[#07381E] bg-[#EBF2EE] px-2 py-0.5 rounded-md">
                      {item.href}
                    </code>
                  </td>

                  {/* Visibility Switch */}
                  <td className="px-4 py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => toggleActive(item)}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        item.is_active
                          ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20'
                          : 'bg-stone-100 text-stone-500 border-stone-200'
                      }`}
                    >
                      {item.is_active ? (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions (Edit / Delete) */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Header Live Simulation Strip */}
      <div className="p-5 rounded-2xl bg-canvas-warm border border-canvas-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-charcoal-500">
            PUBLIC HEADER SIMULATION (ACTIVE ORDER)
          </span>
          <span className="text-[10.5px] font-mono text-emerald-800">
            {items.filter((i) => i.is_active).length} items active
          </span>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto py-2">
          {items
            .filter((i) => i.is_active)
            .map((item) => (
              <span
                key={item.id}
                className="px-3 py-1 rounded-full bg-white border border-canvas-border text-xs font-sans font-medium text-charcoal-800 shadow-2xs shrink-0"
              >
                {item.label}
              </span>
            ))}
        </div>
      </div>

      {/* Modal for Add / Edit Item */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        asForm
        onSubmit={handleSaveModal}
        maxWidth="md"
        eyebrow="NAVIGATION MANAGEMENT"
        title={editingItem ? 'Edit Navigation Item' : 'New Navigation Item'}
        description="Configure target route and display settings for the main navigation bar."
        footer={
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl border border-canvas-border text-charcoal-700 hover:bg-canvas-warm text-xs font-medium transition-colors min-h-[44px] sm:min-h-0"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-medium shadow-2xs transition-colors disabled:opacity-50 min-h-[44px] sm:min-h-0"
            >
              {isSaving ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        }
      >
        <div className="space-y-4 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Menu Display Label
            </label>
            <input
              type="text"
              required
              value={formLabel}
              onChange={(e) => setFormLabel(e.target.value)}
              placeholder="e.g. Portfolio"
              className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Target Route (URL)
            </label>
            <input
              type="text"
              required
              value={formHref}
              onChange={(e) => setFormHref(e.target.value)}
              placeholder="e.g. /projects or https://..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer touch-manipulation min-h-[36px]">
              <input
                type="checkbox"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#07381E] focus:ring-[#07381E]"
              />
              <span className="text-xs text-charcoal-700 font-medium">Visible in Menu</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer touch-manipulation min-h-[36px]">
              <input
                type="checkbox"
                checked={formIsExternal}
                onChange={(e) => setFormIsExternal(e.target.checked)}
                className="w-4 h-4 rounded text-[#07381E] focus:ring-[#07381E]"
              />
              <span className="text-xs text-charcoal-700 font-medium">External Link</span>
            </label>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Remove Navigation Item?"
        message={`Are you sure you want to remove "${deleteTarget?.label}" from the primary navigation? You can re-add it at any time.`}
        confirmLabel="Remove Item"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isSaving}
      />

    </div>
  );
}
