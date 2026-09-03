'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm Action',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07381E]/40 backdrop-blur-xs transition-opacity"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl bg-white border border-canvas-border p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 space-y-6 text-left">
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isDestructive ? 'bg-red-50 text-red-700' : 'bg-[#EBF2EE] text-[#07381E]'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950">
              {title}
            </h3>
          </div>

          <button
            onClick={onCancel}
            className="p-1 rounded-full text-charcoal-400 hover:text-charcoal-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-charcoal-600 font-sans leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-canvas-border text-xs font-sans font-semibold uppercase tracking-wider text-charcoal-700 hover:bg-canvas-warm transition-colors"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider text-white transition-all shadow-soft-sm disabled:opacity-50 ${
              isDestructive
                ? 'bg-red-700 hover:bg-red-800'
                : 'bg-[#07381E] hover:bg-[#052B17]'
            }`}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>

      </div>
    </div>
  );
}
