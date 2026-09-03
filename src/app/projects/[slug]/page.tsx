import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';
import ProjectDetailClient from './ProjectDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  const { slug } = params;

  try {
    const { data: project } = await supabase
      .from('projects')
      .select('title, short_description, description, seo_title, seo_description')
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (project) {
      return {
        title: project.seo_title || `${project.title} | Zalia Properties Ltd`,
        description: project.seo_description || project.short_description || project.description,
      };
    }
  } catch {
    // fallback
  }

  const staticProj = FEATURED_PROJECTS_CONTENT.find((p) => p.slug === slug || p.id === slug);
  if (staticProj) {
    return {
      title: `${staticProj.title} | Zalia Properties Ltd`,
      description: staticProj.description,
    };
  }

  return {
    title: 'Architectural Case Study | Zalia Properties Ltd',
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient();
  const { slug } = params;

  let project: any = null;
  let nextProject: any = null;

  try {
    // 1. Fetch current project from Supabase
    const { data: dbProject } = await supabase
      .from('projects')
      .select('*')
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (dbProject) {
      project = dbProject;

      // 2. Fetch all published projects to compute nextProject
      const { data: allProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      if (allProjects && allProjects.length > 0) {
        const currentIndex = allProjects.findIndex((p) => p.id === dbProject.id);
        const nextIndex = (currentIndex + 1) % allProjects.length;
        nextProject = allProjects[nextIndex];
      }
    }
  } catch (err) {
    console.error('Failed to query project from database:', err);
  }

  // Fallback to static content if not found in database
  if (!project) {
    const staticIndex = FEATURED_PROJECTS_CONTENT.findIndex(
      (p) => p.slug === slug || p.id === slug
    );
    if (staticIndex !== -1) {
      project = FEATURED_PROJECTS_CONTENT[staticIndex];
      nextProject =
        FEATURED_PROJECTS_CONTENT[(staticIndex + 1) % FEATURED_PROJECTS_CONTENT.length];
    }
  }

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} nextProject={nextProject} />;
}
