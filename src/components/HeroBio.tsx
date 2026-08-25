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
  FileText
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

  // Generate vCard for saving contact
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
    <header className="relative w-full pt-8 pb-4">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-52 bg-cinemaAmber/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
        
        {/* Top Control Bar */}
        <div className="w-full flex justify-between items-center mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium glass-pill text-gray-300 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.statusText || 'Available for Projects'}</span>
          </motion.div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="text-xs text-gray-400 hover:text-white transition-all flex items-center gap-1 px-2.5 py-1 rounded-md glass-pill active:scale-95"
              title="Bagikan / Salin Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Share'}</span>
            </button>

            <Link
              href="/admin"
              className="text-xs text-gray-400 hover:text-cinemaAmber transition-colors flex items-center gap-1 px-2.5 py-1 rounded-md glass-pill"
              title="Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Profile Avatar with Glowing Halo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mb-5 group cursor-pointer"
          onClick={() => setIsShowreelOpen(true)}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cinemaAmber via-amber-500/40 to-cinemaCyan shadow-glowAmber transition-transform duration-300 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full bg-surface"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop";
              }}
            />
          </div>

          {/* Verified Badge */}
          <div className="absolute bottom-1 right-1 bg-surface p-1 rounded-full border border-surfaceBorder shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-cinemaAmber fill-cinemaAmber/20" />
          </div>

          {/* Hover Play Prompt */}
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
            <Play className="w-6 h-6 text-cinemaAmber fill-cinemaAmber" />
          </div>
        </motion.div>

        {/* Name & Tagline */}
        <motion.h1 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-white flex items-center gap-2 justify-center"
        >
          {profile.name}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs sm:text-sm font-semibold text-cinemaAmber mt-1.5 mb-3"
        >
          {profile.tagline}
        </motion.p>

        {/* Location & SAE Education Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 mb-4"
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

        {/* Roles Badges with Subtle Glow */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5 max-w-lg">
          {profile.roles.map((role, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full font-medium badge-producer transition-all hover:scale-105"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Bio Paragraph */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mb-6 font-normal">
          {profile.bio}
        </p>

        {/* Action Buttons Grid (Instagram Bio Link Optimized) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mb-3">
          {/* WhatsApp Direct */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20-%20Film%20Production`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-cinemaAmber" />
            <span>Email</span>
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${profile.contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@{profile.contact.instagram}</span>
          </a>

          {/* Showreel Button (Opens Video Modal) */}
          <button
            onClick={() => setIsShowreelOpen(true)}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-cinemaAmber/15 hover:bg-cinemaAmber/25 text-amber-300 border border-cinemaAmber/30 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Play className="w-3.5 h-3.5 fill-amber-300" />
            <span>Showreel</span>
          </button>
        </div>

        {/* Secondary Action: Save Contact vCard */}
        <div className="w-full flex justify-center mb-2">
          <button
            onClick={handleDownloadVCard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400 hover:text-white glass-pill transition-colors"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-cinemaCyan" />
            <span>Simpan Kontak Fikri ke HP (vCard)</span>
          </button>
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
