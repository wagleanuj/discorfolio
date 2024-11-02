'use client';

import { FC } from 'react';

interface ServerListProps {}

const ServerList: FC<ServerListProps> = () => {
  return (
    <div className="w-[72px] bg-discord-tertiary flex flex-col items-center pt-3 space-y-2">
      {/* Home Button */}
      <div className="w-12 h-12 rounded-full bg-discord-brand flex items-center justify-center text-white cursor-pointer hover:rounded-2xl transition-all duration-200">
        AW
      </div>
      
      {/* Separator */}
      <div className="w-8 h-[2px] bg-discord-secondary rounded-full" />
      
      {/* Server Icon (Portfolio) */}
      <div className="w-12 h-12 rounded-[24px] bg-discord-secondary flex items-center justify-center text-white cursor-pointer hover:bg-discord-brand hover:rounded-2xl transition-all duration-200">
        P
      </div>
    </div>
  );
};

export default ServerList; 