'use client';

import React, { useEffect } from 'react';
import { X, Video, ExternalLink } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  name: string;
}

export default function ShowreelModal({ isOpen, onClose, videoUrl, name }: ShowreelModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-surface border border-surfaceBorder rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-surfaceElevated">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-cinemaAmber" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {name} • Official Showreel
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/50 hover:bg-black text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="w-full aspect-video bg-black flex items-center justify-center relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title="Filmmaker Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="p-8 text-center text-gray-400 space-y-3">
              <p className="text-sm">Link video showreel sedang dipersiapkan atau belum dimasukkan.</p>
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cinemaAmber text-black text-xs font-bold"
                >
                  <span>Buka Video di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
