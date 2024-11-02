'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';

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
      {/* Server Name */}
      <div className="h-12 px-4 flex items-center justify-between shadow-sm border-b border-discord-tertiary">
        <h2 className="text-white font-semibold text-discord-channel">Portfolio Server</h2>
        <button className="text-discord-text-muted hover:text-discord-text-primary">
          <ChevronDown size={20} />
        </button>
      </div>
      
      {/* Channels */}
      <div className="flex-1 px-2 pt-4 space-y-4 overflow-y-auto">
        {channelCategories.map((category) => (
          <div key={category.id} className="space-y-[2px]">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center w-full px-1 mb-1 text-discord-category font-semibold text-discord-text-muted hover:text-discord-text-secondary group tracking-discord-category uppercase"
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
                {category.channels.map((channel) => (
                  <Link 
                    key={channel.id}
                    href={`/channel/${channel.id}`}
                    className="flex items-center px-2 py-[6px] text-discord-text-muted hover:text-discord-text-primary hover:bg-discord-hover rounded cursor-pointer group"
                  >
                    <span className="text-discord-small mr-1.5">#</span>
                    <span className="text-discord-small font-[500] truncate">{channel.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* User Info */}
      <div className="h-[52px] px-2 flex items-center bg-discord-tertiary mt-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-discord-brand flex items-center justify-center relative">
            <span className="text-white text-discord-small font-medium">AW</span>
            <div className="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-discord-online border-[2.5px] border-discord-tertiary"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-discord-small font-medium">Anuj Wagle</span>
            <span className="text-discord-text-muted text-discord-timestamp">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;