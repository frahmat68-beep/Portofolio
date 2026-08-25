'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Film, Music2, Clapperboard, Award } from 'lucide-react';

export default function StatsBar() {
  const { data } = usePortfolio();
  const { stats } = data.profile;

  const statItems = [
    {
      icon: Clapperboard,
      value: stats.totalProductions || '30+',
      label: 'Kredit Produksi',
      color: 'text-cinemaAmber',
      bg: 'bg-cinemaAmber/10',
    },
    {
      icon: Film,
      value: stats.shortFilms || '12+',
      label: 'Short Films',
      color: 'text-cinemaCyan',
      bg: 'bg-cinemaCyan/10',
    },
    {
      icon: Music2,
      value: stats.musicVideos || '10+',
      label: 'Music Videos',
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
    },
    {
      icon: Award,
      value: stats.experienceYears || '4+ Thn',
      label: 'Pengalaman',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
  ];

  return (
    <section className="w-full max-w-2xl mx-auto px-4 my-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-3.5 flex flex-col items-center justify-center text-center transition-all hover:border-white/20"
            >
              <div className={`p-2 rounded-xl ${item.bg} mb-1.5`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                {item.value}
              </span>
              <span className="text-[11px] text-gray-400 font-medium">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
