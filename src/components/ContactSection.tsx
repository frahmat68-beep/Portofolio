'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { MessageCircle, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Kiki,%20saya%20tertarik%20untuk%20berkolaborasi.`;

  return (
    <footer className="bg-[#0A0A0A] w-full pt-16 sm:pt-20 pb-8 sm:pb-10" id="contact">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Top section: 3 columns like LAM footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 pb-12 sm:pb-16 border-b border-[#F0ECE5]/8">
          <div>
            <p className="t-label text-[#F0ECE5]/35 text-[10px] tracking-[0.2em] mb-3">FILM PRODUCTION</p>
            <ul className="flex flex-col gap-1.5">
              {['Short Film', 'Music Video', 'Commercial', 'Documentary'].map(s => (
                <li key={s} className="t-mono text-[#F0ECE5]/50 text-[11px]">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-label text-[#F0ECE5]/35 text-[10px] tracking-[0.2em] mb-3">PRODUCTION ROLE</p>
            <ul className="flex flex-col gap-1.5">
              {['Film Producer', 'Line Producer', 'Unit Production Manager', 'Art Director'].map(s => (
                <li key={s} className="t-mono text-[#F0ECE5]/50 text-[11px]">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-label text-[#F0ECE5]/35 text-[10px] tracking-[0.2em] mb-3">BASED IN</p>
            <p className="t-mono text-[#F0ECE5]/50 text-[11px]">{profile.location}</p>
            <p className="t-mono text-[#F0ECE5]/50 text-[11px] mt-1">SAE Institute Jakarta</p>
            <p className="t-mono text-[#F0ECE5]/50 text-[11px]">Diploma of Film, 2021–2024</p>
          </div>
        </div>

        {/* Large KIKI wordmark + contact on opposite sides */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 sm:gap-0 pt-10 sm:pt-12">
          {/* Left: Giant initials */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black text-[#F0ECE5] uppercase leading-none select-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(4rem, 14vw, 12rem)', letterSpacing: '-0.04em', lineHeight: 0.88 }}
            >
              KIKI<span className="text-[#C84B2F]">™</span>
            </motion.div>
            <p className="t-label text-[#F0ECE5]/30 text-[10px] tracking-[0.25em] mt-3">
              © {new Date().getFullYear()} FIKRI MULYA RACHMAT
            </p>
          </div>

          {/* Right: Contact links */}
          <div className="flex flex-col gap-3 sm:items-end pb-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CHAT"
              className="hover-link flex items-center gap-2 text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label text-[11px] tracking-[0.15em]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {profile.contact.whatsappDisplay || 'WHATSAPP'}
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="hover-link flex items-center gap-2 text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label text-[11px] tracking-[0.15em]"
            >
              <Mail className="w-3.5 h-3.5" />
              {profile.contact.email.toUpperCase()}
            </a>
            <a
              href={`https://instagram.com/${profile.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-link flex items-center gap-2 text-[#F0ECE5]/70 hover:text-[#F0ECE5] transition-colors t-label text-[11px] tracking-[0.15em]"
            >
              <Instagram className="w-3.5 h-3.5" />
              @{profile.contact.instagram.toUpperCase()}
            </a>

            <Link
              href="/admin"
              className="mt-2 t-mono text-[#F0ECE5]/20 hover:text-[#C84B2F] text-[9px] transition-colors tracking-widest"
            >
              ADMIN CMS
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
