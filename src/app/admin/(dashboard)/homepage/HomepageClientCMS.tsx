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
  Image as ImageIcon
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import StatusBadge from '@/components/admin/StatusBadge';

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
  const [activeTab, setActiveTab] = useState<'order' | 'hero' | 'intro' | 'what_we_do' | 'projects' | 'statement' | 'cta'>('order');
  
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const supabase = createBrowserSupabaseClient();

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Helper to get section by key
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

  // Update specific section state in memory
  const updateSectionField = (key: string, field: keyof HomepageSection, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.section_key === key ? { ...s, [field]: value } : s))
    );
  };

  // Update nested pillar in what_we_do metadata
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

  // 1. Reordering Sections
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
      showNotification('Homepage section sequence updated.');
    } catch (err) {
      console.error('Failed to update section order:', err);
      alert('Error updating section sequence.');
    } finally {
      setIsSaving(false);
    }
  };

  // 2. Toggle Section Visibility
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
        `"${section.title}" is now ${nextStatus === 'published' ? 'Visible' : 'Hidden'} on homepage.`
      );
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  // 3. Save a specific Section to Supabase
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
      showNotification(`Saved "${section.title}" content successfully!`);
    } catch (err) {
      console.error('Failed to save section:', err);
      alert('Error saving section content.');
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Toggle Project Featured status
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

  return (
    <div className="space-y-8 max-w-5xl text-left select-none">
      
      {/* Design Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#07381E]/15 flex items-start space-x-3 text-xs text-[#07381E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold block">Editorial Guardrails Active</span>
          <span className="text-[#07381E]/80 leading-relaxed block">
            The homepage visual hierarchy, 3D and high-performance video models, and Cormorant Garamond typography are locked in code. Admin changes control headlines, descriptions, CTAs, media selection, section ordering, and visibility.
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

      {/* Section Navigation Tabs */}
      <div className="border-b border-canvas-border pb-1">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('order')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'order'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Section Order &amp; Visibility</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'hero'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero Gateway</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('intro')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'intro'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Company Intro</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('what_we_do')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'what_we_do'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>What We Do (3 Pillars)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'projects'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Featured Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('statement')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'statement'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Brand Statement</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cta')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-sans font-medium transition-colors shrink-0 ${
              activeTab === 'cta'
                ? 'bg-[#07381E] text-white shadow-soft-sm font-semibold'
                : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-warm'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Final Contact CTA</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SECTION ORDER & VISIBILITY                                         */}
      {/* ========================================================================= */}
      {activeTab === 'order' && (
        <div className="space-y-6">
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-canvas-border shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E] block">
                HOMEPAGE SEQUENCE CONTROLLER
              </span>
              <p className="text-xs text-charcoal-500 font-sans mt-0.5">
                Reorder homepage sections with the arrows or toggle visibility on and off.
              </p>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#07381E] hover:text-[#052B17]"
            >
              <span>Preview Live Homepage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-canvas-border rounded-3xl shadow-soft-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-canvas-border bg-[#F7F8F6]/60 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-500">
                  <th className="w-24 px-4 py-3.5 text-center">Stage Order</th>
                  <th className="px-4 py-3.5">Section Name</th>
                  <th className="px-4 py-3.5">Current Headline</th>
                  <th className="px-4 py-3.5 text-center">Visibility</th>
                  <th className="px-4 py-3.5 text-right">Configure</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-canvas-border text-xs sm:text-sm font-sans text-charcoal-800">
                {sections.map((sec, index) => (
                  <tr
                    key={sec.id}
                    className={`hover:bg-[#F7F8F6]/80 transition-colors ${
                      sec.status !== 'published' ? 'opacity-60 bg-stone-50/50' : ''
                    }`}
                  >
                    {/* Reorder Buttons */}
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button
                          type="button"
                          disabled={index === 0 || isSaving}
                          onClick={() => moveSection(index, 'up')}
                          className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20 transition-colors"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-semibold text-charcoal-600 px-1">
                          0{sec.sort_order}
                        </span>
                        <button
                          type="button"
                          disabled={index === sections.length - 1 || isSaving}
                          onClick={() => moveSection(index, 'down')}
                          className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20 transition-colors"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Section Name */}
                    <td className="px-4 py-3.5">
                      <span className="font-serif font-semibold text-charcoal-950 block text-sm sm:text-[15px]">
                        {sec.title}
                      </span>
                      <span className="font-mono text-[11px] text-charcoal-400 block">
                        #{sec.section_key}
                      </span>
                    </td>

                    {/* Headline */}
                    <td className="px-4 py-3.5 max-w-xs truncate text-xs text-charcoal-600">
                      {sec.headline || '—'}
                    </td>

                    {/* Visibility Switch */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleVisibility(sec)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          sec.status === 'published'
                            ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20'
                            : 'bg-stone-100 text-stone-500 border-stone-200'
                        }`}
                      >
                        {sec.status === 'published' ? (
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

                    {/* Action */}
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => setActiveTab(sec.section_key as any)}
                        className="px-3 py-1.5 rounded-lg border border-canvas-border hover:bg-canvas-warm text-xs font-semibold text-[#07381E] transition-colors"
                      >
                        Edit Content
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HERO GATEWAY                                                       */}
      {/* ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                SECTION 01
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Hero Gateway Configuration
              </h2>
            </div>
            <StatusBadge status={getSection('hero').status} />
          </div>

          <div className="space-y-5 text-xs font-sans">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Top Eyebrow Pill Text
              </label>
              <input
                type="text"
                value={getSection('hero').eyebrow || ''}
                onChange={(e) => updateSectionField('hero', 'eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Main Hero Headline
              </label>
              <textarea
                rows={3}
                value={getSection('hero').headline || ''}
                onChange={(e) => updateSectionField('hero', 'headline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-xl focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Hero Narrative Subheadline
              </label>
              <textarea
                rows={2}
                value={getSection('hero').subheadline || ''}
                onChange={(e) => updateSectionField('hero', 'subheadline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={getSection('hero').primary_cta_label || ''}
                  onChange={(e) => updateSectionField('hero', 'primary_cta_label', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Primary CTA Target URL
                </label>
                <input
                  type="text"
                  value={getSection('hero').primary_cta_href || ''}
                  onChange={(e) => updateSectionField('hero', 'primary_cta_href', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Hero Architectural Background Image Path
              </label>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-xl bg-charcoal-100 overflow-hidden shrink-0 border border-canvas-border">
                  <Image
                    src={getSection('hero').media_url || '/images/hero-model.webp'}
                    alt="Hero Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  type="text"
                  value={getSection('hero').media_url || ''}
                  onChange={(e) => updateSectionField('hero', 'media_url', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-canvas-border flex items-center justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSaveSection('hero')}
              className="px-7 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Section</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COMPANY INTRO                                                      */}
      {/* ========================================================================= */}
      {activeTab === 'intro' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                SECTION 02
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Company Introduction
              </h2>
            </div>
            <StatusBadge status={getSection('intro').status} />
          </div>

          <div className="space-y-5 text-xs font-sans">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Eyebrow Tag
              </label>
              <input
                type="text"
                value={getSection('intro').eyebrow || ''}
                onChange={(e) => updateSectionField('intro', 'eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Intro Heading
              </label>
              <input
                type="text"
                value={getSection('intro').headline || ''}
                onChange={(e) => updateSectionField('intro', 'headline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-xl focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Short Narrative Paragraph
              </label>
              <textarea
                rows={3}
                value={getSection('intro').subheadline || ''}
                onChange={(e) => updateSectionField('intro', 'subheadline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  value={getSection('intro').primary_cta_label || ''}
                  onChange={(e) => updateSectionField('intro', 'primary_cta_label', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  CTA Target Route
                </label>
                <input
                  type="text"
                  value={getSection('intro').primary_cta_href || ''}
                  onChange={(e) => updateSectionField('intro', 'primary_cta_href', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Architectural Frame Image Path
              </label>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-xl bg-charcoal-100 overflow-hidden shrink-0 border border-canvas-border">
                  <Image
                    src={getSection('intro').media_url || '/images/about-zalia.webp'}
                    alt="Intro Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <input
                  type="text"
                  value={getSection('intro').media_url || ''}
                  onChange={(e) => updateSectionField('intro', 'media_url', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-canvas-border flex items-center justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSaveSection('intro')}
              className="px-7 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Intro Section</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WHAT WE DO (3 PILLARS)                                             */}
      {/* ========================================================================= */}
      {activeTab === 'what_we_do' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-8">
          <div className="flex items-center justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                SECTION 03
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                What We Do Overview (3 Pillars)
              </h2>
            </div>
            <StatusBadge status={getSection('what_we_do').status} />
          </div>

          {/* Section Heading & CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Section Heading
              </label>
              <input
                type="text"
                value={getSection('what_we_do').headline || ''}
                onChange={(e) => updateSectionField('what_we_do', 'headline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Button Target
              </label>
              <input
                type="text"
                value={getSection('what_we_do').primary_cta_label || ''}
                onChange={(e) => updateSectionField('what_we_do', 'primary_cta_label', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>
          </div>

          {/* 3 Pillars Editor */}
          <div className="space-y-4">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#07381E] block">
              THREE DEVELOPMENT PILLARS
            </span>

            {([0, 1, 2]).map((idx) => {
              const defaultPillars = [
                { number: '01', title: 'ACQUIRE', sentence: 'Identify residential properties with genuine potential.', is_active: true },
                { number: '02', title: 'TRANSFORM', sentence: 'Reimagine spaces through thoughtful design and renovation.', is_active: true },
                { number: '03', title: 'CREATE', sentence: 'Deliver refined homes with lasting quality.', is_active: true },
              ];
              const p = (getSection('what_we_do').metadata?.pillars || defaultPillars)[idx];

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-canvas-warm border border-canvas-border space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-emerald-800">
                      Pillar #{p?.number || `0${idx + 1}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-charcoal-600 block">
                        Title
                      </label>
                      <input
                        type="text"
                        value={p?.title || ''}
                        onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-canvas-border text-charcoal-900 font-serif text-base focus:outline-none focus:border-[#07381E]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[11px] font-semibold text-charcoal-600 block">
                        Short Sentence
                      </label>
                      <input
                        type="text"
                        value={p?.sentence || ''}
                        onChange={(e) => updatePillar(idx, 'sentence', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-canvas-border flex items-center justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSaveSection('what_we_do')}
              className="px-7 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save What We Do Pillars</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: FEATURED PROJECTS SELECTOR                                         */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                SECTION 04
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Featured Projects Selector
              </h2>
              <p className="text-xs text-charcoal-500 font-sans mt-0.5">
                Toggle the star icon to feature existing projects on the homepage. The top 3 featured projects display automatically.
              </p>
            </div>
            <StatusBadge status={getSection('projects').status} />
          </div>

          {/* Project Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  proj.featured
                    ? 'bg-[#EBF2EE]/60 border-[#07381E]/40 shadow-soft-sm'
                    : 'bg-white border-canvas-border opacity-75'
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border">
                    <Image
                      src={proj.image_url}
                      alt={proj.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="font-serif font-semibold text-charcoal-950 block text-sm truncate">
                      {proj.title}
                    </span>
                    <span className="text-[11px] font-sans text-charcoal-500 block truncate">
                      {proj.location} · {proj.status_badge}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleProjectFeatured(proj)}
                  className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
                    proj.featured
                      ? 'bg-[#07381E] text-white border-[#07381E]'
                      : 'bg-white text-charcoal-400 border-canvas-border hover:text-charcoal-950'
                  }`}
                  title={proj.featured ? 'Remove from Homepage' : 'Feature on Homepage'}
                >
                  <Star className={`w-4 h-4 ${proj.featured ? 'fill-white' : ''}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-canvas-warm border border-canvas-border flex items-center justify-between text-xs text-charcoal-600 font-sans">
            <span>
              <strong>{projects.filter((p) => p.featured).length}</strong> projects currently starred for homepage highlight.
            </span>
            <Link
              href="/admin/projects"
              className="text-[#07381E] font-semibold hover:underline"
            >
              Manage Full Portfolio &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: BRAND STATEMENT                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'statement' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                SECTION 05
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Editorial Perspective Statement
              </h2>
            </div>
            <StatusBadge status={getSection('statement').status} />
          </div>

          <div className="space-y-5 text-xs font-sans">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Eyebrow Tag
              </label>
              <input
                type="text"
                value={getSection('statement').eyebrow || ''}
                onChange={(e) => updateSectionField('statement', 'eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Perspective Headline Quote
              </label>
              <textarea
                rows={3}
                value={getSection('statement').headline || ''}
                onChange={(e) => updateSectionField('statement', 'headline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-xl focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-canvas-border flex items-center justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSaveSection('statement')}
              className="px-7 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Brand Statement</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: FINAL CONTACT CTA                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'cta' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
          <div className="flex items-center justify-between border-b border-canvas-border pb-4">
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                SECTION 06
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Final Contact Invitation CTA
              </h2>
            </div>
            <StatusBadge status={getSection('cta').status} />
          </div>

          <div className="space-y-5 text-xs font-sans">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Eyebrow Tag
              </label>
              <input
                type="text"
                value={getSection('cta').eyebrow || ''}
                onChange={(e) => updateSectionField('cta', 'eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Invitation Headline
              </label>
              <input
                type="text"
                value={getSection('cta').headline || ''}
                onChange={(e) => updateSectionField('cta', 'headline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-xl focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                Description / Subtext
              </label>
              <input
                type="text"
                value={getSection('cta').subheadline || ''}
                onChange={(e) => updateSectionField('cta', 'subheadline', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Button Text
                </label>
                <input
                  type="text"
                  value={getSection('cta').primary_cta_label || ''}
                  onChange={(e) => updateSectionField('cta', 'primary_cta_label', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Button Target URL
                </label>
                <input
                  type="text"
                  value={getSection('cta').primary_cta_href || ''}
                  onChange={(e) => updateSectionField('cta', 'primary_cta_href', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-canvas-border flex items-center justify-end">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSaveSection('cta')}
              className="px-7 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save Final CTA</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
