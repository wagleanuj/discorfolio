'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ServerHeader } from '@/components/layout/ServerHeader';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { useUi } from '@/contexts/UiContext';

interface Channel {
  id: string;
  name: string;
  type: 'text';
}

interface ChannelCategory {
  id: string;
  name: string;
  channels: Channel[];
  collapsed?: boolean;
}

const channelCategories: ChannelCategory[] = [
  {
    id: 'about',
    name: 'ABOUT ME',
    channels: [
      { id: 'intro', name: 'introduction', type: 'text' },
      { id: 'contact', name: 'contact', type: 'text' },
    ]
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    channels: [
      { id: 'exp', name: 'experience', type: 'text' },
      { id: 'skills', name: 'skills', type: 'text' },
      { id: 'edu', name: 'education', type: 'text' },
    ]
  },
  {
    id: 'portfolio',
    name: 'PORTFOLIO',
    channels: [
      { id: 'projects', name: 'projects', type: 'text' },
    ]
  }
];

const ChannelList: FC = () => {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const currentChannelId = pathname.split('/').pop();
  const { user } = useUser();
  const { closeMobileNav } = useUi();

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-60 bg-discord-secondary flex flex-col font-sans">
      <ServerHeader />
      
      {/* Channels */}
      <div className="flex-1 px-2 pt-4 space-y-4 overflow-y-auto">
        {channelCategories.map((category) => (
          <div key={category.id} className="space-y-[2px]">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center w-full px-1 mb-1 text-category font-semibold text-discord-text-muted hover:text-discord-text-secondary group tracking-category uppercase"
            >
              {collapsedCategories.has(category.id) ? (
                <ChevronRight size={12} className="mr-0.5 flex-shrink-0" />
              ) : (
                <ChevronDown size={12} className="mr-0.5 flex-shrink-0" />
              )}
              {category.name}
            </button>
            
            {/* Category Channels */}
            {!collapsedCategories.has(category.id) && (
              <div className="space-y-[2px]">
                {category.channels.map((channel) => {
                  const isActive = channel.id === currentChannelId;
                  return (
                    <div key={channel.id} className="relative group">
                      {/* Hover Pill */}
                      <div className="absolute -left-2 top-0 bottom-0 flex items-center">
                        <div className={cn(
                          "w-1 rounded-r-full bg-white transition-all duration-200 origin-center",
                          "h-0 group-hover:h-4"
                        )} />
                      </div>
                      
                      {/* Channel Link */}
                      <Link 
                        href={`/channel/${channel.id}`}
                        onClick={closeMobileNav}
                        className={cn(
                          "flex items-center px-2 py-[6px] rounded-md cursor-pointer",
                          "transition-all duration-100 ease-out",
                          isActive ? [
                            "bg-[#404249]",
                            "text-white",
                            "shadow-sm",
                            "font-medium"
                          ] : [
                            "text-discord-text-muted",
                            "hover:text-discord-text-primary",
                            "hover:bg-[#35373C]"
                          ]
                        )}
                      >
                        <span className={cn(
                          "mr-1.5 transition-colors duration-100",
                          isActive ? "text-white" : "text-discord-channel"
                        )}>#</span>
                        <span className="truncate">{channel.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* User Info */}
      <div className="h-[52px] px-2 flex items-center bg-discord-tertiary mt-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ backgroundColor: user.color }}>
            <span className="text-white text-discord-small font-medium">{user.initials}</span>
            <div className="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-discord-online border-[2.5px] border-discord-tertiary"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-discord-small font-medium">{user.name}</span>
            <span className="text-discord-text-muted text-discord-timestamp">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;