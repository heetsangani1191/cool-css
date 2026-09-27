import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { EditorLayout } from '@/components/editor/EditorLayout';

export const metadata = {
  title: 'CSS Studio - Visual CSS Playground & Editor',
  description: 'Visually edit CSS properties and elements.',
};

export default function EditorPage() {
  return (
    <StudioProvider>
      <EditorLayout />
    </StudioProvider>
  );
}
