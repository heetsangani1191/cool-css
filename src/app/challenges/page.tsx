import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { ChallengesModal } from '@/components/playgrounds/ChallengesModal';

export const metadata = {
  title: 'CSS Challenges - CSS Studio',
  description: 'Gamified CSS target component design matching challenges.',
};

export default function ChallengesPage() {
  return (
    <StudioProvider>
      <ChallengesModal />
    </StudioProvider>
  );
}
