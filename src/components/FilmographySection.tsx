'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const TYPES = ['All', 'Short Film', 'Music Video', 'Commercial', 'Documentary'];

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;

  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [expanded, setExpanded] = useState(false);

  const filtered = filmography.filter(f => {
    const matchQ = !q || 
      f.title.toLowerCase().includes(q.toLowerCase()) || 
      f.role.toLowerCase().includes(q.toLowerCase()) ||
      f.productionHouse.toLowerCase().includes(q.toLowerCase());
    const matchType = type === 'All' || f.type === type;
    return matchQ && matchType;
  });

  const visible = expanded ? filtered : filtered.slice(0, 10);

  return (
    <section className="section-cream w-full py-12 sm:py-16 border-t border-[#111]/10" id="filmography">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.2em] mb-1">ARCHIVE</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              Filmography
            </h2>
          </div>
          <span className="t-mono text-inkLight text-[10px]">{filtered.length} CREDITS</span>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-inkLight" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search title, role, studio..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#111]/6 border border-[#111]/12 rounded-xl text-ink text-xs font-sans placeholder:text-inkLight focus:outline-none focus:border-[#C84B2F]/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-2 t-label text-[10px] tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
                  type === t ? 'bg-ink text-[#F0ECE5]' : 'text-inkLight hover:text-ink'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* List Table */}
        <div className="flex flex-col">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 pb-3 border-b border-[#111]/15 mb-1">
            <span className="col-span-1 t-mono text-inkLight text-[9px] tracking-wider">YEAR</span>
            <span className="col-span-5 t-mono text-inkLight text-[9px] tracking-wider">TITLE</span>
            <span className="col-span-3 t-mono text-inkLight text-[9px] tracking-wider hidden sm:block">STUDIO</span>
            <span className="col-span-3 t-mono text-inkLight text-[9px] tracking-wider">ROLE</span>
          </div>

          {visible.length === 0 ? (
            <p className="py-8 text-center text-inkLight text-xs font-sans">No results found.</p>
          ) : (
            visible.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                className="group grid grid-cols-12 gap-2 py-3.5 border-b border-[#111]/8 hover:bg-[#111]/4 -mx-5 px-5 sm:-mx-8 sm:px-8 transition-colors cursor-default"
              >
                <span className="col-span-1 t-mono text-inkLight text-[10px] self-center">{item.year}</span>
                <div className="col-span-5 sm:col-span-5 self-center">
                  <span
                    className="text-ink font-display font-bold text-xs sm:text-sm uppercase tracking-tight leading-tight group-hover:text-[#C84B2F] transition-colors"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {item.title}
                  </span>
                  {item.directorOrArtist && (
                    <p className="t-mono text-inkLight text-[9px] mt-0.5">{item.directorOrArtist}</p>
                  )}
                </div>
                <div className="col-span-3 self-center hidden sm:block">
                  <span className="t-mono text-inkLight text-[10px]">{item.productionHouse}</span>
                </div>
                <div className="col-span-6 sm:col-span-3 self-center">
                  <span className="t-label text-[#C84B2F] text-[9px] tracking-[0.12em]">
                    {item.role.toUpperCase()}
                  </span>
                  <span className="t-mono text-inkLight text-[9px] block mt-0.5">{item.type}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Expand / Collapse */}
        {filtered.length > 10 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="hover-link t-label text-ink text-[10px] tracking-[0.18em] hover:text-[#C84B2F] transition-colors"
            >
              {expanded ? 'SHOW LESS' : `VIEW ALL ${filtered.length} CREDITS`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
