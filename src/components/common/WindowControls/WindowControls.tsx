'use client';

import { FC } from 'react';
import { useUi } from '@/contexts/UiContext';
import { cn } from '@/lib/utils';
import { Maximize2, Minimize2 } from 'lucide-react';

const WindowControls: FC = () => {
  const { isWindowExpanded, toggleWindowExpansion } = useUi();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 cursor-not-allowed" />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 cursor-not-allowed" />
      <button 
        onClick={!isMobile ? toggleWindowExpansion : undefined}
        className={cn(
          "w-3 h-3 rounded-full transition-colors relative group",
          "bg-[#28C840]",
          isMobile ? "cursor-not-allowed opacity-50" : "hover:bg-[#28C840]/80"
        )}
      >
        <div className={cn(
          "absolute hidden group-hover:flex items-center justify-center w-4 h-4 -top-0.5 -left-0.5",
          isMobile && "group-hover:hidden"
        )}>
          {isWindowExpanded ? (
            <Minimize2 className="w-3 h-3 text-[#0F4417]" />
          ) : (
            <Maximize2 className="w-3 h-3 text-[#0F4417]" />
          )}
        </div>
      </button>
    </div>
  );
};

export default WindowControls; 