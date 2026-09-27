import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { CssArtPlayground } from '@/components/playgrounds/CssArtPlayground';

export const metadata = {
  title: 'CSS Art & FX - CSS Studio',
  description: 'Pre-crafted Glassmorphism, Neumorphism soft UI, Cyberpunk neon glow, and 3D gradient buttons.',
};

export default function ArtPage() {
  return (
    <StudioProvider>
      <CssArtPlayground />
    </StudioProvider>
  );
}
