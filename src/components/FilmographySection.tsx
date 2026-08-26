'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Search } from 'lucide-react';

const ROLES = [
  'ALL',
  'Producer',
  'Line Producer',
  'Unit Production Manager',
  'Production Assistant',
  'Location Manager',
  'Art Director',
  'Art Crew',
  'Talent',
  'Clapper',
];

const TYPES = ['ALL', 'Short Film', 'Feature Film', 'Series', 'Mini Series', 'Music Video', 'Commercial', 'Campaign', 'Company Profile'];

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterRole, setFilterRole] = useState('ALL');

  const filtered = filmography.filter(item => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.productionHouse.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());

    const matchType = filterType === 'ALL' || item.type === filterType;
    const matchRole = filterRole === 'ALL' || item.role === filterRole;
    return matchSearch && matchType && matchRole;
  });

  return (
    <section className="section-light w-full py-16 sm:py-24 border-t border-[#111]/10" id="filmography">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">PRODUCTION INDEX</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Filmography
            </h2>
          </div>
          <span className="t-mono text-inkLight text-[11px]">{filmography.length} PRODUCTIONS LOGGED</span>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-inkLight" />
            <input
              type="text"
              placeholder="Search project, PH, or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/5 border border-black/10 rounded-xl text-ink placeholder-inkLight text-xs focus:outline-none focus:border-ink transition-colors font-mono"
            />
          </div>
        </div>

        {/* Filter: Role */}
        <div className="mb-3">
          <span className="t-mono text-inkLight text-[9px] tracking-wider uppercase font-bold mr-3">Role</span>
          <div className="inline-flex flex-wrap items-center gap-1.5">
            {ROLES.map(r => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1.5 text-[9px] rounded-lg t-label tracking-wider transition-all whitespace-nowrap ${
                  filterRole === r
                    ? 'bg-ink text-[#F0ECE5]'
                    : 'bg-black/5 text-inkLight hover:text-ink'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Filter: Type */}
        <div className="mb-8">
          <span className="t-mono text-inkLight text-[9px] tracking-wider uppercase font-bold mr-3">Type</span>
          <div className="inline-flex flex-wrap items-center gap-1.5">
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 text-[9px] rounded-lg t-label tracking-wider transition-all whitespace-nowrap ${
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

        {/* Clean 3-Column Table: Project | Role (PH) | Type */}
        <div className="border border-black/10 rounded-2xl overflow-hidden bg-black/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/10 bg-black/5 text-inkLight font-mono text-[10px] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Role · PH / Client</th>
                  <th className="py-3.5 px-4 text-right">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filtered.map(item => (
                  <tr key={item.id} className="hover:bg-black/[0.04] transition-colors group">
                    <td className="py-3.5 px-4 font-bold text-ink group-hover:text-[#C84B2F] transition-colors font-mono">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-4 text-inkLight font-mono">
                      <span className="text-ink font-semibold">{item.role}</span>
                      <span className="text-inkLight"> · {item.productionHouse}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-ink font-mono whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded bg-black/5 border border-black/5 text-[9px] uppercase font-bold tracking-wider text-inkLight">
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-inkLight font-mono text-xs">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Count */}
        <div className="mt-4 text-right">
          <span className="t-mono text-inkLight text-[10px]">
            Showing {filtered.length} of {filmography.length}
          </span>
        </div>

      </div>
    </section>
  );
}
