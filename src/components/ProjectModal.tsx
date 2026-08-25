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
  Play, 
  MessageCircle,
  ExternalLink 
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

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=0&rel=0`;
    }
    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(project.videoUrl);
  const waInquiryUrl = `https://wa.me/${whatsappNumber}?text=Halo%20Fikri,%20saya%20tertarik%20dengan%20karya%20produksi%20*${encodeURIComponent(project.title)}*%20(${encodeURIComponent(project.role)}).%20Boleh%20diskusi%20lebih%20lanjut?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-surface border border-surfaceBorder rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
        
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
          
          {/* Media Header (Video Embed or High Res Poster) */}
          <div className="w-full rounded-2xl overflow-hidden bg-black/40 border border-white/5 relative aspect-video flex items-center justify-center">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.posterUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>
            )}
          </div>

          {/* Title & Metadata Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full badge-producer">
                {project.role}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full glass-pill text-gray-300">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h2>
          </div>

          {/* Production Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-surfaceElevated border border-white/5 text-xs text-gray-300">
            {project.productionHouse && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cinemaAmber flex-shrink-0" />
                <div>
                  <span className="text-gray-500 block">Production / Studio</span>
                  <span className="font-medium text-gray-200">{project.productionHouse}</span>
                </div>
              </div>
            )}

            {project.director && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cinemaCyan flex-shrink-0" />
                <div>
                  <span className="text-gray-500 block">Director / Artist</span>
                  <span className="font-medium text-gray-200">{project.director}</span>
                </div>
              </div>
            )}

            {project.client && (
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <div>
                  <span className="text-gray-500 block">Client / Brand</span>
                  <span className="font-medium text-gray-200">{project.client}</span>
                </div>
              </div>
            )}
          </div>

          {/* Synopsis & Role Breakdown */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cinemaAmber flex items-center gap-1.5">
              <Film className="w-4 h-4" />
              Sinopsis & Peran Produksi
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line bg-black/20 p-4 rounded-2xl border border-white/5">
              {project.synopsis}
            </p>
          </div>

          {/* Awards / Showcase */}
          {project.awards && project.awards.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cinemaAmber" />
                Penghargaan & Showcase
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.awards.map((award, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
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
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-md glass-pill text-gray-400">
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
                className="py-3 px-4 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder flex items-center justify-center gap-2 transition-all"
              >
                <span>Buka Link Video</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
