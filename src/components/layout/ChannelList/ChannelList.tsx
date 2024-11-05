'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ServerHeader } from '@/components/layout/ServerHeader';
import { cn } from '@/lib/utils';

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

interface PreviewChannel {
  id: string;
  name: string;
  icon: string;
}

interface ChannelListProps {
  channels?: PreviewChannel[];
  selectedChannel?: string;
  onChannelSelect?: (channelId: string) => void;
  isPreview?: boolean;
}

const defaultChannelCategories: ChannelCategory[] = [
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

export default function ChannelList({ 
  channels,
  selectedChannel,
  onChannelSelect,
  isPreview = false 
}: ChannelListProps) {
  const [categories, setCategories] = useState(defaultChannelCategories);
  const pathname = usePathname();

  if (isPreview && channels) {
    return (
      <div className="p-3">
        <div className="text-gray-300 mb-2 px-2">Channels</div>
        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onChannelSelect?.(channel.id)}
              className={`w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-[#42464D] ${
                selectedChannel === channel.id ? 'bg-[#42464D] text-white' : 'text-gray-400'
              }`}
            >
              <span>{channel.icon}</span>
              <span>{channel.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, collapsed: !cat.collapsed } : cat
    ));
  };

  return (
    <div className="p-3">
      <ServerHeader />
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center gap-2 px-2 py-1 text-gray-400 hover:text-gray-300"
            >
              {category.collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              <span className="text-xs font-semibold">{category.name}</span>
            </button>
            {!category.collapsed && (
              <div className="mt-1 space-y-0.5">
                {category.channels.map((channel) => (
                  <Link
                    key={channel.id}
                    href={`/channel/${channel.id}`}
                    scroll={false}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded hover:bg-[#42464D]",
                      pathname === `/channel/${channel.id}` ? "bg-[#42464D] text-white" : "text-gray-400"
                    )}
                  >
                    <span>#</span>
                    <span>{channel.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}