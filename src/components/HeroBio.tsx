'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  MessageCircle, Mail, Instagram, 
  Play, Share2, Check, DownloadCloud, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ShowreelModal from './ShowreelModal';

export default function HeroBio() {
  const { data } = usePortfolio();
  const { profile } = data;

  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Kiki,%20saya%20tertarik%20untuk%20berkolaborasi%20dalam%20proyek%20produksi.`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${profile.name}`, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${profile.name}\nTITLE:${profile.tagline}\nTEL;TYPE=CELL:${profile.contact.whatsappDisplay}\nEMAIL:${profile.contact.email}\nURL:${typeof window !== 'undefined' ? window.location.origin : ''}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Fikri-Mulya-Rachmat.vcf'; a.click();
  };

  return (
    <header className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col overflow-hidden" id="top">
      {/* Subtle burnt red ambient glow in hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[#C84B2F]/8 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-[#C84B2F]/5 blur-[80px] rounded-full pointer-events-none -z-0" />

      {/* ── Sticky Nav ──────────────────────────────── */}
      <nav className="w-full flex items-center justify-between px-5 sm:px-8 pt-6 pb-0 z-20 relative">
        {/* Left: Signature/initials logo */}
        <div className="flex items-center gap-3">
          <span 
            className="text-[#F0ECE5]/80 hover:text-[#C84B2F] transition-colors font-display font-bold text-xl uppercase tracking-tight select-none"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            FMR™
          </span>
        </div>

        {/* Right: Nav links */}
        <div className="flex items-center gap-5 sm:gap-7">
          <a
            href="#works"
            className="hover-link text-[#F0ECE5]/60 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            WORK
          </a>
          <a
            href="#services"
            className="hover-link text-[#F0ECE5]/60 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            SERVICES
          </a>
          <a
            href="#contact"
            className="hover-link text-[#F0ECE5]/60 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            CONTACT
          </a>
          <button
            onClick={handleShare}
            className="text-[#F0ECE5]/40 hover:text-[#F0ECE5]/80 transition-colors"
            title="Share"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <Link href="/admin" className="text-[#F0ECE5]/30 hover:text-[#C84B2F] transition-colors" title="Admin">
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* ── Main Hero Content ────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C84B2F]/30 bg-[#C84B2F]/10 mb-6 sm:mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C84B2F] animate-pulse" />
          <span className="t-mono text-[#C84B2F] text-[10px] tracking-widest">
            {profile.statusText || 'AVAILABLE FOR PRODUCTION'}
          </span>
        </motion.div>

        {/* ── KIKI — Giant Display Name ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none"
        >
          {/* Main name: KIKI in massive Syne */}
          <h1 className="hero-kiki leading-none text-center">
            <span className="block">KIKI</span>
          </h1>
          {/* Red accent: full name small below */}
          <div className="text-center mt-2 sm:mt-3">
            <span className="t-label text-[#C84B2F] tracking-[0.25em] text-[11px] sm:text-[13px]">
              FIKRI MULYA RACHMAT
            </span>
          </div>
        </motion.div>

        {/* Tagline below */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-6 text-[#F0ECE5]/50 t-label tracking-[0.18em] text-[11px] sm:text-[12px]"
        >
          FILM PRODUCER  ·  LINE PRODUCER  ·  UNIT PRODUCTION MANAGER  ·  ART DIRECTOR
        </motion.p>

        {/* ── CTA Buttons ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-10"
        >
          {/* Play Showreel */}
          <button
            onClick={() => setIsShowreelOpen(true)}
            data-cursor="PLAY"
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#C84B2F] hover:bg-[#D9614A] text-white text-xs font-bold font-display uppercase tracking-widest transition-all shadow-glowRed hover:shadow-glowRed hover:-translate-y-0.5"
          >
            <Play className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
            PLAY SHOWREEL
          </button>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CHAT"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#F0ECE5]/15 hover:border-[#F0ECE5]/35 text-[#F0ECE5]/70 hover:text-[#F0ECE5] text-xs font-bold font-display uppercase tracking-widest transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WHATSAPP
          </a>
        </motion.div>

        {/* ── Quick contact pills ──────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          <a
            href={`mailto:${profile.contact.email}`}
            className="hover-link flex items-center gap-1.5 text-[#F0ECE5]/35 hover:text-[#F0ECE5]/70 transition-colors t-mono text-[10px]"
          >
            <Mail className="w-3 h-3" />
            {profile.contact.email}
          </a>
          <span className="text-[#F0ECE5]/15 text-xs">·</span>
          <a
            href={`https://instagram.com/${profile.contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-link flex items-center gap-1.5 text-[#F0ECE5]/35 hover:text-[#F0ECE5]/70 transition-colors t-mono text-[10px]"
          >
            <Instagram className="w-3 h-3" />
            @{profile.contact.instagram}
          </a>
          <span className="text-[#F0ECE5]/15 text-xs">·</span>
          <button
            onClick={handleDownloadVCard}
            className="hover-link flex items-center gap-1.5 text-[#F0ECE5]/35 hover:text-[#F0ECE5]/70 transition-colors t-mono text-[10px]"
          >
            <DownloadCloud className="w-3 h-3" />
            SAVE CONTACT
          </button>
        </motion.div>
      </div>

      {/* ── Bottom: Location + SAE strip ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full px-5 sm:px-8 pb-6 flex items-center justify-between z-20 relative"
      >
        <span className="t-mono text-[#F0ECE5]/25 text-[10px]">
          JAKARTA & DEPOK, INDONESIA
        </span>
        <span className="t-mono text-[#F0ECE5]/25 text-[10px]">
          SAE INSTITUTE JAKARTA — DIPLOMA OF FILM
        </span>
      </motion.div>

      {/* ── Scroll indicator ─────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-30">
        <div className="w-[1px] h-8 bg-[#F0ECE5]/40 animate-float" />
        <span className="t-mono text-[#F0ECE5] text-[9px] tracking-widest">SCROLL</span>
      </div>

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        videoUrl={profile.contact.showreelUrl}
        name={profile.name}
      />
    </header>
  );
}
