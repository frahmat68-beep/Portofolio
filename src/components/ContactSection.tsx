'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  MessageCircle, 
  Mail, 
  Instagram, 
  MapPin, 
  ArrowUpRight,
  ShieldCheck,
  Clapperboard,
  Film
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Fikri,%20saya%20tertarik%20untuk%20berkolaborasi%20dalam%20proyek%20produksi%20film.`;

  return (
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 sm:pb-12" id="contact">
      
      {/* A24 Collab CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
        data-cursor="LET'S WORK"
      >
        {/* Background ambient glow layers */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-cinemaAmber/12 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cinemaCyan/10 blur-3xl rounded-full pointer-events-none" />
        
        {/* Film perforations strip top */}
        <div className="w-full h-6 bg-background/60 border-b border-white/10 flex items-center px-4 gap-2 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-4 h-3 rounded-sm border border-white/10 bg-white/5 flex-shrink-0" />
          ))}
        </div>

        <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-14">
          {/* A24 Slate Label */}
          <div className="flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-widest text-cinemaAmber">
            <Clapperboard className="w-4 h-4" />
            <span>CALL SHEET // OPEN FOR COLLABORATION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white uppercase leading-tight tracking-tight mb-3">
                Let&apos;s Build Something<br />
                <span className="text-cinemaAmber">Memorable</span> on Set.
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
                Terbuka untuk kolaborasi proyek Film Pendek, Music Video, Iklan Komersial, Line Producing, konsultasi budgeting, dan pembentukan tim kreatif.
              </p>

              {/* Availability indicator */}
              <div className="flex items-center gap-2 mt-4">
                <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {profile.statusText || 'Available for New Projects & Collaborations'}
                </span>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CHAT"
                className="flex items-center justify-between gap-3 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <div>
                    <div className="text-sm font-bold">WhatsApp Direct</div>
                    <div className="text-[11px] font-mono opacity-75">{profile.contact.whatsappDisplay || '+62 851-5664-9015'}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${profile.contact.email}?subject=Film%20Project%20Inquiry`}
                data-cursor="EMAIL"
                className="flex items-center justify-between gap-3 px-6 py-4 rounded-2xl glass-panel hover:bg-surfaceElevated text-gray-200 hover:text-white font-semibold border border-surfaceBorder transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cinemaAmber" />
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <div className="text-[11px] font-mono text-gray-400">{profile.contact.email}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cinemaAmber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <div className="flex gap-3">
                <a
                  href={`https://instagram.com/${profile.contact.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl glass-panel text-gray-300 hover:text-pink-400 border border-surfaceBorder text-xs font-mono transition-all hover:-translate-y-0.5"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@{profile.contact.instagram}</span>
                </a>
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl glass-panel text-gray-400 text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cinemaCyan" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Film perforations strip bottom */}
        <div className="w-full h-6 bg-background/60 border-t border-white/10 flex items-center px-4 gap-2 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-4 h-3 rounded-sm border border-white/10 bg-white/5 flex-shrink-0" />
          ))}
        </div>
      </motion.div>

      {/* Footer Branding Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 mt-6 px-1 font-mono">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-cinemaAmber" />
          <span>© {new Date().getFullYear()} {profile.name} — All Rights Reserved.</span>
        </div>
        
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-gray-500 hover:text-cinemaAmber transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>ADMIN CMS PORTAL</span>
        </Link>
      </div>

    </footer>
  );
}
