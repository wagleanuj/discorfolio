'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateVisitorInfo } from '@/lib/utils/visitorGenerator';

interface UserInfo {
  name: string;
  initials: string;
  color: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

interface UserContextType {
  user: UserInfo;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Use null as initial state to prevent hydration mismatch
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Generate or retrieve user info on client side only
    const savedUser = localStorage.getItem('visitorInfo');
    const userInfo = savedUser ? JSON.parse(savedUser) : generateVisitorInfo();
    setUser(userInfo);
    localStorage.setItem('visitorInfo', JSON.stringify(userInfo));
  }, []);

  // Don't render children until user info is loaded
  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 