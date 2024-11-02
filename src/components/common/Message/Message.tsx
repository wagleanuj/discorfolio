'use client';

import { FC } from 'react';
import Image from 'next/image';

export interface MessageProps {
  content: string | React.ReactNode;
  timestamp?: string;
  author?: {
    name: string;
    avatar?: string;
    bot?: boolean;
  };
  pinned?: boolean;
}

const Message: FC<MessageProps> = ({
  content,
  timestamp,
  author = {
    name: 'Portfolio Bot',
    bot: true
  },
  pinned = false
}) => {
  // Format the date consistently
  const formattedDate = timestamp 
    ? new Date(timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <div className={`px-4 py-2 hover:bg-discord-hover ${pinned ? 'bg-discord-secondary/30' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-discord-brand flex items-center justify-center flex-shrink-0">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-white text-sm">{author.name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-discord-text-primary">
              {author.name}
              {author.bot && (
                <span className="ml-1 text-xs bg-discord-brand text-white px-1 rounded">BOT</span>
              )}
            </span>
            {formattedDate && (
              <span className="text-discord-text-muted text-xs">
                {formattedDate}
              </span>
            )}
            {pinned && (
              <span className="text-discord-text-muted text-xs">
                📌 Pinned
              </span>
            )}
          </div>
          
          <div className="text-discord-text-primary mt-1">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message; 