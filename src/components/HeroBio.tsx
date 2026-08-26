'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Play, ArrowDown } from 'lucide-react';

export default function HeroBio() {
  const { data } = usePortfolio();
  const { profile } = data;

  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-dark relative min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pb-16 overflow-hidden">
      
      {/* Full-bleed ambient video background (Autoplay muted loop) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter saturate-150 contrast-125"
          src="/assets/projects/puma-x-mclaren_aman-studio/The_new_PUMA_x_McLaren_Ra.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
      </div>

      {/* Top Identity bar */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C84B2F] animate-pulse" />
            <span className="t-mono text-xs text-[#F0ECE5] font-semibold tracking-wider uppercase">
              KIKI RACHMAT
            </span>
          </div>
          <span className="t-mono text-[10px] text-gray-400 tracking-[0.2em] uppercase">
            FILM PRODUCER & UPM
          </span>
        </div>
      </div>

      {/* Hero Core (Love & Money Massive Typography) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12 sm:py-20">
        <div className="space-y-8 max-w-5xl">
          <p className="t-label text-[#C84B2F] text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">
            FIKRI MULYA RACHMAT
          </p>
          
          <h1
            className="text-white font-display font-black uppercase leading-[0.9] tracking-tighter"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(3.2rem, 9.5vw, 7.8rem)',
            }}
          >
            Film Producer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
              & Creative Lead.
            </span>
          </h1>

          {/* Minimalist 1-sentence manifesto incorporating scale naturally */}
          <p className="text-gray-300 text-base sm:text-xl max-w-2xl font-sans leading-relaxed font-normal">
            Berpengalaman dalam 30+ produksi karya naratif, digital series, brand commercials, dan music videos di Indonesia. Mengelola logistik kreatif dari perancangan hingga final cut.
          </p>

          {/* Minimal Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={scrollToWorks}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#F0ECE5] hover:bg-white text-[#0A0A0A] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>Explore Selected Works</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {profile.contact?.showreelUrl && (
              <a
                href={profile.contact.showreelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/10"
              >
                <Play className="w-3 h-3 fill-current text-[#C84B2F]" />
                <span>Watch Full Reel</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom context strip */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/10 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            <span>DISCIPLINES: </span>
            <span className="text-gray-200">Producer · Line Producer · UPM · Art Director</span>
          </div>
          <div>
            <span>LOCATION: </span>
            <span className="text-gray-200">Jakarta & Depok, Indonesia</span>
          </div>
        </div>
      </div>

    </section>
  );
}
