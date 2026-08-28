import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects | Zalia Properties Ltd',
  description:
    'Explore the architectural portfolio and residential property transformations developed by Zalia Properties Ltd across prime UK regions.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
