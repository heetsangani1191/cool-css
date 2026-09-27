import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { StudioRootView } from '@/components/StudioRootView';

export const metadata = {
  title: 'CSS Studio - Visual CSS Playground & Code Generator',
  description: 'Visually create UI elements, layouts, keyframe animations, and generate clean production-ready CSS code instantly.',
};

export default function Page() {
  return (
    <StudioProvider>
      <StudioRootView />
    </StudioProvider>
  );
}
