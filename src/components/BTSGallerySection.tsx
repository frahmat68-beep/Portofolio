'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { BTSPhoto } from '@/types/portfolio';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BTSGallerySection() {
  const { data } = usePortfolio();
  const { btsPhotos } = data;
  const [selected, setSelected] = useState<BTSPhoto | null>(null);

  if (!btsPhotos?.length) return null;

  return (
    <section className="section-light w-full py-12 sm:py-16 border-t border-[#111]/10" id="bts">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.2em] mb-1">ON-SET</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              Behind The Scenes
            </h2>
          </div>
          <span className="t-mono text-inkLight text-[10px]">{btsPhotos.length} FRAMES</span>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {btsPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelected(photo)}
              data-cursor="VIEW"
              className="group relative overflow-hidden bg-creamDark aspect-[4/3]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-300 flex items-end p-3">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[#F0ECE5] font-display font-bold text-xs uppercase tracking-wide">{photo.title}</p>
                  <p className="t-label text-[#F0ECE5]/60 text-[9px] tracking-widest mt-0.5">{photo.tag}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#111] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-ink/60 hover:bg-ink text-[#F0ECE5] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.imageUrl} alt={selected.title} className="w-full object-contain max-h-[70vh]" />
            <div className="p-5 border-t border-white/10">
              <p className="t-label text-[#C84B2F] text-[10px] tracking-widest mb-1">{selected.tag}</p>
              <h3 className="text-[#F0ECE5] font-display font-bold text-base uppercase">{selected.title}</h3>
              <p className="text-[#F0ECE5]/50 text-xs mt-1">{selected.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
