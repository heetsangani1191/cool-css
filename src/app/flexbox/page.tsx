import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { FlexboxPlayground } from '@/components/playgrounds/FlexboxPlayground';

export const metadata = {
  title: 'Flexbox Playground - CSS Studio',
  description: 'Interactive CSS Flexbox axis visualizer and generator.',
};

export default function FlexboxPage() {
  return (
    <StudioProvider>
      <FlexboxPlayground />
    </StudioProvider>
  );
}
