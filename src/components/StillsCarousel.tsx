'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ProductionStill } from '@/types/portfolio';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StillsCarousel() {
  const { data } = usePortfolio();
  const { productionStills } = data;
  const [selectedStill, setSelectedStill] = useState<ProductionStill | null>(null);

  if (!productionStills || productionStills.length === 0) return null;

  const row1 = productionStills.slice(0, Math.ceil(productionStills.length / 2));
  const row2 = productionStills.slice(Math.ceil(productionStills.length / 2));

  return (
    <section className="section-light w-full py-16 sm:py-24 md:py-32 overflow-hidden border-t border-black/10 max-w-full" id="stills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 w-full">
        
        {/* Section Header with Bi-Directional Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-8"
        >
          <div>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Visual Vault
            </h2>
          </div>
          <p className="font-mono text-inkLight text-xs sm:text-sm">
            <strong className="text-ink font-bold">{productionStills.length}</strong> FRAMES
          </p>
        </motion.div>
      </div>

      {/* Infinite Dual Track Marquee with Bi-Directional Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-full space-y-3 sm:space-y-5 overflow-hidden select-none"
      >
        
        {/* Track 1: Leftward slide */}
        <div className="flex overflow-x-hidden group relative w-full max-w-full">
          <div className="flex gap-3 sm:gap-5 animate-marquee shrink-0 items-center group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
            {row1.concat(row1).map((still, idx) => (
              <div
                key={`${still.id}-r1-${idx}`}
                onClick={() => setSelectedStill(still)}
                className="relative h-28 xs:h-36 sm:h-44 md:h-52 lg:h-60 aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shrink-0 bg-black/90 border border-black/10 group/card shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.025]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover/card:grayscale-0 group-hover/card:contrast-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-end">
                  <p
                    className="text-white font-bold text-[11px] sm:text-xs uppercase truncate"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {still.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Rightward / Reversed slide */}
        <div className="flex overflow-x-hidden group relative w-full max-w-full">
          <div className="flex gap-3 sm:gap-5 animate-marquee-reverse shrink-0 items-center group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
            {row2.concat(row2).map((still, idx) => (
              <div
                key={`${still.id}-r2-${idx}`}
                onClick={() => setSelectedStill(still)}
                className="relative h-28 xs:h-36 sm:h-44 md:h-52 lg:h-60 aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shrink-0 bg-black/90 border border-black/10 group/card shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.025]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={still.imageUrl}
                  alt={still.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover/card:grayscale-0 group-hover/card:contrast-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-end">
                  <p
                    className="text-white font-bold text-[11px] sm:text-xs uppercase truncate"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {still.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedStill && (
          <div
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
            onClick={() => setSelectedStill(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full bg-[#111] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStill(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 bg-black/80 hover:bg-black text-white rounded-full transition-colors border border-white/10"
                aria-label="Close image"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedStill.imageUrl}
                alt={selectedStill.title}
                className="w-full max-h-[72dvh] sm:max-h-[78vh] object-contain bg-black"
              />

              <div className="p-4 sm:p-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[#C84B2F] text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-bold">
                    {selectedStill.project || 'PRODUCTION STILL'}
                  </span>
                  <h3
                    className="text-white font-display font-bold text-sm sm:text-base md:text-lg uppercase mt-0.5"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
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
