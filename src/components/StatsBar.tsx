'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { motion } from 'framer-motion';

export default function StatsBar() {
  const { data } = usePortfolio();
  const { stats } = data.profile;

  const items = [
    { value: stats.totalProductions || '30+', label: 'Productions' },
    { value: stats.shortFilms || '12+', label: 'Short Films' },
    { value: stats.musicVideos || '10+', label: 'Music Videos' },
    { value: stats.experienceYears || '4+', label: 'Years' },
  ];

  return (
    <section className="section-light w-full py-10 sm:py-14 border-b border-[#111]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className={`flex flex-col items-center sm:items-start px-6 py-4 ${idx < items.length - 1 ? 'border-r border-[#111]/10' : ''}`}
            >
              <span
                className="text-ink font-display font-black"
                style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
              >
                {item.value}
              </span>
              <span className="t-label text-inkLight mt-1 text-[10px] tracking-[0.15em]">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
