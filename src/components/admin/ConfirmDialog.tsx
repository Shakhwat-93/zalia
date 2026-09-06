'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import AdminModal from './AdminModal';

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
  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onCancel}
      maxWidth="md"
      zIndex={70}
      title={
        <div className="flex items-center space-x-3">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${
              isDestructive ? 'bg-rose-50 text-rose-700' : 'bg-[#EBF2EE] text-[#07381E]'
            }`}
          >
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-sans text-base sm:text-lg font-semibold text-charcoal-950">
            {title}
          </span>
        </div>
      }
      footer={
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 w-full">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-canvas-border text-xs font-medium text-charcoal-700 hover:bg-canvas-warm transition-colors min-h-[44px] sm:min-h-0 flex items-center justify-center"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium text-white transition-all shadow-2xs disabled:opacity-50 min-h-[44px] sm:min-h-0 flex items-center justify-center ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#07381E] hover:bg-[#052B17]'
            }`}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      }
    >
      <p className="text-sm text-charcoal-600 font-sans leading-relaxed break-words">
        {message}
      </p>
    </AdminModal>
  );
}
