'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBio() {
  return (
    <section className="section-dark relative min-h-[85svh] md:min-h-[92vh] flex flex-col justify-center overflow-hidden w-full max-w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Ambient background video with subtle cinematic gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
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

      {/* Ultra-Clean Iconic Hero — Pure Typography & Video */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl select-none"
        >
          <h1
            className="text-white font-display font-black uppercase leading-[0.88] tracking-tighter"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(3.5rem, 14vw, 11rem)',
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
            }}
          >
            Kiki <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
              Rachmat.
            </span>
          </h1>
        </motion.div>
      </div>

    </section>
  );
}
