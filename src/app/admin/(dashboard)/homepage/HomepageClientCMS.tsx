'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUp,
  ArrowDown,
  Save,
  Check,
  Eye,
  EyeOff,
  Sliders,
  Sparkles,
  Building2,
  FileText,
  MessageSquare,
  Layers,
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
  Edit3,
  X
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import StatusBadge from '@/components/admin/StatusBadge';
import MediaPickerField from '@/components/admin/MediaPickerField';
import AdminModal from '@/components/admin/AdminModal';

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string;
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  body?: string;
  primary_cta_label?: string;
  primary_cta_href?: string;
  secondary_cta_label?: string;
  secondary_cta_href?: string;
  media_url?: string;
  status: string;
  sort_order: number;
  metadata?: any;
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  status_badge: string;
  image_url: string;
  featured: boolean;
  sort_order: number;
}

interface HomepageClientCMSProps {
  initialSections: HomepageSection[];
  initialProjects: ProjectRecord[];
}

export default function HomepageClientCMS({
  initialSections,
  initialProjects,
}: HomepageClientCMSProps) {
  const [sections, setSections] = useState<HomepageSection[]>(initialSections);
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [editingSectionKey, setEditingSectionKey] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const getSection = (key: string): HomepageSection => {
    return (
      sections.find((s) => s.section_key === key) || {
        id: '',
        section_key: key,
        title: key,
        status: 'published',
        sort_order: 1,
      }
    );
  };

  const updateSectionField = (key: string, field: keyof HomepageSection, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.section_key === key ? { ...s, [field]: value } : s))
    );
  };

  const updatePillar = (index: number, field: string, value: any) => {
    const whatWeDo = getSection('what_we_do');
    const defaultPillars = [
      { number: '01', title: 'ACQUIRE', sentence: 'Identify residential properties with genuine potential.', is_active: true },
      { number: '02', title: 'TRANSFORM', sentence: 'Reimagine spaces through thoughtful design and renovation.', is_active: true },
      { number: '03', title: 'CREATE', sentence: 'Deliver refined homes with lasting quality.', is_active: true },
    ];
    const currentPillars = whatWeDo.metadata?.pillars || defaultPillars;
    const updated = [...currentPillars];
    updated[index] = { ...updated[index], [field]: value };

    updateSectionField('what_we_do', 'metadata', { ...whatWeDo.metadata, pillars: updated });
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    const reordered = newSections.map((s, idx) => ({
      ...s,
      sort_order: idx + 1,
    }));

    setSections(reordered);
    setIsSaving(true);

    try {
      const updates = reordered.map((s) =>
        supabase.from('homepage_sections').update({ sort_order: s.sort_order }).eq('id', s.id)
      );
      await Promise.all(updates);
      showNotification('Section sequence updated.');
    } catch (err) {
      console.error('Failed to update section order:', err);
      alert('Error updating section sequence.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleVisibility = async (section: HomepageSection) => {
    const nextStatus = section.status === 'published' ? 'draft' : 'published';
    setSections((prev) =>
      prev.map((s) => (s.id === section.id ? { ...s, status: nextStatus } : s))
    );

    try {
      await supabase
        .from('homepage_sections')
        .update({ status: nextStatus })
        .eq('id', section.id);
      showNotification(
        `"${section.title}" is now ${nextStatus === 'published' ? 'Visible' : 'Hidden'} on the homepage.`
      );
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  const handleSaveSection = async (key: string) => {
    const section = getSection(key);
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('homepage_sections')
        .update({
          eyebrow: section.eyebrow,
          headline: section.headline,
          subheadline: section.subheadline,
          primary_cta_label: section.primary_cta_label,
          primary_cta_href: section.primary_cta_href,
          secondary_cta_label: section.secondary_cta_label,
          secondary_cta_href: section.secondary_cta_href,
          media_url: section.media_url,
          status: section.status,
          metadata: section.metadata,
        })
        .eq('section_key', key);

      if (error) throw error;
      showNotification(`Saved "${section.title}" successfully!`);
      setEditingSectionKey(null);
    } catch (err) {
      console.error('Failed to save section:', err);
      alert('Error saving section content.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleProjectFeatured = async (project: ProjectRecord) => {
    const nextFeatured = !project.featured;
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, featured: nextFeatured } : p))
    );

    try {
      await supabase
        .from('projects')
        .update({ featured: nextFeatured })
        .eq('id', project.id);
      showNotification(
        `"${project.title}" ${nextFeatured ? 'featured on homepage' : 'removed from homepage'}.`
      );
    } catch (err) {
      console.error('Failed to toggle featured status:', err);
    }
  };

  const getSectionIcon = (key: string) => {
    switch (key) {
      case 'hero':
        return <Sparkles className="w-4 h-4 text-[#07381E]" />;
      case 'intro':
        return <FileText className="w-4 h-4 text-[#07381E]" />;
      case 'what_we_do':
        return <Sliders className="w-4 h-4 text-[#07381E]" />;
      case 'projects':
        return <Building2 className="w-4 h-4 text-[#07381E]" />;
      case 'statement':
        return <MessageSquare className="w-4 h-4 text-[#07381E]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#07381E]" />;
    }
  };

  const editingSection = editingSectionKey ? getSection(editingSectionKey) : null;

  return (
    <div className="space-y-6 max-w-5xl text-left">
      {/* Toast Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Overview bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-canvas-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div>
          <h2 className="text-sm font-semibold text-charcoal-900 font-sans">Homepage Layout Sections</h2>
          <p className="text-xs text-charcoal-500 font-sans mt-0.5">
            Click &ldquo;Edit Section&rdquo; on any card to update text, images, and CTAs. Use arrows to reorder.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#07381E] hover:text-[#052B17] px-3 py-1.5 rounded-lg border border-[#07381E]/20 hover:bg-[#EBF2EE] transition-colors self-start sm:self-auto"
        >
          <span>Preview Live</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Section Cards List */}
      <div className="space-y-3">
        {sections.map((sec, index) => {
          const isPublished = sec.status === 'published';
          const isProjects = sec.section_key === 'projects';
          const featuredCount = projects.filter((p) => p.featured).length;

          return (
            <div
              key={sec.id || sec.section_key}
              className={`p-4 sm:p-5 rounded-xl bg-white border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs ${
                isPublished ? 'border-canvas-border' : 'border-canvas-border/60 bg-stone-50/50 opacity-75'
              }`}
            >
              {/* Left: Reorder & Info */}
              <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                {/* Reorder controls */}
                <div className="flex flex-col items-center justify-center space-y-1 shrink-0 bg-canvas-warm p-1 rounded-lg border border-canvas-border/70">
                  <button
                    type="button"
                    disabled={index === 0 || isSaving}
                    onClick={() => moveSection(index, 'up')}
                    className="p-0.5 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] font-semibold text-charcoal-500 leading-none">
                    0{sec.sort_order}
                  </span>
                  <button
                    type="button"
                    disabled={index === sections.length - 1 || isSaving}
                    onClick={() => moveSection(index, 'down')}
                    className="p-0.5 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Section icon & description */}
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-[#EBF2EE]">
                      {getSectionIcon(sec.section_key)}
                    </div>
                    <span className="font-sans font-semibold text-charcoal-950 text-sm">
                      {sec.title}
                    </span>
                    <StatusBadge status={sec.status} />
                  </div>

                  <p className="text-xs text-charcoal-500 font-sans truncate max-w-md">
                    {isProjects
                      ? `${featuredCount} projects selected for homepage display`
                      : sec.headline || sec.subheadline || 'No headline configured'}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => toggleVisibility(sec)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isPublished
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                  }`}
                  title={isPublished ? 'Hide section from homepage' : 'Publish section to homepage'}
                >
                  {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{isPublished ? 'Visible' : 'Hidden'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingSectionKey(sec.section_key)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#07381E] text-white text-xs font-medium hover:bg-[#052B17] transition-colors shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Section</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editing Drawer / Modal */}
      <AdminModal
        isOpen={Boolean(editingSection)}
        onClose={() => setEditingSectionKey(null)}
        maxWidth="2xl"
        eyebrow={editingSection ? `SECTION 0${editingSection.sort_order}` : undefined}
        title={editingSection ? `Edit ${editingSection.title}` : undefined}
        description="Update text, image media, and link destinations."
        footer={
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setEditingSectionKey(null)}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl border border-canvas-border text-xs font-sans font-medium text-charcoal-700 hover:bg-canvas-warm transition-colors min-h-[44px] sm:min-h-0"
            >
              Cancel
            </button>

            {editingSectionKey !== 'projects' && (
              <button
                type="button"
                disabled={isSaving}
                onClick={() => editingSectionKey && handleSaveSection(editingSectionKey)}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-soft-sm disabled:opacity-50 min-h-[44px] sm:min-h-0"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            )}
          </div>
        }
      >
        {editingSection && (
          <div className="space-y-4 text-xs font-sans">
              {/* HERO SECTION */}
              {editingSectionKey === 'hero' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={editingSection.eyebrow || ''}
                      onChange={(e) => updateSectionField('hero', 'eyebrow', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      placeholder="e.g. LUXURY RESIDENTIAL DEVELOPMENTS"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Hero Headline
                    </label>
                    <textarea
                      rows={2}
                      value={editingSection.headline || ''}
                      onChange={(e) => updateSectionField('hero', 'headline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Hero Narrative / Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingSection.subheadline || ''}
                      onChange={(e) => updateSectionField('hero', 'subheadline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_label || ''}
                        onChange={(e) => updateSectionField('hero', 'primary_cta_label', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        CTA Destination URL
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_href || ''}
                        onChange={(e) => updateSectionField('hero', 'primary_cta_href', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>
                  </div>

                  <MediaPickerField
                    label="Hero Background Image"
                    value={editingSection.media_url || ''}
                    onChange={(url) => updateSectionField('hero', 'media_url', url)}
                    description="Full-screen ambient visual behind hero copy"
                    aspectRatio="landscape"
                  />
                </>
              )}

              {/* INTRO SECTION */}
              {editingSectionKey === 'intro' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={editingSection.eyebrow || ''}
                      onChange={(e) => updateSectionField('intro', 'eyebrow', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Intro Heading
                    </label>
                    <input
                      type="text"
                      value={editingSection.headline || ''}
                      onChange={(e) => updateSectionField('intro', 'headline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Narrative Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={editingSection.subheadline || ''}
                      onChange={(e) => updateSectionField('intro', 'subheadline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_label || ''}
                        onChange={(e) => updateSectionField('intro', 'primary_cta_label', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        CTA Destination URL
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_href || ''}
                        onChange={(e) => updateSectionField('intro', 'primary_cta_href', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>
                  </div>

                  <MediaPickerField
                    label="Showcase Image"
                    value={editingSection.media_url || ''}
                    onChange={(url) => updateSectionField('intro', 'media_url', url)}
                    description="Editorial image for company intro"
                    aspectRatio="landscape"
                  />
                </>
              )}

              {/* WHAT WE DO SECTION */}
              {editingSectionKey === 'what_we_do' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={editingSection.headline || ''}
                        onChange={(e) => updateSectionField('what_we_do', 'headline', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_label || ''}
                        onChange={(e) => updateSectionField('what_we_do', 'primary_cta_label', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-semibold text-charcoal-800 block">
                      Three Development Pillars:
                    </span>

                    {([0, 1, 2]).map((idx) => {
                      const defaultPillars = [
                        { number: '01', title: 'ACQUIRE', sentence: 'Identify residential properties with genuine potential.', is_active: true },
                        { number: '02', title: 'TRANSFORM', sentence: 'Reimagine spaces through thoughtful design and renovation.', is_active: true },
                        { number: '03', title: 'CREATE', sentence: 'Deliver refined homes with lasting quality.', is_active: true },
                      ];
                      const p = (editingSection.metadata?.pillars || defaultPillars)[idx];

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-canvas-warm border border-canvas-border space-y-2.5"
                        >
                          <span className="font-mono text-xs font-medium text-emerald-800">
                            Pillar 0{idx + 1}
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="space-y-1">
                              <label className="text-[11px] text-charcoal-500 block">Title</label>
                              <input
                                type="text"
                                value={p?.title || ''}
                                onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-white border border-canvas-border text-charcoal-900 text-xs font-medium focus:outline-none focus:border-[#07381E]"
                              />
                            </div>

                            <div className="sm:col-span-2 space-y-1">
                              <label className="text-[11px] text-charcoal-500 block">Short Description</label>
                              <input
                                type="text"
                                value={p?.sentence || ''}
                                onChange={(e) => updatePillar(idx, 'sentence', e.target.value)}
                                className="w-full px-3 py-1.5 rounded-lg bg-white border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* PROJECTS SECTION */}
              {editingSectionKey === 'projects' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-charcoal-500">
                      Toggle the star button to select projects to display on the homepage.
                    </p>
                    <Link
                      href="/admin/projects"
                      className="text-xs text-[#07381E] font-medium hover:underline"
                    >
                      Manage Portfolio &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          proj.featured
                            ? 'bg-[#EBF2EE]/60 border-emerald-300'
                            : 'bg-white border-canvas-border opacity-70'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border">
                            <Image
                              src={proj.image_url}
                              alt={proj.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <span className="font-sans font-medium text-charcoal-950 block text-xs truncate">
                              {proj.title}
                            </span>
                            <span className="text-[11px] font-sans text-charcoal-500 block truncate">
                              {proj.location}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleProjectFeatured(proj)}
                          className={`p-2 rounded-lg border transition-colors shrink-0 ${
                            proj.featured
                              ? 'bg-[#07381E] text-white border-[#07381E]'
                              : 'bg-white text-charcoal-400 border-canvas-border hover:text-charcoal-950'
                          }`}
                          title={proj.featured ? 'Featured on Homepage' : 'Click to feature'}
                        >
                          <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STATEMENT SECTION */}
              {editingSectionKey === 'statement' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={editingSection.eyebrow || ''}
                      onChange={(e) => updateSectionField('statement', 'eyebrow', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Perspective Quote
                    </label>
                    <textarea
                      rows={3}
                      value={editingSection.headline || ''}
                      onChange={(e) => updateSectionField('statement', 'headline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
                    />
                  </div>
                </>
              )}

              {/* CTA SECTION */}
              {editingSectionKey === 'cta' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={editingSection.eyebrow || ''}
                      onChange={(e) => updateSectionField('cta', 'eyebrow', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Invitation Headline
                    </label>
                    <input
                      type="text"
                      value={editingSection.headline || ''}
                      onChange={(e) => updateSectionField('cta', 'headline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-charcoal-700 block">
                      Description / Subtext
                    </label>
                    <input
                      type="text"
                      value={editingSection.subheadline || ''}
                      onChange={(e) => updateSectionField('cta', 'subheadline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_label || ''}
                        onChange={(e) => updateSectionField('cta', 'primary_cta_label', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-charcoal-700 block">
                        Button Target URL
                      </label>
                      <input
                        type="text"
                        value={editingSection.primary_cta_href || ''}
                        onChange={(e) => updateSectionField('cta', 'primary_cta_href', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
        )}
      </AdminModal>
    </div>
  );
}
