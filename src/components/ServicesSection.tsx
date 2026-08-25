'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Briefcase, 
  Clapperboard, 
  Film, 
  Palette, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const { data } = usePortfolio();
  const { services, profile } = data;

  if (!services || services.length === 0) return null;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Clapperboard: Clapperboard,
    Film: Film,
    Briefcase: Briefcase,
    Palette: Palette,
  };

  const waBase = `https://wa.me/${profile.contact.whatsapp}`;

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8" id="services">
      
      {/* A24 Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-cinemaCyan flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            CAPABILITIES // PRODUCTION SERVICES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white uppercase tracking-tight">
            What I Deliver
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-400 self-start md:self-auto">
          {services.length} PRODUCTION DIVISIONS
        </span>
      </div>

      {/* Services Grid: 4 columns on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const Icon = iconMap[service.iconName] || Clapperboard;
          const waUrl = `${waBase}?text=Halo%20Fikri,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(service.title)}.`;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group flex flex-col gap-4 glass-panel rounded-3xl p-5 border border-white/8 hover:border-cinemaAmber/35 transition-all hover:-translate-y-1 hover:shadow-glowAmber"
              data-cursor="DISCUSS PROJECT"
            >
              {/* Icon Header */}
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-cinemaAmber/10 border border-cinemaAmber/20 text-cinemaAmber group-hover:bg-cinemaAmber group-hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full badge-cyan">
                  AVAILABLE
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base font-bold font-display text-white uppercase tracking-wide mb-1">
                  {service.title}
                </h3>
                <p className="text-[12px] text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Deliverables Checklist */}
              {service.deliverables && service.deliverables.length > 0 && (
                <ul className="flex flex-col gap-1.5 mt-auto">
                  {service.deliverables.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-cinemaAmber flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cinemaAmber/10 hover:bg-cinemaAmber text-amber-300 hover:text-black text-[11px] font-bold font-mono uppercase tracking-wider transition-all border border-cinemaAmber/25 hover:border-cinemaAmber"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konsultasi Proyek</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
