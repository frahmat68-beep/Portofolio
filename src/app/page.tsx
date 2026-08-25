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
import { usePortfolio } from '@/context/PortfolioContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { isLoading } = usePortfolio();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-cinemaAmber gap-3">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-xs tracking-widest uppercase font-semibold text-gray-400">Loading Portfolio...</span>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen cinematic-bg text-gray-100 selection:bg-cinemaAmber/30 selection:text-amber-200">
      {/* Subtle Grid Ambient Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      {/* Main Container tailored for Mobile-First & Desktop */}
      <div className="w-full max-w-2xl mx-auto flex flex-col min-h-screen">
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
