'use client';

import { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';

const ServerHeader: FC = () => {
  const { resume } = useResume();
  const firstName = resume.basics.name.split(' ')[0];
  const serverName = `${firstName}'s Portfolio`;

  return (
    <div className="h-12 px-4 flex items-center justify-between shadow-sm border-b border-discord-tertiary">
      <h2 className="text-white font-semibold text-server-name truncate">
        {serverName}
      </h2>
      <button className="text-discord-text-muted hover:text-discord-text-primary">
        <ChevronDown size={20} />
      </button>
    </div>
  );
};

export default ServerHeader; 