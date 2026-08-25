'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  ScrollText, 
  Search, 
  ChevronDown, 
  ChevronUp, 
} from 'lucide-react';

export default function FilmographySection() {
  const { data } = usePortfolio();
  const { filmography } = data;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const types = ['All', 'Short Film', 'Music Video', 'Commercial', 'Documentary'];

  // Filter filmography entries
  const filteredList = filmography.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productionHouse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'All' || item.type === filterType;

    return matchesSearch && matchesType;
  });

  const displayedList = isExpanded ? filteredList : filteredList.slice(0, 8);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6" id="filmography">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <ScrollText className="w-6 h-6 text-cinemaCyan" />
            <span>Complete Filmography Log</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Daftar rekam jejak 30+ produksi & kolaborasi
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full glass-pill text-cinemaCyan border border-cinemaCyan/30 self-start sm:self-auto">
          {filteredList.length} Kredit
        </span>
      </div>

      {/* Search & Quick Filters Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
        {/* Search Bar */}
        <div className="relative md:col-span-7">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul film, peran (Producer, UPM, dll), atau studio..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surfaceElevated border border-surfaceBorder text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cinemaAmber transition-colors"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar md:col-span-5">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                filterType === type
                  ? 'bg-cinemaCyan/20 text-cyan-300 border border-cinemaCyan/40 font-semibold'
                  : 'glass-pill text-gray-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Production List: 2 columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {displayedList.length === 0 ? (
          <div className="md:col-span-2 glass-panel rounded-3xl p-8 text-center text-gray-400 text-sm">
            Tidak ada produksi yang cocok dengan pencarian &quot;{searchQuery}&quot;.
          </div>
        ) : (
          displayedList.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-4 transition-all hover:border-white/20 flex items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                {/* Year Pill */}
                <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-surfaceElevated border border-white/5 text-gray-300 flex-shrink-0">
                  {item.year}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                    <h3 className="text-sm font-bold text-white truncate">
                      {item.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.2 rounded-full glass-pill text-gray-400 flex-shrink-0">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 truncate">
                    <span className="text-cinemaCyan font-medium">{item.productionHouse}</span>
                    {item.directorOrArtist && (
                      <span className="text-gray-500"> • {item.directorOrArtist}</span>
                    )}
                  </p>
                  
                  {item.notes && (
                    <p className="text-[11px] text-gray-500 mt-0.5 italic truncate">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Role Badge */}
              <div className="flex-shrink-0">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-xl badge-producer whitespace-nowrap">
                  {item.role}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Expand / Collapse Button */}
      {filteredList.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-panel text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:border-cinemaAmber transition-all shadow-lg"
          >
            {isExpanded ? (
              <>
                <span>Tampilkan Lebih Sedikit</span>
                <ChevronUp className="w-4 h-4 text-cinemaAmber" />
              </>
            ) : (
              <>
                <span>Lihat Semua ({filteredList.length} Kredit)</span>
                <ChevronDown className="w-4 h-4 text-cinemaAmber" />
              </>
            )}
          </button>
        </div>
      )}

    </section>
  );
}
