'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Resume } from '@/types/resume';

interface ResumeContextType {
  resume: Resume;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
  resume,
}: {
  children: ReactNode;
  resume: Resume;
}) {
  return (
    <ResumeContext.Provider value={{ resume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
} 