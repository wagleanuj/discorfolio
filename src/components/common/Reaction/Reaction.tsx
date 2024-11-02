'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';

interface ReactionProps {
  emoji: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

export const Reaction: FC<ReactionProps> = ({ 
  emoji, 
  count, 
  isActive = false,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 px-2 py-0.5 rounded-full text-sm",
        "transition-all duration-200 hover:scale-105",
        isActive ? [
          "bg-discord-brand/20",
          "text-discord-brand",
          "hover:bg-discord-brand/30"
        ] : [
          "bg-discord-secondary/50",
          "text-discord-text-muted",
          "hover:bg-discord-secondary/80",
          "hover:text-discord-text-primary"
        ]
      )}
    >
      <span className="text-base leading-none">{emoji}</span>
      <span className="text-xs leading-none">{count}</span>
    </button>
  );
}; 