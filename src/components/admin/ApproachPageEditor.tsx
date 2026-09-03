'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  Check,
  Compass,
  ArrowUp,
  ArrowDown,
  Globe,
  ImageIcon,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import MediaPickerField from './MediaPickerField';

interface ApproachPageEditorProps {
  initialData: any;
}

export default function ApproachPageEditor({ initialData }: ApproachPageEditorProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [status, setStatus] = useState<string>(initialData?.status || 'published');
  const [heroEyebrow, setHeroEyebrow] = useState(initialData?.hero_eyebrow || 'OUR METHODOLOGY');
  const [heroHeading, setHeroHeading] = useState(
    initialData?.hero_heading || 'A DISCIPLINED\n5-STAGE APPROACH.'
  );
  const [heroDescription, setHeroDescription] = useState(
    initialData?.hero_description ||
      'From initial volume assessment through to final turnkey handover, our structured methodology ensures every development achieves its fullest potential.'
  );
  const [heroImageUrl, setHeroImageUrl] = useState(
    initialData?.hero_image_url || '/images/brand-statement.webp'
  );

  const initialContent = initialData?.content || {};

  // 5 Stages array
  const [stages, setStages] = useState(
    initialContent.stages || [
      {
        number: '01',
        name: 'IDENTIFY',
        title: "Understand The Property's Potential",
        summary:
          'We look past cosmetic decay, awkward floorplans, and dated finishes to uncover inherent volume, daylight orientation, and structural possibilities.',
        details: [
          'Comprehensive spatial volume & daylight orientation audit',
          'Structural feasibility and load-bearing layout exploration',
          'Unlocking overlooked residential potential in prime UK enclaves',
        ],
        image_url: '/images/about-zalia.webp',
        sort_order: 1,
        visibility: true,
      },
      {
        number: '02',
        name: 'ACQUIRE',
        title: 'Select Opportunities With Genuine Potential',
        summary:
          'Disciplined property acquisition backed by rigorous underwriting. We only commit to properties where our architectural vision can unlock meaningful value.',
        details: [
          'Strict residential underwriting and heritage compliance review',
          'Direct, off-market, and discreet acquisition networks',
          'Decisive institutional capitalization with long-term perspective',
        ],
        image_url: '/images/featured-project.webp',
        sort_order: 2,
        visibility: true,
      },
      {
        number: '03',
        name: 'TRANSFORM',
        title: 'Reimagine The Space Through Thoughtful Design',
        summary:
          'Structural reconfiguration that liberates interior flow. Introducing floor-to-ceiling glass pavilions, double-height volumes, and courtyard integration.',
        details: [
          'Removal of compartmentalized walls in favor of fluid living zones',
          'Seamless glass apertures, skylights, and indoor-outdoor transitions',
          'Harmonizing heritage masonry with clean architectural lines',
        ],
        image_url: '/images/before-split.webp',
        sort_order: 3,
        visibility: true,
      },
      {
        number: '04',
        name: 'REFINE',
        title: 'Focus On Materials, Details And Quality',
        summary:
          'Every tactile touchpoint is selected with permanence in mind. Natural Portuguese limestone, oiled oak joinery, slimline steel fenestration, and silent acoustic envelopes.',
        details: [
          'Authentic natural stone, bespoke cabinetry, and tailored steelwork',
          'Concealed architectural climate control, lighting scenes, and audio',
          'Micro-level tolerances and artisanal finishes throughout',
        ],
        image_url: '/images/brand-statement.webp',
        sort_order: 4,
        visibility: true,
      },
      {
        number: '05',
        name: 'CREATE',
        title: 'Deliver A Finished Home Designed For Living',
        summary:
          'The finished property is delivered turnkey — ready for discerning homeowners who prioritize understated luxury, serene acoustics, and enduring aesthetics.',
        details: [
          'Turnkey handover with bespoke architectural manual and warranties',
          'Enduring environmental efficiency and thermal envelope excellence',
          'Timeless residential character that appreciates with longevity',
        ],
        image_url: '/images/after-split.webp',
        sort_order: 5,
        visibility: true,
      },
    ]
  );

  // SEO
  const [seoTitle, setSeoTitle] = useState(
    initialData?.seo_title || 'Our Approach | Disciplined 5-Stage Methodology | Zalia Properties'
  );
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description ||
      'Discover the 5-stage Zalia methodology: Identify, Acquire, Transform, Refine, and Create. Disciplined residential development.'
  );

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const updateStageField = (index: number, field: string, val: any) => {
    setStages((prev: any[]) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const updateStageDetail = (stageIdx: number, detailIdx: number, val: string) => {
    setStages((prev: any[]) => {
      const next = [...prev];
      const newDetails = [...(next[stageIdx].details || [])];
      newDetails[detailIdx] = val;
      next[stageIdx] = { ...next[stageIdx], details: newDetails };
      return next;
    });
  };

  const moveStage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === stages.length - 1)
    ) {
      return;
    }
    const target = direction === 'up' ? index - 1 : index + 1;
    const next = [...stages];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    const reordered = next.map((s, idx) => ({
      ...s,
      sort_order: idx + 1,
      number: `0${idx + 1}`,
    }));
    setStages(reordered);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedContent = {
        stages: stages,
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
        .eq('slug', 'approach');

      if (error) throw error;

      setStatusMessage('Approach methodology saved successfully!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      console.error('Failed to save approach page:', err);
      alert('Error saving page: ' + (err.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl text-left select-none pb-16">
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
            href="/approach"
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
            <span>{isSaving ? 'Saving...' : 'Save Approach Page'}</span>
          </button>
        </div>
      </div>

      {/* Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#07381E]/15 flex items-start space-x-3 text-xs text-[#07381E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold block">Design Presentation Guardrails Active</span>
          <span className="text-[#07381E]/80 leading-relaxed block">
            Updates apply directly to the 5 development methodology stages on <code>/approach</code>. Visual stage transitions, split comparison sliders, and interactive layout hierarchies are retained.
          </span>
        </div>
      </div>

      {/* 1. Page Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center justify-between border-b border-canvas-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
                PAGE HERO
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal-950">
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
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-xl focus:outline-none focus:border-[#07381E] resize-none"
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
            description="Hero frame on /approach"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 2. Five Stages Methodology */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              METHODOLOGY
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              The 5 Development Stages
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {stages.map((stg: any, idx: number) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-canvas-warm border border-canvas-border space-y-4 text-xs font-sans"
            >
              {/* Stage Header Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-canvas-border/70">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-[#07381E]">#{stg.number}</span>
                  <input
                    type="text"
                    value={stg.name}
                    onChange={(e) => updateStageField(idx, 'name', e.target.value)}
                    className="px-3 py-1 rounded-lg bg-white border border-canvas-border font-bold uppercase tracking-wider text-xs text-charcoal-950 focus:outline-none focus:border-[#07381E]"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stg.visibility !== false}
                      onChange={(e) => updateStageField(idx, 'visibility', e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-[#07381E] focus:ring-[#07381E]"
                    />
                    <span className="text-[11px] text-charcoal-600 font-medium">Visible</span>
                  </label>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveStage(idx, 'up')}
                      className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
                      title="Move stage up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === stages.length - 1}
                      onClick={() => moveStage(idx, 'down')}
                      className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20"
                      title="Move stage down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
                  Stage Title
                </label>
                <input
                  type="text"
                  value={stg.title}
                  onChange={(e) => updateStageField(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-canvas-border text-charcoal-900 font-serif text-base focus:outline-none focus:border-[#07381E]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1">
                  Stage Summary
                </label>
                <textarea
                  rows={2}
                  value={stg.summary}
                  onChange={(e) => updateStageField(idx, 'summary', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-canvas-border text-charcoal-900 text-xs leading-relaxed focus:outline-none focus:border-[#07381E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
                  Stage Execution Details (3 Points)
                </label>
                {(stg.details || []).map((det: string, dIdx: number) => (
                  <input
                    key={dIdx}
                    type="text"
                    value={det}
                    onChange={(e) => updateStageDetail(idx, dIdx, e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
                  />
                ))}
              </div>

              <MediaPickerField
                label="Stage Photography Asset"
                value={stg.image_url || ''}
                onChange={(url) => updateStageField(idx, 'image_url', url)}
                description="Visual demonstration of this methodology phase"
                aspectRatio="landscape"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. SEO Meta */}
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
          <span>{isSaving ? 'Saving...' : 'Save Approach Page'}</span>
        </button>
      </div>
    </form>
  );
}
