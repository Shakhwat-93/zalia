'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Save, CheckCircle2, ShieldCheck, Database, Globe, Mail, Phone, MapPin, Share2, Search, Palette, Image as ImageIcon } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

interface SettingRecord {
  id: string;
  key: string;
  value: string;
  category: string;
  description?: string;
}

export default function SettingsClientForm({
  initialSettings,
}: {
  initialSettings: SettingRecord[];
}) {
  const [settings, setSettings] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {
      company_name: 'Zalia Properties Ltd',
      logo_url: '/images/logo.png',
      favicon_url: '/favicon.ico',
      primary_color: '#07381E',
      tagline: 'Invest • Develop • Transform',
      subtag: 'UK Residential Property Acquisition & Transformation',
      email: 'contact@zaliaproperties.com',
      phone: '+44 (0) 20 7946 0892',
      address: 'Mayfair, London W1J, United Kingdom',
      registration: 'Registered in England & Wales',
      instagram_url: 'https://instagram.com/zaliaproperties',
      linkedin_url: 'https://linkedin.com/company/zalia-properties',
      default_seo_title: 'Zalia Properties Ltd | UK Property Acquisition & Transformation',
      default_seo_description: 'Zalia Properties transforms prime UK residential properties through thoughtful development and refined architectural renovation.',
    };
    initialSettings.forEach((s) => {
      map[s.key] = s.value;
    });
    return map;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const supabase = createBrowserSupabaseClient();

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    setSaveSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Upsert each key in site_settings table
      const upserts = Object.entries(settings).map(([key, value]) =>
        supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
      );

      await Promise.all(upserts);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Error updating site settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl text-left">
      
      {/* 1. Brand Identity & Visual Assets */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              VISUAL SYSTEM
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Identity, Logo &amp; Brand Color
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Official Site Name
            </label>
            <input
              type="text"
              required
              value={settings['company_name'] || ''}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Primary Brand Color (Hex)
            </label>
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-xl border border-canvas-border shrink-0 shadow-2xs"
                style={{ backgroundColor: settings['primary_color'] || '#07381E' }}
              />
              <input
                type="text"
                required
                value={settings['primary_color'] || '#07381E'}
                onChange={(e) => handleChange('primary_color', e.target.value)}
                placeholder="#07381E"
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Logo Asset Path
            </label>
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-xl bg-[#041F11] border border-canvas-border flex items-center justify-center shrink-0 overflow-hidden p-1">
                <Image
                  src={settings['logo_url'] || '/images/logo.png'}
                  alt="Logo preview"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <input
                type="text"
                required
                value={settings['logo_url'] || '/images/logo.png'}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Favicon Path
            </label>
            <input
              type="text"
              required
              value={settings['favicon_url'] || '/favicon.ico'}
              onChange={(e) => handleChange('favicon_url', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Tagline Signature
            </label>
            <input
              type="text"
              value={settings['tagline'] || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Brand Subtitle / Scope
            </label>
            <input
              type="text"
              value={settings['subtag'] || ''}
              onChange={(e) => handleChange('subtag', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>
        </div>
      </div>

      {/* 2. Direct Contact Channels */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              COMMUNICATION
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Headquarters &amp; Direct Channels
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Primary Contact Email
            </label>
            <input
              type="email"
              required
              value={settings['email'] || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Office Telephone
            </label>
            <input
              type="text"
              required
              value={settings['phone'] || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Registered Mayfair Office Address
            </label>
            <input
              type="text"
              required
              value={settings['address'] || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Company Registration Entity
            </label>
            <input
              type="text"
              required
              value={settings['registration'] || ''}
              onChange={(e) => handleChange('registration', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>
        </div>
      </div>

      {/* 3. Social Media Presence */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              SOCIAL CHANNELS
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Corporate Profiles &amp; Networks
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={settings['instagram_url'] || ''}
              onChange={(e) => handleChange('instagram_url', e.target.value)}
              placeholder="https://instagram.com/zaliaproperties"
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              LinkedIn Company URL
            </label>
            <input
              type="url"
              value={settings['linkedin_url'] || ''}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
              placeholder="https://linkedin.com/company/zalia-properties"
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>
        </div>
      </div>

      {/* 4. Default Search Engine Optimization (SEO) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
              SEARCH VISIBILITY
            </span>
            <h2 className="font-serif text-2xl font-medium text-charcoal-950">
              Default SEO Meta Configuration
            </h2>
          </div>
        </div>

        <div className="space-y-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Default SEO Title Tag
            </label>
            <input
              type="text"
              required
              value={settings['default_seo_title'] || ''}
              onChange={(e) => handleChange('default_seo_title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Default SEO Meta Description
            </label>
            <textarea
              rows={3}
              required
              value={settings['default_seo_description'] || ''}
              onChange={(e) => handleChange('default_seo_description', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E] leading-relaxed resize-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button Toolbar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2 text-xs text-charcoal-500 font-sans">
          <ShieldCheck className="w-4 h-4 text-[#07381E]" />
          <span>Strict design guardrails enforced: changes apply to content only.</span>
        </div>

        <div className="flex items-center space-x-3">
          {saveSuccess && (
            <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Settings updated successfully!</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="px-7 py-3.5 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2.5 transition-all shadow-soft-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Global Settings'}</span>
          </button>
        </div>
      </div>

    </form>
  );
}
