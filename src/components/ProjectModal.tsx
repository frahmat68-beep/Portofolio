'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types/portfolio';
import { X, Images, ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';

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
  const hasVideo = project.previewVideoUrl || (project.videos && project.videos.length > 0);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return '▶ YouTube';
      case 'tiktok':
        return '▶ TikTok';
      case 'instagram':
        return '▶ Instagram';
      case 'vimeo':
        return '▶ Vimeo';
      default:
        return '▶ Watch';
    }
  };

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
          
          {/* Hero Cover: Video loop or Poster */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/60 relative">
            {project.previewVideoUrl ? (
              <video
                src={project.previewVideoUrl}
                muted
                autoPlay
                loop
                playsInline
                poster={project.posterUrl}
                className="w-full h-full object-cover"
              />
            ) : project.posterUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={project.posterUrl}
                alt={project.title}
                className={`w-full h-full ${
                  project.posterUrl.includes('logo-brand')
                    ? 'object-contain p-12 sm:p-16 bg-[#141414]'
                    : 'object-cover'
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#161616]">
                <span className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                  {project.title}
                </span>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-5">
            {/* Header: Title + Meta */}
            <div className="border-b border-white/10 pb-5">
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
                {project.client && <span>{project.client}</span>}
                {project.role && <span>• Role: <strong className="text-gray-200">{project.role}</strong></span>}
              </div>
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {project.description}
              </p>
            )}

            {/* External Video Links — Primary CTA Section */}
            {project.videos && project.videos.length > 0 ? (
              <div className="space-y-3">
                <span className="t-mono text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  WATCH / LINKS
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {project.videos.map((video, i) => (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C84B2F] hover:bg-[#D85A3F] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#C84B2F]/20"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>{video.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            ) : project.externalUrl ? (
              <div className="space-y-3">
                <span className="t-mono text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  WATCH
                </span>
                <div>
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C84B2F] hover:bg-[#D85A3F] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#C84B2F]/20"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Online</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            ) : null}

            {/* Production Stills Gallery */}
            {gallery.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4 text-[#C84B2F]" />
                    <span className="t-mono text-[10px] text-gray-300 uppercase tracking-wider font-semibold">
                      PRODUCTION STILLS ({gallery.length})
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Click to zoom</span>
                </div>

                {/* Horizontal Scroll Gallery */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                  {gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStillIdx(i);
                      }}
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

            {/* Tags */}
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
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
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
