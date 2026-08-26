'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="section-dark w-full py-16 sm:py-24 md:py-32 border-t border-white/10" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C84B2F]" />
              <p className="font-mono text-[#C84B2F] text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                FIKRI MULYA RACHMAT
              </p>
            </div>
            <h3
              className="text-white font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Film Producer & UPM
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-mono pt-1">
              Available for narrative feature films, digital series, brand campaigns, and music video productions. Based in Jakarta & Depok, Indonesia.
            </p>
          </div>

          {/* Clean Direct Channels (No Sales CTA) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono">
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider py-1"
            >
              <span>{profile.contact.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C84B2F]" />
            </a>

            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider py-1"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider py-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
            </a>
          </div>
        </div>

        {/* Bottom Minimal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Fikri Mulya Rachmat. All Rights Reserved.
          </div>
          <div>
            Portfolio Showcase · Jakarta, ID
          </div>
        </div>

      </div>
    </footer>
  );
}
