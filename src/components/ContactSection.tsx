'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  const marqueeText = "LET'S PRODUCE SOMETHING ICONIC — OPEN FOR NARRATIVE FILMS, COMMERCIALS & SERIES — GET IN TOUCH — ";

  return (
    <footer className="w-full relative bg-[#0A0A0A] text-[#F0ECE5] overflow-hidden" id="contact">
      
      {/* ─── 1. HIGH-IMPACT TRANSITION MARQUEE RIBBON ─── */}
      <div className="w-full bg-[#111111] border-y border-white/10 py-3.5 sm:py-4 overflow-hidden select-none relative z-10">
        <div className="flex overflow-x-hidden group">
          <div className="flex gap-4 animate-marquee shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 text-xs sm:text-sm font-mono tracking-widest uppercase text-gray-300 font-semibold whitespace-nowrap">
                <span>{marqueeText}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C84B2F] shrink-0 inline" />
              </div>
            ))}
          </div>
          <div className="flex gap-4 animate-marquee shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-4 text-xs sm:text-sm font-mono tracking-widest uppercase text-gray-300 font-semibold whitespace-nowrap">
                <span>{marqueeText}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C84B2F] shrink-0 inline" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 2. CINEMATIC AMBIENT VIDEO HORIZON (Matches HeroBio) ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/projects/puma-x-mclaren-aman-studio/Built_for_the_grid_Styled.jpg"
          className="w-full h-full object-cover filter contrast-125 scale-105"
          src="/assets/projects/puma-x-mclaren-aman-studio/The_new_PUMA_x_McLaren_Ra.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
      </div>

      {/* Ambient glowing radial orb in the footer */}
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#C84B2F]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ─── 3. MAIN FOOTER CONTENT ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 w-full">

        {/* Main Minimalist Header Mirroring HeroBio Aesthetic with Kinetic Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 sm:pb-16 border-b border-white/10"
        >
          <div className="flex flex-col mb-10 sm:mb-14 select-none">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-display font-black uppercase tracking-tighter leading-[0.84] block"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(3.8rem, 13vw, 10rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Kiki
            </motion.h2>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.9] block mt-1 sm:mt-2"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2rem, 7vw, 5.5rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Rachmat.
            </motion.span>
          </div>

          {/* Luxury Interactive Glass Contact Cards (Email, WhatsApp, Instagram) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl">
            {/* Email Card */}
            <a
              href={`mailto:${profile.contact.email}`}
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#C84B2F]/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between min-h-[95px] shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-gray-300">
                <span>Direct Mail</span>
                <ArrowUpRight className="w-4 h-4 text-[#C84B2F] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-mono text-xs sm:text-sm text-gray-200 group-hover:text-white font-medium truncate pt-2">
                {profile.contact.email}
              </span>
            </a>

            {/* WhatsApp Card */}
            {profile.contact.whatsapp && (
              <a
                href={profile.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between min-h-[95px] shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-gray-300">
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <span className="font-mono text-xs sm:text-sm text-gray-200 group-hover:text-white font-medium truncate pt-2">
                  +62 851-5664-9015
                </span>
              </a>
            )}

            {/* Instagram Card */}
            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-500/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between min-h-[95px] shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-gray-300">
                <span>Instagram</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <span className="font-mono text-xs sm:text-sm text-gray-200 group-hover:text-white font-medium truncate pt-2">
                @kikiirch
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bottom Minimal Copyright & Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-gray-500"
        >
          <div>
            © {new Date().getFullYear()} Kiki Rachmat. All Rights Reserved.
          </div>
          <div>
            Jakarta, Indonesia
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
