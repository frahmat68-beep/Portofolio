'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  MessageCircle, 
  Mail, 
  Instagram, 
  MapPin, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Fikri,%20saya%20tertarik%20untuk%20berkolaborasi%20dalam%20proyek%20film/komersial.`;

  return (
    <footer className="w-full max-w-2xl mx-auto px-4 pt-6 pb-24 sm:pb-12" id="contact">
      
      {/* Main Collab Card */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border border-white/10 text-center shadow-2xl">
        {/* Glow ambient */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cinemaAmber/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cinemaAmber/15 text-amber-300 border border-cinemaAmber/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Production</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Let&apos;s Build Something Memorable on Set
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Terbuka untuk kolaborasi proyek Film Pendek, Music Video, Iklan Komersial, Line Producing, maupun konsultasi produksi.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20-%20Film%20Production`}
              className="py-3 px-4 rounded-xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-cinemaAmber" />
              <span>{profile.contact.email}</span>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-400">
            <a
              href={`https://instagram.com/${profile.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 flex items-center gap-1 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@{profile.contact.instagram}</span>
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cinemaCyan" />
              <span>{profile.location}</span>
            </span>
          </div>

        </div>
      </div>

      {/* Footer Branding & Admin Access */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-6 px-2">
        <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
        
        <Link
          href="/admin"
          className="flex items-center gap-1 text-gray-500 hover:text-cinemaAmber transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Panel</span>
        </Link>
      </div>

    </footer>
  );
}
