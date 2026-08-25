import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const viewport: Viewport = {
  themeColor: '#08090D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Fikri Mulya Rachmat | Film Producer & Line Producer Portfolio',
  description: 'Official portfolio and bio hub of Fikri Mulya Rachmat. Film Producer, Line Producer, and Unit Production Manager with 30+ productions across short films, music videos, and commercial brand campaigns.',
  keywords: [
    'Fikri Mulya Rachmat',
    'Film Producer Jakarta',
    'Line Producer Indonesia',
    'Unit Production Manager',
    'SAE Institute Jakarta',
    'Filmmaker Portfolio',
    'Music Video Producer'
  ],
  authors: [{ name: 'Fikri Mulya Rachmat' }],
  openGraph: {
    title: 'Fikri Mulya Rachmat | Film Producer Portfolio',
    description: 'Explore filmography, short films, music videos, and commercial productions.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable} dark`}>
      <body className="bg-background text-gray-100 font-sans min-h-screen selection:bg-cinemaAmber/30 selection:text-amber-200">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
