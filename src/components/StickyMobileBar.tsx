'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { MessageCircle, Mail, Sparkles } from 'lucide-react';

export default function StickyMobileBar() {
  const { data } = usePortfolio();
  const { profile } = data;

  const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Fikri,%20saya%20tertarik%20untuk%20berdiskusi%20proyek%20produksi.`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-lg border-t border-white/10">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat WhatsApp</span>
        </a>

        <a
          href={`mailto:${profile.contact.email}?subject=Project%20Inquiry`}
          className="py-2.5 px-3.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5"
          title="Email"
        >
          <Mail className="w-4 h-4 text-cinemaAmber" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}
