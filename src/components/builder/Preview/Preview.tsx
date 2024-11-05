'use client';

import { FormData } from '../ResumeForm/types';
import ServerList from '@/components/layout/ServerList';
import ChannelList from '@/components/layout/ChannelList';
import ChannelContent from '@/components/layout/ChannelContent/ChannelContent';
import { useState } from 'react';
import { Smartphone, Monitor, ChevronLeft, Menu } from 'lucide-react';

interface PreviewProps {
  data: FormData;
}

export default function Preview({ data }: PreviewProps) {
  const [selectedChannel, setSelectedChannel] = useState('introduction');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showSidebar, setShowSidebar] = useState(true);

  const channels = [
    { id: 'introduction', name: 'introduction', icon: '#' },
    { id: 'experience', name: 'experience', icon: '#' },
    { id: 'projects', name: 'projects', icon: '#' },
    { id: 'skills', name: 'skills', icon: '#' },
    { id: 'education', name: 'education', icon: '#' },
    { id: 'contact', name: 'contact', icon: '#' }
  ];

  // Convert resume data to messages format
  const getMessagesForChannel = (channelId: string) => {
    switch (channelId) {
      case 'introduction':
        return data.basics ? [
          {
            id: 'intro-1',
            content: `# ${data.basics.name}\n${data.basics.label}\n\n${data.basics.summary}`,
            author: {
              name: '👋 Doorman',
              avatar: '👋',
              isBot: true
            },
            timestamp: new Date().toISOString()
          }
        ] : [];

      case 'experience':
        return data.work ? data.work.map((work: any, index: number) => ({
          id: `work-${index}`,
          content: `### ${work.position} at ${work.name}\n${work.startDate} - ${work.endDate}\n\n${work.summary}\n\n${work.highlights?.map((h: string) => `• ${h}`).join('\n') || ''}`,
          author: {
            name: '💼 Scribe',
            avatar: '💼',
            isBot: true
          },
          timestamp: new Date().toISOString()
        })) : [];

      case 'projects':
        return data.projects ? data.projects.map((project: any, index: number) => ({
          id: `project-${index}`,
          content: `### ${project.name}\n${project.description}\n\n**Technologies:** ${project.keywords?.join(', ')}\n\n**Highlights:**\n${project.highlights?.map((h: string) => `• ${h}`).join('\n') || ''}`,
          author: {
            name: '🚀 Maker',
            avatar: '🚀',
            isBot: true
          },
          timestamp: new Date().toISOString()
        })) : [];

      case 'skills':
        return data.skills ? data.skills.map((skill: any, index: number) => ({
          id: `skill-${index}`,
          content: `### ${skill.name}\n**Level:** ${skill.level}\n\n**Keywords:** ${skill.keywords?.join(', ')}`,
          author: {
            name: '🎯 Arsenal',
            avatar: '🎯',
            isBot: true
          },
          timestamp: new Date().toISOString()
        })) : [];

      case 'education':
        return data.education ? data.education.map((edu: any, index: number) => ({
          id: `edu-${index}`,
          content: `### ${edu.studyType} in ${edu.area}\n${edu.institution}\n${edu.startDate} - ${edu.endDate}\n\n${edu.score ? `GPA: ${edu.score}\n\n` : ''}${edu.courses ? `**Courses:**\n${edu.courses.map((c: string) => `• ${c}`).join('\n')}` : ''}`,
          author: {
            name: '🎓 Scholar',
            avatar: '🎓',
            isBot: true
          },
          timestamp: new Date().toISOString()
        })) : [];

      case 'contact':
        return data.basics ? [
          {
            id: 'contact-1',
            content: `# Contact Information\n\n${data.basics.email ? `📧 Email: ${data.basics.email}\n` : ''}${data.basics.phone ? `📱 Phone: ${data.basics.phone}\n` : ''}${data.basics.url ? `🌐 Website: ${data.basics.url}\n` : ''}${data.basics.location ? `📍 Location: ${data.basics.location.city}, ${data.basics.location.region}, ${data.basics.location.countryCode}\n` : ''}\n\n${data.basics.profiles ? `### Social Profiles\n${data.basics.profiles.map((p: any) => `• [${p.network}](${p.url})`).join('\n')}` : ''}`,
            author: {
              name: '📬 Postman',
              avatar: '📬',
              isBot: true
            },
            timestamp: new Date().toISOString()
          }
        ] : [];

      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* View Toggle */}
      <div className="flex items-center justify-end gap-2 p-2 bg-[#2f3136] border-b border-[#202225]">
        <button
          onClick={() => setViewMode('desktop')}
          className={`p-2 rounded ${
            viewMode === 'desktop' 
              ? 'bg-[#5865f2] text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          title="Desktop view"
        >
          <Monitor size={20} />
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`p-2 rounded ${
            viewMode === 'mobile' 
              ? 'bg-[#5865f2] text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          title="Mobile view"
        >
          <Smartphone size={20} />
        </button>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-hidden bg-[#36393f] p-4">
        <div 
          className={`relative h-full mx-auto transition-all duration-300 ${
            viewMode === 'mobile' 
              ? 'w-[375px] shadow-lg rounded-[3rem] border-8 border-[#202225] overflow-hidden' 
              : 'w-full rounded-lg'
          }`}
        >
          <div className="flex h-full bg-[#36393f] overflow-hidden">
            {/* Server List & Channel List Container */}
            <div 
              className={`flex h-full transition-all duration-300 ${
                viewMode === 'mobile' 
                  ? `absolute inset-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`
                  : 'relative'
              }`}
            >
              {/* Server List */}
              <div className={`bg-[#202225] flex-shrink-0 ${
                viewMode === 'mobile' ? 'w-[48px]' : 'w-[72px]'
              }`}>
                <ServerList />
              </div>

              {/* Channel List */}
              <div className={`bg-[#2f3136] flex-shrink-0 ${
                viewMode === 'mobile' ? 'w-[200px]' : 'w-60'
              }`}>
                <ChannelList 
                  channels={channels}
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

            {/* Mobile Menu Button */}
            {viewMode === 'mobile' && (
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="absolute top-4 left-4 z-20 p-2 bg-[#202225] rounded text-gray-400 hover:text-white"
              >
                {showSidebar ? <ChevronLeft size={20} /> : <Menu size={20} />}
              </button>
            )}

            {/* Main Content */}
            <div className={`flex-1 flex flex-col ${
              viewMode === 'mobile' && showSidebar ? 'opacity-50' : 'opacity-100'
            }`}>
              <ChannelContent
                messages={getMessagesForChannel(selectedChannel)}
                isMobile={viewMode === 'mobile'}
                isPreview={true}
                selectedChannel={selectedChannel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 