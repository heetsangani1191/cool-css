'use client';

import { useState, useEffect } from 'react';

export interface ScrollProgressState {
  progress: number; // 0.0 to 1.0
  activeSectionIndex: number;
  scrollY: number;
  maxScroll: number;
}

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    progress: 0,
    activeSectionIndex: 0,
    scrollY: 0,
    maxScroll: 1,
  });

  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      const currentY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const maxScroll = Math.max(totalHeight, 1);
      const rawProgress = Math.min(Math.max(currentY / maxScroll, 0), 1);

      // Section indices based on 14 equal/configured ranges
      const activeIdx = Math.min(Math.floor(rawProgress * 14), 13);

      setScrollState({
        progress: rawProgress,
        activeSectionIndex: activeIdx,
        scrollY: currentY,
        maxScroll,
      });
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return scrollState;
}
