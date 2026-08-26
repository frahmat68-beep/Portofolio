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
      
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(200,75,47,0.08),transparent_70%)] pointer-events-none" />

      {/* Top Identity bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C84B2F] animate-pulse" />
            <span className="t-mono text-xs text-[#F0ECE5] font-semibold tracking-wider">
              KIKI
            </span>
          </div>
          <span className="t-mono text-[10px] text-gray-400 tracking-[0.2em] uppercase">
            FILMMAKER & PRODUCER
          </span>
        </div>
      </div>

      {/* Hero Core (Love & Money Massive Typography) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="space-y-6 max-w-4xl">
          <p className="t-label text-[#C84B2F] text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">
            FIKRI MULYA RACHMAT
          </p>
          
          <h1
            className="text-white font-display font-black uppercase leading-[0.92] tracking-tighter"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(3rem, 9.5vw, 7.5rem)',
            }}
          >
            Film Producer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
              & Creative Lead.
            </span>
          </h1>

          {/* Minimalist 1-2 sentence manifesto ala L&M */}
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl font-sans leading-relaxed pt-2">
            Producing narrative short films, digital series, brand campaigns, and music videos across Indonesia. Managing high-stakes creative logistics from treatment to final cut.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={scrollToWorks}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F0ECE5] hover:bg-white text-[#0A0A0A] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-105"
            >
              <span>Explore Works</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            {profile.contact?.showreelUrl && (
              <a
                href={profile.contact.showreelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all border border-white/10"
              >
                <Play className="w-3 h-3 fill-current text-[#C84B2F]" />
                <span>Play Showreel</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom context log */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/10 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            <span>ROLES: </span>
            <span className="text-gray-200">Producer · Line Producer · UPM · Art Director</span>
          </div>
          <div>
            <span>BASED IN: </span>
            <span className="text-gray-200">Jakarta & Depok, Indonesia</span>
          </div>
        </div>
      </div>

    </section>
  );
}
