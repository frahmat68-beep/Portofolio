'use client';

import React, { useState } from 'react';
import { ProjectVideo } from '@/types/portfolio';
import { Play, ExternalLink, Instagram, Video } from 'lucide-react';

interface PlatformVideoEmbedProps {
  videos: ProjectVideo[];
  projectTitle: string;
  posterUrl?: string;
}

export default function PlatformVideoEmbed({ videos, projectTitle, posterUrl }: PlatformVideoEmbedProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentVideo = videos[activeIdx] || videos[0];

  if (!videos || videos.length === 0) {
    if (posterUrl) {
      return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={posterUrl} alt={projectTitle} className="w-full h-full object-cover" />
        </div>
      );
    }
    return null;
  }

  // 1. Extract YouTube ID
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    return null;
  };

  // 2. Extract TikTok ID
  const getTikTokEmbedUrl = (url: string) => {
    const match = url.match(/video\/(\d+)/);
    if (match && match[1]) {
      return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }
    return null;
  };

  // 3. Extract Instagram Code
  const getInstagramEmbedUrl = (url: string) => {
    const match = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#&]+)/);
    if (match && match[2]) {
      return `https://www.instagram.com/reel/${match[2]}/embed/captioned/`;
    }
    return null;
  };

  const ytEmbed = currentVideo.platform === 'youtube' ? getYouTubeEmbedUrl(currentVideo.url) : null;
  const ttEmbed = currentVideo.platform === 'tiktok' ? getTikTokEmbedUrl(currentVideo.url) : null;
  const igEmbed = currentVideo.platform === 'instagram' ? getInstagramEmbedUrl(currentVideo.url) : null;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* ── Main Embed / Video Player Container ── */}
      <div className="w-full rounded-2xl overflow-hidden bg-black border border-white/10 relative flex items-center justify-center">
        {/* YouTube */}
        {currentVideo.platform === 'youtube' && ytEmbed && (
          <div className="w-full aspect-video">
            <iframe
              src={ytEmbed}
              title={`${projectTitle} - ${currentVideo.label}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover border-0"
            />
          </div>
        )}

        {/* TikTok */}
        {currentVideo.platform === 'tiktok' && (
          <div className="w-full flex flex-col items-center justify-center p-4 min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-[#161616] to-[#0A0A0A]">
            {ttEmbed ? (
              <div className="w-full max-w-[340px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={ttEmbed}
                  title={`${projectTitle} - ${currentVideo.label}`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{currentVideo.label}</h4>
                  <p className="text-gray-400 text-xs mt-1">TikTok Mini-Series Episode</p>
                </div>
                <a
                  href={currentVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Watch on TikTok</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Instagram */}
        {currentVideo.platform === 'instagram' && (
          <div className="w-full flex flex-col items-center justify-center p-4 min-h-[380px] sm:min-h-[460px] bg-gradient-to-b from-[#181818] to-[#0D0D0D]">
            {igEmbed ? (
              <div className="w-full max-w-[360px] aspect-[9/16] max-h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={igEmbed}
                  title={`${projectTitle} - ${currentVideo.label}`}
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <div className="text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mx-auto">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">{currentVideo.label}</h4>
                  <p className="text-gray-400 text-xs mt-1">Official Instagram Content</p>
                </div>
                <a
                  href={currentVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <span>Open in Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Direct Local Video */}
        {currentVideo.platform === 'direct' && (
          <div className="w-full aspect-video sm:aspect-[16/10] max-h-[70vh] bg-black flex items-center justify-center">
            <video
              src={currentVideo.url}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[70vh] object-contain rounded-2xl"
              poster={posterUrl}
            />
          </div>
        )}
      </div>

      {/* ── Multi-Video Episode / Cut Selector Bar ── */}
      {videos.length > 1 && (
        <div className="w-full bg-[#161616] p-3 rounded-2xl border border-white/5 flex flex-col gap-2">
          <span className="t-mono text-[10px] text-gray-400 uppercase tracking-wider px-1">
            SELECT EPISODE / CUT ({videos.length} VIDEOS AVAILABLE)
          </span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {videos.map((vid, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#C84B2F] text-white shadow-glowRed'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5'
                  }`}
                >
                  {vid.platform === 'youtube' && <Play className="w-3 h-3 fill-current" />}
                  {vid.platform === 'tiktok' && <Video className="w-3 h-3 text-cyan-300" />}
                  {vid.platform === 'instagram' && <Instagram className="w-3 h-3 text-pink-300" />}
                  <span>{vid.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
