'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBio() {
  return (
    <section className="section-dark relative min-h-[85svh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Ambient background video with subtle cinematic gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter contrast-125 scale-105"
          src="/assets/projects/puma-x-mclaren-aman-studio/The_new_PUMA_x_McLaren_Ra.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/60" />
      </div>

      {/* Main Confident Hero Typography */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-5xl"
        >
          <p className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold">
            FIKRI MULYA RACHMAT
          </p>

          <h1
            className="text-white font-display font-black uppercase leading-[0.92] sm:leading-[0.88] tracking-tighter"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)',
            }}
          >
            Film Producer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
              & Creative Lead.
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl font-sans leading-relaxed font-normal">
            Specializing in narrative film productions, digital series, commercial campaigns, and music videos. Managing end-to-end creative logistics from pre-production to delivery.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
