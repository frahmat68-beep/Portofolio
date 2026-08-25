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
  Eye,
  Play,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BentoShowcase() {
  const { data } = usePortfolio();
  const { projects, profile } = data;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Works', icon: Layers },
    { id: 'short-film', label: 'Short Films', icon: Film },
    { id: 'music-video', label: 'Music Videos', icon: Music },
    { id: 'commercial', label: 'Commercials', icon: Briefcase },
    { id: 'art-dept', label: 'Art Dept', icon: Palette },
  ];

  const roleFilters = [
    { id: 'all', label: 'All Roles' },
    { id: 'Producer', label: 'Producer' },
    { id: 'Line Producer', label: 'Line Producer / UPM' },
    { id: 'Art Director', label: 'Art Director' },
  ];

  // Filter projects by category and role
  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesRole = activeRoleFilter === 'all' || p.role.toLowerCase().includes(activeRoleFilter.toLowerCase());
    return matchesCategory && matchesRole;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8" id="works">
      
      {/* A24 Style Section Title & Metadata Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-cinemaAmber flex items-center gap-1.5 mb-1">
            <Clapperboard className="w-3.5 h-3.5" />
            CATALOGUE // FEATURED RELEASES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white uppercase tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Live Filter Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">
            SHOWING <span className="text-cinemaAmber font-bold">{filteredProjects.length}</span> OF {projects.length} RELEASES
          </span>
        </div>
      </div>

      {/* Filter Bars (Categories + Role Filter) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'text-black font-bold'
                    : 'glass-panel text-gray-400 hover:text-white hover:border-white/20'
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

        {/* Role Filter Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-mono text-gray-500 uppercase">Role:</span>
          {roleFilters.map((rf) => (
            <button
              key={rf.id}
              onClick={() => setActiveRoleFilter(rf.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all whitespace-nowrap ${
                activeRoleFilter === rf.id
                  ? 'bg-white/15 text-white border border-white/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {rf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Showcase: 3-column CinemaScope & Aspect Ratio Styling */}
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
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                data-cursor="EXPAND FILM"
                className={`group relative rounded-3xl overflow-hidden glass-panel-interactive cursor-pointer flex flex-col justify-between border border-white/10 ${
                  isHighlight 
                    ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[21/10] lg:aspect-[16/9]' 
                    : 'aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]'
                }`}
              >
                {/* Background Poster Image with Cinematic Zoom on hover */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.posterUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter group-hover:brightness-105"
                    loading="lazy"
                  />
                  {/* Cinematic Dark Film Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/70 to-black/40 group-hover:via-surface/50 transition-colors" />
                </div>

                {/* Top Production Badges (A24 Typography) */}
                <div className="relative z-10 p-4 sm:p-5 flex items-start justify-between w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full badge-producer shadow-md font-mono uppercase tracking-wider">
                      {project.role}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-gray-300">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick Expand Icon */}
                  <div className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-gray-300 group-hover:text-black group-hover:bg-cinemaAmber group-hover:border-cinemaAmber transition-all shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Content Info (Film Title & Logline) */}
                <div className="relative z-10 p-4 sm:p-5 mt-auto">
                  {project.productionHouse && (
                    <p className="text-[11px] font-mono uppercase tracking-wider text-cinemaCyan mb-1 flex items-center gap-1.5">
                      <span>{project.productionHouse}</span>
                      {project.client && <span>• {project.client}</span>}
                    </p>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cinemaAmber transition-colors leading-tight uppercase">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-300 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                    {project.synopsis}
                  </p>

                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/10 text-gray-300 backdrop-blur-sm">
                          #{tag}
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
