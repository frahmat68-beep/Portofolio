'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBio() {
  return (
    <section className="section-dark relative min-h-[85svh] md:min-h-[90vh] flex flex-col justify-center overflow-hidden w-full max-w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
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

      {/* Main Confident Hero Typography with Bi-Directional Scroll Animation */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 sm:space-y-6 max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold"
          >
            KIKI RACHMAT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-display font-black uppercase leading-[0.94] sm:leading-[0.88] tracking-tight sm:tracking-tighter break-words"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2.15rem, 8vw, 7.5rem)',
            }}
          >
            Film Producer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
              & Creative Lead.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl font-sans leading-relaxed font-normal"
          >
            Specializing in narrative film productions, digital series, commercial campaigns, and music videos. Managing end-to-end creative logistics from pre-production to delivery.
          </motion.p>
        </motion.div>
      </div>

    </section>
  );
}
