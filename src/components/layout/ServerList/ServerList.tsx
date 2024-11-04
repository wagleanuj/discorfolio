'use client';

import { FC } from 'react';
import { ServerIcon } from '@/components/common/ServerIcon';
import { Tooltip } from '@/components/common/Tooltip';
import { Github, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const ServerList: FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname.startsWith('/channel/');

  return (
    <div className="w-[72px] bg-discord-tertiary flex flex-col items-center pt-3 space-y-2">
      {/* Home Button */}
      <div className="relative group">
        {/* Server Pill - Updated to stay visible when selected */}
        <div className="absolute -left-3 top-0 bottom-0 flex items-center">
          <div className={cn(
            "w-2 rounded-r-full bg-white transition-all duration-200 origin-center",
            isHome ? "h-10" : "h-0 group-hover:h-5"
          )} />
        </div>

        <Tooltip content="Discorfolio" position="right">
          <div>
            <ServerIcon
              name="Discorfolio"
              image="/portfolio-icon.svg"
              selected={isHome}
            />
          </div>
        </Tooltip>
      </div>
      
      {/* Separator */}
      <div className="w-8 h-[2px] bg-discord-secondary rounded-full" />
      
      {/* GitHub */}
      <div className="relative group">
        <div className="absolute -left-3 top-0 bottom-0 flex items-center">
          <div className="w-2 rounded-r-full bg-white transition-all duration-200 origin-center h-0 group-hover:h-5" />
        </div>

        <Tooltip content="GitHub" position="right">
          <a 
            href="https://github.com/wagleanuj" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ServerIcon
              name="GitHub"
              icon={<Github className="w-6 h-6 text-white" />}
            />
          </a>
        </Tooltip>
      </div>

      {/* LinkedIn */}
      <div className="relative group">
        <div className="absolute -left-3 top-0 bottom-0 flex items-center">
          <div className="w-2 rounded-r-full bg-white transition-all duration-200 origin-center h-0 group-hover:h-5" />
        </div>

        <Tooltip content="LinkedIn" position="right">
          <a 
            href="https://www.linkedin.com/in/wagleanuj" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ServerIcon
              name="LinkedIn"
              icon={<Linkedin className="w-6 h-6 text-white" />}
            />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default ServerList; 