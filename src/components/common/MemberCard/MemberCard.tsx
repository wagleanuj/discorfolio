'use client';

import { FC, useEffect } from 'react';
import { UserStatus } from '@/components/common/UserStatus';
import { cn } from '@/lib/utils';

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    status: 'online' | 'idle' | 'dnd' | 'offline';
    role: {
      id: string;
      name: string;
      color: string;
    };
    activity?: string;
    avatar?: string;
    joinedAt?: string;
  };
  position: { x: number; y: number };
  onClose: () => void;
}

const getBotGradient = (botId: string): string => {
  const gradients = {
    doorman: 'linear-gradient(45deg, #FF6B6B, #FF9B6B, #FFB86B, #FFD56B)',    // Warm welcome
    scribe: 'linear-gradient(45deg, #4ECDC4, #45B7D1, #2FA0B3, #1A535C)',     // Professional blue
    arsenal: 'linear-gradient(45deg, #9B6BFF, #6B8AFF, #6BAFFF, #6BD4FF)',    // Skill purple
    maker: 'linear-gradient(45deg, #FF6B9B, #FF6BBF, #FF6BE3, #FF6BFF)',      // Creative pink
    scholar: 'linear-gradient(45deg, #6BFF9B, #6BFFBF, #6BFFE3, #6BFFFF)',    // Academic green
    postman: 'linear-gradient(45deg, #FFD56B, #FFE36B, #FFF16B, #FFFF6B)',    // Contact yellow
    owner: 'linear-gradient(45deg, #5865F2, #4752C4, #3C45A5, #2C3875)',      // Discord blurple
  };

  return gradients[botId as keyof typeof gradients] || gradients.owner;
};

export const MemberCard: FC<MemberCardProps> = ({ member, position, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Card */}
      <div 
        className="fixed z-50 w-80 bg-discord-primary rounded-lg shadow-lg overflow-hidden animate-slide-in"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      >
        {/* Banner with gradient background */}
        <div 
          className="h-20 relative overflow-hidden animate-fade-up"
          style={{
            background: getBotGradient(member.id)
          }}
        >
          {/* Animated gradient overlay */}
          <div 
            className="absolute inset-0 opacity-30 animate-gradient"
            style={{
              background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
              backgroundSize: '24px 24px'
            }}
          />
        </div>
        
        {/* Content */}
        <div className="px-4 pb-4">
          {/* Avatar with Status */}
          <div className="relative -mt-10 mb-3 animate-scale-in">
            <div className="relative w-20 h-20">
              <div className="w-full h-full rounded-full bg-discord-primary border-[6px] border-discord-primary ring-2 ring-black/20 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-200">
                {member.avatar ? (
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-2xl font-medium">
                    {member.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Status indicator overlaid on avatar */}
              <div className="absolute -bottom-1 -right-1 rounded-full border-4 border-discord-primary ring-2 ring-black/20 animate-scale-in">
                <UserStatus 
                  status={member.status} 
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-3 animate-fade-up">
            <div>
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <span 
                className="text-sm font-medium"
                style={{ color: member.role.color }}
              >
                {member.role.name}
              </span>
            </div>

            {member.activity && (
              <div className="pt-3 border-t border-discord-secondary animate-fade-in">
                <h4 className="text-xs font-semibold text-discord-text-muted uppercase mb-1">
                  ACTIVITY
                </h4>
                <p className="text-discord-text-primary text-sm">
                  {member.activity}
                </p>
              </div>
            )}

            {member.joinedAt && (
              <div className="pt-3 border-t border-discord-secondary animate-fade-in">
                <h4 className="text-xs font-semibold text-discord-text-muted uppercase mb-1">
                  JOINED SERVER
                </h4>
                <p className="text-discord-text-primary text-sm">
                  {new Date(member.joinedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;