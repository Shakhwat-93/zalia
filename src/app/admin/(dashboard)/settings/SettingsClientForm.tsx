'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, ShieldCheck, Database, Server } from 'lucide-react';
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
    const map: Record<string, string> = {};
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
      // Update each key in site_settings table
      const updates = Object.entries(settings).map(([key, value]) =>
        supabase.from('site_settings').update({ value }).eq('key', key)
      );

      await Promise.all(updates);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Error updating settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl text-left">
      
      {/* 1. General Branding */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div>
          <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
            IDENTITY
          </span>
          <h2 className="font-serif text-2xl font-medium text-charcoal-950 mt-1">
            Company &amp; Brand Particulars
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Official Company Name
            </label>
            <input
              type="text"
              value={settings['company_name'] || ''}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
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

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Company Subtitle / Scope
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

      {/* 2. Direct Channels */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-6">
        <div>
          <span className="text-[10.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E]">
            COMMUNICATIONS
          </span>
          <h2 className="font-serif text-2xl font-medium text-charcoal-950 mt-1">
            Headquarters &amp; Direct Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-sans">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Direct Inbound Email
            </label>
            <input
              type="email"
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
              value={settings['address'] || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
              Legal Registration
            </label>
            <input
              type="text"
              value={settings['registration'] || ''}
              onChange={(e) => handleChange('registration', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-canvas-warm border border-canvas-border text-charcoal-900 text-sm focus:outline-none focus:bg-white focus:border-[#07381E]"
            />
          </div>
        </div>
      </div>

      {/* 3. System Infrastructure Info */}
      <div className="p-6 rounded-2xl bg-canvas-warm border border-canvas-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-charcoal-600 font-sans">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#07381E] flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-charcoal-950 block">PostgreSQL 15.8 via Kong Gateway</span>
            <span className="text-[11px] text-charcoal-500">Self-hosted Supabase with Row Level Security</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-emerald-800 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Connected</span>
        </div>
      </div>

      {/* Save Button Toolbar */}
      <div className="flex items-center justify-end space-x-4 pt-2">
        {saveSuccess && (
          <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-3.5 rounded-full bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

    </form>
  );
}
