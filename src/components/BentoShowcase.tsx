'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'Short Film', label: 'Short Films' },
  { id: 'Series', label: 'Series' },
  { id: 'Commercial', label: 'Commercial' },
  { id: 'Music Video', label: 'Music Videos' },
];

function ProjectCard({ project, idx, isHero, onOpenModal }: {
  project: Project;
  idx: number;
  isHero?: boolean;
  onOpenModal: (p: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Autoplay video muted loop on viewport entry (IntersectionObserver)
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
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCardClick = () => {
    onOpenModal(project);
  };

  const isBrandLogo = project.posterUrl?.includes('logo-brand');

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, delay: Math.min((idx % 3) * 0.08, 0.2), ease: [0.16, 1, 0.3, 1] }}
      onClick={handleCardClick}
      className={`project-card group cursor-pointer flex flex-col w-full min-w-0 ${
        isHero ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Living Video / Visual Cover Container with Fluid Adaptive Aspect Ratios */}
      <div className={`overflow-hidden bg-[#0F0F0F] relative w-full ${
        isHero
          ? 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9]'
          : 'aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10]'
      } rounded-2xl sm:rounded-3xl border border-black/10 shadow-sm group-hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.015]`}>

        {/* Living Cover Video (Autoplay loop muted) */}
        {project.previewVideoUrl ? (
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              src={project.previewVideoUrl}
              muted
              loop
              playsInline
              poster={project.posterUrl}
              onLoadedData={() => setIsVideoLoaded(true)}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : project.posterUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.posterUrl}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full ${
              isBrandLogo
                ? 'object-contain p-8 sm:p-14 bg-[#121212]'
                : 'object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100'
            } transition-all duration-700 ease-out group-hover:scale-105`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#161616] p-6 text-center">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              {project.title}
            </span>
          </div>
        )}

        {/* Minimal Editorial Overlay on Hover / Touch */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-7">
          
          {/* Top Row: Category */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-white/95 uppercase tracking-widest font-bold border border-white/10">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C84B2F] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg">
              <Eye className="w-3 h-3" />
              <span>Overview</span>
            </span>
          </div>

          {/* Bottom Title & Client on Hover */}
          <div className="space-y-1">
            <h3
              className="text-white font-bold text-base sm:text-2xl uppercase tracking-tight line-clamp-2"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {project.title}
            </h3>
            {project.client && (
              <p className="text-gray-300 text-xs font-mono line-clamp-1">
                {project.client} {project.role && `• ${project.role}`}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Clean Metadata below card (Always Visible & Accessible on Mobile/Touch) */}
      <div className="mt-3.5 flex items-baseline justify-between gap-2 px-1 w-full min-w-0">
        <div className="min-w-0 flex-1">
          <h3
            className="font-bold text-sm sm:text-base md:text-lg uppercase text-ink group-hover:text-[#C84B2F] transition-colors truncate"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono text-inkLight truncate mt-0.5">
            {project.client || project.role}
          </p>
        </div>
        <span className="font-mono text-inkLight text-[10px] sm:text-[11px] font-bold shrink-0 uppercase tracking-wider px-2 py-0.5 rounded bg-black/5">
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
    <section className="section-light w-full py-20 sm:py-28 md:py-36 overflow-hidden" id="works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Section Header with Bi-Directional Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 border-b border-black/10 pb-8"
        >
          <div>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Selected Works
            </h2>
          </div>
          <p className="font-mono text-inkLight text-xs sm:text-sm">
            <strong className="text-ink font-bold">{filtered.length}</strong> PRODUCTIONS
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-10 sm:mb-14 pb-1"
        >
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 sm:px-5 py-2.5 text-[11px] sm:text-xs font-mono font-medium rounded-full transition-all whitespace-nowrap border ${
                activeCat === c.id
                  ? 'bg-ink text-[#F0ECE5] border-ink shadow-sm'
                  : 'bg-white/70 text-inkLight border-black/10 hover:text-ink hover:border-black/30'
              }`}
            >
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Responsive Bento Grid (1 col mobile, 2 col iPad/tablet, 3 col desktop) */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const isHero = idx === 0 && activeCat === 'all';
              return (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  idx={idx}
                  isHero={isHero}
                  onOpenModal={setSelected}
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
