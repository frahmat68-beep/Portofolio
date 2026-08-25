'use client';

import React from 'react';
import HeroBio from '@/components/HeroBio';
import StatsBar from '@/components/StatsBar';
import BentoShowcase from '@/components/BentoShowcase';
import ServicesSection from '@/components/ServicesSection';
import BTSGallerySection from '@/components/BTSGallerySection';
import FilmographySection from '@/components/FilmographySection';
import ContactSection from '@/components/ContactSection';
import StickyMobileBar from '@/components/StickyMobileBar';
import CustomCinemaCursor from '@/components/CustomCinemaCursor';
import { usePortfolio } from '@/context/PortfolioContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { isLoading } = usePortfolio();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-cinemaAmber gap-3">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-xs font-mono tracking-widest uppercase font-semibold text-gray-400">Loading Slate...</span>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen cinematic-bg film-grain text-gray-100 selection:bg-cinemaAmber/30 selection:text-amber-200">
      {/* Interactive Custom Cinema Cursor for Desktop */}
      <CustomCinemaCursor />

      {/* Subtle Grid Ambient Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none -z-10" />

      {/* Main Container: Full width flexible container on Desktop & Mobile */}
      <div className="w-full flex flex-col min-h-screen">
        <HeroBio />
        <StatsBar />
        <BentoShowcase />
        <ServicesSection />
        <BTSGallerySection />
        <FilmographySection />
        <ContactSection />
        <StickyMobileBar />
      </div>
    </main>
  );
}
