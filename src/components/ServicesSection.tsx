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
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const { data } = usePortfolio();
  const { services, profile } = data;

  if (!services || services.length === 0) return null;

  const iconMap = {
    Clapperboard: Clapperboard,
    Film: Film,
    Briefcase: Briefcase,
    Palette: Palette,
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6" id="services">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-cinemaAmber" />
            <span>Production Services & Scope</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Keahlian produksi film, video, dan tata artistik yang siap dieksekusi
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full glass-pill text-cinemaAmber border border-cinemaAmber/30">
          {services.length} Layanan
        </span>
      </div>

      {/* Services Grid: 4 columns on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Clapperboard;
          const waServiceUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Fikri,%20saya%20tertarik%20dengan%20layanan%20*${encodeURIComponent(service.title)}*%20(${encodeURIComponent(service.role)}).%20Boleh%20konsultasi%20jadwal%20dan%20anggaran?`;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel-interactive rounded-3xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-3 rounded-2xl bg-cinemaAmber/10 border border-cinemaAmber/20 text-cinemaAmber">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full badge-producer">
                    {service.role}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-1.5 mb-5 pt-3 border-t border-white/5">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cinemaCyan flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom WhatsApp CTA */}
              <div className="pt-3 border-t border-white/5">
                <a
                  href={waServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-surfaceElevated hover:bg-emerald-600/90 text-gray-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all group"
                >
                  <MessageCircle className="w-3.5 h-3.5 group-hover:fill-white text-emerald-400 group-hover:text-white" />
                  <span>Konsultasi</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
