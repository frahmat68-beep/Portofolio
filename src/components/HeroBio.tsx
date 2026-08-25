'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  MessageCircle, 
  Mail, 
  Instagram, 
  Play, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  Share2, 
  ShieldCheck, 
  Check, 
  DownloadCloud,
  Clapperboard,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ShowreelModal from './ShowreelModal';

export default function HeroBio() {
  const { data } = usePortfolio();
  const { profile } = data;

  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Fikri,%20saya%20tertarik%20untuk%20berkolaborasi%20dalam%20proyek%20produksi%20film/video.`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} - Film Producer Portfolio`,
        text: profile.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.tagline}
TEL;TYPE=CELL:${profile.contact.whatsappDisplay || profile.contact.whatsapp}
EMAIL;TYPE=INTERNET:${profile.contact.email}
URL:${window.location.origin}
NOTE:Film Producer, Line Producer, UPM (SAE Jakarta Alum)
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fikri-Mulya-Rachmat.vcf`;
    link.click();
  };

  return (
    <header className="relative w-full pt-8 md:pt-12 pb-8 border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-cinemaAmber/15 via-cinemaAmber/5 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top A24 Production Slate Header Bar */}
        <div className="w-full flex justify-between items-center mb-8 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-3">
            <span className="text-cinemaAmber font-bold flex items-center gap-1.5">
              <Clapperboard className="w-3.5 h-3.5" />
              SLATE NO. 2026 // PRODUCTION HUB
            </span>
            <span className="hidden sm:inline text-gray-600">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {profile.statusText || 'Available for Projects'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="text-gray-400 hover:text-white transition-all flex items-center gap-1.5 px-3 py-1 rounded-lg glass-pill active:scale-95 text-[11px]"
              title="Bagikan / Salin Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Share'}</span>
            </button>

            <Link
              href="/admin"
              className="text-gray-400 hover:text-cinemaAmber transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg glass-pill text-[11px]"
              title="Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Hero Content: A24 Director Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Avatar Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              data-cursor="WATCH REEL"
              className="relative group cursor-pointer"
              onClick={() => setIsShowreelOpen(true)}
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 rounded-3xl p-1 bg-gradient-to-tr from-cinemaAmber via-amber-500/30 to-cinemaCyan shadow-glowAmber transition-transform duration-500 group-hover:scale-105 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-[22px] bg-surface"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-2 -right-2 bg-surface p-1.5 rounded-full border border-surfaceBorder shadow-xl">
                <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-cinemaAmber fill-cinemaAmber/20" />
              </div>

              {/* Hover Play Reel Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                <div className="p-3 rounded-full bg-cinemaAmber text-black shadow-glowAmber">
                  <Play className="w-6 h-6 fill-black" />
                </div>
              </div>
            </motion.div>

            {/* Quick action buttons under avatar */}
            <div className="hidden lg:flex flex-col gap-2 mt-5 w-full max-w-[224px]">
              <button
                onClick={() => setIsShowreelOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-cinemaAmber/15 hover:bg-cinemaAmber/25 text-amber-300 border border-cinemaAmber/30 text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5 fill-amber-300" />
                <span>Play Showreel</span>
              </button>

              <button
                onClick={handleDownloadVCard}
                className="w-full py-2 px-3 rounded-xl text-xs font-medium text-gray-400 hover:text-white glass-pill transition-colors flex items-center justify-center gap-1.5"
              >
                <DownloadCloud className="w-3.5 h-3.5 text-cinemaCyan" />
                <span>Simpan Kontak (vCard)</span>
              </button>
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Location & SAE Meta */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 mb-2"
            >
              <span className="flex items-center gap-1 glass-pill px-3 py-1 rounded-full text-cinemaCyan">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1 glass-pill px-3 py-1 rounded-full text-cinemaAmber">
                <GraduationCap className="w-3.5 h-3.5" />
                {profile.education.degree} • {profile.education.institution}
              </span>
            </motion.div>

            {/* Main Title: Cinzel Serif for A24 Vibe */}
            <motion.h1 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white mb-2 leading-tight uppercase"
            >
              {profile.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base font-semibold text-cinemaAmber mb-4 font-mono tracking-wide"
            >
              {profile.tagline}
            </motion.p>

            {/* Roles Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5">
              {profile.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3.5 py-1.5 rounded-full font-medium badge-producer transition-all hover:scale-105 font-mono"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Bio Paragraph */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mb-6 font-normal">
              {profile.bio}
            </p>

            {/* Action Buttons Grid */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              {/* WhatsApp Direct */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CHAT"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20-%20Film%20Production`}
                data-cursor="EMAIL"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4 text-cinemaAmber" />
                <span>Email</span>
              </a>

              {/* Instagram */}
              <a
                href={`https://instagram.com/${profile.contact.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="INSTAGRAM"
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@{profile.contact.instagram}</span>
              </a>
            </div>

            {/* Mobile Actions: Play Showreel & vCard */}
            <div className="w-full flex sm:hidden gap-2 mt-3">
              <button
                onClick={() => setIsShowreelOpen(true)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-cinemaAmber/15 text-amber-300 border border-cinemaAmber/30 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-amber-300" />
                <span>Play Showreel</span>
              </button>

              <button
                onClick={handleDownloadVCard}
                className="py-2.5 px-3 rounded-xl glass-pill text-xs font-medium text-gray-300 flex items-center justify-center gap-1.5"
              >
                <DownloadCloud className="w-3.5 h-3.5 text-cinemaCyan" />
                <span>vCard</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        videoUrl={profile.contact.showreelUrl}
        name={profile.name}
      />
    </header>
  );
}
