'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="p-12 sm:p-16 text-center rounded-3xl bg-white border border-canvas-border shadow-soft-sm space-y-4 max-w-lg mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-[#EBF2EE] text-[#07381E] flex items-center justify-center mx-auto shadow-2xs">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-sans text-lg font-semibold text-charcoal-950">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-500 font-sans leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {actionLabel && (
        <div className="pt-2">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-medium transition-all shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{actionLabel}</span>
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-medium transition-all shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{actionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
