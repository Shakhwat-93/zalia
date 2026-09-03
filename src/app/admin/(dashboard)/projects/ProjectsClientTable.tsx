'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ExternalLink,
  Edit2,
  Copy,
  Trash2,
  Star,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Check,
  Building2,
  Plus
} from 'lucide-react';
import ResponsiveTable, { Column, TableAction } from '@/components/admin/ResponsiveTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  tag?: string;
  location: string;
  category: string;
  status_badge: string;
  description: string;
  short_description?: string;
  full_description?: string;
  image_url: string;
  hero_image_url?: string;
  before_image_url?: string;
  after_image_url?: string;
  featured: boolean;
  status: string;
  sort_order: number;
  gallery_images?: any[];
  before_after_sets?: any[];
  updated_at?: string;
}

export default function ProjectsClientTable({
  initialProjects,
}: {
  initialProjects: ProjectRecord[];
}) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<ProjectRecord | null>(null);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // 1. Move Project Up/Down
  const moveProject = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === projects.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newProjects = [...projects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIndex, 0, moved);

    const reordered = newProjects.map((p, idx) => ({
      ...p,
      sort_order: idx + 1,
    }));

    setProjects(reordered);
    setIsProcessing(true);

    try {
      const updates = reordered.map((p) =>
        supabase.from('projects').update({ sort_order: p.sort_order }).eq('id', p.id)
      );
      await Promise.all(updates);
      showNotification('Project catalog order updated.');
    } catch (err) {
      console.error('Failed to update project order:', err);
      alert('Error updating order.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Toggle Featured Status
  const toggleFeatured = async (project: ProjectRecord) => {
    const nextVal = !project.featured;
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, featured: nextVal } : p))
    );

    try {
      await supabase.from('projects').update({ featured: nextVal }).eq('id', project.id);
      showNotification(
        `"${project.title}" ${nextVal ? 'featured on homepage highlights' : 'removed from featured highlights'}.`
      );
    } catch (err) {
      console.error('Failed to update featured:', err);
    }
  };

  // 3. Toggle Publish / Unpublish Status
  const togglePublishStatus = async (project: ProjectRecord) => {
    const nextStatus = project.status === 'published' ? 'draft' : 'published';
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, status: nextStatus } : p))
    );

    try {
      await supabase.from('projects').update({ status: nextStatus }).eq('id', project.id);
      showNotification(`"${project.title}" is now ${nextStatus === 'published' ? 'Published' : 'Draft'}.`);
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // 4. Duplicate Project
  const handleDuplicate = async (project: ProjectRecord) => {
    setIsProcessing(true);
    const newSlug = `${project.slug}-copy-${Date.now().toString().slice(-4)}`;
    const newOrder = projects.length + 1;

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: `${project.title} (Copy)`,
            slug: newSlug,
            tag: project.tag,
            location: project.location,
            category: project.category,
            status_badge: project.status_badge,
            status: 'draft', // duplicated as draft
            description: project.description,
            short_description: project.short_description || project.description,
            full_description: project.full_description || project.description,
            image_url: project.image_url,
            hero_image_url: project.hero_image_url || project.image_url,
            before_image_url: project.before_image_url,
            after_image_url: project.after_image_url,
            featured: false,
            sort_order: newOrder,
            gallery_images: project.gallery_images || [],
            before_after_sets: project.before_after_sets || [],
          },
        ])
        .select('*')
        .single();

      if (error) throw error;
      if (data) {
        setProjects((prev) => [...prev, data]);
        showNotification(`Duplicated "${project.title}" as draft.`);
      }
    } catch (err: any) {
      console.error('Failed to duplicate project:', err);
      alert('Error duplicating project: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  // 5. Delete Project
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsProcessing(true);

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', deleteTarget.id);

      if (error) throw error;

      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      showNotification(`Deleted "${deleteTarget.title}".`);
      setDeleteTarget(null);
    } catch (err: any) {
      console.error('Failed to delete project:', err);
      alert('Error deleting project: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const filtered = projects.filter((p) => {
    const matchFilter =
      filter === 'ALL' ||
      p.status_badge.toUpperCase() === filter ||
      p.status.toUpperCase() === filter;

    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const columns: Column<ProjectRecord>[] = [
    {
      key: 'sort_order',
      header: 'Order',
      priority: 'high',
      render: (proj) => {
        const index = projects.findIndex((p) => p.id === proj.id);
        return (
          <div className="flex items-center space-x-1">
            <button
              type="button"
              disabled={index === 0 || isProcessing}
              onClick={() => moveProject(index, 'up')}
              className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20 transition-colors"
              title="Move up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-semibold text-charcoal-600 px-0.5">
              #{proj.sort_order}
            </span>
            <button
              type="button"
              disabled={index === projects.length - 1 || isProcessing}
              onClick={() => moveProject(index, 'down')}
              className="p-1 rounded text-charcoal-400 hover:text-charcoal-900 disabled:opacity-20 transition-colors"
              title="Move down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    },
    {
      key: 'title',
      header: 'Project Particulars',
      priority: 'high',
      render: (proj) => (
        <div className="flex items-center space-x-3.5 py-1">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-charcoal-100 shrink-0 border border-canvas-border shadow-2xs">
            <Image
              src={proj.image_url}
              alt={proj.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <Link
              href={`/admin/projects/${proj.id}`}
              className="font-serif font-semibold text-charcoal-950 block truncate text-sm sm:text-[15px] hover:text-emerald-brand transition-colors"
            >
              {proj.title}
            </Link>
            <div className="flex items-center space-x-2 text-[11px] font-sans text-charcoal-500 truncate">
              <span>{proj.location}</span>
              <span>·</span>
              <code className="text-[10px] font-mono text-[#07381E] bg-[#EBF2EE] px-1.5 py-0.2 rounded">
                /projects/{proj.slug}
              </code>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'featured',
      header: 'Featured',
      priority: 'high',
      render: (proj) => (
        <button
          type="button"
          onClick={() => toggleFeatured(proj)}
          className={`p-1.5 rounded-lg border transition-colors ${
            proj.featured
              ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/30'
              : 'bg-white text-stone-300 border-canvas-border hover:text-charcoal-700'
          }`}
          title={proj.featured ? 'Featured on homepage' : 'Not featured on homepage'}
        >
          <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-[#07381E]' : ''}`} />
        </button>
      ),
    },
    {
      key: 'status_badge',
      header: 'Dev Status',
      priority: 'medium',
      render: (proj) => <StatusBadge status={proj.status_badge} />,
    },
    {
      key: 'status',
      header: 'Visibility',
      priority: 'medium',
      render: (proj) => (
        <button
          type="button"
          onClick={() => togglePublishStatus(proj)}
          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            proj.status === 'published'
              ? 'bg-[#EBF2EE] text-[#07381E] border-[#07381E]/20'
              : 'bg-stone-100 text-stone-500 border-stone-200'
          }`}
        >
          {proj.status === 'published' ? (
            <>
              <Eye className="w-3 h-3" />
              <span>Published</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              <span>Draft</span>
            </>
          )}
        </button>
      ),
    },
    {
      key: 'updated_at',
      header: 'Updated',
      priority: 'low',
      render: (proj) => {
        const d = proj.updated_at ? new Date(proj.updated_at) : new Date();
        return (
          <span className="text-xs text-charcoal-500 font-sans">
            {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
        );
      },
    },
  ];

  const actions: TableAction<ProjectRecord>[] = [
    {
      label: 'Edit Project',
      icon: Edit2,
      onClick: (proj) => {
        router.push(`/admin/projects/${proj.id}`);
      },
    },
    {
      label: 'View Public Case Study',
      icon: ExternalLink,
      onClick: (proj) => {
        window.open(`/projects/${proj.slug}`, '_blank');
      },
    },
    {
      label: 'Duplicate Project',
      icon: Copy,
      onClick: (proj) => {
        handleDuplicate(proj);
      },
    },
    {
      label: 'Delete Project',
      icon: Trash2,
      onClick: (proj) => {
        setDeleteTarget(proj);
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Status Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans font-medium flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <ResponsiveTable
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search projects by title, slug, location, or category..."
        filterOptions={[
          { label: 'All Projects', value: 'ALL' },
          { label: 'Completed', value: 'COMPLETED' },
          { label: 'Current Developments', value: 'CURRENT' },
          { label: 'In Development', value: 'IN DEVELOPMENT' },
          { label: 'Published Only', value: 'PUBLISHED' },
          { label: 'Drafts Only', value: 'DRAFT' },
        ]}
        activeFilter={filter}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        actions={actions}
        pageSize={8}
        emptyMessage="No projects match your active search or filter criteria."
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All case study data and gallery assets will be removed.`}
        confirmLabel="Delete Project"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isProcessing}
      />
    </div>
  );
}
