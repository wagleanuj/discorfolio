'use client';

import { FC, useState } from 'react';
import { UserStatus } from '@/components/common/UserStatus';
import { MemberCard } from '@/components/common/MemberCard';
import { useResume } from '@/contexts/ResumeContext';
import { usePathname } from 'next/navigation';
import { getBotByChannel } from '@/config/bots';

const roles = [
  { id: 'owner', name: 'Discorfolio Owner', color: '#f47fff' },
  { id: 'bot', name: 'Bot Squad', color: '#5865f2' },
];

interface MemberCardState {
  position: { x: number; y: number };
  member?: Member;
}

interface Member {
  id: string;
  name: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  role: {
    id: string;
    name: string;
    color: string;
  };
  activity?: string;
  emoji?: string;
  initials?: string;
  joinedAt: string;
}

export const MemberList: FC = () => {
  const [activeCard, setActiveCard] = useState<MemberCardState | null>(null);
  const { resume } = useResume();
  const pathname = usePathname();
  const currentChannelId = pathname.split('/').pop();

  // Get the current channel's bot
  const channelBot = currentChannelId ? getBotByChannel(currentChannelId) : null;

  const handleMemberClick = (member: Member, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    const position = {
      x: rect.left - 320,
      y: rect.top
    };

    const windowHeight = window.innerHeight;
    const cardHeight = 250;
    if (position.y + cardHeight > windowHeight) {
      position.y = windowHeight - cardHeight - 10;
    }

    setActiveCard({ member: { ...member, joinedAt: new Date().toISOString() }, position });
  };

  const members = [
    // Owner
    {
      id: 'owner',
      name: resume.basics.name,
      status: 'online' as const,
      role: roles[0],
      activity: 'Building awesome stuff',
      initials: resume.basics.name.split(' ').map(n => n[0]).join('')
    },
    // Only include the bot for the current channel
    ...(channelBot ? [{
      id: channelBot.id,
      name: channelBot.name,
      status: 'online' as const,
      role: roles[1],
      activity: `Managing ${channelBot.channel} channel`,
      emoji: channelBot.emoji
    }] : [])
  ];

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
                    onClick={(e) => handleMemberClick(member, e)}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-discord-primary flex items-center justify-center">
                        {member.emoji ? (
                          <span className="text-xl">{member.emoji}</span>
                        ) : (
                          <span className="text-white text-sm">
                            {member.initials}
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