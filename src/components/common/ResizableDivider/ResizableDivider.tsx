'use client';

import { useState, useCallback, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

interface ResizableDividerProps {
  onResize: (newWidth: number) => void;
  isVisible: boolean;
}

export default function ResizableDivider({ onResize, isVisible }: ResizableDividerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const container = document.getElementById('resizable-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;
    
    // Calculate percentage (min 30%, max 70%)
    const percentage = Math.min(Math.max(newWidth / containerWidth * 100, 30), 70);
    onResize(percentage);
  }, [isDragging, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      // Add cursor style to body during drag
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        flex-shrink-0 w-4 relative
        cursor-col-resize group
        ${isDragging ? 'z-50' : 'z-40'}
      `}
      onMouseDown={handleMouseDown}
    >
      {/* Visible divider line */}
      <div className={`
        absolute left-1/2 top-0 bottom-0 w-1
        transition-colors duration-150
        ${isDragging ? 'bg-[#5865f2]' : 'bg-[#202225] group-hover:bg-[#5865f2]'}
      `} />

      {/* Grip handle */}
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-6 h-12 rounded-md
        flex items-center justify-center
        transition-all duration-150
        ${isDragging 
          ? 'bg-[#5865f2] text-white' 
          : 'bg-[#202225] text-gray-400 group-hover:bg-[#36393f] group-hover:text-white'
        }
      `}>
        <GripVertical size={16} />
      </div>

      {/* Wider hit area */}
      <div className="absolute inset-y-0 -left-1 -right-1" />
    </div>
  );
} 