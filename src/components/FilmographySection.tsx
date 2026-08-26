'use client';

import React, { useState, useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { FilmographyEntry } from '@/types/portfolio';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'ALL', label: 'All Works' },
  { id: 'FILM', label: 'Films', types: ['Short Film', 'Feature Film'] },
  { id: 'SERIES', label: 'Series', types: ['Series', 'Mini Series'] },
  { id: 'COMMERCIAL', label: 'Commercial & MVs', types: ['Commercial', 'Campaign', 'Music Video', 'Company Profile'] },
];

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Career Summary Metrics
  const stats = useMemo(() => {
    const total = filmography.length;
    const films = filmography.filter(f => f.type === 'Short Film' || f.type === 'Feature Film').length;
    const series = filmography.filter(f => f.type === 'Series' || f.type === 'Mini Series').length;
    const commercial = filmography.filter(f => ['Commercial', 'Campaign', 'Music Video', 'Company Profile'].includes(f.type)).length;
    return { total, films, series, commercial };
  }, [filmography]);

  // Filtering Logic
  const filtered = useMemo(() => {
    return filmography.filter(item => {
      // 1. Search Query
      const matchSearch =
        search === '' ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.productionHouse.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      // 2. Category Filter
      let matchCat = true;
      if (activeCategory !== 'ALL') {
        const cat = CATEGORIES.find(c => c.id === activeCategory);
        if (cat && cat.types) {
          matchCat = cat.types.includes(item.type);
        }
      }

      return matchSearch && matchCat;
    });
  }, [filmography, search, activeCategory]);

  return (
    <section className="section-light w-full py-16 sm:py-24 md:py-32 border-t border-black/10 overflow-hidden" id="filmography">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header with Bi-Directional Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-black/10 pb-8"
        >
          <div>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Filmography
            </h2>
          </div>

          {/* Clean Key Metrics Overview */}
          <div className="flex items-center gap-6 sm:gap-8 text-xs font-mono text-inkLight">
            <div>
              <span className="text-ink font-bold text-base sm:text-xl">{stats.films}</span> FILMS
            </div>
            <span className="text-black/20">•</span>
            <div>
              <span className="text-ink font-bold text-base sm:text-xl">{stats.series}</span> SERIES
            </div>
            <span className="text-black/20">•</span>
            <div>
              <span className="text-ink font-bold text-base sm:text-xl">{stats.commercial}</span> COMMERCIALS & MVS
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 text-xs font-mono font-medium rounded-full transition-all whitespace-nowrap border ${
                  activeCategory === c.id
                    ? 'bg-ink text-[#F0ECE5] border-ink shadow-sm'
                    : 'bg-white/70 text-inkLight border-black/10 hover:border-black/30 hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight pointer-events-none" />
            <input
              type="text"
              placeholder="Search project, client, or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-full text-ink placeholder-inkLight/60 text-xs focus:outline-none focus:border-[#C84B2F] transition-all font-mono"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-inkLight hover:text-ink px-1.5 py-0.5 rounded bg-black/5"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* ─── DESKTOP & TABLET TABLE LAYOUT (Clean, Aligned, Proportional) ─── */}
        <div className="hidden md:block bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm">
          <div className="flex items-center px-6 py-4 bg-black/[0.03] border-b border-black/10 text-[10px] font-mono uppercase tracking-widest text-inkLight font-bold">
            <div className="w-12">#</div>
            <div className="flex-1 pr-4">PROJECT TITLE</div>
            <div className="w-56 pr-4">ROLE</div>
            <div className="w-56 pr-4">PRODUCTION HOUSE / CLIENT</div>
            <div className="w-32 text-right">TYPE</div>
          </div>

          <div className="divide-y divide-black/5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.015, 0.15) }}
                  className="flex items-center px-6 py-4 hover:bg-black/[0.025] transition-colors group relative"
                >
                  {/* Hover Left Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C84B2F] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Number */}
                  <div className="w-12 text-xs font-mono text-inkLight/60 group-hover:text-ink">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <div className="flex-1 pr-4 min-w-0">
                    <h4
                      className="font-bold text-sm lg:text-base uppercase text-ink group-hover:text-[#C84B2F] transition-colors truncate"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {item.title}
                    </h4>
                  </div>

                  {/* Role */}
                  <div className="w-56 pr-4 truncate font-mono text-xs text-ink font-semibold">
                    {item.role}
                  </div>

                  {/* PH / Client */}
                  <div className="w-56 pr-4 truncate font-mono text-xs text-inkLight">
                    {item.productionHouse}
                  </div>

                  {/* Type */}
                  <div className="w-32 text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-black/5 text-[10px] font-mono font-medium text-inkLight uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="py-16 text-center text-inkLight font-mono text-xs">
                No productions found matching &ldquo;{search}&rdquo;.
              </div>
            )}
          </div>
        </div>

        {/* ─── SMARTPHONE / MOBILE ADAPTIVE LIST (Touch-Perfect, Zero Horizontal Clipping) ─── */}
        <div className="block md:hidden space-y-3 w-full">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.15) }}
                className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm space-y-2 w-full min-w-0"
              >
                {/* Top: Index + Type */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-inkLight/70 font-bold">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[9px] font-mono uppercase tracking-wider text-inkLight font-medium">
                    {item.type}
                  </span>
                </div>

                {/* Title (Full Wrap, No Clipping) */}
                <h4
                  className="font-bold text-base uppercase text-ink leading-tight break-words"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {item.title}
                </h4>

                {/* Role & Studio */}
                <div className="pt-2 border-t border-black/5 flex flex-col gap-0.5 text-xs font-mono">
                  <div className="text-ink font-semibold">
                    {item.role}
                  </div>
                  <div className="text-inkLight text-[11px]">
                    {item.productionHouse}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-inkLight font-mono text-xs bg-white rounded-2xl border border-black/10">
              No productions found.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
