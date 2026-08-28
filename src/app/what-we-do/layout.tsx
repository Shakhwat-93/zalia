import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Do | Zalia Properties Ltd',
  description:
    'Discover how Zalia Properties Ltd acquires, transforms, and creates quality UK residential homes through thoughtful architectural development.',
};

export default function WhatWeDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
