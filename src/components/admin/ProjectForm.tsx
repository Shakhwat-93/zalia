'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Star,
  Eye,
  Check,
  Building2,
  Sparkles,
  Sliders,
  FileText,
  Globe,
  ImageIcon,
  ShieldCheck,
  SplitSquareVertical,
  UploadCloud
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import MediaPickerField from './MediaPickerField';
import MediaLibraryModal from './MediaLibraryModal';

export interface GalleryImage {
  url: string;
  caption?: string;
}

export interface BeforeAfterSet {
  before_url: string;
  after_url: string;
  title?: string;
  description?: string;
}

export interface ProjectFormData {
  id?: string;
  slug: string;
  title: string;
  tag?: string;
  location: string;
  category: string;
  status_badge: string;
  status: string;
  short_description: string;
  full_description: string;
  image_url: string;
  hero_image_url: string;
  before_image_url: string;
  after_image_url: string;
  featured: boolean;
  sort_order: number;
  gallery_images: GalleryImage[];
  before_after_sets: BeforeAfterSet[];
  seo_title?: string;
  seo_description?: string;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  isNew?: boolean;
}

export default function ProjectForm({ initialData, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [formData, setFormData] = useState<ProjectFormData>({
    id: initialData?.id,
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    tag: initialData?.tag || 'PORTFOLIO',
    location: initialData?.location || 'MAYFAIR, LONDON',
    category: initialData?.category || 'Residential Transformation',
    status_badge: initialData?.status_badge || 'COMPLETED',
    status: initialData?.status || 'published',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || initialData?.short_description || '',
    image_url: initialData?.image_url || '/images/featured-project.webp',
    hero_image_url: initialData?.hero_image_url || initialData?.image_url || '/images/featured-project.webp',
    before_image_url: initialData?.before_image_url || '/images/before-split.webp',
    after_image_url: initialData?.after_image_url || '/images/after-split.webp',
    featured: Boolean(initialData?.featured),
    sort_order: initialData?.sort_order || 1,
    gallery_images: initialData?.gallery_images || [
      { url: '/images/featured-project.webp', caption: 'Architectural Facade' },
      { url: '/images/brand-statement.webp', caption: 'Daylight Reconfiguration' }
    ],
    before_after_sets: initialData?.before_after_sets || [
      {
        before_url: '/images/before-split.webp',
        after_url: '/images/after-split.webp',
        title: 'Structural Transformation',
        description: 'Rear expansion and bespoke architectural glazing.'
      }
    ],
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New gallery image inputs
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false);

  // Auto-generate slug from title for new projects
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const next: any = { ...prev, title: val };
      if (isNew && (!prev.slug || prev.slug === slugify(prev.title))) {
        next.slug = slugify(val);
      }
      return next;
    });
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  // Gallery manipulation
  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery_images: [
        ...prev.gallery_images,
        { url: newGalleryUrl.trim(), caption: newGalleryCaption.trim() }
      ]
    }));
    setNewGalleryUrl('');
    setNewGalleryCaption('');
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
    }));
  };

  const moveGalleryImage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formData.gallery_images.length - 1)
    ) {
      return;
    }
    const target = direction === 'up' ? index - 1 : index + 1;
    const updated = [...formData.gallery_images];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setFormData((prev) => ({ ...prev, gallery_images: updated }));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || slugify(formData.title),
        tag: formData.tag,
        location: formData.location,
        category: formData.category,
        status_badge: formData.status_badge,
        status: formData.status,
        description: formData.short_description,
        short_description: formData.short_description,
        full_description: formData.full_description,
        image_url: formData.image_url,
        hero_image_url: formData.hero_image_url,
        before_image_url: formData.before_image_url,
        after_image_url: formData.after_image_url,
        featured: formData.featured,
        sort_order: Number(formData.sort_order),
        gallery_images: formData.gallery_images,
        before_after_sets: formData.before_after_sets,
        seo_title: formData.seo_title || `${formData.title} | Zalia Properties`,
        seo_description: formData.seo_description || formData.short_description,
      };

      if (isNew) {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
        setStatusMessage('Project created successfully!');
        setTimeout(() => {
          router.push('/admin/projects');
          router.refresh();
        }, 1200);
      } else {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', formData.id);
        if (error) throw error;
        setStatusMessage('Project saved successfully!');
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err: any) {
      console.error('Failed to save project:', err);
      alert('Error saving project: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl text-left select-none pb-12">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-600 hover:text-charcoal-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects List</span>
        </Link>

        <div className="flex items-center space-x-3">
          {statusMessage && (
            <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Design Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#07381E]/15 flex items-start space-x-3 text-xs text-[#07381E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold block">Design Presentation Guardrails Active</span>
          <span className="text-[#07381E]/80 leading-relaxed block">
            This project will automatically render within the luxury Zalia architectural case study template at <code>/projects/{formData.slug || '[slug]'}</code>. Only authentic verified particulars are recorded.
          </span>
        </div>
      </div>

      {/* 1. Core Particulars */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              PROJECT IDENTITY
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Core Particulars &amp; Classification
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The Kensington Mews & Glass Pavilion"
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-lg focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="px-3 py-3 rounded-l-xl bg-canvas-border/40 border border-r-0 border-canvas-border text-charcoal-500 font-mono text-xs">
                /projects/
              </span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                className="w-full px-4 py-3 rounded-r-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Portfolio Tag / Index
            </label>
            <input
              type="text"
              value={formData.tag || ''}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              placeholder="e.g. PROJECT 01"
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Prime Location (Verified data only) *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. KENSINGTON, LONDON"
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Development Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            >
              <option value="Residential Transformation">Residential Transformation</option>
              <option value="Heritage Modernisation">Heritage Modernisation</option>
              <option value="Turnkey Development">Turnkey Development</option>
              <option value="Bespoke Architecture">Bespoke Architecture</option>
              <option value="Spatial Reconfiguration">Spatial Reconfiguration</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Development Status Badge *
            </label>
            <select
              value={formData.status_badge}
              onChange={(e) => setFormData({ ...formData, status_badge: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            >
              <option value="COMPLETED">COMPLETED</option>
              <option value="CURRENT">CURRENT</option>
              <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Publishing Visibility *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            >
              <option value="published">Published (Visible on site)</option>
              <option value="draft">Draft (Hidden from site)</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Portfolio Sort Order (1..N) *
            </label>
            <input
              type="number"
              min={1}
              required
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="flex items-center space-x-3 pt-6">
            <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl border border-canvas-border bg-canvas-warm/40 hover:bg-canvas-warm w-full">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#07381E] focus:ring-[#07381E]"
              />
              <span className="text-xs font-semibold text-charcoal-900 flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Feature on Public Homepage Highlights</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 2. Editorial Narrative & Descriptions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              ARCHITECTURAL NARRATIVE
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Project Descriptions
            </h2>
          </div>
        </div>

        <div className="space-y-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Short Description (Card Summary) *
            </label>
            <textarea
              rows={2}
              required
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Concise 1-2 sentence overview of the architectural transformation."
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Full Case Study Narrative (Project Detail Page) *
            </label>
            <textarea
              rows={6}
              required
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              placeholder="Detailed architectural story describing the existing property, spatial concept, material specifications, and transformation outcome."
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm leading-relaxed focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>
        </div>
      </div>

      {/* 3. Primary Visual Assets */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              MEDIA ASSETS
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Hero &amp; Grid Photography
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <MediaPickerField
            label="Portfolio Grid Image"
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            description="Featured card on /projects and highlights"
            aspectRatio="landscape"
            required
          />

          <MediaPickerField
            label="Case Study Hero Image"
            value={formData.hero_image_url}
            onChange={(url) => setFormData({ ...formData, hero_image_url: url })}
            description="Full-width header on project detail view"
            aspectRatio="landscape"
            required
          />
        </div>
      </div>

      {/* 4. Project Gallery Manager */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-canvas-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                CURATED GALLERY
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
                Architectural Photo Gallery ({formData.gallery_images.length})
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsGalleryPickerOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-soft-sm self-start sm:self-auto"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Select from Media Library</span>
          </button>
        </div>

        {/* Existing Gallery List with Reordering */}
        <div className="space-y-3">
          {formData.gallery_images.map((img, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-canvas-warm border border-canvas-border flex items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveGalleryImage(idx, 'up')}
                    className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === formData.gallery_images.length - 1}
                    onClick={() => moveGalleryImage(idx, 'down')}
                    className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border">
                  <Image
                    src={img.url}
                    alt={img.caption || 'Gallery Image'}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <span className="font-sans font-medium text-charcoal-900 text-xs block truncate">
                    {img.caption || 'No caption'}
                  </span>
                  <span className="font-mono text-[11px] text-charcoal-500 block truncate">
                    {img.url}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeGalleryImage(idx)}
                className="p-2 rounded-lg text-charcoal-400 hover:text-red-700 hover:bg-red-50 transition-colors shrink-0"
                title="Remove from gallery"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Gallery Image */}
        <div className="p-4 rounded-2xl bg-white border border-canvas-border space-y-3">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-charcoal-700 block">
            Add Image to Gallery
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
            <input
              type="text"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              placeholder="Asset URL (e.g. /images/about-zalia.webp)"
              className="sm:col-span-2 px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E]"
            />
            <input
              type="text"
              value={newGalleryCaption}
              onChange={(e) => setNewGalleryCaption(e.target.value)}
              placeholder="Caption (e.g. Courtyard Daylight)"
              className="px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
            />
          </div>
          <button
            type="button"
            onClick={addGalleryImage}
            disabled={!newGalleryUrl.trim()}
            className="px-4 py-2 rounded-xl bg-canvas-warm hover:bg-[#07381E] hover:text-white text-xs font-semibold uppercase tracking-wider text-charcoal-800 transition-colors flex items-center space-x-1.5 disabled:opacity-30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Gallery</span>
          </button>
        </div>
      </div>

      {/* 5. Before & After Metamorphosis */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <SplitSquareVertical className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              TRANSFORMATION PROOF
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Before / After Comparison Sets
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <MediaPickerField
            label="Before Transformation Photo"
            value={formData.before_image_url}
            onChange={(url) => setFormData({ ...formData, before_image_url: url })}
            description="Existing property prior to redevelopment"
            aspectRatio="landscape"
          />

          <MediaPickerField
            label="After Transformation Photo"
            value={formData.after_image_url}
            onChange={(url) => setFormData({ ...formData, after_image_url: url })}
            description="Finished residence with architectural intervention"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 6. Search Engine Optimization (SEO) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              DISCOVERABILITY
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Project SEO Meta Tags
            </h2>
          </div>
        </div>

        <div className="space-y-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              SEO Title Tag
            </label>
            <input
              type="text"
              value={formData.seo_title || ''}
              onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              placeholder={`${formData.title || 'Project'} | Zalia Properties`}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              SEO Meta Description
            </label>
            <textarea
              rows={2}
              value={formData.seo_description || ''}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              placeholder={formData.short_description || 'Search meta description for this case study.'}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Floating Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-canvas-border">
        <Link
          href="/admin/projects"
          className="px-5 py-2.5 rounded-xl border border-canvas-border text-charcoal-700 hover:bg-canvas-warm font-sans text-xs font-semibold transition-colors"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3.5 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Multi-select Gallery Picker Modal */}
      <MediaLibraryModal
        isOpen={isGalleryPickerOpen}
        onClose={() => setIsGalleryPickerOpen(false)}
        multiple={true}
        title="Select Images for Project Gallery"
        onSelectMultiple={(urls) => {
          const newItems = urls.map((u) => ({ url: u, caption: '' }));
          setFormData((prev) => ({
            ...prev,
            gallery_images: [...prev.gallery_images, ...newItems],
          }));
          setIsGalleryPickerOpen(false);
        }}
      />
    </form>
  );
}
