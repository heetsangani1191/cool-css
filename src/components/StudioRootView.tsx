'use client';

import React from 'react';
import { useStudio } from '@/context/StudioContext';
import { LandingPage } from '@/components/landing/LandingPage';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { EditorLayout } from '@/components/editor/EditorLayout';
import { VisualBuilderModule } from '@/components/builder/VisualBuilderModule';
import { FlexboxPlayground } from '@/components/playgrounds/FlexboxPlayground';
import { GridPlayground } from '@/components/playgrounds/GridPlayground';
import { CssArtPlayground } from '@/components/playgrounds/CssArtPlayground';
import { ChallengesModal } from '@/components/playgrounds/ChallengesModal';
import { CssCheatSheet } from '@/components/playgrounds/CssCheatSheet';

export function StudioRootView() {
  const { activeTab } = useStudio();

  switch (activeTab) {
    case 'landing':
      return <LandingPage />;
    case 'builder':
      return <VisualBuilderModule />;
    case 'dashboard':
      return <Dashboard />;
    case 'editor':
      return <EditorLayout />;
    case 'flexbox':
      return <FlexboxPlayground />;
    case 'grid':
      return <GridPlayground />;
    case 'art':
      return <CssArtPlayground />;
    case 'challenges':
      return <ChallengesModal />;
    case 'cheatsheet':
      return <CssCheatSheet />;
    default:
      return <LandingPage />;
  }
}
