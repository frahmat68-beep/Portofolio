'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function BrandNetwork() {
  const { data } = usePortfolio();
  const { logos } = data;

  if (!logos || logos.length === 0) return null;

  const phLogos = logos.filter(l => l.category === 'ph');
  const brandLogos = logos.filter(l => l.category === 'brand');

  return (
    <section className="section-light w-full py-20 sm:py-28 md:py-36 border-t border-black/10" id="network">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-black/10 pb-8">
          <div>
            <h2
              className="text-ink font-display font-black uppercase leading-none"
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Studios & Brands
            </h2>
          </div>
          <p className="font-mono text-inkLight text-xs sm:text-sm">
            <strong className="text-ink font-bold">{logos.length}</strong> PARTNERS
          </p>
        </div>

        {/* 1. Production Houses Grid */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-inkLight font-semibold mb-4 sm:mb-6">
            Production Houses
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {phLogos.map(item => (
              <div
                key={item.id}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-md transition-all duration-300 min-h-[90px] sm:min-h-[110px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-8 sm:max-h-12 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
                <span className="mt-2.5 text-[9px] sm:text-[10px] font-mono text-inkLight group-hover:text-ink font-medium tracking-tight text-center line-clamp-1">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Commercial Brands Grid */}
        <div>
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-inkLight font-semibold mb-4 sm:mb-6">
            Brands & Clients
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {brandLogos.map(item => (
              <div
                key={item.id}
                className="group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-md transition-all duration-300 min-h-[90px] sm:min-h-[110px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-8 sm:max-h-12 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
                <span className="mt-2.5 text-[9px] sm:text-[10px] font-mono text-inkLight group-hover:text-ink font-medium tracking-tight text-center line-clamp-1">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
