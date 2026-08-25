'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';
import { 
  X, 
  Film, 
  Calendar, 
  Building2, 
  User, 
  Award, 
  Tag, 
  MessageCircle,
  ExternalLink,
  Instagram,
  Video
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  whatsappNumber: string;
}

export default function ProjectModal({ project, onClose, whatsappNumber }: ProjectModalProps) {
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
        src: `https://www.youtube-nocookie.com/embed/${ytMatch[2]}?autoplay=0&rel=0`,
        aspectRatio: 'aspect-video'
      };
    }

    // 2. Instagram Post / Reel
    // Formats: instagram.com/reel/CODE/, instagram.com/p/CODE/, instagram.com/tv/CODE/
    const igMatch = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#&]+)/);
    if (igMatch) {
      return {
        type: 'instagram',
        src: `https://www.instagram.com/reel/${igMatch[2]}/embed/captioned/`,
        aspectRatio: 'aspect-[9/16] max-h-[500px]'
      };
    }

    // 3. TikTok
    // Formats: tiktok.com/@user/video/VIDEO_ID or tiktok.com/v/VIDEO_ID
    const tiktokMatch = url.match(/tiktok\.com\/(@[\w.-]+\/video\/|v\/)(\d+)/);
    if (tiktokMatch) {
      return {
        type: 'tiktok',
        src: `https://www.tiktok.com/embed/v2/${tiktokMatch[2]}`,
        aspectRatio: 'aspect-[9/16] max-h-[500px]'
      };
    }

    // 4. Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return {
        type: 'vimeo',
        src: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
        aspectRatio: 'aspect-video'
      };
    }

    // 5. Local or Direct MP4/WebM video
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
  const waInquiryUrl = `https://wa.me/${whatsappNumber}?text=Halo%20Kiki,%20saya%20tertarik%20dengan%20karya%20produksi%20*${encodeURIComponent(project.title)}*%20(${encodeURIComponent(project.role)}).%20Boleh%20diskusi%20lebih%20lanjut?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#111111] border border-[#222222] rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors backdrop-blur-sm"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-x-hidden p-5 sm:p-7 space-y-5">
          
          {/* Media Header (Video Embed, Reels, TikTok, or Poster) */}
          <div className="w-full rounded-2xl overflow-hidden bg-black/60 border border-white/5 relative flex items-center justify-center">
            {videoData ? (
              videoData.type === 'direct' ? (
                <video
                  src={videoData.src}
                  controls
                  className="w-full max-h-[60vh] object-contain rounded-2xl"
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
              <div className="relative w-full aspect-video group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.posterUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
              </div>
            )}
          </div>

          {/* Title & Metadata Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="t-label text-[10px] tracking-wider px-3 py-1 rounded-full bg-[#C84B2F]/15 border border-[#C84B2F]/30 text-[#C84B2F]">
                {project.role}
              </span>
              <span className="t-label text-[10px] tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300">
                {project.categoryLabel}
              </span>
              <span className="t-mono text-[10px] text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl font-bold font-display text-white uppercase"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h2>
          </div>

          {/* Production Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#191919] border border-white/5 text-xs text-gray-300">
            {project.productionHouse && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C84B2F] flex-shrink-0" />
                <div>
                  <span className="text-gray-500 block t-mono text-[10px]">PRODUCTION / STUDIO</span>
                  <span className="font-medium text-gray-200">{project.productionHouse}</span>
                </div>
              </div>
            )}

            {project.director && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#5B8FA8] flex-shrink-0" />
                <div>
                  <span className="text-gray-500 block t-mono text-[10px]">DIRECTOR / ARTIST</span>
                  <span className="font-medium text-gray-200">{project.director}</span>
                </div>
              </div>
            )}

            {project.client && (
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <div>
                  <span className="text-gray-500 block t-mono text-[10px]">CLIENT / BRAND</span>
                  <span className="font-medium text-gray-200">{project.client}</span>
                </div>
              </div>
            )}
          </div>

          {/* Synopsis & Role Breakdown */}
          <div className="space-y-2">
            <h3 className="t-label text-[11px] tracking-widest text-[#C84B2F] flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5" />
              SINOPSIS & PERAN PRODUKSI
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line bg-black/30 p-4 rounded-2xl border border-white/5 font-sans">
              {project.synopsis}
            </p>
          </div>

          {/* Awards / Showcase */}
          {project.awards && project.awards.length > 0 && (
            <div className="space-y-2">
              <h3 className="t-label text-[10px] tracking-widest text-gray-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C84B2F]" />
                PENGHARGAAN & SHOWCASE
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.awards.map((award, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                    🏆 {award}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="w-3.5 h-3.5 text-gray-500" />
              {project.tags.map((tag, i) => (
                <span key={i} className="t-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
            <a
              href={waInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Tanya Proyek Ini via WhatsApp</span>
            </a>

            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#191919] hover:bg-[#222] text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                {project.videoUrl.includes('instagram.com') ? (
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                ) : project.videoUrl.includes('tiktok.com') ? (
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
                <span>Buka Link Video</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
