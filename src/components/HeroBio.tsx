'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Play, Share2, Check, DownloadCloud
} from 'lucide-react';
import { motion } from 'framer-motion';
import ShowreelModal from './ShowreelModal';

export default function HeroBio() {
  const { data } = usePortfolio();
  const { profile } = data;

  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
    a.href = url; a.download = 'Kiki-Rachmat.vcf'; a.click();
  };

  return (
    <header className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col justify-between overflow-hidden" id="top">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[#C84B2F]/8 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-[#C84B2F]/5 blur-[80px] rounded-full pointer-events-none -z-0" />

      {/* ── Minimal Top Nav ──────────────────────────── */}
      <nav className="w-full flex items-center justify-between px-5 sm:px-8 pt-6 pb-0 z-20 relative">
        {/* Left: Pure Kiki Name */}
        <div className="flex items-center gap-3">
          <span 
            className="text-[#F0ECE5]/90 hover:text-[#C84B2F] transition-colors font-display font-black text-2xl uppercase tracking-wider select-none"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            KIKI
          </span>
        </div>

        {/* Right: Works & Gallery Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#works"
            className="hover-link text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            WORKS
          </a>
          <a
            href="#bts"
            className="hover-link text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            ON-SET
          </a>
          <a
            href="#filmography"
            className="hover-link text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            ARCHIVE
          </a>
          <a
            href="#contact"
            className="hover-link text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label tracking-widest text-[11px]"
          >
            CONTACT
          </a>
          <button
            onClick={handleShare}
            className="text-[#F0ECE5]/40 hover:text-[#F0ECE5]/80 transition-colors p-1"
            title="Share Portfolio"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* ── Main Hero Display ────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 text-center my-auto py-12">
        {/* Giant KIKI Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none"
        >
          <h1 
            className="hero-kiki leading-none text-center"
            style={{ fontFamily: 'var(--font-syne)', letterSpacing: '-0.04em' }}
          >
            KIKI
          </h1>
          <div className="text-center mt-2 sm:mt-4">
            <span className="t-label text-[#C84B2F] tracking-[0.3em] text-xs sm:text-sm font-bold">
              FIKRI MULYA RACHMAT
            </span>
          </div>
        </motion.div>

        {/* Roles Context (Show-Off Headline) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-5 text-[#F0ECE5]/60 t-label tracking-[0.2em] text-[11px] sm:text-xs max-w-xl leading-relaxed"
        >
          PRODUCER  ·  LINE PRODUCER  ·  UPM  ·  PRODUCTION ASSISTANT  ·  SOFTWARE ENGINEER
        </motion.p>

        {/* Action: Play Showreel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mt-8 sm:mt-10"
        >
          <button
            onClick={() => setIsShowreelOpen(true)}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C84B2F] hover:bg-[#D9614A] text-white text-xs font-bold font-display uppercase tracking-widest transition-all shadow-glowRed hover:-translate-y-0.5"
          >
            <Play className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
            <span>PLAY SHOWREEL</span>
          </button>

          <a
            href="#works"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#F0ECE5]/20 hover:border-[#F0ECE5]/40 text-[#F0ECE5]/80 hover:text-white text-xs font-bold font-display uppercase tracking-widest transition-all hover:-translate-y-0.5"
          >
            EXPLORE WORKS
          </a>
        </motion.div>
      </div>

      {/* ── Bottom Bar ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full px-5 sm:px-8 pb-6 flex items-center justify-between z-20 relative text-[#F0ECE5]/30 t-mono text-[10px]"
      >
        <span>JAKARTA / DEPOK, INDONESIA</span>
        <button
          onClick={handleDownloadVCard}
          className="hover-link text-[#F0ECE5]/40 hover:text-[#F0ECE5]/80 flex items-center gap-1.5 transition-colors"
        >
          <DownloadCloud className="w-3 h-3" />
          SAVE CONTACT (VCARD)
        </button>
        <span className="hidden sm:inline">SAE INSTITUTE JAKARTA ALUMNI</span>
      </motion.div>

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        videoUrl={profile.contact.showreelUrl}
        name={profile.name}
      />
    </header>
  );
}
