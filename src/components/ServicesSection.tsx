'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { 
  Briefcase, Clapperboard, Film, Palette, CheckCircle2, MessageCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const { data } = usePortfolio();
  const { services, profile } = data;
  if (!services?.length) return null;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Clapperboard, Film, Briefcase, Palette,
  };

  return (
    <section className="section-cream w-full py-12 sm:py-16 border-t border-[#111]/10" id="services">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 border-b border-[#111]/10 pb-6">
          <div>
            <p className="t-label text-inkLight text-[10px] tracking-[0.2em] mb-1">CAPABILITIES</p>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
            >
              Services
            </h2>
          </div>
          <p className="t-mono text-inkLight text-[10px]">{services.length} PRODUCTION AREAS</p>
        </div>

        {/* Services as editorial list rows */}
        <div className="flex flex-col divide-y divide-[#111]/10">
          {services.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Clapperboard;
            const waUrl = `https://wa.me/${profile.contact.whatsapp}?text=Halo%20Kiki,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(service.title)}.`;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-7 sm:py-8 hover:bg-[#111]/3 transition-colors -mx-5 px-5 sm:-mx-8 sm:px-8 cursor-none"
                data-cursor="DISCUSS"
              >
                {/* Number + Icon */}
                <div className="sm:col-span-1 flex items-center gap-3 sm:gap-0 sm:flex-col sm:items-start">
                  <span className="t-mono text-inkLight text-[10px]">0{idx + 1}</span>
                  <div className="sm:mt-2 p-2 rounded-xl bg-[#111]/6">
                    <Icon className="w-4 h-4 text-[#C84B2F]" />
                  </div>
                </div>

                {/* Title + Description */}
                <div className="sm:col-span-5">
                  <h3
                    className="text-ink font-display font-black uppercase leading-tight group-hover:text-[#C84B2F] transition-colors"
                    style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.01em' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-inkLight text-xs leading-relaxed mt-2 font-sans">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables */}
                {service.deliverables?.length > 0 && (
                  <div className="sm:col-span-4">
                    <ul className="flex flex-col gap-1.5">
                      {service.deliverables.slice(0, 4).map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-inkLight">
                          <CheckCircle2 className="w-3 h-3 text-[#C84B2F] mt-0.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="sm:col-span-2 flex items-center sm:justify-end">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink hover:text-[#C84B2F] t-label text-[10px] tracking-widest transition-colors hover-link"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    INQUIRY
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
