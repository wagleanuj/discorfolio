'use client';

import { FC, useState } from 'react';
import { Reaction } from '../Reaction/Reaction';
import { ReactionPicker } from '../ReactionPicker/ReactionPicker';
import { cn } from '@/lib/utils';
import { formatDistanceToNow, format } from 'date-fns';

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface MessageAuthor {
  name: string;
  bot?: boolean;
  emoji?: string;
  color?: string;
  initials?: string;
}

export interface MessageProps {
  content: React.ReactNode;
  timestamp: string;
  author?: MessageAuthor;
}

export const Message: FC<MessageProps> = ({ content, timestamp, author }) => {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const handleAddReaction = (emoji: string) => {
    setReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        if (existing.users.includes('currentUser')) {
          return prev.map(r => 
            r.emoji === emoji 
              ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== 'currentUser') }
              : r
          ).filter(r => r.count > 0);
        }
        return prev.map(r => 
          r.emoji === emoji 
            ? { ...r, count: r.count + 1, users: [...r.users, 'currentUser'] }
            : r
        );
      }
      return [...prev, { emoji, count: 1, users: ['currentUser'] }];
    });
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return format(date, 'h:mm a');
    }
    
    if (Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div 
      className={cn(
        "px-4 py-2 group relative flex items-start gap-4",
        "hover:bg-[#32353B]",
        "transition-colors duration-100"
      )}
      onMouseEnter={() => setShowReactionPicker(true)}
      onMouseLeave={() => setShowReactionPicker(false)}
    >
      {/* Avatar */}
      {author && (
        <div className="flex-shrink-0 mt-0.5">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "text-white font-medium text-lg",
            author.bot ? "bg-discord-brand ring-2 ring-discord-primary" : "ring-2 ring-discord-primary"
          )}
          style={author.color ? { backgroundColor: author.color } : undefined}
          >
            {author.emoji ? (
              <span className="text-2xl">{author.emoji}</span>
            ) : author.initials ? (
              <span className="text-base">{author.initials}</span>
            ) : null}
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        {author && (
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "font-medium",
              author.bot ? "text-discord-brand" : "text-white"
            )}>
              {author.name}
            </span>
            {author.bot && (
              <span className="px-1 py-0.5 bg-discord-brand text-white text-xs rounded text-[10px] uppercase font-bold">
                Bot
              </span>
            )}
            <span className="text-discord-text-muted text-xs">
              {formatTimestamp(timestamp)}
            </span>
          </div>
        )}
        <div className="text-discord-text-primary break-words">
          {content}
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="mt-2 whitespace-nowrap">
            <div className="inline-flex items-center gap-1">
              {reactions.map((reaction) => (
                <Reaction
                  key={reaction.emoji}
                  emoji={reaction.emoji}
                  count={reaction.count}
                  isActive={reaction.users.includes('currentUser')}
                  onClick={() => handleAddReaction(reaction.emoji)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reaction Picker */}
      {showReactionPicker && (
        <div className="absolute right-4 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ReactionPicker onSelect={handleAddReaction} />
        </div>
      )}
    </div>
  );
};

export default Message;