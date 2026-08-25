'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project, ProjectCategory } from '@/types/portfolio';
import ProjectModal from './ProjectModal';
import { 
  Clapperboard, 
  Play, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Film, 
  Music, 
  Briefcase, 
  Palette,
  Eye
} from 'lucide-react';

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
    <section className="w-full max-w-2xl mx-auto px-4 py-4" id="works">
      
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
            <Clapperboard className="w-5 h-5 text-cinemaAmber" />
            <span>Featured Works</span>
          </h2>
          <p className="text-xs text-gray-400">
            Koleksi produksi film, video musik & iklan pilihan
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 rounded-full glass-pill text-cinemaAmber border border-cinemaAmber/30">
          {filteredProjects.length} Proyek
        </span>
      </div>

      {/* Category Filter Pills (Horizontal Scrollable for Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-cinemaAmber text-black shadow-glowAmber scale-[1.02]'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bento Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filteredProjects.map((project, index) => {
          // Make first item full width if it's featured or in "all" tab
          const isHighlight = project.featured && index === 0;

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-3xl overflow-hidden glass-panel-interactive cursor-pointer flex flex-col justify-between ${
                isHighlight ? 'sm:col-span-2 aspect-[16/10] sm:aspect-[21/10]' : 'aspect-[4/3] sm:aspect-[4/4]'
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
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-black/30 group-hover:via-surface/65 transition-colors" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 p-3.5 sm:p-4 flex items-start justify-between w-full">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full badge-producer shadow-md">
                    {project.role}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-gray-300">
                    {project.year}
                  </span>
                </div>

                {/* Quick view button */}
                <div className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 group-hover:text-white group-hover:bg-cinemaAmber group-hover:text-black group-hover:border-cinemaAmber transition-all">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-10 p-3.5 sm:p-4 mt-auto">
                {project.productionHouse && (
                  <p className="text-[11px] font-medium text-cinemaCyan mb-1 flex items-center gap-1">
                    <span>{project.productionHouse}</span>
                    {project.client && <span>• {project.client}</span>}
                  </p>
                )}

                <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-[11px] text-gray-300 line-clamp-2 mt-1 font-normal leading-relaxed">
                  {project.synopsis}
                </p>

                {/* Tags on larger card */}
                {isHighlight && project.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal Detail */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        whatsappNumber={profile.contact.whatsapp}
      />
    </section>
  );
}
