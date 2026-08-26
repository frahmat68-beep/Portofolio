'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'ALL WORKS' },
  { id: 'Short Film', label: 'SHORT FILM' },
  { id: 'Series', label: 'SERIES' },
  { id: 'Commercial', label: 'COMMERCIAL' },
  { id: 'Music Video', label: 'MUSIC VIDEO' },
];

function ProjectCard({ project, idx, isHero, isTall, onSelect }: {
  project: Project;
  idx: number;
  isHero?: boolean;
  isTall?: boolean;
  onSelect: (p: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay video muted loop on hover or viewport entry (IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.25) }}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`project-card group cursor-pointer ${
        isHero ? 'sm:col-span-2 lg:col-span-2' : isTall ? 'sm:row-span-2' : ''
      }`}
    >
      {/* Dynamic Visual / Video Container */}
      <div className={`overflow-hidden bg-[#111111] relative w-full ${
        isHero 
          ? 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9]' 
          : isTall
          ? 'aspect-[3/4] sm:aspect-[9/16]'
          : 'aspect-[4/3] sm:aspect-[16/10]'
      } rounded-3xl border border-black/5 shadow-sm group-hover:shadow-2xl transition-all duration-700`}>
        
        {/* If project has preview video, render autoplay muted loop */}
        {project.previewVideoUrl ? (
          <video
            ref={videoRef}
            src={project.previewVideoUrl}
            muted
            loop
            playsInline
            poster={project.posterUrl}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : project.posterUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.posterUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#161616] to-[#0A0A0A] p-6 text-center">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              {project.title}
            </span>
          </div>
        )}

        {/* Minimal Hover Overlay ala L&M: Clean title & category label appearing subtly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 sm:p-8">
          <div className="flex justify-end">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[9px] t-mono text-white uppercase tracking-widest font-semibold">
              {project.category}
            </span>
          </div>
          <div>
            <h3 
              className="text-white font-bold text-lg sm:text-2xl uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
            {project.client && (
              <p className="text-gray-300 text-xs font-mono mt-1">
                {project.client}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Clean Metadata below card (Minimal title + Category) */}
      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <h3 
          className="font-bold text-base sm:text-lg uppercase text-ink group-hover:text-[#C84B2F] transition-colors line-clamp-1"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {project.title}
        </h3>
        <span className="t-mono text-inkLight text-[11px] font-semibold flex-shrink-0 uppercase">
          {project.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function BentoShowcase() {
  const { data } = usePortfolio();
  const { projects } = data;

  const [activeCat, setActiveCat] = useState('all');
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter(p => {
    return activeCat === 'all' || p.category === activeCat;
  });

  return (
    <section className="section-light w-full py-20 sm:py-32" id="works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-[#111]/10 pb-8">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.25em] mb-1">FEATURED ARCHIVE</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
            >
              Selected Works
            </h2>
          </div>
          <p className="t-mono text-inkLight text-[11px]">
            {filtered.length} PRODUCTIONS LOGGED
          </p>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar mb-14 pb-1">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-5 py-2.5 t-label text-[10px] tracking-[0.18em] rounded-full transition-all whitespace-nowrap ${
                activeCat === c.id
                  ? 'bg-ink text-[#F0ECE5]'
                  : 'bg-black/5 text-inkLight hover:text-ink hover:bg-black/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Dynamic Bento Grid Layout (Asymmetric Love & Money Rhythm) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const isHero = (idx === 0 || idx === 6) && activeCat === 'all';
              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  idx={idx}
                  isHero={isHero}
                  onSelect={setSelected}
                />
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
