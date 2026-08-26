'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <footer className="section-dark w-full py-16 sm:py-24 md:py-32 border-t border-white/10 overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Minimalist Header Mirroring HeroBio Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 sm:pb-16 border-b border-white/10"
        >
          <div className="flex flex-col mb-8 sm:mb-12 select-none">
            <h2
              className="text-white font-display font-black uppercase tracking-tighter leading-[0.84] block"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Kiki
            </h2>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.9] block mt-1"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(1.8rem, 6.5vw, 5rem)',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              Rachmat.
            </span>
          </div>

          {/* Clean Direct Channels (Email, WhatsApp, Instagram) */}
          <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-10 gap-y-3 text-xs sm:text-sm font-mono">
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider py-1 hover:underline"
            >
              <span className="text-gray-500">EMAIL:</span>
              <span>{profile.contact.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C84B2F]" />
            </a>

            {profile.contact.whatsapp && (
              <a
                href={profile.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider py-1 hover:underline"
              >
                <span className="text-gray-500">WHATSAPP:</span>
                <span>+62 851-5664-9015</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
              </a>
            )}

            <a
              href={profile.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider py-1 hover:underline"
            >
              <span className="text-gray-500">IG:</span>
              <span>@kikiirch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
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
            Jakarta & Depok, ID
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
