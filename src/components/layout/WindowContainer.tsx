'use client';

import { FC, useEffect } from 'react';
import { useUi } from '@/contexts/UiContext';
import { cn } from '@/lib/utils';
import ServerList from './ServerList';
import ChannelList from './ChannelList';
import WindowControls from '../common/WindowControls/WindowControls';
import { Menu } from 'lucide-react';

interface WindowContainerProps {
  children: React.ReactNode;
}

const WindowContainer: FC<WindowContainerProps> = ({ children }) => {
  const { 
    isWindowExpanded, 
    toggleWindowExpansion,
    isMobileNavOpen, 
    toggleMobileNav,
    closeMobileNav 
  } = useUi();

  // Force full screen on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 640) {
        if (!isWindowExpanded) {
          toggleWindowExpansion();
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isWindowExpanded, toggleWindowExpansion]);
  
  return (
    <div className={cn(
      "h-full bg-gray-900 transition-all duration-300 ease-in-out",
      isWindowExpanded ? "p-0" : "p-2 sm:p-4 md:p-6 lg:p-8"
    )}>
      <div className={cn(
        "h-full bg-discord-tertiary overflow-hidden transition-all duration-300 ease-in-out relative",
        isWindowExpanded 
          ? "w-full rounded-none" 
          : "max-w-7xl mx-auto rounded-xl shadow-2xl"
      )}>
        {/* Window Controls */}
        <div className={cn(
          "bg-discord-tertiary flex items-center px-2 h-8 relative z-50",
          !isWindowExpanded && "rounded-t-xl"
        )}>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMobileNav}
              className="p-2 text-discord-text-muted hover:text-discord-text-primary lg:hidden"
            >
              <Menu size={20} />
            </button>
            <WindowControls />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="h-[calc(100%-32px)] relative">
          {/* Mobile Sidebar */}
          <aside 
            className={cn(
              "absolute top-0 left-0 h-full bg-discord-tertiary z-40",
              "flex transition-transform duration-300 lg:hidden",
              isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <ServerList />
            <ChannelList />
          </aside>

          {/* Mobile Backdrop */}
          {isMobileNavOpen && (
            <div 
              className="absolute inset-0 bg-black/50 z-30 lg:hidden"
              onClick={closeMobileNav}
            />
          )}

          {/* Desktop Layout */}
          <div className="flex h-full">
            <div className="hidden lg:flex">
              <ServerList />
              <ChannelList />
            </div>
            <main className="flex-1 bg-discord-primary overflow-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WindowContainer;