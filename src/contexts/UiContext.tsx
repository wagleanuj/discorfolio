'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UiContextType {
  isWindowExpanded: boolean;
  toggleWindowExpansion: () => void;
  isMembersListVisible: boolean;
  toggleMembersList: () => void;
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [isWindowExpanded, setIsWindowExpanded] = useState<boolean | null>(null);
  const [isMembersListVisible, setIsMembersListVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    setIsWindowExpanded(isMobile);

    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setIsWindowExpanded(isMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleWindowExpansion = () => setIsWindowExpanded(prev => !prev);
  const toggleMembersList = () => setIsMembersListVisible(prev => !prev);
  const toggleMobileNav = () => setIsMobileNavOpen(prev => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  if (isWindowExpanded === null) {
    return null;
  }

  return (
    <UiContext.Provider value={{ 
      isWindowExpanded: isWindowExpanded!, 
      toggleWindowExpansion,
      isMembersListVisible,
      toggleMembersList,
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