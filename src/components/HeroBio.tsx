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
  ExternalLink,
  Film
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
    <header className="relative w-full pt-6 md:pt-10 pb-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-cinemaAmber/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Control Bar */}
        <div className="w-full flex justify-between items-center mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium glass-pill text-gray-300 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.statusText || 'Available for Projects'}</span>
          </motion.div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="text-xs text-gray-400 hover:text-white transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill active:scale-95"
              title="Bagikan / Salin Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Share'}</span>
            </button>

            <Link
              href="/admin"
              className="text-xs text-gray-400 hover:text-cinemaAmber transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill"
              title="Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>

        {/* Hero Content: Mobile Centered, Desktop Wide Split / Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Avatar Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative group cursor-pointer"
              onClick={() => setIsShowreelOpen(true)}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full lg:rounded-3xl p-1 bg-gradient-to-tr from-cinemaAmber via-amber-500/40 to-cinemaCyan shadow-glowAmber transition-transform duration-300 group-hover:scale-105">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full lg:rounded-2xl bg-surface"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute bottom-1 right-1 lg:-bottom-2 lg:-right-2 bg-surface p-1.5 rounded-full border border-surfaceBorder shadow-lg">
                <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-cinemaAmber fill-cinemaAmber/20" />
              </div>

              {/* Hover Play Prompt */}
              <div className="absolute inset-0 rounded-full lg:rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                <Play className="w-8 h-8 text-cinemaAmber fill-cinemaAmber" />
              </div>
            </motion.div>

            {/* vCard Button under avatar on desktop */}
            <button
              onClick={handleDownloadVCard}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 mt-4 rounded-xl text-xs font-medium text-gray-300 hover:text-white glass-pill transition-colors"
            >
              <DownloadCloud className="w-4 h-4 text-cinemaCyan" />
              <span>Simpan Kontak (vCard)</span>
            </button>
          </div>

          {/* Details & Action Column */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-gray-400 mb-2"
            >
              <span className="flex items-center gap-1 glass-pill px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-cinemaCyan" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1 glass-pill px-3 py-1 rounded-full">
                <GraduationCap className="w-3.5 h-3.5 text-cinemaAmber" />
                {profile.education.degree} ({profile.education.institution})
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white mb-2"
            >
              {profile.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base font-semibold text-cinemaAmber mb-4"
            >
              {profile.tagline}
            </motion.p>

            {/* Roles Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
              {profile.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3.5 py-1 rounded-full font-medium badge-producer transition-all hover:scale-105"
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
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {/* WhatsApp Direct */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20-%20Film%20Production`}
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
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@{profile.contact.instagram}</span>
              </a>

              {/* Showreel Button */}
              <button
                onClick={() => setIsShowreelOpen(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-cinemaAmber/15 hover:bg-cinemaAmber/25 text-amber-300 border border-cinemaAmber/30 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                <Play className="w-3.5 h-3.5 fill-amber-300" />
                <span>Showreel</span>
              </button>
            </div>

            {/* Mobile vCard button */}
            <div className="w-full flex justify-center lg:hidden mt-3">
              <button
                onClick={handleDownloadVCard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400 hover:text-white glass-pill transition-colors"
              >
                <DownloadCloud className="w-3.5 h-3.5 text-cinemaCyan" />
                <span>Simpan Kontak Fikri ke HP (vCard)</span>
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
