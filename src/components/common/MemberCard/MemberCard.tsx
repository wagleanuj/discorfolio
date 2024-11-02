'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { UserStatus } from '@/components/common/UserStatus';

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
    initials?: string;
    activity?: string;
    emoji?: string;
  };
  position: { x: number; y: number };
  onClose: () => void;
}

export const MemberCard: FC<MemberCardProps> = ({ member, position, onClose }) => {
  const { resume } = useResume();
  const isOwner = member.role.id === 'owner';

  const findProfile = (network: string) => {
    return resume.basics.profiles.find(
      p => p.network.toLowerCase() === network.toLowerCase()
    );
  };

  const githubProfile = findProfile('github');
  const linkedinProfile = findProfile('linkedin');

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
            background: member.role.id === 'owner' 
              ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #1A535C)'
              : 'linear-gradient(45deg, #5865F2, #4752C4, #3C45A5, #2C3875)'
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
              <div className="w-full h-full rounded-full bg-discord-primary border-[6px] border-discord-primary ring-2 ring-black/20 flex items-center justify-center overflow-hidden">
                {member.emoji ? (
                  <span className="text-4xl">{member.emoji}</span>
                ) : (
                  <span className="text-white text-2xl font-medium">
                    {member.initials}
                  </span>
                )}
              </div>
              {/* Status indicator */}
              <UserStatus 
                status={member.status} 
                className="w-6 h-6 border-4 border-discord-primary"
              />
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
              <div className="pt-3 border-t border-discord-secondary">
                <h4 className="text-xs font-semibold text-discord-text-muted uppercase mb-1">
                  ACTIVITY
                </h4>
                <p className="text-discord-text-primary text-sm">
                  {member.activity}
                </p>
              </div>
            )}

            {/* Social Links - Only shown for portfolio owner */}
            {isOwner && (
              <div className="pt-3 border-t border-discord-secondary">
                <h4 className="text-xs font-semibold text-discord-text-muted uppercase mb-2">
                  SOCIALS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {/* GitHub */}
                  {githubProfile && (
                    <a 
                      href={githubProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-discord-secondary/30 rounded-md hover:bg-discord-secondary/50 transition-colors group"
                    >
                      <Github className="w-4 h-4 text-discord-text-muted group-hover:text-discord-text-primary" />
                    </a>
                  )}

                  {/* LinkedIn */}
                  {linkedinProfile && (
                    <a 
                      href={linkedinProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-discord-secondary/30 rounded-md hover:bg-discord-secondary/50 transition-colors group"
                    >
                      <Linkedin className="w-4 h-4 text-discord-text-muted group-hover:text-discord-text-primary" />
                    </a>
                  )}

                  {/* Email */}
                  <a 
                    href={`mailto:${resume.basics.email}`}
                    className="flex items-center gap-2 px-3 py-2 bg-discord-secondary/30 rounded-md hover:bg-discord-secondary/50 transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-discord-text-muted group-hover:text-discord-text-primary" />
                  </a>

                  {/* Website if available */}
                  {resume.basics.url && (
                    <a 
                      href={resume.basics.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-discord-secondary/30 rounded-md hover:bg-discord-secondary/50 transition-colors group"
                    >
                      <Globe className="w-4 h-4 text-discord-text-muted group-hover:text-discord-text-primary" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Contact Info - Only shown for portfolio owner */}
            {isOwner && (
              <div className="pt-3 border-t border-discord-secondary">
                <h4 className="text-xs font-semibold text-discord-text-muted uppercase mb-2">
                  CONTACT
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-discord-text-primary">
                    <Mail className="w-4 h-4 text-discord-text-muted" />
                    {resume.basics.email}
                  </div>
                  {resume.basics.phone && (
                    <div className="flex items-center gap-2 text-discord-text-primary">
                      <Phone className="w-4 h-4 text-discord-text-muted" />
                      {resume.basics.phone}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;