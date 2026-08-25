'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { MessageCircle, Mail, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Kiki,%20salam%20kenal!`;

  return (
    <footer className="bg-[#0A0A0A] w-full pt-16 sm:pt-24 pb-12" id="contact">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Roles Context (Showcase Identity) */}
        <div className="border-b border-[#F0ECE5]/10 pb-12 mb-12">
          <p className="t-label text-[#C84B2F] text-[11px] tracking-[0.25em] mb-3">
            DIRECT DIRECTORY // ABOUT & DISCIPLINES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h2
                className="text-[#F0ECE5] font-display font-black text-2xl sm:text-4xl uppercase leading-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Fikri Mulya Rachmat
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed max-w-md font-sans">
                {profile.bio || 'Film Producer, Line Producer, Unit Production Manager, Production Assistant, dan Software Engineer berbasis di Jakarta & Depok. Berpengalaman dalam 30+ produksi karya naratif, music video, dan kampanye komersial brand.'}
              </p>
            </div>

            {/* Disciplines / Roles list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 t-mono text-xs text-gray-300">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[#C84B2F] block text-[10px] mb-1 font-bold">FILMMAKING</span>
                <span>• Producer</span>
                <span className="block">• Line Producer</span>
                <span className="block">• Unit Production Mgr</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[#5B8FA8] block text-[10px] mb-1 font-bold">TECH & CREATIVE</span>
                <span>• Production Assistant</span>
                <span className="block">• Software Engineer</span>
                <span className="block">• Art Direction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant KIKI Wordmark & Clean Contact Links */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-4">
          {/* Left: KIKI Display */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black text-[#F0ECE5] uppercase leading-none select-none tracking-tight"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(4rem, 14vw, 11rem)', lineHeight: 0.85 }}
            >
              KIKI
            </motion.div>
            <p className="t-mono text-[#F0ECE5]/30 text-[10px] mt-4">
              © {new Date().getFullYear()} FIKRI MULYA RACHMAT — ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Right: Direct Reach Out */}
          <div className="flex flex-col gap-3 sm:items-end pb-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link flex items-center gap-2 text-[#F0ECE5]/80 hover:text-white transition-colors t-label text-xs tracking-wider"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WHATSAPP DIRECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="hover-link flex items-center gap-2 text-[#F0ECE5]/80 hover:text-white transition-colors t-label text-xs tracking-wider"
            >
              <Mail className="w-3.5 h-3.5 text-[#C84B2F]" />
              <span>{profile.contact.email.toUpperCase()}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={`https://instagram.com/${profile.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link flex items-center gap-2 text-[#F0ECE5]/80 hover:text-white transition-colors t-label text-xs tracking-wider"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@{profile.contact.instagram.toUpperCase()}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            {profile.contact.linkedin && (
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-link flex items-center gap-2 text-[#F0ECE5]/80 hover:text-white transition-colors t-label text-xs tracking-wider"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#5B8FA8]" />
                <span>LINKEDIN PROFILE</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
