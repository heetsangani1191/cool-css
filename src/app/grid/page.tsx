import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { GridPlayground } from '@/components/playgrounds/GridPlayground';

export const metadata = {
  title: 'Grid Playground - CSS Studio',
  description: 'Interactive responsive CSS Grid layout builder and track visualizer.',
};

export default function GridPage() {
  return (
    <StudioProvider>
      <GridPlayground />
    </StudioProvider>
  );
}
