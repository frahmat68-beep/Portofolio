'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { BTSPhoto } from '@/types/portfolio';
import { Camera, X, ZoomIn, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BTSGallerySection() {
  const { data } = usePortfolio();
  const { btsPhotos } = data;

  const [selectedPhoto, setSelectedPhoto] = useState<BTSPhoto | null>(null);

  if (!btsPhotos || btsPhotos.length === 0) return null;

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-6" id="bts">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-pink-400" />
            <span>Behind The Scenes (On-Set)</span>
          </h2>
          <p className="text-xs text-gray-400">
            Dokumentasi proses syuting & aktivitas di set produksi
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full glass-pill text-pink-400 border border-pink-400/30">
          {btsPhotos.length} Foto
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-3">
        {btsPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel-interactive cursor-pointer border border-white/5"
          >
            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Top Tag */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-200">
                {photo.tag}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
              <h4 className="text-xs font-bold text-white truncate">
                {photo.title}
              </h4>
              <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5">
                {photo.caption}
              </p>
            </div>

            {/* Hover Zoom Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-surface border border-surfaceBorder rounded-3xl overflow-hidden shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-[16/10] bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 bg-surfaceElevated border-t border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full badge-producer">
                  {selectedPhoto.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
