'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCinemaCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable or video cards
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        setCursorText(interactiveEl.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        width: isHovered ? 72 : 12,
        height: isHovered ? 72 : 12,
        backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.9)' : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: isHovered ? 'blur(4px)' : 'none',
      }}
      transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.5 }}
    >
      {isHovered && cursorText && (
        <span className="text-[10px] font-bold text-black uppercase tracking-wider text-center font-mono px-1 select-none">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
