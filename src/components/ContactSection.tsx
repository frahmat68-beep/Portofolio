'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="section-dark w-full py-20 sm:py-28 border-t border-white/10" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-white/10">
          <div className="space-y-3">
            <p className="t-mono text-[#C84B2F] text-xs uppercase tracking-widest font-bold">
              FIKRI MULYA RACHMAT
            </p>
            <h3
              className="text-white font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Film Producer & UPM
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono">
              Jakarta & Depok, Indonesia
            </p>
          </div>

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>{profile.contact.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
          </div>
        </div>

        {/* Bottom Minimal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Fikri Mulya Rachmat. All Rights Reserved.
          </div>
          <div>
            Design inspired by Love & Money
          </div>
        </div>

      </div>
    </footer>
  );
}
