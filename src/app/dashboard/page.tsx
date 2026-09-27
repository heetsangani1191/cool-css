import React from 'react';
import { StudioProvider } from '@/context/StudioContext';
import { Dashboard } from '@/components/dashboard/Dashboard';

export const metadata = {
  title: 'Dashboard - CSS Studio',
  description: 'Manage your saved CSS Studio projects and website components.',
};

export default function DashboardPage() {
  return (
    <StudioProvider>
      <Dashboard />
    </StudioProvider>
  );
}
