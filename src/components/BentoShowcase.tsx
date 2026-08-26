'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project, ProjectCategory } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'ALL WORKS' },
  { id: 'Short Film', label: 'SHORT FILM' },
  { id: 'Series', label: 'SERIES' },
  { id: 'Commercial', label: 'COMMERCIAL' },
  { id: 'Music Video', label: 'MUSIC VIDEO' },
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
    <section className="section-light w-full py-16 sm:py-24" id="works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">FEATURED ARCHIVE</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              Selected Works
            </h2>
          </div>
          <p className="t-mono text-inkLight text-[11px]">
            {filtered.length} PRODUCTIONS LOGGED
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

        {/* Pure Showcase Grid (Adaptive Love & Money Style) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const isHeroCard = idx === 0 && activeCat === 'all';
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.2) }}
                  onClick={() => setSelected(project)}
                  className={`project-card group cursor-pointer ${isHeroCard ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                >
                  {/* Visual Poster Container */}
                  <div className={`overflow-hidden bg-[#161616] relative w-full ${
                    isHeroCard 
                      ? 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9]' 
                      : 'aspect-[4/3] sm:aspect-[16/10]'
                  } rounded-2xl border border-black/5 shadow-sm group-hover:shadow-xl transition-all duration-500`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.posterUrl || '/assets/projects/darah-nyai_imajinarium-pictures/DSC00063.jpg'}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Category Tag Badge */}
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-[9px] t-mono text-[#F0ECE5] uppercase tracking-wider font-semibold">
                      {project.category}
                    </div>

                    {/* Video Count Indicator */}
                    {project.videos.length > 1 && (
                      <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#C84B2F]/90 backdrop-blur-md text-[9px] t-mono text-white uppercase tracking-wider font-bold flex items-center gap-1">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>{project.videos.length} VIDEOS</span>
                      </div>
                    )}

                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 rounded-full bg-black/85 text-[#F0ECE5] t-label text-[10px] tracking-widest backdrop-blur-md shadow-lg">
                        VIEW PROJECT
                      </span>
                    </div>
                  </div>

                  {/* Clean Typography Metadata */}
                  <div className="project-card-meta mt-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        className="project-card-title font-bold text-base sm:text-lg uppercase text-ink group-hover:text-[#C84B2F] transition-colors line-clamp-1"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {project.title}
                      </h3>
                      {project.year && (
                        <span className="t-mono text-inkLight text-[11px] font-semibold flex-shrink-0">{project.year}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 t-mono text-inkLight text-[10px] uppercase truncate">
                      {project.client && <span>{project.client}</span>}
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
