'use client';

import { ResumeProvider } from '@/contexts/ResumeContext/ResumeContext';
import { UiProvider } from '@/contexts/UiContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { UserProvider } from '@/contexts/UserContext';
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
        <UserProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </UserProvider>
      </UiProvider>
    </ResumeProvider>
  );
} 