'use client';

import React, { createContext, useContext, useState } from 'react';

interface UiContextType {
  showMemberList: boolean;
  setShowMemberList: (show: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  isWindowExpanded: boolean;
  toggleWindowExpansion: () => void;
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [showMemberList, setShowMemberList] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleWindowExpansion = () => setIsWindowExpanded(prev => !prev);
  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <UiContext.Provider value={{ 
      showMemberList, 
      setShowMemberList,
      showSidebar,
      setShowSidebar,
      isWindowExpanded,
      toggleWindowExpansion,
      isMobileNavOpen,
      toggleMobileNav,
      closeMobileNav
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