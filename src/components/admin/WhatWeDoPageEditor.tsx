'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Check,
  Building2,
  Box,
  Layers,
  Sparkles,
  FileText,
  Globe,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import MediaPickerField from './MediaPickerField';

interface WhatWeDoPageEditorProps {
  initialData: any;
}

export default function WhatWeDoPageEditor({ initialData }: WhatWeDoPageEditorProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [status, setStatus] = useState<string>(initialData?.status || 'published');
  const [heroEyebrow, setHeroEyebrow] = useState(initialData?.hero_eyebrow || 'WHAT WE DO');
  const [heroHeading, setHeroHeading] = useState(
    initialData?.hero_heading || 'A DISCIPLINED\nDEVELOPMENT MODEL.'
  );
  const [heroDescription, setHeroDescription] = useState(
    initialData?.hero_description ||
      'From identifying undervalued potential to executing complex structural renovations, we deliver refined residential properties through three core pillars.'
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    initialData?.hero_image_url || '/images/what-we-do.webp'
  );

  const initialContent = initialData?.content || {};

  // Capabilities header
  const [capEyebrow, setCapEyebrow] = useState(initialContent.capabilities?.eyebrow || 'CAPABILITIES');
  const [capHeading, setCapHeading] = useState(
    initialContent.capabilities?.heading || 'THREE INTEGRATED PILLARS'
  );
  const [capDescription, setCapDescription] = useState(
    initialContent.capabilities?.description ||
      'A seamless end-to-end process ensuring architectural integrity and superior residential quality.'
  );

  // Pillar 1: ACQUIRE
  const [acquirePillar, setAcquirePillar] = useState(initialContent.acquire?.pillar || '01 — ACQUIRE');
  const [acquireTitle, setAcquireTitle] = useState(
    initialContent.acquire?.title || 'Identifying Unrealized Architectural Potential'
  );
  const [acquireDesc, setAcquireDesc] = useState(
    initialContent.acquire?.description ||
      'We rigorously analyze prime UK residential opportunities with structural, layout, or cosmetic constraints that disguise their true potential.'
  );
  const [acquirePoints, setAcquirePoints] = useState<string[]>(
    initialContent.acquire?.points || [
      'Discreet off-market sourcing across London and prime UK enclaves',
      'Rapid structural appraisal and feasibility modeling',
      'Disciplined underwriting with long-term value perspective',
    ]
  );
  const [acquireImage, setAcquireImage] = useState(
    initialContent.acquire?.image_url || '/images/featured-project.webp'
  );

  // Pillar 2: TRANSFORM
  const [transformPillar, setTransformPillar] = useState(initialContent.transform?.pillar || '02 — TRANSFORM');
  const [transformTitle, setTransformTitle] = useState(
    initialContent.transform?.title || 'Unlocking Light, Flow & Spatial Volume'
  );
  const [transformDesc, setTransformDesc] = useState(
    initialContent.transform?.description ||
      'We strip back awkward layouts and introduce structural interventions that optimize natural daylight and establish contemporary architectural flow.'
  );
  const [transformPoints, setTransformPoints] = useState<string[]>(
    initialContent.transform?.points || [
      'Floor-to-ceiling glass apertures and modern rear extensions',
      'Harmonizing heritage brickwork with minimalist steel fenestration',
      'Spatial reconfiguration engineered for fluid modern living',
    ]
  );
  const [transformImage, setTransformImage] = useState(
    initialContent.transform?.image_url || '/images/before-split.webp'
  );

  // Pillar 3: CREATE
  const [createPillar, setCreatePillar] = useState(initialContent.create?.pillar || '03 — CREATE');
  const [createTitle, setCreateTitle] = useState(
    initialContent.create?.title || 'Delivering Exceptional Finished Homes'
  );
  const [createDesc, setCreateDesc] = useState(
    initialContent.create?.description ||
      'Every home is brought to completion with tactile natural materials, bespoke cabinetry, and tailored finishes designed for enduring longevity.'
  );
  const [createPoints, setCreatePoints] = useState<string[]>(
    initialContent.create?.points || [
      'Turnkey delivery with comprehensive documentation',
      'Natural Portuguese limestone, bespoke oak joinery, and artisanal metalwork',
      'Concealed architectural climate control and ambient lighting scenes',
    ]
  );
  const [createImage, setCreateImage] = useState(
    initialContent.create?.image_url || '/images/brand-statement.webp'
  );

  // 3D Transformation Journey Supporting Text (4 Stages)
  const [journey3D, setJourney3D] = useState(
    initialContent.journey_3d || [
      {
        number: '01',
        title: 'IDENTIFY',
        description:
          'A simplified architectural property appears and baseline structural viability is established.',
      },
      {
        number: '02',
        title: 'TRANSFORM',
        description:
          'Architectural elements begin changing with high-performance double-height glazing and extensions.',
      },
      {
        number: '03',
        title: 'REFINE',
        description:
          'Materials, limestone cladding, joinery and ambient illumination become thoroughly refined.',
      },
      {
        number: '04',
        title: 'CREATE',
        description: 'The final premium residence is revealed — a property, reimagined.',
      },
    ]
  );

  // SEO
  const [seoTitle, setSeoTitle] = useState(
    initialData?.seo_title || 'What We Do | Acquire • Transform • Create | Zalia Properties'
  );
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description ||
      'Explore Zalia Properties three-pillar development model: strategic acquisition, architectural transformation, and turnkey delivery of prime homes.'
  );

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const updatePoint = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    val: string
  ) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const updateJourney = (index: number, field: string, val: string) => {
    setJourney3D((prev: any[]) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedContent = {
        capabilities: {
          eyebrow: capEyebrow,
          heading: capHeading,
          description: capDescription,
        },
        acquire: {
          pillar: acquirePillar,
          title: acquireTitle,
          description: acquireDesc,
          points: acquirePoints,
          image_url: acquireImage,
        },
        transform: {
          pillar: transformPillar,
          title: transformTitle,
          description: transformDesc,
          points: transformPoints,
          image_url: transformImage,
        },
        create: {
          pillar: createPillar,
          title: createTitle,
          description: createDesc,
          points: createPoints,
          image_url: createImage,
        },
        journey_3d: journey3D,
      };

      const { error } = await supabase
        .from('pages')
        .update({
          status,
          hero_eyebrow: heroEyebrow,
          hero_heading: heroHeading,
          hero_description: heroDescription,
          hero_image_url: heroImageUrl,
          content: updatedContent,
          seo_title: seoTitle,
          seo_description: seoDescription,
          updated_at: new Date().toISOString(),
        })
        .eq('slug', 'what-we-do');

      if (error) throw error;

      setStatusMessage('What We Do page saved successfully!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      console.error('Failed to save what-we-do page:', err);
      alert('Error saving page: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl text-left pb-16">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/pages"
          className="inline-flex items-center space-x-2 text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-600 hover:text-charcoal-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pages Registry</span>
        </Link>

        <div className="flex items-center space-x-3">
          {statusMessage && (
            <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
          )}

          <Link
            href="/what-we-do"
            target="_blank"
            className="px-4 py-2.5 rounded-full border border-canvas-border bg-white text-charcoal-700 hover:text-charcoal-950 text-xs font-sans font-semibold transition-colors"
          >
            View Live Page
          </Link>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save What We Do'}</span>
          </button>
        </div>
      </div>

      {/* Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#07381E]/15 flex items-start space-x-3 text-xs text-[#07381E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold block">Design Presentation Guardrails Active</span>
          <span className="text-[#07381E]/80 leading-relaxed block">
            Content updates apply to the three pillars and 3D narrative copy on <code>/what-we-do</code>. Technical WebGL/Three.js render pipelines remain locked and protected.
          </span>
        </div>
      </div>

      {/* 1. Page Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center justify-between border-b border-canvas-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                PAGE HERO
              </span>
              <h2 className="font-sans text-base font-semibold text-charcoal-950">
                Hero Section
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              status === 'published'
                ? 'bg-[#EBF2EE] text-[#07381E] border border-[#07381E]/20'
                : 'bg-stone-100 text-stone-500 border border-stone-200'
            }`}
          >
            {status === 'published' ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Published</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Draft</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Hero Eyebrow
            </label>
            <input
              type="text"
              value={heroEyebrow}
              onChange={(e) => setHeroEyebrow(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Hero Headline
            </label>
            <textarea
              rows={2}
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-sans text-sm focus:outline-none focus:border-[#07381E] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Hero Description
            </label>
            <textarea
              rows={2}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <MediaPickerField
            label="Hero Architecture Photo"
            value={heroImageUrl}
            onChange={setHeroImageUrl}
            description="Hero header visual on /what-we-do"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 2. Pillar 01: ACQUIRE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <span className="font-mono font-bold text-xs">01</span>
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              PILLAR 01
            </span>
            <h2 className="font-sans text-base font-semibold text-charcoal-950">
              Acquire Section
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Badge Label
              </label>
              <input
                type="text"
                value={acquirePillar}
                onChange={(e) => setAcquirePillar(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Pillar Title
              </label>
              <input
                type="text"
                value={acquireTitle}
                onChange={(e) => setAcquireTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-sans text-sm focus:outline-none focus:border-[#07381E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Pillar Description
            </label>
            <textarea
              rows={2}
              value={acquireDesc}
              onChange={(e) => setAcquireDesc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Core Deliverables / Points (3 items)
            </label>
            {acquirePoints.map((pt, idx) => (
              <input
                key={idx}
                type="text"
                value={pt}
                onChange={(e) => updatePoint(setAcquirePoints, idx, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
              />
            ))}
          </div>

          <MediaPickerField
            label="Pillar 01 (Acquire) Image"
            value={acquireImage}
            onChange={setAcquireImage}
            description="Opportunity sourcing & acquisition photography"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 3. Pillar 02: TRANSFORM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <span className="font-mono font-bold text-xs">02</span>
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              PILLAR 02
            </span>
            <h2 className="font-sans text-base font-semibold text-charcoal-950">
              Transform Section
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Badge Label
              </label>
              <input
                type="text"
                value={transformPillar}
                onChange={(e) => setTransformPillar(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Pillar Title
              </label>
              <input
                type="text"
                value={transformTitle}
                onChange={(e) => setTransformTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-sans text-sm focus:outline-none focus:border-[#07381E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Pillar Description
            </label>
            <textarea
              rows={2}
              value={transformDesc}
              onChange={(e) => setTransformDesc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Core Deliverables / Points (3 items)
            </label>
            {transformPoints.map((pt, idx) => (
              <input
                key={idx}
                type="text"
                value={pt}
                onChange={(e) => updatePoint(setTransformPoints, idx, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
              />
            ))}
          </div>

          <MediaPickerField
            label="Pillar 02 (Transform) Image"
            value={transformImage}
            onChange={setTransformImage}
            description="Structural reconfiguration & engineering visual"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 4. Pillar 03: CREATE */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <span className="font-mono font-bold text-xs">03</span>
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              PILLAR 03
            </span>
            <h2 className="font-sans text-base font-semibold text-charcoal-950">
              Create Section
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Badge Label
              </label>
              <input
                type="text"
                value={createPillar}
                onChange={(e) => setCreatePillar(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                Pillar Title
              </label>
              <input
                type="text"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-sans text-sm focus:outline-none focus:border-[#07381E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Pillar Description
            </label>
            <textarea
              rows={2}
              value={createDesc}
              onChange={(e) => setCreateDesc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Core Deliverables / Points (3 items)
            </label>
            {createPoints.map((pt, idx) => (
              <input
                key={idx}
                type="text"
                value={pt}
                onChange={(e) => updatePoint(setCreatePoints, idx, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
              />
            ))}
          </div>

          <MediaPickerField
            label="Pillar 03 (Create) Image"
            value={createImage}
            onChange={setCreateImage}
            description="Turnkey luxury finished interior photography"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 5. 3D Metamorphosis Supporting Text */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              3D JOURNEY NARRATIVE
            </span>
            <h2 className="font-sans text-base font-semibold text-charcoal-950">
              3D Metamorphosis Step Descriptions
            </h2>
          </div>
        </div>

        <p className="text-xs text-charcoal-500 font-sans">
          Manage the editorial narrative accompanying the 4 interactive 3D stages. Real-time rendering parameters are automatically managed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {journey3D.map((stg: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-canvas-warm border border-canvas-border space-y-2.5 text-xs font-sans"
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-[#07381E]">#{stg.number}</span>
                <input
                  type="text"
                  value={stg.title}
                  onChange={(e) => updateJourney(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-canvas-border text-charcoal-900 font-semibold uppercase tracking-wider text-xs focus:outline-none focus:border-[#07381E]"
                />
              </div>
              <textarea
                rows={2}
                value={stg.description}
                onChange={(e) => updateJourney(idx, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E] resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 6. SEO Meta */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              DISCOVERABILITY
            </span>
            <h2 className="font-sans text-base font-semibold text-charcoal-950">
              Page SEO Meta Tags
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              SEO Page Title
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              SEO Meta Description
            </label>
            <textarea
              rows={2}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-canvas-border">
        <Link
          href="/admin/pages"
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
          <span>{isSaving ? 'Saving...' : 'Save What We Do'}</span>
        </button>
      </div>
    </form>
  );
}
