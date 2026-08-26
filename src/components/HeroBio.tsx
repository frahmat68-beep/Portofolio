'use client';

import React from 'react';
import { ArrowDown, Film, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroBio() {
  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-dark relative min-h-[90svh] md:min-h-[95vh] flex flex-col justify-between pt-12 sm:pt-16 pb-8 sm:pb-12 overflow-hidden w-full">
      
      {/* Full-bleed ambient video background with smooth overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter contrast-125 scale-105"
          src="/assets/projects/puma-x-mclaren-aman-studio/The_new_PUMA_x_McLaren_Ra.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
      </div>

      {/* Top Bar: Minimal Identity */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 sm:pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C84B2F]" />
            <span className="font-mono text-xs sm:text-sm text-[#F0ECE5] font-bold tracking-widest uppercase">
              FIKRI MULYA RACHMAT
            </span>
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-gray-400 tracking-[0.2em] uppercase">
            PRODUCER · LINE PRODUCER · UPM
          </span>
        </div>
      </div>

      {/* Hero Core Typography ala Love & Money (Fluid Responsive Scaling) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-10 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 sm:space-y-8 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C84B2F] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h1
            className="text-white font-display font-black uppercase leading-[0.92] sm:leading-[0.88] tracking-tighter"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)',
            }}
          >
            Film Producer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
              & Creative Lead.
            </span>
          </h1>

          {/* Minimal 1-sentence manifesto */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl font-sans leading-relaxed font-normal">
            Specializing in narrative film productions, digital series, commercial campaigns, and music videos. Managing end-to-end creative logistics from pre-production to delivery.
          </p>
        </motion.div>
      </div>

      {/* Bottom Context Strip & Minimal Scroll Action */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-white/10 pt-4 sm:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-gray-400">
          <div>
            <span className="text-gray-500">BASE: </span>
            <span className="text-gray-200 font-semibold">Jakarta & Depok, Indonesia</span>
          </div>

          <button
            onClick={scrollToWorks}
            className="inline-flex items-center gap-2 text-white hover:text-[#C84B2F] active:scale-95 transition-all uppercase font-bold tracking-widest text-[10px] sm:text-xs group w-fit"
          >
            <span>EXPLORE PRODUCTIONS</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

    </section>
  );
}
