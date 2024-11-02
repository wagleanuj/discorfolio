'use client';

import { FC } from 'react';

interface UserStatusProps {
  status: 'online' | 'idle' | 'dnd' | 'offline';
}

const UserStatus: FC<UserStatusProps> = ({ status }) => {
  const statusColors = {
    online: 'bg-discord-online',
    idle: 'bg-discord-warning',
    dnd: 'bg-discord-danger',
    offline: 'bg-discord-text-muted'
  };

  return (
    <div className="relative">
      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusColors[status]} border-2 border-discord-tertiary`} />
    </div>
  );
};

export default UserStatus; 