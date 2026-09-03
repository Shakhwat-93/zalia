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
  Sparkles,
  Compass,
  FileText,
  Globe,
  ImageIcon,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import MediaPickerField from './MediaPickerField';

interface AboutPageEditorProps {
  initialData: any;
}

export default function AboutPageEditor({ initialData }: AboutPageEditorProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [status, setStatus] = useState<string>(initialData?.status || 'published');
  const [heroEyebrow, setHeroEyebrow] = useState(initialData?.hero_eyebrow || 'WHO WE ARE');
  const [heroHeading, setHeroHeading] = useState(initialData?.hero_heading || 'WE SEE MORE\nIN EVERY PROPERTY.');
  const [heroDescription, setHeroDescription] = useState(
    initialData?.hero_description ||
      'We look beyond what a property is today to understand what it could become tomorrow.'
  );
  const [heroImageUrl, setHeroImageUrl] = useState(initialData?.hero_image_url || '/images/about-zalia.webp');

  const initialContent = initialData?.content || {};

  // Intro section
  const [introEyebrow, setIntroEyebrow] = useState(initialContent.intro?.eyebrow || 'OUR STORY');
  const [introHeading, setIntroHeading] = useState(
    initialContent.intro?.heading || 'PROPERTY HAS POTENTIAL.\nWE SEE WHAT IT CAN BECOME.'
  );
  const [introNarrative, setIntroNarrative] = useState(
    initialContent.intro?.narrative ||
      'Zalia Properties identifies residential properties with potential and transforms them through thoughtful development, renovation and design.'
  );

  // Philosophy section
  const [philosophyEyebrow, setPhilosophyEyebrow] = useState(initialContent.philosophy?.eyebrow || 'OUR PHILOSOPHY');
  const [philosophyHeading, setPhilosophyHeading] = useState(
    initialContent.philosophy?.heading || "WE DON'T SIMPLY DEVELOP.\nWE REIMAGINE LIVING."
  );
  const [philosophyP1, setPhilosophyP1] = useState(
    initialContent.philosophy?.body_p1 ||
      'Every property has inherent characteristics shaped by its architecture, history, and surroundings. Rather than imposing standardized templates, we work with the unique spatial volume of each residence to uncover its true modern potential.'
  );
  const [philosophyP2, setPhilosophyP2] = useState(
    initialContent.philosophy?.body_p2 ||
      'From opening axial sightlines to integrating double-height glass pavilions, our philosophy balances structural bravery with respect for architectural heritage.'
  );
  const [philosophyImageUrl, setPhilosophyImageUrl] = useState(
    initialContent.philosophy?.image_url || '/images/brand-statement.webp'
  );

  // Principles (3 items)
  const [principles, setPrinciples] = useState(
    initialContent.principles || [
      {
        number: '01',
        title: 'SEE THE POTENTIAL',
        description: 'We look beyond the existing property to understand what it could become.',
      },
      {
        number: '02',
        title: 'TRANSFORM WITH PURPOSE',
        description: 'We approach renovation and development with care, design and practicality.',
      },
      {
        number: '03',
        title: 'CREATE QUALITY',
        description: 'We focus on creating refined homes designed for modern living.',
      },
    ]
  );

  // Visual Story section
  const [visualStoryEyebrow, setVisualStoryEyebrow] = useState(
    initialContent.visual_story?.eyebrow || 'ARCHITECTURAL METAMORPHOSIS'
  );
  const [visualStoryHeading, setVisualStoryHeading] = useState(
    initialContent.visual_story?.heading || 'FROM WHAT IS\nTO WHAT COULD BE.'
  );
  const [visualStoryDescription, setVisualStoryDescription] = useState(
    initialContent.visual_story?.description ||
      'Every project begins with potential and ends with a home thoughtfully shaped for modern life.'
  );
  const [visualStoryImageUrl, setVisualStoryImageUrl] = useState(
    initialContent.visual_story?.image_url || '/images/3d-transformation.webp'
  );
  const [visualStoryCtaText, setVisualStoryCtaText] = useState(
    initialContent.visual_story?.cta_text || 'Explore Our Projects'
  );
  const [visualStoryCtaUrl, setVisualStoryCtaUrl] = useState(
    initialContent.visual_story?.cta_url || '/projects'
  );

  // Statement section
  const [statementQuote, setStatementQuote] = useState(
    initialContent.statement?.quote ||
      'Transforming residential properties through thoughtful development, renovation and design.'
  );
  const [statementAuthor, setStatementAuthor] = useState(
    initialContent.statement?.author || 'Zalia Properties Ltd'
  );

  // Final CTA section
  const [ctaEyebrow, setCtaEyebrow] = useState(initialContent.cta?.eyebrow || 'START A CONVERSATION');
  const [ctaHeading, setCtaHeading] = useState(
    initialContent.cta?.heading || 'HAVE A PROPERTY\nWITH POTENTIAL?'
  );
  const [ctaSupporting, setCtaSupporting] = useState(
    initialContent.cta?.supporting_text ||
      'We are actively acquiring prime residential opportunities across London and the home counties.'
  );
  const [ctaBtnText, setCtaBtnText] = useState(initialContent.cta?.cta_text || 'Get in Touch');

  // SEO
  const [seoTitle, setSeoTitle] = useState(
    initialData?.seo_title || 'About Zalia Properties | Who We Are & Architectural Philosophy'
  );
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description ||
      'Discover Zalia Properties — prime residential development, thoughtful architectural acquisitions, and considered residential transformations across London and the UK.'
  );

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const updatePrinciple = (index: number, field: string, val: string) => {
    setPrinciples((prev: any[]) => {
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
        intro: {
          eyebrow: introEyebrow,
          heading: introHeading,
          narrative: introNarrative,
        },
        philosophy: {
          eyebrow: philosophyEyebrow,
          heading: philosophyHeading,
          body_p1: philosophyP1,
          body_p2: philosophyP2,
          image_url: philosophyImageUrl,
        },
        principles: principles,
        visual_story: {
          eyebrow: visualStoryEyebrow,
          heading: visualStoryHeading,
          description: visualStoryDescription,
          image_url: visualStoryImageUrl,
          cta_text: visualStoryCtaText,
          cta_url: visualStoryCtaUrl,
        },
        statement: {
          quote: statementQuote,
          author: statementAuthor,
        },
        cta: {
          eyebrow: ctaEyebrow,
          heading: ctaHeading,
          supporting_text: ctaSupporting,
          cta_text: ctaBtnText,
        },
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
        .eq('slug', 'about');

      if (error) throw error;

      setStatusMessage('About page content saved successfully!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: any) {
      console.error('Failed to save about page:', err);
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
            href="/about"
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
            <span>{isSaving ? 'Saving...' : 'Save About Page'}</span>
          </button>
        </div>
      </div>

      {/* Guardrail Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF2EE] border border-[#07381E]/15 flex items-start space-x-3 text-xs text-[#07381E]">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold block">Design Presentation Guardrails Active</span>
          <span className="text-[#07381E]/80 leading-relaxed block">
            Content edits update the live copy on <code>/about</code> while preserving luxury Cormorant typography, responsive layouts, and animations.
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

          <div className="flex items-center space-x-2">
            <span className="text-xs text-charcoal-600 font-sans">Status:</span>
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
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Hero Headline (use Enter for line break)
            </label>
            <textarea
              rows={2}
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-xl focus:outline-none focus:bg-white focus:border-[#07381E] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Hero Narrative Description
            </label>
            <textarea
              rows={2}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <MediaPickerField
            label="Hero Architectural Image"
            value={heroImageUrl}
            onChange={setHeroImageUrl}
            description="Full-bleed header visual on /about"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 2. Intro / Our Story */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              NARRATIVE
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Our Story / Introduction
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Intro Eyebrow
            </label>
            <input
              type="text"
              value={introEyebrow}
              onChange={(e) => setIntroEyebrow(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Intro Headline
            </label>
            <textarea
              rows={2}
              value={introHeading}
              onChange={(e) => setIntroHeading(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-lg focus:outline-none focus:border-[#07381E] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Story Narrative
            </label>
            <textarea
              rows={3}
              value={introNarrative}
              onChange={(e) => setIntroNarrative(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>
        </div>
      </div>

      {/* 3. Brand Philosophy */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              CORE IDENTITY
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Brand Philosophy
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Philosophy Eyebrow
            </label>
            <input
              type="text"
              value={philosophyEyebrow}
              onChange={(e) => setPhilosophyEyebrow(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Philosophy Heading
            </label>
            <textarea
              rows={2}
              value={philosophyHeading}
              onChange={(e) => setPhilosophyHeading(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-lg focus:outline-none focus:border-[#07381E] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Philosophy Body Paragraph 1
            </label>
            <textarea
              rows={3}
              value={philosophyP1}
              onChange={(e) => setPhilosophyP1(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Philosophy Body Paragraph 2
            </label>
            <textarea
              rows={3}
              value={philosophyP2}
              onChange={(e) => setPhilosophyP2(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <MediaPickerField
            label="Philosophy Architectural Photography"
            value={philosophyImageUrl}
            onChange={setPhilosophyImageUrl}
            description="Editorial photo showcasing brand perspective"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 4. Development Principles (3 items) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              THREE PILLARS
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              What Makes Zalia Different (Principles)
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {principles.map((pr: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-canvas-warm border border-canvas-border space-y-3 text-xs font-sans"
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-[#07381E]">#{pr.number}</span>
                <input
                  type="text"
                  value={pr.title}
                  onChange={(e) => updatePrinciple(idx, 'title', e.target.value)}
                  placeholder="Principle Title"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-canvas-border text-charcoal-900 font-medium text-sm focus:outline-none focus:border-[#07381E]"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  value={pr.description}
                  onChange={(e) => updatePrinciple(idx, 'description', e.target.value)}
                  placeholder="Principle description..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E] resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Architectural Metamorphosis / Visual Story */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              VISUAL SECTION
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Architectural Metamorphosis Banner
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Section Eyebrow
            </label>
            <input
              type="text"
              value={visualStoryEyebrow}
              onChange={(e) => setVisualStoryEyebrow(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Headline
            </label>
            <textarea
              rows={2}
              value={visualStoryHeading}
              onChange={(e) => setVisualStoryHeading(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-lg focus:outline-none focus:border-[#07381E] resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Supporting Text
            </label>
            <input
              type="text"
              value={visualStoryDescription}
              onChange={(e) => setVisualStoryDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={visualStoryCtaText}
                onChange={(e) => setVisualStoryCtaText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                CTA Button URL
              </label>
              <input
                type="text"
                value={visualStoryCtaUrl}
                onChange={(e) => setVisualStoryCtaUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E]"
              />
            </div>
          </div>

          <MediaPickerField
            label="Metamorphosis Story Image"
            value={visualStoryImageUrl}
            onChange={setVisualStoryImageUrl}
            description="Large visual demonstration frame"
            aspectRatio="landscape"
          />
        </div>
      </div>

      {/* 6. Statement & CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-canvas-border pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              CONVERSION &amp; SEO
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Final CTA &amp; Search Meta
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-sans">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
              Philosophy Quote Statement
            </label>
            <textarea
              rows={2}
              value={statementQuote}
              onChange={(e) => setStatementQuote(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-serif text-base focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                CTA Headline
              </label>
              <input
                type="text"
                value={ctaHeading}
                onChange={(e) => setCtaHeading(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:border-[#07381E]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaBtnText}
                onChange={(e) => setCtaBtnText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-xs focus:outline-none focus:border-[#07381E]"
              />
            </div>
          </div>

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
          <span>{isSaving ? 'Saving...' : 'Save About Page'}</span>
        </button>
      </div>
    </form>
  );
}
