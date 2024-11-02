'use client';

import { FC, useState } from 'react';
import { UserStatus } from '@/components/common/UserStatus';
import { BOTS, getFullBotName } from '@/config/bots';
import { MemberCard } from '@/components/common/MemberCard/MemberCard';

const roles = [
  { id: 'owner', name: 'Portfolio Owner', color: '#f47fff' },
  { id: 'bot', name: 'Bot Squad', color: '#5865f2' },
];

interface MemberCardState {
  member: any;
  position: { x: number; y: number };
}

const MemberList: FC = () => {
  const [activeCard, setActiveCard] = useState<MemberCardState | null>(null);

  const handleMemberClick = (member: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Position the card to the left of the member list
    const position = {
      x: rect.left - 320, // card width + some spacing
      y: rect.top
    };

    // If card would go off-screen vertically, adjust Y position
    const windowHeight = window.innerHeight;
    const cardHeight = 250; // approximate card height
    if (position.y + cardHeight > windowHeight) {
      position.y = windowHeight - cardHeight - 10;
    }

    setActiveCard({ member: { ...member, joinedAt: new Date().toISOString() }, position });
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
      name: getFullBotName(bot),
      status: 'online' as const,
      role: roles[1],
      activity: bot.defaultActivity
    }))
  ];

  return (
    <div className="h-full flex flex-col bg-discord-secondary border-l border-discord-tertiary">
      {/* Members Header */}
      <div className="p-3 pb-0">
        <h3 className="text-discord-text-muted text-xs font-semibold uppercase tracking-wider px-2">
          Members — {members.length}
        </h3>
      </div>

      {/* Members List */}
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
                    onClick={(e) => handleMemberClick(member, e)}
                    className="flex items-center px-2 py-1 mx-2 rounded hover:bg-discord-hover group cursor-pointer"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-discord-primary flex items-center justify-center">
                        <span className="text-white text-sm">
                          {member.name.includes(' ') 
                            ? member.name.split(' ')[1].slice(0, 2) 
                            : member.name.slice(0, 2)}
                        </span>
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

      {/* Member Card Portal */}
      {activeCard && (
        <MemberCard
          member={activeCard.member}
          position={activeCard.position}
          onClose={() => setActiveCard(null)}
        />
      )}
    </div>
  );
};

export default MemberList; 