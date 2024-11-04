'use client';

import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Save, Download, Upload, Undo } from 'lucide-react';

interface BuilderLayoutProps {
  children: ReactNode;
}

export const BuilderLayout: FC<BuilderLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold">
              <span className="text-discord-brand">Discor</span>folio Builder
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded">
                <Undo className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded">
                <Upload className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-discord-brand text-white rounded-md hover:bg-discord-brand/90 transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="h-[calc(100vh-4rem)] flex">
          {children}
        </div>
      </main>
    </div>
  );
}; 