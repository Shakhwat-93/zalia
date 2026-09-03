'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Search,
  Eye,
  Edit2,
  Trash2
} from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  priority?: 'high' | 'medium' | 'low'; // high = mobile visible, low = desktop only
}

export interface TableAction<T> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (item: T) => void;
  variant?: 'default' | 'danger';
}

interface ResponsiveTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  filterOptions?: { label: string; value: string }[];
  activeFilter?: string;
  onFilterChange?: (val: string) => void;
  onSearchChange?: (val: string) => void;
  actions?: TableAction<T>[];
  onRowClick?: (item: T) => void;
  pageSize?: number;
  emptyMessage?: string;
}

export default function ResponsiveTable<T>({
  columns,
  data,
  keyExtractor,
  searchPlaceholder = 'Filter items...',
  filterOptions,
  activeFilter,
  onFilterChange,
  onSearchChange,
  actions,
  onRowClick,
  pageSize = 10,
  emptyMessage = 'No records found in this view.',
}: ResponsiveTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map(keyExtractor)));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  return (
    <div className="bg-white border border-canvas-border rounded-2xl sm:rounded-3xl shadow-soft-sm overflow-hidden select-none">
      
      {/* 1. Table Toolbar matching reference image */}
      <div className="p-4 sm:p-5 border-b border-canvas-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
        
        {/* Left: Filter Pills & Search */}
        <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
          {filterOptions && onFilterChange && (
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-canvas-warm border border-canvas-border text-xs">
              <Filter className="w-3.5 h-3.5 text-charcoal-400 ml-1.5" />
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterChange(opt.value);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-sans font-medium transition-colors ${
                    activeFilter === opt.value
                      ? 'bg-white text-[#07381E] shadow-2xs font-semibold'
                      : 'text-charcoal-600 hover:text-charcoal-950'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {onSearchChange && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal-400 pointer-events-none" />
              <input
                type="text"
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-canvas-warm border border-canvas-border text-xs font-sans text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:bg-white focus:border-[#07381E]"
              />
            </div>
          )}
        </div>

        {/* Right: Selected Counter / Batch Actions */}
        {selectedIds.size > 0 && (
          <div className="flex items-center space-x-2 text-xs font-sans text-charcoal-600 animate-in fade-in duration-200">
            <span className="font-semibold text-[#07381E]">{selectedIds.size} selected</span>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-charcoal-400 hover:text-charcoal-950 underline"
            >
              Clear
            </button>
          </div>
        )}

      </div>

      {/* 2. Responsive Table View (Strictly contained, no horizontal page overflow) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          
          {/* Table Head */}
          <thead>
            <tr className="border-b border-canvas-border bg-[#F7F8F6]/60 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-charcoal-500">
              <th className="w-10 px-4 py-3.5 text-center">
                <input
                  type="checkbox"
                  checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                  onChange={toggleSelectAll}
                  className="rounded border-canvas-border text-[#07381E] focus:ring-[#07381E] cursor-pointer"
                />
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3.5 font-medium ${col.className || ''} ${
                    col.priority === 'low' ? 'hidden lg:table-cell' : ''
                  } ${col.priority === 'medium' ? 'hidden sm:table-cell' : ''}`}
                >
                  {col.header}
                </th>
              ))}

              {actions && actions.length > 0 && (
                <th className="px-4 py-3.5 text-right w-24">Actions</th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-canvas-border text-xs sm:text-sm font-sans text-charcoal-800">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="py-12 text-center text-charcoal-400">
                  <p className="text-sm">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => {
                const id = keyExtractor(item);
                const isSelected = selectedIds.has(id);
                const isActionOpen = openActionId === id;

                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`transition-colors group ${
                      onRowClick ? 'cursor-pointer' : ''
                    } ${
                      isSelected
                        ? 'bg-[#EBF2EE]/60 hover:bg-[#EBF2EE]'
                        : 'hover:bg-[#F7F8F6]/80'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="w-10 px-4 py-3.5 text-center" onClick={(e) => toggleSelectRow(id, e)}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-canvas-border text-[#07381E] focus:ring-[#07381E] cursor-pointer"
                      />
                    </td>

                    {/* Columns */}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3.5 ${col.className || ''} ${
                          col.priority === 'low' ? 'hidden lg:table-cell' : ''
                        } ${col.priority === 'medium' ? 'hidden sm:table-cell' : ''}`}
                      >
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </td>
                    ))}

                    {/* Actions Menu */}
                    {actions && actions.length > 0 && (
                      <td
                        className="px-4 py-3.5 text-right relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end space-x-1">
                          {/* Three-dots menu trigger */}
                          <button
                            type="button"
                            onClick={() => setOpenActionId(isActionOpen ? null : id)}
                            className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-900 hover:bg-canvas-warm transition-colors"
                            aria-label="Row Actions"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Floating Action Dropdown Menu */}
                        {isActionOpen && (
                          <div
                            onMouseLeave={() => setOpenActionId(null)}
                            className="absolute right-4 top-10 w-44 bg-white border border-canvas-border rounded-xl shadow-soft-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150 text-left"
                          >
                            {actions.map((act, actIdx) => {
                              const Icon = act.icon;
                              return (
                                <button
                                  key={actIdx}
                                  type="button"
                                  onClick={() => {
                                    setOpenActionId(null);
                                    act.onClick(item);
                                  }}
                                  className={`w-full px-3.5 py-2 text-xs font-sans flex items-center space-x-2.5 transition-colors ${
                                    act.variant === 'danger'
                                      ? 'text-red-700 hover:bg-red-50'
                                      : 'text-charcoal-700 hover:text-charcoal-950 hover:bg-canvas-warm'
                                  }`}
                                >
                                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />}
                                  <span>{act.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

      {/* 3. Pagination Footer matching reference image */}
      {totalItems > 0 && (
        <div className="p-4 sm:px-6 border-t border-canvas-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-500 font-sans bg-white">
          
          <div>
            Showing <span className="font-semibold text-charcoal-900">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-charcoal-900">
              {Math.min(startIndex + pageSize, totalItems)}
            </span>{' '}
            of <span className="font-semibold text-charcoal-900">{totalItems}</span> records
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-canvas-border hover:bg-canvas-warm text-charcoal-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-lg bg-canvas-warm border border-canvas-border text-charcoal-900 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-canvas-border hover:bg-canvas-warm text-charcoal-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
