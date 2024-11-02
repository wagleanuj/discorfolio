'use client';

import { FC, ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServerIconProps {
  name: string;
  image?: string;
  icon?: ReactNode;
  selected?: boolean;
  unread?: boolean;
}

export const ServerIcon: FC<ServerIconProps> = ({
  name,
  image,
  icon,
  selected = false,
  unread = false,
}) => {
  return (
    <div 
      className={cn(
        "w-14 h-14 flex items-center justify-center transition-all duration-200",
        "hover:rounded-[16px] cursor-pointer",
        selected ? "rounded-[16px] bg-discord-brand" : "rounded-[24px] bg-discord-secondary hover:bg-discord-brand"
      )}
    >
      {icon ? icon : image ? (
        <div className="w-10 h-10 relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-white text-lg font-medium">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}; 