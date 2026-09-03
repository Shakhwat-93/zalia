import React from 'react';
import Link from 'next/link';
import { Plus, Download, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ActionButton {
  label: string;
  href?: string;
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
  countLabel = 'total items',
  breadcrumbs,
  primaryAction,
  secondaryAction,
}: PageHeaderProps) {
  return (
    <div className="space-y-4 pb-2">
      {/* 1. Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-charcoal-500 font-sans">
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
                <span className="text-charcoal-900 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* 2. Main Title Row + Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left: Title & Count Badge */}
        <div className="space-y-1 text-left">
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-charcoal-950 leading-tight">
              {title}
            </h1>

            {typeof totalCount === 'number' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF2EE] text-[#07381E] text-xs font-sans font-semibold border border-[#07381E]/15">
                Total: {totalCount} {countLabel}
              </span>
            )}
          </div>

          {description && (
            <p className="text-xs sm:text-sm text-charcoal-500 font-sans leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Right: Actions Toolbar (Matching Reference) */}
        {(primaryAction || secondaryAction) && (
          <div className="flex items-center space-x-2.5 shrink-0 pt-1 sm:pt-0">
            
            {/* Secondary Action */}
            {secondaryAction && secondaryAction.href && (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-canvas-border bg-white hover:bg-canvas-warm text-charcoal-700 text-xs font-sans font-semibold uppercase tracking-wider transition-colors shadow-2xs"
              >
                {secondaryAction.icon ? (
                  secondaryAction.icon
                ) : (
                  <Download className="w-3.5 h-3.5 text-charcoal-500" />
                )}
                <span>{secondaryAction.label}</span>
              </Link>
            )}

            {/* Primary Action */}
            {primaryAction && primaryAction.href && (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center space-x-2 px-4.5 py-2.5 rounded-xl bg-[#07381E] hover:bg-[#052B17] text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-soft-sm hover:shadow-soft-md"
              >
                {primaryAction.icon ? (
                  primaryAction.icon
                ) : (
                  <Plus className="w-4 h-4 text-white" />
                )}
                <span>{primaryAction.label}</span>
              </Link>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
