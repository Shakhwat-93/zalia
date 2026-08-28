import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Zalia Properties Ltd',
  description:
    'Zalia Properties Ltd is a UK residential property acquisition, renovation and development company focused on thoughtful transformation and enduring quality.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
