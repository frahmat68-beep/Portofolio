'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Search } from 'lucide-react';

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const types = ['ALL', 'Short Film', 'Series', 'Commercial', 'Music Video'];

  const filtered = filmography.filter(item => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.productionHouse.toLowerCase().includes(search.toLowerCase()) ||
      (item.directorOrArtist && item.directorOrArtist.toLowerCase().includes(search.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(search.toLowerCase()));

    const matchType = filterType === 'ALL' || item.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <section className="section-light w-full py-16 sm:py-24 border-t border-[#111]/10" id="filmography">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">COMPLETE LOGBOOK</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Filmography
            </h2>
          </div>
          <span className="t-mono text-inkLight text-[11px]">{filmography.length} PRODUCTIONS REGISTERED</span>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight" />
            <input
              type="text"
              placeholder="Filter by title, PH, artist..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/5 border border-black/10 rounded-xl text-ink placeholder-inkLight text-xs focus:outline-none focus:border-ink transition-colors font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-2 text-[10px] rounded-lg t-label tracking-wider transition-all whitespace-nowrap ${
                  filterType === t
                    ? 'bg-ink text-[#F0ECE5]'
                    : 'bg-black/5 text-inkLight hover:text-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Dense Minimalist Archive Table */}
        <div className="border border-black/10 rounded-2xl overflow-hidden bg-black/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-black/5 text-inkLight font-mono text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4 w-20">Year</th>
                  <th className="py-3 px-4">Project / Release</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Production House / Client</th>
                  <th className="py-3 px-4 hidden md:table-cell">Type</th>
                  <th className="py-3 px-4 text-right">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-black/[0.04] transition-colors group">
                    <td className="py-3.5 px-4 font-mono font-bold text-ink">{item.year}</td>
                    <td className="py-3.5 px-4 font-bold text-ink group-hover:text-[#C84B2F] transition-colors font-mono">
                      {item.title}
                      <span className="sm:hidden block text-[10px] text-inkLight font-normal mt-0.5">
                        {item.productionHouse}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-inkLight font-mono hidden sm:table-cell">
                      {item.productionHouse}
                    </td>
                    <td className="py-3.5 px-4 text-inkLight font-mono hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded bg-black/5 text-[9px] uppercase font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-inkLight font-mono text-[11px]">
                      {item.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
