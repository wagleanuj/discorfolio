'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'online' | 'idle' | 'dnd' | 'offline';

interface UserStatusProps {
  status: StatusType;
  className?: string;
}

export const UserStatus: FC<UserStatusProps> = ({ status, className }) => {
  const statusColors = {
    online: 'bg-discord-online',
    idle: 'bg-discord-warning',
    dnd: 'bg-discord-danger',
    offline: 'bg-discord-text-muted'
  };

  return (
    <div className={cn(
      "absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full border-[2.5px] border-discord-tertiary",
      statusColors[status],
      className
    )} />
  );
};

export default UserStatus; 