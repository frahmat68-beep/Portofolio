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
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel rounded-3xl p-4 sm:p-5 flex items-center gap-4 transition-all hover:border-white/20"
            >
              <div className={`p-3 rounded-2xl ${item.bg} flex-shrink-0`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
              </div>
              <div>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white tracking-tight block">
                  {item.value}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {item.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
