import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Approach • A Disciplined Architectural Philosophy | Zalia Properties Ltd',
  description:
    'Discover how Zalia Properties identifies, acquires, transforms, refines, and creates exceptional British residential homes.',
  openGraph: {
    title: 'Our Approach • Zalia Properties Ltd',
    description:
      'A disciplined five-stage methodology: Identify, Acquire, Transform, Refine, and Create.',
    url: 'https://zaliaproperties.com/approach',
    siteName: 'Zalia Properties Ltd',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function ApproachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
