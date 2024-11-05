'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { Resume } from '@/types/resume';

interface ResumeContextType {
  resume: Resume;
  setResume: (resume: Resume) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
  resume: initialResume,
}: {
  children: ReactNode;
  resume: Resume;
}) {
  const [resume, setResume] = useState<Resume>(initialResume);
  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
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