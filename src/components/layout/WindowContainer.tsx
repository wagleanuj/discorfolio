'use client';

import { FC } from 'react';
import { useUi } from '@/contexts/UiContext';
import { cn } from '@/lib/utils';
import ServerList from './ServerList';
import ChannelList from './ChannelList';
import WindowControls from '../common/WindowControls/WindowControls';

interface WindowContainerProps {
  children: React.ReactNode;
}

export const WindowContainer: FC<WindowContainerProps> = ({ children }) => {
  const { isWindowExpanded } = useUi();
  
  return (
    <div className={cn(
      "h-full bg-gray-900 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
      isWindowExpanded 
        ? "p-0 scale-100" 
        : "p-8 scale-[0.99] hover:scale-[0.995]"
    )}>
      <div className={cn(
        "h-full bg-discord-tertiary overflow-hidden transition-all transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isWindowExpanded 
          ? "w-full rounded-none translate-y-0 opacity-100" 
          : "max-w-7xl mx-auto rounded-xl shadow-2xl translate-y-1 opacity-95 hover:opacity-100"
      )}>
        {/* Window Controls */}
        <div className={cn(
          "bg-discord-tertiary flex items-center justify-between px-2 transition-all duration-500",
          !isWindowExpanded && "rounded-t-xl"
        )}>
          <WindowControls />
          {isWindowExpanded && (
            <span className="text-discord-text-muted text-sm pr-2 animate-fade-in">
              Press green button to exit fullscreen
            </span>
          )}
        </div>
        
        {/* Main Content */}
        <div className="h-[calc(100%-32px)]">
          <div className="flex h-full">
            <ServerList />
            <ChannelList />
            <main className="flex-1 bg-discord-primary overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}; 