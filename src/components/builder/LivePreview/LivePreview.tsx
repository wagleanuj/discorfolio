'use client';

import { FC } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

export const LivePreview: FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
        <h2 className="text-gray-200 font-medium">Live Preview</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Monitor className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Smartphone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Preview Window */}
      <div className="flex-1 p-6 overflow-hidden">
        <div className="bg-discord-primary w-full h-full rounded-lg overflow-hidden shadow-2xl">
          {/* Discord preview will be rendered here */}
          <iframe 
            src="/"
            className="w-full h-full border-0"
            title="Discordfolio Preview"
          />
        </div>
      </div>
    </div>
  );
}; 