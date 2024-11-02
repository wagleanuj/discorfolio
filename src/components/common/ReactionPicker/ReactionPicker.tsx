'use client';

import { FC, useState } from 'react';
import { Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReactionPickerProps {
  onSelect: (emoji: string) => void;
  className?: string;
}

const commonEmojis = ['👍', '❤️', '🎉', '🚀', '👏', '🔥', '💯', '✨'];

export const ReactionPicker: FC<ReactionPickerProps> = ({ onSelect, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded hover:bg-discord-secondary text-discord-text-muted",
          "hover:text-discord-text-primary transition-colors",
          className
        )}
      >
        <Smile size={20} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Emoji Picker */}
          <div 
            className={cn(
              "absolute z-50 bg-discord-primary rounded-lg shadow-lg",
              "border border-discord-secondary",
              "right-full top-0",
              "mr-2"
            )}
            style={{
              animation: 'popIn 100ms ease-out'
            }}
          >
            <div className="flex items-center h-10 px-2 gap-0.5">
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onSelect(emoji);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center",
                    "rounded hover:bg-discord-secondary",
                    "text-xl transition-colors"
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes popIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}; 