'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { 
  Clapperboard, 
  Layers, 
  Film, 
  Music, 
  Briefcase, 
  Palette,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BentoShowcase() {
  const { data } = usePortfolio();
  const { projects, profile } = data;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Karya', icon: Layers },
    { id: 'short-film', label: 'Short Films', icon: Film },
    { id: 'music-video', label: 'Music Videos', icon: Music },
    { id: 'commercial', label: 'Commercials', icon: Briefcase },
    { id: 'art-dept', label: 'Art Direction', icon: Palette },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6" id="works">
      
      {/* Section Title & Category Filter in 1 row on Desktop */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Clapperboard className="w-6 h-6 text-cinemaAmber" />
            <span>Featured Showcase</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Koleksi produksi film naratif, music video, dan kampanye iklan
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'text-black font-bold'
                    : 'glass-panel text-gray-300 hover:text-white hover:border-white/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-cinemaAmber rounded-xl shadow-glowAmber"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Showcase: 3-4 columns on Desktop */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isHighlight = project.featured && index === 0;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-3xl overflow-hidden glass-panel-interactive cursor-pointer flex flex-col justify-between ${
                  isHighlight 
                    ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[21/10] lg:aspect-[16/9]' 
                    : 'aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]'
                }`}
              >
                {/* Background Poster Image with Zoom on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.posterUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-black/30 group-hover:via-surface/60 transition-colors" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 p-4 sm:p-5 flex items-start justify-between w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full badge-producer shadow-md">
                      {project.role}
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick view button */}
                  <div className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 group-hover:text-white group-hover:bg-cinemaAmber group-hover:text-black group-hover:border-cinemaAmber transition-all shadow-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="relative z-10 p-4 sm:p-5 mt-auto">
                  {project.productionHouse && (
                    <p className="text-xs font-medium text-cinemaCyan mb-1 flex items-center gap-1.5">
                      <span>{project.productionHouse}</span>
                      {project.client && <span>• {project.client}</span>}
                    </p>
                  )}

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-300 line-clamp-2 mt-1 font-normal leading-relaxed">
                    {project.synopsis}
                  </p>

                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/10 text-gray-300 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal Detail */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        whatsappNumber={profile.contact.whatsapp}
      />
    </section>
  );
}
