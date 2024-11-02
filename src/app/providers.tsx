'use client';

import { ResumeProvider } from '@/contexts/ResumeContext/ResumeContext';
import { UiProvider } from '@/contexts/UiContext';
import { ReactNode } from 'react';
import { Resume } from '@/types/resume';

interface ProvidersProps {
  children: ReactNode;
  initialResume: Resume;
}

export function Providers({ children, initialResume }: ProvidersProps) {
  return (
    <ResumeProvider resume={initialResume}>
      <UiProvider>
        {children}
      </UiProvider>
    </ResumeProvider>
  );
} 