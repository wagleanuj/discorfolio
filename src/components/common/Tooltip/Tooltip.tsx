'use client';

import { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  delay?: number;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const Tooltip = ({ content, children, delay = 300, position = 'bottom' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return '-top-8 left-1/2 -translate-x-1/2';
      case 'right':
        return 'top-1/2 -translate-y-1/2 left-full ml-2';
      case 'bottom':
        return '-bottom-8 left-1/2 -translate-x-1/2';
      case 'left':
        return 'top-1/2 -translate-y-1/2 right-full mr-2';
      default:
        return '-bottom-8 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-black rounded shadow-lg whitespace-nowrap ${getPositionClasses()}`}>
          {content}
          <div className="absolute w-2 h-2 bg-black transform rotate-45 -translate-x-1/2 -top-1 left-1/2" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;