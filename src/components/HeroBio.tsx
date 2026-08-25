'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  MessageCircle, 
  Mail, 
  Instagram, 
  Video, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function HeroBio() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Fikri,%20saya%20tertarik%20untuk%20berkolaborasi%20dalam%20proyek%20produksi%20film/video.`;

  return (
    <header className="relative w-full pt-8 pb-4">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-48 bg-cinemaAmber/10 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4">
        
        {/* Top Admin Quick Link */}
        <div className="w-full flex justify-between items-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium glass-pill text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profile.statusText || 'Available for Projects'}</span>
          </div>

          <Link
            href="/admin"
            className="text-xs text-gray-400 hover:text-cinemaAmber transition-colors flex items-center gap-1 px-2.5 py-1 rounded-md glass-pill"
            title="Kelola Konten & Proyek (Admin Mode)"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin CMS</span>
          </Link>
        </div>

        {/* Profile Avatar with Cinematic Ring */}
        <div className="relative mb-5 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cinemaAmber via-amber-500/40 to-cinemaCyan shadow-glowAmber">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover rounded-full bg-surface"
              onError={(e) => {
                // Fallback if image link is invalid
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop";
              }}
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-surface p-1 rounded-full border border-surfaceBorder shadow-lg" title="Verified Filmmaker">
            <CheckCircle2 className="w-5 h-5 text-cinemaAmber fill-cinemaAmber/20" />
          </div>
        </div>

        {/* Name & Tagline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight text-white flex items-center gap-2 justify-center">
          {profile.name}
        </h1>
        
        <p className="text-sm sm:text-base font-medium text-cinemaAmber mt-1 mb-3">
          {profile.tagline}
        </p>

        {/* Location & SAE Education Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1 glass-pill px-2.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-cinemaCyan" />
            {profile.location}
          </span>
          <span className="flex items-center gap-1 glass-pill px-2.5 py-1 rounded-full">
            <GraduationCap className="w-3.5 h-3.5 text-cinemaAmber" />
            {profile.education.degree} ({profile.education.institution})
          </span>
        </div>

        {/* Roles Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5 max-w-lg">
          {profile.roles.map((role, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full font-medium badge-producer"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Bio Paragraph */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mb-6">
          {profile.bio}
        </p>

        {/* Action Buttons (Instagram Bio Link Style) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mb-4">
          {/* WhatsApp Direct */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20-%20Film%20Production`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-cinemaAmber" />
            <span>Email</span>
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${profile.contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>@{profile.contact.instagram}</span>
          </a>

          {/* Showreel / Deck */}
          <a
            href={profile.contact.showreelUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-cinemaAmber/15 hover:bg-cinemaAmber/25 text-amber-300 border border-cinemaAmber/30 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <Video className="w-4 h-4" />
            <span>Showreel</span>
          </a>
        </div>

      </div>
    </header>
  );
}
