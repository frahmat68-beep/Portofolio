'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'short-film', label: 'SHORT FILM' },
  { id: 'music-video', label: 'MUSIC VIDEO' },
  { id: 'commercial', label: 'COMMERCIAL' },
  { id: 'art-dept', label: 'ART DEPT' },
];

const ROLES = [
  { id: 'all', label: 'ALL ROLES' },
  { id: 'Producer', label: 'PRODUCER' },
  { id: 'Line Producer', label: 'LINE PRODUCER' },
  { id: 'Art Director', label: 'ART DIRECTOR' },
];

export default function BentoShowcase() {
  const { data } = usePortfolio();
  const { projects, profile } = data;

  const [activeCat, setActiveCat] = useState('all');
  const [activeRole, setActiveRole] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    const matchCat = activeCat === 'all' || p.category === activeCat;
    const matchRole = activeRole === 'all' || p.role.toLowerCase().includes(activeRole.toLowerCase());
    return matchCat && matchRole;
  });

  return (
    <section className="section-light w-full py-12 sm:py-16" id="works">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.2em] mb-1">SELECTED WORK</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              Productions
            </h2>
          </div>
          <p className="t-mono text-inkLight text-[10px]">
            {filtered.length}/{projects.length} RELEASES
          </p>
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center justify-between mb-8">
          {/* Category filters */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-3 py-1.5 t-label text-[10px] tracking-[0.15em] rounded-full transition-all whitespace-nowrap ${
                  activeCat === c.id
                    ? 'bg-ink text-[#F0ECE5]'
                    : 'text-inkLight hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Role filters */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`px-3 py-1.5 t-mono text-[10px] tracking-[0.12em] rounded-full transition-all whitespace-nowrap ${
                  activeRole === r.id
                    ? 'text-[#C84B2F] border-b border-[#C84B2F]'
                    : 'text-inkLight hover:text-ink'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid — LoveAndMoney 2-column editorial style */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const isFeatured = project.featured && idx === 0;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(project)}
                  data-cursor="VIEW"
                  className={`project-card group ${isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                >
                  {/* Image Container */}
                  <div className={`overflow-hidden bg-creamDark ${isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.posterUrl}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>

                  {/* Meta below image (no card box, pure text) */}
                  <div className="project-card-meta">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="project-card-title">{project.title}</h3>
                      <span className="t-mono text-inkLight text-[10px] flex-shrink-0">{project.year}</span>
                    </div>
                    {/* Tags row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="t-label text-[#C84B2F] text-[10px] tracking-[0.15em]">
                        {project.role.toUpperCase()}
                      </span>
                      {project.tags?.slice(0, 2).map((tag, i) => (
                        <React.Fragment key={i}>
                          <span className="text-inkLight text-[10px]">·</span>
                          <span className="t-label text-inkLight text-[10px] tracking-[0.12em]">
                            {tag.toUpperCase()}
                          </span>
                        </React.Fragment>
                      ))}
                      {project.productionHouse && (
                        <>
                          <span className="text-inkLight text-[10px]">·</span>
                          <span className="t-mono text-inkLight text-[10px]">{project.productionHouse}</span>
                        </>
                      )}
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
        whatsappNumber={profile.contact.whatsapp}
      />
    </section>
  );
}
