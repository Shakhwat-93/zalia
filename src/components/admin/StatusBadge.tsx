import React from 'react';

export type StatusType = 
  | 'published' 
  | 'draft' 
  | 'archived' 
  | 'COMPLETED' 
  | 'CURRENT' 
  | 'IN DEVELOPMENT' 
  | 'new' 
  | 'reviewed' 
  | 'contacted';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = status?.toLowerCase() || 'draft';

  let badgeStyles = 'bg-gray-100 text-gray-700 border-gray-200';
  let dotColor = 'bg-gray-400';
  let label = status;

  switch (normalized) {
    case 'published':
    case 'completed':
      badgeStyles = 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20';
      dotColor = 'bg-[#07381E]';
      label = normalized === 'completed' ? 'Completed' : 'Published';
      break;

    case 'current':
      badgeStyles = 'bg-emerald-50 text-emerald-900 border-emerald-300';
      dotColor = 'bg-emerald-600 animate-pulse';
      label = 'Active Project';
      break;

    case 'draft':
    case 'in development':
      badgeStyles = 'bg-amber-50 text-amber-900 border-amber-200';
      dotColor = 'bg-amber-500';
      label = normalized === 'in development' ? 'In Development' : 'Draft';
      break;

    case 'new':
      badgeStyles = 'bg-emerald-100 text-[#07381E] border-[#07381E]/30 font-bold';
      dotColor = 'bg-emerald-600 animate-ping';
      label = 'New Enquiry';
      break;

    case 'reviewed':
      badgeStyles = 'bg-blue-50 text-blue-900 border-blue-200';
      dotColor = 'bg-blue-500';
      label = 'Reviewed';
      break;

    case 'contacted':
      badgeStyles = 'bg-purple-50 text-purple-900 border-purple-200';
      dotColor = 'bg-purple-500';
      label = 'Contacted';
      break;

    case 'archived':
      badgeStyles = 'bg-stone-100 text-stone-600 border-stone-200';
      dotColor = 'bg-stone-400';
      label = 'Archived';
      break;
  }

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider border shadow-2xs select-none ${badgeStyles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
}
