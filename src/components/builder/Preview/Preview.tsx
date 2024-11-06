'use client';

import { FormData } from '../ResumeForm/types';
import ServerList from '@/components/layout/ServerList';
import ChannelList from '@/components/layout/ChannelList';
import ChannelContent from '@/components/layout/ChannelContent/ChannelContent';
import { useState } from 'react';
import { Smartphone, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateChannelContent } from '@/lib/utils/contentGenerator';
import { Resume } from '@/types';

interface PreviewProps {
    data: FormData;
    viewMode: 'desktop' | 'mobile';
}

export default function Preview({ data, viewMode }: PreviewProps) {
    const [selectedChannel, setSelectedChannel] = useState('introduction');
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div className="flex flex-col h-full">
            {/* Preview Container */}
            <div className="flex-1 overflow-hidden bg-[#36393f] p-4">
                <div 
                    className={`relative h-full mx-auto transition-all duration-300 shadow-2xl ${
                        viewMode === 'mobile' 
                            ? 'w-[375px] shadow-lg rounded-[3rem] border-8 border-[#202225] overflow-hidden shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)]' 
                            : 'w-full rounded-lg shadow-[0_0_30px_-10px_rgba(0,0,0,0.3)]'
                    }`}
                >
                    <div className="flex h-full bg-[#36393f] overflow-hidden">
                        {/* Server List & Channel List Container */}
                        <div 
                            className={`flex h-full ${
                                viewMode === 'mobile' 
                                    ? `absolute inset-0 z-30 transform ${showSidebar ? 'translate-x-0' : '-translate-x-[248px]'}`
                                    : 'relative flex-shrink-0'
                            }`}
                        >
                            {/* Server List */}
                            <div className={`bg-[#202225] flex-shrink-0 ${
                                viewMode === 'mobile' ? 'w-12' : 'w-[72px]'
                            }`}>
                                <ServerList />
                            </div>

                            {/* Channel List */}
                            <div className={`bg-[#2f3136] flex-shrink-0 ${
                                viewMode === 'mobile' ? 'w-[200px]' : 'w-60'
                            }`}>
                                <ChannelList 
                                    selectedChannel={selectedChannel}
                                    onChannelSelect={(id) => {
                                        setSelectedChannel(id);
                                        if (viewMode === 'mobile') {
                                            setShowSidebar(false);
                                        }
                                    }}
                                    isPreview={true}
                                />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className={`flex-1 flex flex-col overflow-hidden ${
                            viewMode === 'mobile' && showSidebar ? 'opacity-50' : 'opacity-100'
                        }`}>
                            <ChannelContent
                                messages={generateChannelContent(data as Resume, selectedChannel) || []}
                                isPreview={true}
                                channelName={selectedChannel}
                            />
                        </div>

                        {/* Mobile Controls */}
                        {viewMode === 'mobile' && (
                            <>
                                {/* Clickable Edge when sidebar is closed */}
                                {!showSidebar && (
                                    <div 
                                        className="z-40 absolute left-0 top-0 bottom-0 w-1 bg-[#202225] hover:bg-[#5865f2] transition-colors flex items-center"
                                    >
                                        <button
                                            onClick={() => setShowSidebar(true)}
                                            className="absolute -right-3 w-6 h-6 rounded-full bg-[#202225] hover:bg-[#5865f2] transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                )}

                                {/* Channel List Edge Button */}
                                {showSidebar && (
                                    <div 
                                        className="z-40 absolute right-0 top-0 bottom-0 w-1 bg-[#202225] hover:bg-[#5865f2] transition-colors flex items-center"
                                        style={{ left: '248px' }}
                                    >
                                        <button
                                            onClick={() => setShowSidebar(false)}
                                            className="absolute -right-3 w-6 h-6 rounded-full bg-[#202225] hover:bg-[#5865f2] transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 