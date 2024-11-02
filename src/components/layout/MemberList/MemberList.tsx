'use client';

import { FC } from 'react';
import { UserStatus } from '@/components/common/UserStatus';
import { BOTS, getFullBotName } from '@/config/bots';

const roles = [
  { id: 'owner', name: 'Portfolio Owner', color: '#f47fff' },
  { id: 'bot', name: 'Bot Squad', color: '#5865f2' },
];

// Define bot emojis based on our requirements
const botEmojis = {
  'doorman': '👋',
  'scribe': '💼',
  'arsenal': '🎯',
  'maker': '🚀',
  'scholar': '🎓',
  'postman': '📬'
};

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
    name: bot.name,
    status: 'online' as const,
    role: roles[1],
    activity: bot.defaultActivity,
    emoji: botEmojis[bot.id as keyof typeof botEmojis]
  }))
];

const MemberList: FC = () => {
  return (
    <div className="h-full flex flex-col bg-discord-secondary border-l border-discord-tertiary">
      <div className="p-3 pb-0">
        <h3 className="text-discord-text-muted text-xs font-semibold uppercase tracking-wider px-2">
          Members — {members.length}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {roles.map(role => {
          const roleMembers = members.filter(m => m.role.id === role.id);
          if (roleMembers.length === 0) return null;

          return (
            <div key={role.id}>
              <h4 
                className="text-xs font-semibold mb-1 px-2"
                style={{ color: role.color }}
              >
                {role.name} — {roleMembers.length}
              </h4>
              <div className="space-y-[2px]">
                {roleMembers.map(member => (
                  <div
                    key={member.id}
                    className="flex items-center px-2 py-1 mx-2 rounded hover:bg-discord-hover group cursor-pointer"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-discord-primary flex items-center justify-center">
                        {member.emoji ? (
                          <span className="text-xl">{member.emoji}</span>
                        ) : (
                          <span className="text-white text-sm">
                            {member.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <UserStatus status={member.status} />
                    </div>
                    <div className="ml-2 min-w-0">
                      <div className="text-discord-text-primary text-base font-medium truncate">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberList; 