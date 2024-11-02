'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface UiContextType {
  isMembersListVisible: boolean;
  isWindowExpanded: boolean;
  toggleMembersList: () => void;
  toggleWindowExpansion: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [isMembersListVisible, setIsMembersListVisible] = useState(true);
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);

  const toggleMembersList = () => {
    setIsMembersListVisible(prev => !prev);
  };

  const toggleWindowExpansion = () => {
    setIsWindowExpanded(prev => !prev);
  };

  return (
    <UiContext.Provider value={{ 
      isMembersListVisible, 
      isWindowExpanded,
      toggleMembersList, 
      toggleWindowExpansion 
    }}>
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