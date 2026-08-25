'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPES = ['All', 'Short Film', 'Music Video', 'Commercial'];

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;

  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [expanded, setExpanded] = useState(false);

  const filtered = filmography.filter(f => {
    const matchQ = !q || 
      f.title.toLowerCase().includes(q.toLowerCase()) || 
      f.productionHouse.toLowerCase().includes(q.toLowerCase()) ||
      (f.directorOrArtist && f.directorOrArtist.toLowerCase().includes(q.toLowerCase()));
    const matchType = type === 'All' || f.type === type;
    return matchQ && matchType;
  });

  const visible = expanded ? filtered : filtered.slice(0, 12);

  return (
    <section className="section-cream w-full py-14 sm:py-20 border-t border-[#111]/10" id="filmography">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">COMPLETE TRACK RECORD</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Production Archive
            </h2>
          </div>
          <span className="t-mono text-inkLight text-[11px]">{filtered.length} CREDITS LOGGED</span>
        </div>

        {/* Minimal Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search title, client, or production house..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/5 border border-[#111]/10 rounded-xl text-ink text-xs font-sans placeholder:text-inkLight focus:outline-none focus:border-[#C84B2F]/60 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3.5 py-2 t-label text-[10px] tracking-[0.15em] rounded-full transition-all whitespace-nowrap ${
                  type === t ? 'bg-ink text-[#F0ECE5]' : 'bg-black/5 text-inkLight hover:text-ink'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Condensed Dense Table (Role column removed, pure title + PH + type) */}
        <div className="flex flex-col">
          {/* Table Header Bar */}
          <div className="grid grid-cols-12 gap-3 pb-3 border-b border-[#111]/20 mb-1 t-mono text-inkLight text-[10px] tracking-wider">
            <span className="col-span-2 sm:col-span-1">YEAR</span>
            <span className="col-span-7 sm:col-span-6">PROJECT TITLE</span>
            <span className="col-span-3 sm:col-span-3">PRODUCTION HOUSE / CLIENT</span>
            <span className="hidden sm:block sm:col-span-2 text-right">TYPE</span>
          </div>

          {visible.length === 0 ? (
            <p className="py-12 text-center text-inkLight text-xs font-sans">No matching records found.</p>
          ) : (
            visible.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.02, 0.2) }}
                className="group grid grid-cols-12 gap-3 py-3.5 border-b border-[#111]/8 hover:bg-black/5 -mx-5 px-5 sm:-mx-8 sm:px-8 transition-colors items-center cursor-default"
              >
                {/* Year */}
                <span className="col-span-2 sm:col-span-1 t-mono text-inkLight text-[11px] font-medium">
                  {item.year}
                </span>

                {/* Title + Sub-artist */}
                <div className="col-span-7 sm:col-span-6">
                  <span
                    className="text-ink font-bold text-sm sm:text-base uppercase tracking-tight leading-tight group-hover:text-[#C84B2F] transition-colors"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {item.title}
                  </span>
                  {item.directorOrArtist && (
                    <span className="block t-mono text-inkLight text-[10px] mt-0.5">
                      {item.directorOrArtist}
                    </span>
                  )}
                </div>

                {/* Production House */}
                <div className="col-span-3 sm:col-span-3">
                  <span className="t-mono text-inkLight text-[11px]">
                    {item.productionHouse || '—'}
                  </span>
                </div>

                {/* Type */}
                <div className="hidden sm:block sm:col-span-2 text-right">
                  <span className="t-label text-inkLight text-[10px] tracking-wider">
                    {item.type.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Expand / Collapse */}
        {filtered.length > 12 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="hover-link t-label text-ink text-[11px] tracking-[0.2em] font-bold hover:text-[#C84B2F] transition-colors"
            >
              {expanded ? 'COLLAPSE ARCHIVE' : `EXPAND COMPLETE ${filtered.length} CREDITS`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
