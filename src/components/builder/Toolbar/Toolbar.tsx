'use client';

import { Download, Upload, Monitor, Smartphone, Eye, EyeOff } from 'lucide-react';
import Tooltip from '@/components/common/Tooltip/Tooltip';

interface ToolbarProps {
  onDownload: () => void;
  onUpload: (file: File) => void;
  viewMode: 'desktop' | 'mobile';
  onViewModeChange: (mode: 'desktop' | 'mobile') => void;
  previewVisible: boolean;
  onPreviewToggle: () => void;
}

export default function Toolbar({
  onDownload,
  onUpload,
  viewMode,
  onViewModeChange,
  previewVisible,
  onPreviewToggle
}: ToolbarProps) {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="h-14 bg-gradient-to-r from-[#2f3136] to-[#36393f] border-b border-[#202225] px-6 flex items-center gap-6">
      {/* Title */}
      <div className="flex-shrink-0">
        <h1 className="text-white font-bold text-lg tracking-tight">
          Discorfolio <span className="text-[#5865f2]">Builder</span>
        </h1>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-[#202225]" />

      {/* File operations */}
      <div className="flex items-center gap-3">
        <Tooltip content="Upload resume JSON file">
          <label className="flex items-center gap-2 px-3 py-1.5 bg-[#202225] text-gray-300 hover:text-white rounded-md hover:bg-[#36393f] transition-all cursor-pointer group">
            <Upload size={16} className="group-hover:text-[#5865f2] transition-colors" />
            <span className="text-sm font-medium">Upload JSON</span>
            <input
              type="file"
              accept="application/json"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </Tooltip>

        <Tooltip content="Download resume as JSON">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#202225] text-gray-300 hover:text-white rounded-md hover:bg-[#36393f] transition-all group"
          >
            <Download size={16} className="group-hover:text-[#5865f2] transition-colors" />
            <span className="text-sm font-medium">Download JSON</span>
          </button>
        </Tooltip>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* View controls */}
      <div className="flex items-center gap-3">
        {/* View mode toggle */}
        <div className="flex items-center bg-[#202225] rounded-md p-1">
          <Tooltip content="Desktop view">
            <button
              onClick={() => onViewModeChange('desktop')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'desktop' 
                  ? 'bg-[#36393f] text-[#5865f2]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Mobile view">
            <button
              onClick={() => onViewModeChange('mobile')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'mobile' 
                  ? 'bg-[#36393f] text-[#5865f2]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Smartphone size={16} />
            </button>
          </Tooltip>
        </div>

        {/* Preview toggle */}
        <Tooltip content={previewVisible ? 'Hide preview' : 'Show preview'}>
          <button
            onClick={onPreviewToggle}
            className={`p-1.5 rounded-md transition-all ${
              previewVisible 
                ? 'bg-[#36393f] text-[#5865f2]' 
                : 'bg-[#202225] text-gray-400 hover:text-white'
            }`}
          >
            {previewVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Tooltip>
      </div>
    </div>
  );
} 