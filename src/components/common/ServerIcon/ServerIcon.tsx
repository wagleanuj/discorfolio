'use client';

import { FC } from 'react';
import Image from 'next/image';

interface ServerIconProps {
  name: string;
  image?: string;
  selected?: boolean;
  unread?: boolean;
}

const ServerIcon: FC<ServerIconProps> = ({ name, image, selected, unread }) => {
  return (
    <div className="relative group">
      {/* Server Pill */}
      <div className={`absolute -left-3 w-2 h-10 rounded-r-full bg-white transition-all duration-200 
        ${selected ? 'h-10' : unread ? 'h-3' : 'h-0 group-hover:h-5'}`} 
      />
      
      {/* Server Icon */}
      <div className={`w-12 h-12 flex items-center justify-center transition-all duration-200
        ${image ? 'rounded-[24px] group-hover:rounded-[16px]' : 'rounded-[24px] group-hover:rounded-[16px]'}
        ${selected ? 'bg-discord-brand rounded-[16px]' : 'bg-discord-secondary'}`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="rounded-[inherit]"
          />
        ) : (
          <span className="text-white text-sm font-medium">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ServerIcon; 