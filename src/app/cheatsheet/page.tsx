import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { CssCheatSheet } from '@/components/playgrounds/CssCheatSheet';

export const metadata = {
  title: 'CSS Cheat Sheet - CSS Studio',
  description: 'Searchable CSS property syntax and reference guide.',
};

export default function CheatSheetPage() {
  return (
    <StudioProvider>
      <CssCheatSheet />
    </StudioProvider>
  );
}
