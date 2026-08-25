'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCinemaCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const dataEl = target.closest('[data-cursor]');
      if (dataEl) {
        setLabel(dataEl.getAttribute('data-cursor') || '');
        setExpanded(true);
        // Detect if we're over a light section
        const bg = window.getComputedStyle(dataEl.closest('section') || dataEl).backgroundColor;
        const isLightBg = bg.includes('240') || bg.includes('232') || bg.includes('248');
        setIsLight(isLightBg);
      } else {
        setLabel('');
        setExpanded(false);
        setIsLight(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        animate={{
          x: pos.x,
          y: pos.y,
          width: expanded ? 80 : 32,
          height: expanded ? 80 : 32,
          backgroundColor: expanded
            ? (isLight ? 'rgba(17,17,17,0.9)' : 'rgba(200,75,47,0.9)')
            : 'transparent',
          border: expanded ? 'none' : `1.5px solid ${isLight ? '#111' : 'rgba(240,236,229,0.6)'}`,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.4 }}
      >
        {expanded && label && (
          <span className="text-[9px] font-bold text-white uppercase tracking-wider text-center leading-tight px-1 select-none font-mono">
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: pos.x,
          y: pos.y,
          width: expanded ? 0 : 5,
          height: expanded ? 0 : 5,
          backgroundColor: isLight ? '#111' : '#F0ECE5',
          opacity: expanded ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 500, mass: 0.2 }}
      />
    </>
  );
}
