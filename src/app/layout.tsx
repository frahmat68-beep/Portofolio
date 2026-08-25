import type { Metadata, Viewport } from 'next';
import { Syne, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Fikri Mulya Rachmat | Film Producer & Line Producer Portfolio',
  description: 'Official portfolio of Fikri Mulya Rachmat — Film Producer, Line Producer, and UPM with 30+ productions spanning narrative shorts, music videos, and commercial brand campaigns across Indonesia.',
  keywords: [
    'Fikri Mulya Rachmat', 'Kiki Rachmat',
    'Film Producer Jakarta', 'Line Producer Indonesia',
    'Unit Production Manager', 'SAE Institute Jakarta',
    'Filmmaker Portfolio', 'Music Video Producer',
  ],
  authors: [{ name: 'Fikri Mulya Rachmat' }],
  openGraph: {
    title: 'Fikri Mulya Rachmat | Film Producer Portfolio',
    description: 'Filmography, narrative films, music videos, and commercial productions.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-gray-100 font-sans min-h-screen antialiased overflow-x-hidden cursor-none">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
