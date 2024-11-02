'use client';

import { FC } from 'react';

const WindowControls: FC = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80" />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80" />
      <div className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80" />
    </div>
  );
};

export default WindowControls; 