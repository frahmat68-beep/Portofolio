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
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 sm:pb-16" id="contact">
      
      {/* Main Collab Card: Widescreen banner on Desktop */}
      <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 border border-white/10 text-center shadow-2xl">
        {/* Glow ambient */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cinemaAmber/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cinemaAmber/15 text-amber-300 border border-cinemaAmber/30">
            <Sparkles className="w-4 h-4" />
            <span>Ready for Production & Inquiries</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
            Let&apos;s Build Something Memorable on Set
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto">
            Terbuka untuk kolaborasi proyek Film Pendek, Music Video, Iklan Komersial, Line Producing, konsultasi budgeting, maupun tim kreatif.
          </p>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${profile.contact.email}?subject=Project%20Inquiry%20-%20Film%20Production`}
              className="py-3.5 px-5 rounded-2xl bg-surfaceElevated hover:bg-surfaceBorder text-gray-200 hover:text-white text-xs sm:text-sm font-semibold border border-surfaceBorder flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
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
              <Instagram className="w-4 h-4" />
              <span>@{profile.contact.instagram}</span>
            </a>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-cinemaCyan" />
              <span>{profile.location}</span>
            </span>
          </div>

        </div>
      </div>

      {/* Footer Branding & Admin Access */}
      <div className="flex items-center justify-between text-xs text-gray-500 mt-8 px-2">
        <p>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</p>
        
        <Link
          href="/admin"
          className="flex items-center gap-1 text-gray-500 hover:text-cinemaAmber transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Admin CMS Portal</span>
        </Link>
      </div>

    </footer>
  );
}
