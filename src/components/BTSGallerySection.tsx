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

  // Gentle organic rotations for desktop collage, zero on mobile for clean touch
  const rotations = [-1.5, 1.2, -0.8, 1.8, -1.2, 0.9, -1.6, 1.4];

  return (
    <section className="section-light w-full py-16 sm:py-24 border-t border-[#111]/10 overflow-hidden" id="bts">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">DOCUMENTATION ARCHIVE</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Behind The Scenes
            </h2>
          </div>
          <span className="t-mono text-inkLight text-[11px]">{btsPhotos.length} FRAMES CAPTURED</span>
        </div>

        {/* Adaptive Raw Collage Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {btsPhotos.map((photo, idx) => {
            const rot = rotations[idx % rotations.length];
            const isWide = idx === 0 || idx === 4;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.25) }}
                onClick={() => setSelected(photo)}
                style={{ rotate: `${rot}deg` }}
                className={`group relative overflow-hidden bg-black/90 rounded-2xl shadow-sm hover:shadow-2xl hover:z-20 transition-all duration-300 hover:rotate-0 hover:scale-[1.03] cursor-pointer border border-black/10 ${
                  isWide ? 'aspect-[4/3] sm:col-span-2' : 'aspect-square sm:aspect-[4/5]'
                }`}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                  loading="lazy"
                />

                {/* Film tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[9px] t-mono text-[#F0ECE5] uppercase tracking-wider">
                  {photo.tag || 'ON-SET'}
                </div>

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-xs uppercase tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                    {photo.title}
                  </p>
                  {photo.caption && (
                    <p className="text-gray-300 text-[11px] mt-1 font-sans line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#111] rounded-3xl overflow-hidden border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/75 hover:bg-black text-[#F0ECE5] rounded-full transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selected.imageUrl} alt={selected.title} className="w-full object-contain max-h-[75vh]" />
            <div className="p-5 sm:p-6 border-t border-white/10">
              <span className="t-mono text-[#C84B2F] text-[10px] tracking-widest uppercase">{selected.tag}</span>
              <h3 className="text-[#F0ECE5] font-display font-bold text-lg uppercase mt-1" style={{ fontFamily: 'var(--font-syne)' }}>
                {selected.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1.5 leading-relaxed font-sans">{selected.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
