'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';
import { 
  X, 
  ExternalLink,
  Instagram,
  Video,
  Play
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  whatsappNumber?: string;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Helper to parse video type & embed URL
  const getVideoEmbedData = (url?: string) => {
    if (!url) return null;

    // 1. YouTube
    const ytMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    if (ytMatch && ytMatch[2].length === 11) {
      return {
        type: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[2]}?autoplay=1&rel=0`,
        aspectRatio: 'aspect-video'
      };
    }

    // 2. Instagram Post / Reel
    const igMatch = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#&]+)/);
    if (igMatch) {
      return {
        type: 'instagram',
        src: `https://www.instagram.com/reel/${igMatch[2]}/embed/captioned/`,
        aspectRatio: 'aspect-[9/16] max-h-[520px]'
      };
    }

    // 3. TikTok
    const tiktokMatch = url.match(/tiktok\.com\/(@[\w.-]+\/video\/|v\/)(\d+)/);
    if (tiktokMatch) {
      return {
        type: 'tiktok',
        src: `https://www.tiktok.com/embed/v2/${tiktokMatch[2]}`,
        aspectRatio: 'aspect-[9/16] max-h-[520px]'
      };
    }

    // 4. Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return {
        type: 'vimeo',
        src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
        aspectRatio: 'aspect-video'
      };
    }

    // 5. Direct MP4 video
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('/assets/')) {
      return {
        type: 'direct',
        src: url,
        aspectRatio: 'aspect-video'
      };
    }

    return null;
  };

  const videoData = getVideoEmbedData(project.videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0E0E0E] border border-[#222222] rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors backdrop-blur-sm"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto overflow-x-hidden p-5 sm:p-8 space-y-6">
          
          {/* Media Player or High-Res Visual */}
          <div className="w-full rounded-2xl overflow-hidden bg-black border border-white/5 relative flex items-center justify-center">
            {videoData ? (
              videoData.type === 'direct' ? (
                <video
                  src={videoData.src}
                  controls
                  autoPlay
                  className="w-full max-h-[65vh] object-contain rounded-2xl"
                  poster={project.posterUrl}
                />
              ) : (
                <div className={`w-full ${videoData.aspectRatio} flex items-center justify-center`}>
                  <iframe
                    src={videoData.src}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover border-0"
                  />
                </div>
              )
            ) : (
              <div className="relative w-full aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.posterUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Project Details (Clean, Minimal, Pure Info) */}
          <div className="space-y-4">
            {/* Header: Title + Meta */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 
                  className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 t-mono">
                  {project.productionHouse && <span>PH: {project.productionHouse}</span>}
                  {project.client && <span>• Client: {project.client}</span>}
                  <span>• {project.year}</span>
                </div>
              </div>

              {/* Direct Video Link Button if applicable */}
              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 hover:text-white border border-white/10 transition-colors self-start sm:self-auto"
                >
                  {project.videoUrl.includes('instagram.com') ? (
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  ) : project.videoUrl.includes('tiktok.com') ? (
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5 text-[#C84B2F]" />
                  )}
                  <span>WATCH ONLINE</span>
                </a>
              )}
            </div>

            {/* Synopsis / Description */}
            {project.synopsis && (
              <div>
                <p className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                  {project.synopsis}
                </p>
              </div>
            )}

            {/* Awards / Milestone Tag */}
            {project.awards && project.awards.length > 0 && (
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {project.awards.map((award, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                      🏆 {award}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
