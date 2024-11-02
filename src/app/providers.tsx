'use client';

import { ResumeProvider } from '@/contexts/ResumeContext/ResumeContext';
import { ReactNode, useEffect, useState } from 'react';
import { Resume } from '@/types/resume';

interface ProvidersProps {
  children: ReactNode;
  initialResume: Resume;
}

export function Providers({ children, initialResume }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ResumeProvider resume={initialResume}>
      {children}
    </ResumeProvider>
  );
} 