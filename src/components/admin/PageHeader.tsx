import React from 'react';
import Link from 'next/link';
import { Plus, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface PageHeaderProps {
  title: string;
  description?: string;
  totalCount?: number;
  countLabel?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
}

export default function PageHeader({
  title,
  description,
  totalCount,
  countLabel = 'items',
  breadcrumbs,
  primaryAction,
  secondaryAction,
}: PageHeaderProps) {
  return (
    <div className="space-y-3 pb-2 text-left">
      {/* 1. Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-charcoal-400 font-sans">
          <Link href="/admin/dashboard" className="hover:text-charcoal-900 transition-colors">
            Admin
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-charcoal-300 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-charcoal-900 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-charcoal-800 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* 2. Main Title Row + Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Title & Count Badge */}
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
            <h1 className="font-sans text-xl sm:text-2xl font-semibold text-charcoal-900 tracking-tight">
              {title}
            </h1>

            {typeof totalCount === 'number' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-neutral-100 text-charcoal-600 text-xs font-medium">
                {totalCount} {countLabel}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm text-charcoal-500 font-sans">
              {description}
            </p>
          )}
        </div>

        {/* Right: Actions Toolbar */}
        {(primaryAction || secondaryAction) && (
          <div className="flex items-center space-x-2 shrink-0 pt-1 sm:pt-0">
            {secondaryAction && (
              secondaryAction.href ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-canvas-border bg-white hover:bg-neutral-50 text-charcoal-700 text-sm font-sans font-medium transition-colors"
                >
                  {secondaryAction.icon}
                  <span>{secondaryAction.label}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg border border-canvas-border bg-white hover:bg-neutral-50 text-charcoal-700 text-sm font-sans font-medium transition-colors"
                >
                  {secondaryAction.icon}
                  <span>{secondaryAction.label}</span>
                </button>
              )
            )}

            {primaryAction && (
              primaryAction.href ? (
                <Link
                  href={primaryAction.href}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-sm font-sans font-medium transition-colors shadow-xs"
                >
                  {primaryAction.icon || <Plus className="w-4 h-4 text-white" />}
                  <span>{primaryAction.label}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#07381E] hover:bg-[#052B17] text-white text-sm font-sans font-medium transition-colors shadow-xs"
                >
                  {primaryAction.icon || <Plus className="w-4 h-4 text-white" />}
                  <span>{primaryAction.label}</span>
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
