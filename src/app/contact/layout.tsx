import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact • Let’s Start A Conversation | Zalia Properties Ltd',
  description:
    'Enquire with the acquisitions and development team at Zalia Properties Ltd. Central London headquarters, Mayfair, London W1J.',
  openGraph: {
    title: 'Contact • Zalia Properties Ltd',
    description:
      'Direct enquiry channels for property acquisition, joint ventures, and residential development.',
    url: 'https://zaliaproperties.com/contact',
    siteName: 'Zalia Properties Ltd',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
