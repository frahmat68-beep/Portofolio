'use client';

import React, { useState, useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { FilmographyEntry } from '@/types/portfolio';
import { Search, Clapperboard, Film, Tv, Video, Sparkles, Layers, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Department categories tailored to Kiki's professional roles
const DEPARTMENTS = [
  { id: 'ALL', label: 'All Works', countRole: null },
  { id: 'PRODUCER', label: 'Producer', roles: ['Producer'] },
  { id: 'LINE_PRODUCER', label: 'Line Producer', roles: ['Line Producer'] },
  { id: 'UPM', label: 'Unit Production Manager', roles: ['Unit Production Manager'] },
  { id: 'PA', label: 'Production Assistant', roles: ['Production Assistant', 'Location Manager'] },
  { id: 'ART', label: 'Art Department', roles: ['Art Director', 'Art Crew'] },
  { id: 'ON_SET', label: 'On-Set & Talent', roles: ['Clapper', 'Talent'] },
];

const TYPE_FILTERS = [
  { id: 'ALL', label: 'All Formats' },
  { id: 'FILM', label: 'Films', types: ['Short Film', 'Feature Film'] },
  { id: 'SERIES', label: 'Series', types: ['Series', 'Mini Series'] },
  { id: 'MV', label: 'Music Videos', types: ['Music Video'] },
  { id: 'COMMERCIAL', label: 'Commercial & Brand', types: ['Commercial', 'Campaign', 'Company Profile'] },
];

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;

  const [search, setSearch] = useState('');
  const [activeDept, setActiveDept] = useState('ALL');
  const [activeType, setActiveType] = useState('ALL');

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

      // 2. Department / Role Filter
      let matchDept = true;
      if (activeDept !== 'ALL') {
        const dept = DEPARTMENTS.find(d => d.id === activeDept);
        if (dept && dept.roles) {
          matchDept = dept.roles.includes(item.role);
        }
      }

      // 3. Type / Format Filter
      let matchType = true;
      if (activeType !== 'ALL') {
        const typeGroup = TYPE_FILTERS.find(t => t.id === activeType);
        if (typeGroup && typeGroup.types) {
          matchType = typeGroup.types.includes(item.type);
        }
      }

      return matchSearch && matchDept && matchType;
    });
  }, [filmography, search, activeDept, activeType]);

  // Role Badge Styling Helper
  const getRoleBadgeStyle = (role: string) => {
    if (role === 'Producer' || role === 'Line Producer') {
      return 'bg-[#C84B2F]/10 text-[#C84B2F] border-[#C84B2F]/30';
    }
    if (role === 'Unit Production Manager') {
      return 'bg-[#2A4D69]/10 text-[#2A4D69] border-[#2A4D69]/30';
    }
    if (role.includes('Art')) {
      return 'bg-[#6B4E71]/10 text-[#6B4E71] border-[#6B4E71]/30';
    }
    if (role.includes('Assistant') || role.includes('Location')) {
      return 'bg-[#4B6584]/10 text-[#4B6584] border-[#4B6584]/30';
    }
    return 'bg-black/5 text-gray-700 border-black/10';
  };

  return (
    <section className="section-light w-full py-20 sm:py-28 md:py-36 border-t border-black/10" id="filmography">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-black/10 pb-8">
          <div>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Filmography
            </h2>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-2 md:pt-0">
            <div className="border-l border-black/15 pl-3 sm:pl-4">
              <p className="text-xl sm:text-3xl font-black text-ink font-mono">{stats.films}</p>
              <p className="text-[10px] sm:text-xs font-mono text-inkLight uppercase tracking-wider">Films</p>
            </div>
            <div className="border-l border-black/15 pl-3 sm:pl-4">
              <p className="text-xl sm:text-3xl font-black text-ink font-mono">{stats.series}</p>
              <p className="text-[10px] sm:text-xs font-mono text-inkLight uppercase tracking-wider">Series</p>
            </div>
            <div className="border-l border-black/15 pl-3 sm:pl-4">
              <p className="text-xl sm:text-3xl font-black text-ink font-mono">{stats.commercial}</p>
              <p className="text-[10px] sm:text-xs font-mono text-inkLight uppercase tracking-wider">Commercials</p>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar */}
        <div className="space-y-4 mb-8 sm:mb-10">
          
          {/* Search Input Bar */}
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight pointer-events-none" />
            <input
              type="text"
              placeholder="Search title, studio/client, or specific role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-black/10 rounded-2xl text-ink placeholder-inkLight/60 text-xs sm:text-sm focus:outline-none focus:border-[#C84B2F] focus:ring-2 focus:ring-[#C84B2F]/10 transition-all font-mono shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-inkLight hover:text-ink px-1.5 py-0.5 rounded bg-black/5"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Department Filter Pills (Horizontal Scroll on Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
            <span className="text-[10px] font-mono uppercase font-bold text-inkLight mr-1 shrink-0">
              ROLE:
            </span>
            {DEPARTMENTS.map(dept => {
              const isActive = activeDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-[11px] font-mono font-medium transition-all shrink-0 border ${
                    isActive
                      ? 'bg-ink text-[#F0ECE5] border-ink shadow-sm'
                      : 'bg-white/70 text-inkLight border-black/10 hover:border-black/30 hover:text-ink'
                  }`}
                >
                  <span>{dept.label}</span>
                </button>
              );
            })}
          </div>

          {/* Format Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] font-mono uppercase font-bold text-inkLight mr-1 shrink-0">
              TYPE:
            </span>
            {TYPE_FILTERS.map(type => {
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all shrink-0 border ${
                    isActive
                      ? 'bg-[#C84B2F] text-white border-[#C84B2F] font-bold'
                      : 'bg-white/50 text-inkLight border-black/10 hover:border-black/25 hover:text-ink'
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter & Active Filter summary */}
        <div className="flex items-center justify-between text-xs font-mono text-inkLight mb-4 px-1">
          <span>
            SHOWING <strong className="text-ink">{filtered.length}</strong> OF {filmography.length} PRODUCTIONS
          </span>
          {(activeDept !== 'ALL' || activeType !== 'ALL' || search) && (
            <button
              onClick={() => {
                setActiveDept('ALL');
                setActiveType('ALL');
                setSearch('');
              }}
              className="text-[#C84B2F] hover:underline font-bold text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* ─── DUAL RESPONSIVE LIST DESIGN ─── */}

        {/* 1. Desktop & Laptop View: Ultra-Clean Minimalist Index Rows (Hidden on Mobile) */}
        <div className="hidden md:block border border-black/10 rounded-3xl overflow-hidden bg-white shadow-sm">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-black/[0.03] border-b border-black/10 text-[10px] font-mono uppercase tracking-widest text-inkLight font-bold">
            <div className="col-span-1">#</div>
            <div className="col-span-5">PROJECT TITLE</div>
            <div className="col-span-4">ROLE & CLIENT / PH</div>
            <div className="col-span-2 text-right">FORMAT</div>
          </div>

          <div className="divide-y divide-black/5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.15) }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-black/[0.025] transition-colors group relative"
                >
                  {/* Subtle hover indicator bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C84B2F] opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Index */}
                  <div className="col-span-1 text-xs font-mono text-inkLight/60 group-hover:text-ink transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Project Title */}
                  <div className="col-span-5 pr-2">
                    <h4
                      className="font-bold text-sm lg:text-base uppercase text-ink group-hover:text-[#C84B2F] transition-colors truncate"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {item.title}
                    </h4>
                  </div>

                  {/* Role & Studio */}
                  <div className="col-span-4 flex items-center gap-2 min-w-0">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-tight border shrink-0 ${getRoleBadgeStyle(item.role)}`}>
                      {item.role}
                    </span>
                    <span className="text-xs font-mono text-inkLight truncate">
                      {item.productionHouse}
                    </span>
                  </div>

                  {/* Format Pill */}
                  <div className="col-span-2 text-right">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-black/5 text-[10px] font-mono font-bold uppercase tracking-wider text-inkLight border border-black/5">
                      {item.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="py-16 text-center text-inkLight font-mono text-xs">
                No productions match the selected filters.
              </div>
            )}
          </div>
        </div>

        {/* 2. Mobile & Tablet View: Engaging, Highly-Legible Stacked Cards (Hidden on Desktop) */}
        <div className="block md:hidden space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2) }}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3 relative overflow-hidden"
              >
                {/* Top: Role Pill & Type */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-tight border ${getRoleBadgeStyle(item.role)}`}>
                    {item.role}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[9px] font-mono font-bold uppercase tracking-wider text-inkLight">
                    {item.type}
                  </span>
                </div>

                {/* Middle: Title */}
                <div>
                  <h4
                    className="font-bold text-base sm:text-lg uppercase text-ink leading-snug"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {item.title}
                  </h4>
                </div>

                {/* Bottom: Studio / Client Info */}
                <div className="pt-1 border-t border-black/5 flex items-center justify-between text-xs font-mono text-inkLight">
                  <span className="text-[11px] truncate">
                    {item.productionHouse}
                  </span>
                  <span className="text-[9px] text-inkLight/50 font-bold shrink-0">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-inkLight font-mono text-xs bg-white rounded-2xl border border-black/10">
              No productions match the selected filters.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
