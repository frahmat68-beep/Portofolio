'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroBio() {
  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-dark relative min-h-[92vh] flex flex-col justify-between pt-16 pb-12 overflow-hidden w-full">
      
      {/* Full-bleed ambient video background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter contrast-125"
          src="/assets/projects/puma-x-mclaren-aman-studio/The_new_PUMA_x_McLaren_Ra.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
      </div>

      {/* Top Bar: Minimal Identity */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="t-mono text-xs text-[#F0ECE5] font-bold tracking-widest uppercase">
            FIKRI MULYA RACHMAT
          </span>
          <span className="t-mono text-[10px] text-gray-400 tracking-[0.2em] uppercase">
            PRODUCER · LINE PRODUCER · UPM
          </span>
        </div>
      </div>

      {/* Hero Core Typography ala Love & Money */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-16 sm:py-24">
        <div className="space-y-8 max-w-5xl">
          <p className="t-label text-[#C84B2F] text-xs tracking-[0.3em] uppercase font-bold">
            PORTFOLIO SHOWCASE
          </p>
          
          <h1
            className="text-white font-display font-black uppercase leading-[0.88] tracking-tighter"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(3.2rem, 9.5vw, 7.8rem)',
            }}
          >
            Film Producer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500">
              & Creative Lead.
            </span>
          </h1>

          {/* Minimal 1-sentence manifesto */}
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl font-sans leading-relaxed font-normal">
            Specializing in narrative film productions, digital series, commercial campaigns, and music videos. Managing creative logistics from pre-production to delivery.
          </p>
        </div>
      </div>

      {/* Bottom context strip & minimal scroll action */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/10 pt-6">
        <div className="flex items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            <span className="text-gray-500">BASED IN: </span>
            <span className="text-gray-200">Jakarta & Depok, ID</span>
          </div>

          <button
            onClick={scrollToWorks}
            className="inline-flex items-center gap-2 text-white hover:text-[#C84B2F] transition-colors uppercase font-bold tracking-widest text-[10px]"
          >
            <span>EXPLORE WORKS</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

    </section>
  );
}
