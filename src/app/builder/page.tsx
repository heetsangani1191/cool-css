import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { VisualBuilderModule } from '@/components/builder/VisualBuilderModule';

export const metadata = {
  title: 'Visual Builder - CSS Studio Website Builder',
  description: 'Visually create complete websites with drag-and-drop and generate clean HTML & CSS.',
};

export default function BuilderPage() {
  return (
    <StudioProvider>
      <VisualBuilderModule />
    </StudioProvider>
  );
}
