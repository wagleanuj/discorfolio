'use client';

import { FC } from 'react';
import { ServerIcon } from '@/components/common/ServerIcon';
import { Tooltip } from '@/components/common/Tooltip';
import { Github, Linkedin } from 'lucide-react';

const ServerList: FC = () => {
  return (
    <div className="w-[72px] bg-discord-tertiary flex flex-col items-center pt-3 space-y-2">
      {/* Home Button */}
      <Tooltip content="Portfolio" position="right">
        <div>
          <ServerIcon
            name="Portfolio"
            image="/portfolio-icon.svg"
            selected={true}
            unread={false}
          />
        </div>
      </Tooltip>
      
      {/* Separator */}
      <div className="w-8 h-[2px] bg-discord-secondary rounded-full" />
      
      {/* GitHub */}
      <Tooltip content="GitHub" position="right">
        <a 
          href="https://github.com/wagleanuj" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <ServerIcon
            name="GitHub"
            icon={<Github className="w-6 h-6 text-white" />}
            unread={false}
          />
        </a>
      </Tooltip>

      {/* LinkedIn */}
      <Tooltip content="LinkedIn" position="right">
        <a 
          href="https://www.linkedin.com/in/wagleanuj" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <ServerIcon
            name="LinkedIn"
            icon={<Linkedin className="w-6 h-6 text-white" />}
            unread={false}
          />
        </a>
      </Tooltip>
    </div>
  );
};

export default ServerList; 