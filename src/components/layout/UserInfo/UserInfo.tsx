'use client';

import { Settings, Mic, Headphones } from 'lucide-react';
import { useResume } from '@/contexts/ResumeContext';
import { useUser } from '@/contexts/UserContext';

interface UserInfoProps {
  isPreview?: boolean;
  isMobile?: boolean;
}

export default function UserInfo({ isPreview = false, isMobile = false }: UserInfoProps) {
  const { user } = useUser();
  return (
    <div className="h-[52px] px-2 flex items-center bg-discord-tertiary mt-auto">
      <div className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ backgroundColor: user.color }}>
      <span className="text-white text-discord-small font-medium">{user.initials}</span>
      <div className="absolute bottom-0 right-0 w-[10px] h-[10px] rounded-full bg-discord-online border-[2.5px] border-discord-tertiary"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-white text-discord-small font-medium">{user.name}</span>
      <span className="text-discord-text-muted text-discord-timestamp">Online</span>
    </div>
  </div>
</div>
  );
} 