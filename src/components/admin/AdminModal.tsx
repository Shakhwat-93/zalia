'use client';

import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';

// Reference-counted body scroll lock to cleanly handle nested/stacked modals
let activeModalsCount = 0;
let originalBodyOverflow: string | null = null;

function lockBodyScroll() {
  activeModalsCount++;
  if (activeModalsCount === 1) {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
}

function unlockBodyScroll() {
  activeModalsCount = Math.max(0, activeModalsCount - 1);
  if (activeModalsCount === 0) {
    document.body.style.overflow = originalBodyOverflow || '';
    originalBodyOverflow = null;
  }
}

export type AdminModalMaxWidth =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full';

export interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: AdminModalMaxWidth;
  asForm?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  zIndex?: number;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
}

const maxWidthMap: Record<AdminModalMaxWidth, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
  '3xl': 'sm:max-w-3xl',
  '4xl': 'sm:max-w-4xl',
  '5xl': 'sm:max-w-5xl',
  full: 'sm:max-w-6xl',
};

export default function AdminModal({
  isOpen,
  onClose,
  title,
  description,
  eyebrow,
  headerAction,
  children,
  footer,
  maxWidth = 'lg',
  asForm = false,
  onSubmit,
  zIndex = 50,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
}: AdminModalProps) {
  const titleId = useId();

  // Manage body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return () => {
      unlockBodyScroll();
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const headerContent = (title || eyebrow || description || showCloseButton || headerAction) ? (
    <div
      className={`px-4 py-3 sm:px-6 sm:py-4 border-b border-canvas-border flex items-start justify-between gap-3 bg-white shrink-0 min-w-0 ${headerClassName}`}
    >
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#07381E] block mb-0.5 truncate">
            {eyebrow}
          </span>
        )}
        {title && (
          <div
            id={titleId}
            className="font-sans text-base sm:text-lg font-semibold text-charcoal-950 break-words"
          >
            {title}
          </div>
        )}
        {description && (
          <p className="text-xs text-charcoal-500 font-sans mt-0.5 break-words">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {headerAction}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-charcoal-400 hover:text-charcoal-950 hover:bg-canvas-warm transition-colors touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center -mr-1"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  ) : null;

  const bodyContent = (
    <div
      className={`flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 min-h-0 min-w-0 overscroll-contain text-left ${bodyClassName}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {children}
    </div>
  );

  const footerContent = footer ? (
    <div
      className={`px-4 py-3 sm:px-6 sm:py-4 border-t border-canvas-border bg-white shrink-0 min-w-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${footerClassName}`}
    >
      {footer}
    </div>
  ) : null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Shell Container */}
      <div
        className={`relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-canvas-border shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200
        w-[calc(100vw-24px)] max-h-[calc(100dvh-24px)] min-w-0 box-border
        ${maxWidthMap[maxWidth]}
        ${className}
        `}
      >
        {asForm ? (
          <form
            onSubmit={onSubmit}
            className="flex flex-col flex-1 min-h-0 overflow-hidden text-left"
          >
            {headerContent}
            {bodyContent}
            {footerContent}
          </form>
        ) : (
          <>
            {headerContent}
            {bodyContent}
            {footerContent}
          </>
        )}
      </div>
    </div>
  );
}
