'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface UiContextType {
  isMembersListVisible: boolean;
  toggleMembersList: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [isMembersListVisible, setIsMembersListVisible] = useState(true);

  const toggleMembersList = () => {
    setIsMembersListVisible(prev => !prev);
  };

  return (
    <UiContext.Provider value={{ isMembersListVisible, toggleMembersList }}>
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
} 