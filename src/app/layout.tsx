import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://zaliaproperties.com'),
  title: 'Zalia Properties Ltd | UK Residential Property Acquisition & Transformation',
  description:
    'We identify residential properties with potential, transform them through thoughtful development, and create quality homes designed for modern living in the UK.',
  keywords: [
    'Zalia Properties',
    'UK Residential Property',
    'Property Acquisition',
    'Property Transformation',
    'Architectural Renovation',
    'London Real Estate Development',
    'Luxury UK Homes',
  ],
  authors: [{ name: 'Zalia Properties Ltd' }],
  creator: 'Zalia Properties Ltd',
  publisher: 'Zalia Properties Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Zalia Properties Ltd | Invest • Develop • Transform',
    description:
      'We identify residential properties with potential, transform them through thoughtful development, and create quality homes designed for modern living.',
    url: 'https://zaliaproperties.com',
    siteName: 'Zalia Properties Ltd',
    images: [
      {
        url: '/images/hero-model.png',
        width: 1536,
        height: 1024,
        alt: 'Zalia Properties Architectural Residence',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-canvas text-charcoal-900 antialiased selection:bg-emerald-brand selection:text-white min-h-screen relative">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}