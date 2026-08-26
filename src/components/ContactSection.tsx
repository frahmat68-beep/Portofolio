'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="section-dark w-full py-20 sm:py-28 border-t border-white/10" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Minimalist Identity */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-white/10">
          <div className="space-y-4">
            <p className="t-mono text-[#C84B2F] text-xs uppercase tracking-widest font-bold">
              PORTFOLIO ARCHIVE
            </p>
            <h3
              className="text-white font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Fikri Mulya Rachmat
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono tracking-wide">
              Film Producer · Line Producer · Unit Production Manager · Art Director
            </p>
          </div>

          {/* Clean Social Identity Link (Zero Sales CTA) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={`https://instagram.com/${profile.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>@{profile.contact.instagram}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Static Info */}
        <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Fikri Mulya Rachmat. All Rights Reserved.
          </div>
          <div>
            Direct Inquiries: <span className="text-gray-400 select-all">{profile.contact.email}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
