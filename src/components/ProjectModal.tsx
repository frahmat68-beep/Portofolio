'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { X, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import PlatformVideoEmbed from './PlatformVideoEmbed';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeStillIdx, setActiveStillIdx] = useState<number | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeStillIdx !== null) {
          setActiveStillIdx(null);
        } else {
          onClose();
        }
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, activeStillIdx]);

  if (!project) return null;

  const gallery = project.gallery || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E0E0E] border border-[#222222] rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/75 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors backdrop-blur-sm shadow-md"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-x-hidden p-5 sm:p-8 space-y-6">
          
          {/* Multi-Platform Video Embed Layer (or Poster if no video) */}
          <PlatformVideoEmbed
            videos={project.videos}
            projectTitle={project.title}
            posterUrl={project.posterUrl}
          />

          {/* Project Details (Clean, Minimal, Pure Info) */}
          <div className="space-y-4 pt-2">
            {/* Header: Title + Meta */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="t-mono text-[#C84B2F] text-[10px] tracking-widest uppercase font-bold">
                  {project.category}
                </span>
                <h2 
                  className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-tight mt-1"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs text-gray-400 t-mono">
                  {project.client && <span>Client/Studio: <strong className="text-gray-200">{project.client}</strong></span>}
                  {project.year && <span>• {project.year}</span>}
                  <span>• Role: <strong className="text-gray-200">{project.role}</strong></span>
                </div>
              </div>
            </div>

            {/* Synopsis / Description */}
            {project.description && (
              <div>
                <p className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}

            {/* Production Stills & On-Set Gallery (if available) */}
            {gallery.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-[#C84B2F]" />
                    <span className="t-mono text-[10px] text-gray-300 uppercase tracking-wider font-semibold">
                      PRODUCTION STILLS & ON-SET FRAMES ({gallery.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Click to zoom</span>
                </div>

                {/* Horizontal Scroll Gallery */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                  {gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStillIdx(i)}
                      className="relative h-28 sm:h-36 aspect-[16/10] rounded-xl overflow-hidden cursor-pointer shrink-0 bg-black/80 border border-white/10 hover:border-[#C84B2F]/60 transition-all duration-300 hover:scale-105 group"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgUrl}
                        alt={`${project.title} still ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags / Badges */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* High-Res Gallery Still Lightbox */}
      {activeStillIdx !== null && gallery[activeStillIdx] && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveStillIdx(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStillIdx(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/80 hover:bg-black text-white rounded-full transition-colors border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveStillIdx((activeStillIdx - 1 + gallery.length) % gallery.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/70 hover:bg-black text-white rounded-full border border-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveStillIdx((activeStillIdx + 1) % gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/70 hover:bg-black text-white rounded-full border border-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[activeStillIdx]}
              alt={`${project.title} frame ${activeStillIdx + 1}`}
              className="w-full max-h-[75vh] object-contain bg-black"
            />

            <div className="p-4 sm:p-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="text-white font-bold">{project.title}</span>
              <span>Frame {activeStillIdx + 1} of {gallery.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
