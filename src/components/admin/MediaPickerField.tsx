'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, UploadCloud, X } from 'lucide-react';
import MediaLibraryModal, { MediaAsset } from './MediaLibraryModal';

interface MediaPickerFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  placeholder?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  required?: boolean;
}

export default function MediaPickerField({
  label,
  value,
  onChange,
  description,
  placeholder = '/images/...',
  aspectRatio = 'landscape',
  required = false,
}: MediaPickerFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[4/5] w-20'
      : aspectRatio === 'square'
      ? 'aspect-square w-20'
      : 'aspect-[16/10] w-28';

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 block">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {description && (
          <span className="text-[11px] text-charcoal-400 font-sans">{description}</span>
        )}
      </div>

      <div className="flex items-start space-x-3.5 p-3 rounded-2xl bg-canvas-warm/70 border border-canvas-border hover:border-[#07381E]/30 transition-colors">
        {/* Thumbnail Preview or Placeholder */}
        <div
          onClick={() => setIsModalOpen(true)}
          className={`relative ${aspectClass} rounded-xl bg-charcoal-100 border border-canvas-border overflow-hidden shrink-0 cursor-pointer group flex items-center justify-center`}
          title="Click to change image via Media Library"
        >
          {value ? (
            <>
              <Image
                src={encodeURI(value)}
                alt="Selected asset"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="120px"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-sans font-semibold">
                Change
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 text-charcoal-400 group-hover:text-[#07381E]">
              <ImageIcon className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-semibold uppercase">Choose</span>
            </div>
          )}
        </div>

        {/* Input & Action */}
        <div className="flex-1 space-y-2 min-w-0">
          <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-xl bg-white border border-canvas-border text-charcoal-900 font-mono text-xs focus:outline-none focus:border-[#07381E]"
          />

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-[11px] font-sans font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Select from Media Library</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1.5 rounded-lg text-charcoal-400 hover:text-rose-600 hover:bg-white text-[11px] transition-colors"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <MediaLibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(url) => {
          onChange(url);
          setIsModalOpen(false);
        }}
        currentSelectedUrl={value}
        title={`Select Asset: ${label}`}
      />
    </div>
  );
}
