'use client';

import { Users } from 'lucide-react';
import { useUi } from '@/contexts/UiContext';

export default function MemberListToggle() {
  const { showMemberList, setShowMemberList } = useUi();

  return (
    <button
      onClick={() => setShowMemberList(!showMemberList)}
      className="p-2 rounded hover:bg-[#42464D] text-gray-400 hover:text-gray-200 transition-colors"
      title={showMemberList ? "Hide Member List" : "Show Member List"}
    >
      <Users size={20} />
    </button>
  );
} 