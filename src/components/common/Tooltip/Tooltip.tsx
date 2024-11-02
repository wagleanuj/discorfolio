'use client';

import { FC, ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'left',
  delay = 300 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  const showTip = () => {
    timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-xs bg-black rounded shadow-lg whitespace-nowrap animate-fade-in",
            "before:content-[''] before:absolute before:border-4 before:border-transparent",
            position === 'top' && [
              "bottom-full left-1/2 -translate-x-1/2 mb-2",
              "before:top-full before:left-1/2 before:-translate-x-1/2 before:border-t-black"
            ],
            position === 'bottom' && [
              "top-full left-1/2 -translate-x-1/2 mt-2",
              "before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-b-black"
            ],
            position === 'left' && [
              "right-full top-1/2 -translate-y-1/2 mr-2",
              "before:left-full before:top-1/2 before:-translate-y-1/2 before:border-l-black"
            ],
            position === 'right' && [
              "left-full top-1/2 -translate-y-1/2 ml-2",
              "before:right-full before:top-1/2 before:-translate-y-1/2 before:border-r-black"
            ]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;