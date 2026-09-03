'use client';

import React, { useState } from 'react';
import {
  Save,
  Check,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  PanelBottom,
  ShieldCheck,
  Share2,
  FileText,
  X
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface FooterLinkRecord {
  id: string;
  section_title: string;
  label: string;
  href: string;
  sort_order: number;
  is_active: boolean;
}

export default function FooterClientManager({
  initialLinks,
  initialSettings,
}: {
  initialLinks: FooterLinkRecord[];
  initialSettings: Record<string, string>;
}) {
  const [links, setLinks] = useState<FooterLinkRecord[]>(initialLinks);
  const [settings, setSettings] = useState<Record<string, string>>({
    footer_description:
      initialSettings['footer_description'] ||
      'Zalia Properties creates exceptional homes by identifying potential, transforming spaces, and refining every detail.',
    copyright_text:
      initialSettings['copyright_text'] ||
      '© 2026 Zalia Properties Ltd. All rights reserved. Registered in England & Wales.',
    instagram_url: initialSettings['instagram_url'] || 'https://instagram.com/zaliaproperties',
    linkedin_url: initialSettings['linkedin_url'] || 'https://linkedin.com/company/zalia-properties',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Modal states for Create / Edit footer link
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<FooterLinkRecord | null>(null);
  const [formSection, setFormSection] = useState('Explore');
  const [formLabel, setFormLabel] = useState('');
  const [formHref, setFormHref] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<FooterLinkRecord | null>(null);

  const supabase = createBrowserSupabaseClient();

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // 1. Save Settings (Description, Copyright, Socials)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const upserts = Object.entries(settings).map(([key, value]) =>
        supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
      );
      await Promise.all(upserts);
      showNotification('Footer description and legal settings saved successfully!');
    } catch (err) {
      console.error('Failed to save footer settings:', err);
      alert('Error saving footer settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Reorder Footer Link
  const moveLink = async (id: string, direction: 'up' | 'down') => {
    const link = links.find((l) => l.id === id);
    if (!link) return;

    // Get sibling links in the same section
    const sectionLinks = links.filter((l) => l.section_title === link.section_title);
    const indexInSection = sectionLinks.findIndex((l) => l.id === id);

    if (
      (direction === 'up' && indexInSection === 0) ||
      (direction === 'down' && indexInSection === sectionLinks.length - 1)
    ) {
      return;
    }

    const targetLink =
      direction === 'up' ? sectionLinks[indexInSection - 1] : sectionLinks[indexInSection + 1];

    const currentOrder = link.sort_order;
    const targetOrder = targetLink.sort_order;

    const updated = links.map((l) => {
      if (l.id === link.id) return { ...l, sort_order: targetOrder };
      if (l.id === targetLink.id) return { ...l, sort_order: currentOrder };
      return l;
    });

    setLinks(updated.sort((a, b) => a.sort_order - b.sort_order));
    setIsSaving(true);

    try {
      await Promise.all([
        supabase.from('footer').update({ sort_order: targetOrder }).eq('id', link.id),
        supabase.from('footer').update({ sort_order: currentOrder }).eq('id', targetLink.id),
      ]);
      showNotification('Link ordering updated.');
    } catch (err) {
      console.error('Failed to update order:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Toggle Link Active State
  const toggleActive = async (link: FooterLinkRecord) => {
    const nextState = !link.is_active;
    setLinks((prev) =>
      prev.map((l) => (l.id === link.id ? { ...l, is_active: nextState } : l))
    );

    try {
      await supabase.from('footer').update({ is_active: nextState }).eq('id', link.id);
      showNotification(`"${link.label}" is now ${nextState ? 'visible' : 'hidden'}.`);
    } catch (err) {
      console.error('Failed to toggle footer link visibility:', err);
    }
  };

  // 4. Open Modal for Create or Edit
  const openLinkModal = (link?: FooterLinkRecord) => {
    if (link) {
      setEditingLink(link);
      setFormSection(link.section_title);
      setFormLabel(link.label);
      setFormHref(link.href);
      setFormIsActive(link.is_active);
    } else {
      setEditingLink(null);
      setFormSection('Explore');
      setFormLabel('');
      setFormHref('/');
      setFormIsActive(true);
    }
    setIsModalOpen(true);
  };

  // 5. Save Link (Insert / Update)
  const handleSaveLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (editingLink) {
        const { error } = await supabase
          .from('footer')
          .update({
            section_title: formSection,
            label: formLabel,
            href: formHref,
            is_active: formIsActive,
          })
          .eq('id', editingLink.id);

        if (error) throw error;

        setLinks((prev) =>
          prev.map((l) =>
            l.id === editingLink.id
              ? {
                  ...l,
                  section_title: formSection,
                  label: formLabel,
                  href: formHref,
                  is_active: formIsActive,
                }
              : l
          )
        );
        showNotification(`Updated footer link "${formLabel}".`);
      } else {
        const nextOrder = links.length + 1;
        const { data, error } = await supabase
          .from('footer')
          .insert([
            {
              section_title: formSection,
              label: formLabel,
              href: formHref,
              is_active: formIsActive,
              sort_order: nextOrder,
            },
          ])
          .select('*')
          .single();

        if (error) throw error;
        if (data) {
          setLinks((prev) => [...prev, data]);
        }
        showNotification(`Added new footer link "${formLabel}".`);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save footer link:', err);
      alert('Error saving footer link.');
    } finally {
      setIsSaving(false);
    }
  };

  // 6. Delete Link
  const handleDeleteLink = async () => {
    if (!deleteTarget) return;
    setIsSaving(true);

    try {
      const { error } = await supabase.from('footer').delete().eq('id', deleteTarget.id);
      if (error) throw error;

      setLinks((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      showNotification(`Deleted footer link "${deleteTarget.label}".`);
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete footer link:', err);
      alert('Error deleting footer link.');
    } finally {
      setIsSaving(false);
    }
  };

  // Group links by section_title
  const sections = Array.from(new Set(links.map((l) => l.section_title)));

  return (
    <div className="space-y-8 max-w-4xl text-left select-none">
      
      {/* Design Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#07381E]/15 flex items-start space-x-3 text-xs text-[#07381E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold block">Architectural Design System Protected</span>
          <span className="text-[#07381E]/80 leading-relaxed block">
            The dark forest card container, 8px grid hierarchy, and oversized architectural <strong>ZALIA</strong> wordmark are anchored in code. Your edits safely update text, links, and visibility without distorting the visual composition.
          </span>
        </div>
      </div>

      {/* Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 1. Footer Brand Narrative & Legal Statement */}
      <form
        onSubmit={handleSaveSettings}
        className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              NARRATIVE &amp; LEGAL
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Footer Description &amp; Copyright
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Short Company Description (Below ZALIA Logo)
            </label>
            <textarea
              rows={3}
              required
              value={settings['footer_description']}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, footer_description: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] leading-relaxed resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Copyright &amp; Registration Row
            </label>
            <input
              type="text"
              required
              value={settings['copyright_text']}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, copyright_text: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Footer Narrative</span>
          </button>
        </div>
      </form>

      {/* 2. Navigation Columns Manager */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
              <PanelBottom className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                COLUMNS &amp; LINKS
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Navigation Columns
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openLinkModal()}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-soft-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Footer Link</span>
          </button>
        </div>

        {/* Grouped Link Sections */}
        <div className="space-y-6">
          {sections.map((sectionName) => {
            const sectionLinks = links
              .filter((l) => l.section_title === sectionName)
              .sort((a, b) => a.sort_order - b.sort_order);

            return (
              <div
                key={sectionName}
                className="border border-canvas-border rounded-2xl overflow-hidden bg-[#F7F8F6]/30"
              >
                <div className="px-5 py-3 bg-canvas-warm border-b border-canvas-border flex items-center justify-between">
                  <span className="font-serif text-base font-semibold text-charcoal-950">
                    Column: {sectionName}
                  </span>
                  <span className="text-[11px] font-mono text-charcoal-500">
                    {sectionLinks.length} links
                  </span>
                </div>

                <div className="divide-y divide-canvas-border bg-white text-xs sm:text-sm font-sans">
                  {sectionLinks.map((link, idx) => (
                    <div
                      key={link.id}
                      className={`px-5 py-3 flex items-center justify-between gap-3 hover:bg-canvas-warm/50 transition-colors ${
                        !link.is_active ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {/* Order buttons */}
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0 || isSaving}
                            onClick={() => moveLink(link.id, 'up')}
                            className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
                            title="Move link up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === sectionLinks.length - 1 || isSaving}
                            onClick={() => moveLink(link.id, 'down')}
                            className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
                            title="Move link down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-serif font-medium text-charcoal-950 text-sm truncate">
                          {link.label}
                        </span>

                        <code className="font-mono text-[11px] text-[#07381E] bg-[#EBF2EE] px-2 py-0.5 rounded shrink-0">
                          {link.href}
                        </code>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleActive(link)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                            link.is_active
                              ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20'
                              : 'bg-stone-100 text-stone-500 border-stone-200'
                          }`}
                        >
                          {link.is_active ? 'Active' : 'Hidden'}
                        </button>

                        <button
                          type="button"
                          onClick={() => openLinkModal(link)}
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(link)}
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Add / Edit Link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#07381E]/40 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white border border-canvas-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-canvas-border pb-4">
              <h3 className="font-serif text-2xl font-medium text-charcoal-950">
                {editingLink ? 'Edit Footer Link' : 'New Footer Link'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLink} className="space-y-4 text-xs font-sans">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Column Section Title
                </label>
                <input
                  type="text"
                  required
                  value={formSection}
                  onChange={(e) => setFormSection(e.target.value)}
                  placeholder="e.g. Explore, Company, Legal"
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Link Label
                </label>
                <input
                  type="text"
                  required
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  placeholder="e.g. Our Projects"
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
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
                  placeholder="e.g. /projects"
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="rounded text-[#07381E] focus:ring-[#07381E]"
                  />
                  <span className="text-xs text-charcoal-700 font-medium">Visible in Footer</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-canvas-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-canvas-border text-charcoal-700 hover:bg-canvas-warm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white font-semibold uppercase tracking-wider shadow-soft-sm disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Footer Link?"
        message={`Are you sure you want to remove "${deleteTarget?.label}" from the "${deleteTarget?.section_title}" footer column?`}
        confirmLabel="Delete Link"
        isDestructive={true}
        onConfirm={handleDeleteLink}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isSaving}
      />

    </div>
  );
}
