import type { Metadata } from 'next';
import { FEATURED_PROJECTS_CONTENT } from '@/data/content';

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export function generateMetadata({ params }: LayoutProps): Metadata {
  const project = FEATURED_PROJECTS_CONTENT.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  if (!project) {
    return {
      title: 'Project Case Study | Zalia Properties Ltd',
      description: 'Architectural residential development case study by Zalia Properties Ltd.',
    };
  }

  return {
    title: `${project.title} | Zalia Properties Ltd`,
    description: `${project.title} (${project.location}) — ${project.description}`,
    openGraph: {
      title: `${project.title} | Zalia Properties Ltd`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
