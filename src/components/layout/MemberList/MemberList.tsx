'use client';

import { FC } from 'react';
import { UserStatus } from '@/components/common/UserStatus';
import { BOTS, getFullBotName } from '@/config/bots';

const roles = [
  { id: 'owner', name: 'Portfolio Owner', color: '#f47fff' },
  { id: 'bot', name: 'Bot Squad', color: '#5865f2' },
];

const MemberList: FC = () => {
  const members = [
    // Owner
    {
      id: 'owner',
      name: 'Anuj Wagle',
      status: 'online' as const,
      role: roles[0],
      activity: 'Building awesome stuff'
    },
    // Bots
    ...BOTS.map(bot => ({
      id: bot.id,
      name: getFullBotName(bot),
      status: 'online' as const,
      role: roles[1],
      activity: bot.defaultActivity
    }))
  ];

  return (
    <div className="w-60 bg-discord-secondary border-l border-discord-tertiary flex flex-col">
      <div className="flex-1 px-2 pt-4 overflow-y-auto">
        {roles.map(role => {
          const roleMembers = members.filter(m => m.role.id === role.id);
          if (roleMembers.length === 0) return null;

          return (
            <div key={role.id} className="mb-4">
              <h3 className="px-2 text-xs font-semibold text-discord-text-muted uppercase mb-1">
                {role.name} — {roleMembers.length}
              </h3>
              {roleMembers.map(member => (
                <div
                  key={member.id}
                  className="flex items-center px-2 py-1 mx-2 rounded hover:bg-discord-hover group cursor-pointer"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-discord-primary flex items-center justify-center">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <span className="text-white text-sm">{member.name.slice(0, 2)}</span>
                      )}
                    </div>
                    <UserStatus status={member.status} />
                  </div>
                  <div className="ml-2 min-w-0">
                    <div className="text-discord-text-primary text-sm font-medium truncate">
                      {member.name}
                    </div>
                    {member.activity && (
                      <div className="text-discord-text-muted text-xs truncate">
                        {member.activity}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberList; 