'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { MessageCircle, Mail, Film, Camera } from 'lucide-react';

export default function StickyMobileBar() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Kiki!`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 sm:hidden w-[92%] max-w-sm">
      <div className="flex items-center justify-between p-2 rounded-2xl bg-[#0E0E0E]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-1">
          <a
            href="#works"
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] t-mono font-bold text-gray-300 hover:text-white"
          >
            <Film className="w-3.5 h-3.5 text-[#C84B2F]" />
            <span>WORKS</span>
          </a>
          <a
            href="#bts"
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-[10px] t-mono font-bold text-gray-300 hover:text-white"
          >
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>ON-SET</span>
          </a>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
