'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'ALL RELEASES' },
  { id: 'short-film', label: 'FILMS & NARRATIVE' },
  { id: 'music-video', label: 'MUSIC VIDEOS' },
  { id: 'commercial', label: 'COMMERCIAL & BRAND' },
];

export default function BentoShowcase() {
  const { data } = usePortfolio();
  const { projects } = data;

  const [activeCat, setActiveCat] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    return activeCat === 'all' || p.category === activeCat;
  });

  return (
    <section className="section-light w-full py-14 sm:py-20" id="works">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">VISUAL VAULT</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Selected Works
            </h2>
          </div>
          <p className="t-mono text-inkLight text-[11px]">
            {filtered.length} FEATURED PROJECTS
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 pb-1">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2 t-label text-[10px] tracking-[0.18em] rounded-full transition-all whitespace-nowrap ${
                activeCat === c.id
                  ? 'bg-ink text-[#F0ECE5]'
                  : 'bg-black/5 text-inkLight hover:text-ink hover:bg-black/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Pure Showcase Grid (Editorial Layout) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const isHeroCard = idx === 0 && activeCat === 'all';
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.2) }}
                  onClick={() => setSelected(project)}
                  className={`project-card group cursor-pointer ${isHeroCard ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                >
                  {/* Visual Poster Container */}
                  <div className={`overflow-hidden bg-creamDark relative ${isHeroCard ? 'aspect-[16/9]' : 'aspect-[4/3]'} rounded-xl`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.posterUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle hover overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-black/80 text-[#F0ECE5] t-label text-[10px] tracking-widest backdrop-blur-sm">
                        VIEW PROJECT
                      </span>
                    </div>
                  </div>

                  {/* Metadata (Clean, Simple, Show-off only) */}
                  <div className="project-card-meta mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        className="project-card-title font-bold text-base sm:text-lg uppercase text-ink group-hover:text-[#C84B2F] transition-colors"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {project.title}
                      </h3>
                      <span className="t-mono text-inkLight text-[11px] flex-shrink-0">{project.year}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 t-mono text-inkLight text-[10px] uppercase">
                      {project.productionHouse && <span>{project.productionHouse}</span>}
                      {project.client && <span>• {project.client}</span>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
