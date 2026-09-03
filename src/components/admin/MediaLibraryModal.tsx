'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  X,
  UploadCloud,
  Search,
  Check,
  CheckCircle2,
  Trash2,
  Copy,
  ExternalLink,
  Eye,
  Loader2,
  AlertCircle,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

export interface MediaAsset {
  id: string;
  filename: string;
  file_url: string;
  file_type: string;
  file_size: number;
  dimensions?: string;
  alt_text?: string;
  created_at: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (url: string, asset: MediaAsset) => void;
  onSelectMultiple?: (urls: string[], assets: MediaAsset[]) => void;
  multiple?: boolean;
  title?: string;
  currentSelectedUrl?: string;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  onSelectMultiple,
  multiple = false,
  title = 'Select Media Asset',
  currentSelectedUrl,
}: MediaLibraryModalProps) {
  const supabase = createBrowserSupabaseClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUrls, setSelectedUrls] = useState<string[]>(
    currentSelectedUrl ? [currentSelectedUrl] : []
  );
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load Assets
  useEffect(() => {
    if (!isOpen) return;

    async function loadAssets() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAssets(data || []);
      } catch (err) {
        console.error('Failed to load media assets:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAssets();
  }, [isOpen]);

  // Handle File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

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
          throw new Error(json.error || 'Upload failed.');
        }

        setAssets((prev) => [json.asset, ...prev]);
        if (!multiple) {
          setSelectedUrls([json.asset.file_url]);
        } else {
          setSelectedUrls((prev) => [...prev, json.asset.file_url]);
        }
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading image.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Toggle selection
  const toggleSelect = (asset: MediaAsset) => {
    if (multiple) {
      if (selectedUrls.includes(asset.file_url)) {
        setSelectedUrls((prev) => prev.filter((u) => u !== asset.file_url));
      } else {
        setSelectedUrls((prev) => [...prev, asset.file_url]);
      }
    } else {
      setSelectedUrls([asset.file_url]);
    }
  };

  // Confirm selection
  const handleConfirmSelect = () => {
    if (multiple) {
      const selectedAssets = assets.filter((a) => selectedUrls.includes(a.file_url));
      onSelectMultiple?.(selectedUrls, selectedAssets);
    } else {
      const selectedAsset = assets.find((a) => selectedUrls.includes(a.file_url));
      if (selectedAsset) {
        onSelect?.(selectedAsset.file_url, selectedAsset);
      } else if (selectedUrls[0]) {
        onSelect?.(selectedUrls[0], {
          id: 'custom',
          filename: selectedUrls[0].split('/').pop() || '',
          file_url: selectedUrls[0],
          file_type: 'image/webp',
          file_size: 0,
          created_at: new Date().toISOString(),
        });
      }
    }
    onClose();
  };

  // Delete Asset
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/media/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error);

      setAssets((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setSelectedUrls((prev) => prev.filter((u) => u !== deleteTarget.file_url));
      if (previewAsset?.id === deleteTarget.id) setPreviewAsset(null);
      setDeleteTarget(null);
    } catch (err: any) {
      alert('Failed to delete asset: ' + err.message);
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredAssets = assets.filter(
    (a) =>
      !search ||
      (a.filename && a.filename.toLowerCase().includes(search.toLowerCase())) ||
      (a.alt_text && a.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[88vh] flex flex-col border border-canvas-border shadow-soft-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-canvas-border flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#07381E]">
              MEDIA REPOSITORY
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950">
              {title}
            </h3>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-soft-sm disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <UploadCloud className="w-3.5 h-3.5" />
              )}
              <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              multiple={multiple}
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="px-6 py-3 border-b border-canvas-border bg-canvas-warm/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by filename or caption..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-canvas-border text-xs font-sans text-charcoal-900 focus:outline-none focus:border-[#07381E]"
            />
          </div>

          <div className="text-xs text-charcoal-500 font-sans flex items-center space-x-4 self-start sm:self-auto">
            <span>
              Showing <strong className="text-charcoal-900">{filteredAssets.length}</strong> assets
            </span>
            {selectedUrls.length > 0 && (
              <span className="text-[#07381E] font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {selectedUrls.length} selected
              </span>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="mx-6 mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-sans flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Main Grid View */}
        <div className="flex-1 overflow-y-auto p-6 bg-canvas-warm/30">
          {isLoading ? (
            <div className="h-full flex items-center justify-center space-x-2 text-charcoal-400 text-xs font-sans">
              <Loader2 className="w-5 h-5 animate-spin text-[#07381E]" />
              <span>Loading media repository...</span>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-8">
              <ImageIcon className="w-12 h-12 text-charcoal-300 stroke-[1.2]" />
              <p className="text-sm font-sans text-charcoal-600">No media assets match your search.</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-[#07381E] hover:underline"
              >
                Upload your first image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAssets.map((asset) => {
                const isSelected = selectedUrls.includes(asset.file_url);

                return (
                  <div
                    key={asset.id}
                    onClick={() => toggleSelect(asset)}
                    className={`group relative rounded-2xl bg-white border cursor-pointer overflow-hidden transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#07381E] ring-2 ring-[#07381E]/30 shadow-md bg-emerald-50/20'
                        : 'border-canvas-border hover:border-[#07381E]/40 hover:shadow-soft-sm'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-4/3 w-full bg-charcoal-100 overflow-hidden">
                      {asset.file_url ? (
                        <Image
                          src={encodeURI(asset.file_url)}
                          alt={asset.filename || 'Asset'}
                          fill
                          className="object-cover group-hover:scale-104 transition-transform duration-400"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />
                      ) : null}

                      {/* Selection Checkmark */}
                      <div
                        className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#07381E] text-white scale-100 shadow-md'
                            : 'bg-white/80 text-charcoal-400 opacity-0 group-hover:opacity-100 backdrop-blur-xs'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>

                      {/* Quick Preview Eye */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewAsset(asset);
                        }}
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Inspect particulars"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-2.5 text-left space-y-0.5 bg-white">
                      <span className="text-xs font-serif font-medium text-charcoal-950 block truncate">
                        {asset.filename || 'Untitled'}
                      </span>
                      <div className="flex items-center justify-between text-[10.5px] font-sans text-charcoal-400">
                        <span>{formatSize(asset.file_size)}</span>
                        <span className="uppercase">{(asset.file_type || 'image/webp').split('/').pop()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-canvas-border bg-white flex items-center justify-between shrink-0">
          <div className="text-xs font-sans text-charcoal-600">
            {selectedUrls.length > 0 ? (
              <span>
                Ready to insert <strong className="text-charcoal-900">{selectedUrls.length}</strong> asset(s)
              </span>
            ) : (
              <span className="text-charcoal-400">Click any image to select</span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-canvas-border text-charcoal-700 hover:bg-canvas-warm text-xs font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={selectedUrls.length === 0}
              onClick={handleConfirmSelect}
              className="px-6 py-2 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-colors shadow-soft-sm disabled:opacity-40"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>

      {/* Asset Inspection Lightbox Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 border border-canvas-border shadow-2xl text-left">
            <div className="flex items-start justify-between border-b border-canvas-border pb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#07381E]">
                  ASSET PARTICULARS
                </span>
                <h4 className="font-serif text-xl font-medium text-charcoal-950 truncate max-w-sm">
                  {previewAsset.filename}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewAsset(null)}
                className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Image Frame */}
            <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-charcoal-100 border border-canvas-border">
              {previewAsset.file_url ? (
                <Image
                  src={encodeURI(previewAsset.file_url)}
                  alt={previewAsset.filename || 'Preview'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              ) : null}
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-2.5 rounded-xl bg-canvas-warm space-y-0.5">
                <span className="text-charcoal-400 font-medium text-[10.5px] uppercase">File Size</span>
                <span className="font-semibold text-charcoal-900 block">{formatSize(previewAsset.file_size)}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-canvas-warm space-y-0.5">
                <span className="text-charcoal-400 font-medium text-[10.5px] uppercase">Format</span>
                <span className="font-semibold text-charcoal-900 block uppercase">{previewAsset.file_type}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-canvas-warm space-y-0.5 col-span-2">
                <span className="text-charcoal-400 font-medium text-[10.5px] uppercase">Direct URL</span>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="font-mono text-[11px] text-charcoal-700 truncate">{previewAsset.file_url}</span>
                  <button
                    type="button"
                    onClick={() => copyUrl(previewAsset.file_url, previewAsset.id)}
                    className="shrink-0 p-1 rounded hover:bg-white text-charcoal-600 transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === previewAsset.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-canvas-border">
              <button
                type="button"
                onClick={() => setDeleteTarget(previewAsset)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Asset</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleSelect(previewAsset);
                  setPreviewAsset(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#07381E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#052B17] transition-colors"
              >
                Select This Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Dialog */}
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
