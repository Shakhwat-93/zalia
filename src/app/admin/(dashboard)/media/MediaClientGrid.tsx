'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Search,
  Copy,
  Check,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Eye,
  Loader2,
  Image as ImageIcon,
  X,
  Plus,
  Filter,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

export interface MediaRecord {
  id: string;
  filename: string;
  file_url: string;
  file_type: string;
  file_size: number;
  dimensions?: string;
  alt_text?: string;
  created_at: string;
}

export default function MediaClientGrid({
  initialAssets,
}: {
  initialAssets: MediaRecord[];
}) {
  const supabase = createBrowserSupabaseClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [assets, setAssets] = useState<MediaRecord[]>(initialAssets);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeAsset, setActiveAsset] = useState<MediaRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaRecord | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const copyUrl = (path: string, id: string) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    showNotification(`Copied path to clipboard: ${path}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Upload handler
  const processUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt_text', file.name.replace(/\.[^/.]+$/, ''));

        const res = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || `Failed to upload "${file.name}"`);
        }

        setAssets((prev) => [json.asset, ...prev]);
      }
      showNotification(`Successfully uploaded ${files.length} asset(s) to Supabase Storage.`);
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      processUpload(e.dataTransfer.files);
    }
  };

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/media/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error);

      setAssets((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      if (activeAsset?.id === deleteTarget.id) setActiveAsset(null);
      showNotification(`"${deleteTarget.filename}" permanently deleted.`);
      setDeleteTarget(null);
    } catch (err: any) {
      alert('Delete error: ' + err.message);
    }
  };

  // Filtered list
  const filtered = assets.filter((item) => {
    if (!item) return false;
    const filename = item.filename || '';
    const altText = item.alt_text || '';
    const fileType = item.file_type || '';

    const matchSearch =
      !search ||
      filename.toLowerCase().includes(search.toLowerCase()) ||
      altText.toLowerCase().includes(search.toLowerCase());

    const matchType =
      typeFilter === 'ALL' ||
      fileType.toLowerCase().includes(typeFilter.toLowerCase()) ||
      filename.toLowerCase().endsWith(`.${typeFilter.toLowerCase()}`);

    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 sm:p-10 rounded-3xl border-2 border-dashed transition-all cursor-pointer text-center space-y-3 bg-white ${
          isDragOver
            ? 'border-[#07381E] bg-[#EBF2EE]/40 scale-[1.005]'
            : 'border-canvas-border hover:border-[#07381E]/40 hover:bg-canvas-warm/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
          multiple
          onChange={(e) => e.target.files && processUpload(e.target.files)}
          className="hidden"
        />

        <div className="w-14 h-14 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center mx-auto shadow-2xs">
          {isUploading ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <UploadCloud className="w-7 h-7" />
          )}
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-lg font-medium text-charcoal-950">
            {isUploading ? 'Uploading to Supabase Storage...' : 'Drop Architectural Imagery Here'}
          </h4>
          <p className="text-xs font-sans text-charcoal-500 max-w-sm mx-auto">
            or <span className="text-[#07381E] font-semibold underline">browse from your computer</span>. Supports WebP, JPEG, PNG, AVIF up to 20MB.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-canvas-border shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or title..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-canvas-warm border border-canvas-border text-xs font-sans text-charcoal-900 focus:outline-none focus:bg-white focus:border-[#07381E]"
          />
        </div>

        {/* Format Filter Tabs */}
        <div className="flex items-center space-x-1 self-start sm:self-auto overflow-x-auto">
          {['ALL', 'WEBP', 'PNG', 'JPG'].map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setTypeFilter(fmt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-colors ${
                typeFilter === fmt
                  ? 'bg-[#07381E] text-white'
                  : 'bg-canvas-warm text-charcoal-600 hover:text-charcoal-950'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-white border border-canvas-border shadow-soft-sm overflow-hidden flex flex-col justify-between hover:border-[#07381E]/40 hover:shadow-soft-md transition-all duration-300 text-left"
          >
            {/* Image Preview Container */}
            <div
              onClick={() => setActiveAsset(item)}
              className="relative aspect-4/3 w-full bg-charcoal-100 overflow-hidden cursor-pointer"
            >
              {item.file_url ? (
                <Image
                  src={encodeURI(item.file_url)}
                  alt={item.filename || 'Media Asset'}
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : null}

              {/* Format Tag */}
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-sans font-semibold uppercase tracking-wider text-white">
                {(item.file_type || 'image/webp').split('/').pop() || 'IMAGE'}
              </span>

              {/* Inspect Button Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-sans font-semibold text-charcoal-900 shadow-soft-sm flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </span>
              </div>
            </div>

            {/* Meta & Actions */}
            <div className="p-3.5 space-y-2 text-left bg-white">
              <div className="space-y-0.5">
                <span
                  onClick={() => setActiveAsset(item)}
                  className="text-xs font-serif font-semibold text-charcoal-950 block truncate cursor-pointer hover:text-[#07381E]"
                  title={item.filename || 'Asset'}
                >
                  {item.filename || 'Untitled Asset'}
                </span>
                <span className="text-[10.5px] font-sans text-charcoal-400 block">
                  {formatSize(item.file_size)} · {item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB') : 'Archived'}
                </span>
              </div>

              <div className="pt-2 border-t border-canvas-border flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyUrl(item.file_url, item.id)}
                  className="inline-flex items-center space-x-1 text-[11px] font-sans font-medium text-charcoal-600 hover:text-[#07381E] transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-charcoal-400" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>

                <div className="flex items-center space-x-1">
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-charcoal-400 hover:text-charcoal-950 transition-colors"
                    title="Open original"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-1 rounded text-charcoal-400 hover:text-rose-600 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Inspection Modal */}
      {activeAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-canvas-border shadow-2xl text-left">
            <div className="flex items-start justify-between border-b border-canvas-border pb-3">
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#07381E]">
                  MEDIA PARTICULARS
                </span>
                <h3 className="font-serif text-2xl font-medium text-charcoal-950 truncate max-w-sm">
                  {activeAsset.filename}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Preview */}
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-charcoal-100 border border-canvas-border">
              {activeAsset.file_url ? (
                <Image
                  src={encodeURI(activeAsset.file_url)}
                  alt={activeAsset.filename || 'Particulars'}
                  fill
                  className="object-contain"
                  sizes="600px"
                />
              ) : null}
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 rounded-xl bg-canvas-warm space-y-0.5">
                <span className="text-charcoal-400 font-medium text-[10.5px] uppercase">File Size</span>
                <span className="font-semibold text-charcoal-900 block">{formatSize(activeAsset.file_size)}</span>
              </div>

              <div className="p-3 rounded-xl bg-canvas-warm space-y-0.5">
                <span className="text-charcoal-400 font-medium text-[10.5px] uppercase">File Type</span>
                <span className="font-semibold text-charcoal-900 block uppercase">{activeAsset.file_type}</span>
              </div>

              <div className="p-3 rounded-xl bg-canvas-warm space-y-0.5 col-span-2">
                <span className="text-charcoal-400 font-medium text-[10.5px] uppercase">Public Direct Path</span>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="font-mono text-xs text-charcoal-800 truncate">{activeAsset.file_url}</span>
                  <button
                    type="button"
                    onClick={() => copyUrl(activeAsset.file_url, activeAsset.id)}
                    className="p-1 rounded text-charcoal-500 hover:text-[#07381E] shrink-0"
                    title="Copy URL"
                  >
                    {copiedId === activeAsset.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-canvas-border">
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(activeAsset);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveAsset(null)}
                className="px-5 py-2.5 rounded-xl bg-[#07381E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#052B17] transition-colors shadow-soft-sm"
              >
                Close Particulars
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Media Asset?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.filename}"? This will remove the file from storage and any references.`}
        confirmLabel="Permanently Delete"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
