import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team • Leadership & Architectural Stewardship | Zalia Properties Ltd',
  description:
    'Meet the directors and project leads behind Zalia Properties Ltd — UK residential property acquisition, renovation, and bespoke development.',
  openGraph: {
    title: 'Our Team • Zalia Properties Ltd',
    description:
      'The multidisciplinary leaders behind Zalia Properties.',
    url: 'https://zaliaproperties.com/team',
    siteName: 'Zalia Properties Ltd',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
