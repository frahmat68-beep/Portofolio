'use client';

import React, { useEffect } from 'react';
import { Project } from '@/types/portfolio';
import { X, ExternalLink } from 'lucide-react';
import PlatformVideoEmbed from './PlatformVideoEmbed';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
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
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/75 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors backdrop-blur-sm"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-x-hidden p-5 sm:p-8 space-y-6">
          
          {/* Multi-Platform Video Embed Layer */}
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
    </div>
  );
}
