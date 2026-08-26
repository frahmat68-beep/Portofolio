'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ProductionStill } from '@/types/portfolio';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StillsCarousel() {
  const { data } = usePortfolio();
  const { productionStills } = data;
  const [selectedStill, setSelectedStill] = useState<ProductionStill | null>(null);

  if (!productionStills || productionStills.length === 0) return null;

  // Split into 2 rows for an intense, dynamic dual-speed filmstrip
  const row1 = productionStills.slice(0, Math.ceil(productionStills.length / 2));
  const row2 = productionStills.slice(Math.ceil(productionStills.length / 2));

  return (
    <section className="section-light w-full py-20 sm:py-32 overflow-hidden border-t border-black/10" id="stills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">CINEMATOGRAPHY & SET ARCHIVE</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
            >
              Visual Vault
            </h2>
          </div>
          <p className="t-mono text-inkLight text-[11px]">
            {productionStills.length} FRAMES ARCHIVED
          </p>
        </div>
      </div>

      {/* Infinite Dual Track Marquee */}
      <div className="w-full space-y-4 sm:space-y-6">
        
        {/* Track 1: Leftward slide */}
        <div className="flex overflow-x-hidden group relative w-full select-none">
          <div className="flex gap-4 sm:gap-6 animate-marquee shrink-0 items-center group-hover:[animation-play-state:paused]">
            {row1.concat(row1).map((still, idx) => (
              <div
                key={`${still.id}-r1-${idx}`}
                onClick={() => setSelectedStill(still)}
                className="relative h-48 sm:h-64 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer shrink-0 bg-black/90 border border-black/10 group/card shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover/card:grayscale-0 group-hover/card:contrast-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <p className="text-white font-bold text-xs uppercase truncate" style={{ fontFamily: 'var(--font-syne)' }}>
                    {still.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Rightward / Reversed slide */}
        <div className="flex overflow-x-hidden group relative w-full select-none">
          <div className="flex gap-4 sm:gap-6 animate-marquee-reverse shrink-0 items-center group-hover:[animation-play-state:paused]">
            {row2.concat(row2).map((still, idx) => (
              <div
                key={`${still.id}-r2-${idx}`}
                onClick={() => setSelectedStill(still)}
                className="relative h-48 sm:h-64 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer shrink-0 bg-black/90 border border-black/10 group/card shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover/card:grayscale-0 group-hover/card:contrast-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <p className="text-white font-bold text-xs uppercase truncate" style={{ fontFamily: 'var(--font-syne)' }}>
                    {still.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedStill && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedStill(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStill(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/80 hover:bg-black text-white rounded-full transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedStill.imageUrl}
                alt={selectedStill.title}
                className="w-full max-h-[78vh] object-contain bg-black"
              />

              <div className="p-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="t-mono text-[#C84B2F] text-[10px] tracking-widest uppercase font-bold">
                    {selectedStill.project || 'PRODUCTION STILL'}
                  </span>
                  <h3 className="text-white font-display font-bold text-base sm:text-lg uppercase mt-0.5" style={{ fontFamily: 'var(--font-syne)' }}>
                    {selectedStill.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
