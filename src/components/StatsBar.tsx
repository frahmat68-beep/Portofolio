'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Film, Music2, Clapperboard, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsBar() {
  const { data } = usePortfolio();
  const { stats } = data.profile;

  const statItems = [
    {
      icon: Clapperboard,
      value: stats.totalProductions || '30+',
      label: 'Production Credits',
      sublabel: 'Kredit Produksi',
      color: 'text-cinemaAmber',
      bg: 'bg-cinemaAmber/10',
      border: 'border-cinemaAmber/20',
      glow: 'group-hover:shadow-glowAmber',
    },
    {
      icon: Film,
      value: stats.shortFilms || '12+',
      label: 'Short Films',
      sublabel: 'Narrative & Drama',
      color: 'text-cinemaCyan',
      bg: 'bg-cinemaCyan/10',
      border: 'border-cinemaCyan/20',
      glow: 'group-hover:shadow-glowCyan',
    },
    {
      icon: Music2,
      value: stats.musicVideos || '10+',
      label: 'Music Videos',
      sublabel: 'Artist Collaborations',
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
      border: 'border-pink-400/20',
      glow: '',
    },
    {
      icon: Award,
      value: stats.experienceYears || '4+',
      label: 'Years in Industry',
      sublabel: 'SAE Institute Alumni',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      glow: '',
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-6">
      {/* A24 Stats: Horizontal Film Frame Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className={`group glass-panel rounded-3xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 transition-all hover:border-white/20 hover:-translate-y-0.5 ${item.glow} border ${item.border}`}
            >
              <div className={`p-3 rounded-2xl ${item.bg} flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
              </div>
              <div>
                <span className={`text-2xl sm:text-3xl font-bold font-display tracking-tight block ${item.color}`}>
                  {item.value}
                </span>
                <span className="text-xs sm:text-sm text-white font-semibold block">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  {item.sublabel}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
