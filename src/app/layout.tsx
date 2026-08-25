import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: '#050608',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Fikri Mulya Rachmat | Film Producer & Line Producer Portfolio',
  description: 'Official portfolio and production hub of Fikri Mulya Rachmat. Film Producer, Line Producer, and Unit Production Manager with 30+ productions across narrative short films, music videos, and commercial brand campaigns.',
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
    description: 'Explore filmography, narrative films, music videos, and commercial productions.',
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
    <html lang="id" className={`${inter.variable} ${cinzel.variable} ${mono.variable} dark`}>
      <body className="bg-background text-gray-100 font-sans min-h-screen selection:bg-cinemaAmber/30 selection:text-amber-200 antialiased overflow-x-hidden">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
