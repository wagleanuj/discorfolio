'use client';

import { FormData } from '../ResumeForm/types';
import ServerList from '@/components/layout/ServerList';
import ChannelList from '@/components/layout/ChannelList';
import WindowContainer from '@/components/layout/WindowContainer';
import { useState } from 'react';

interface PreviewProps {
  data: FormData;
}

export default function Preview({ data }: PreviewProps) {
  const [selectedChannel, setSelectedChannel] = useState('introduction');

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

  const channels = [
    { id: 'introduction', name: 'introduction', icon: '#' },
    { id: 'experience', name: 'experience', icon: '#' },
    { id: 'projects', name: 'projects', icon: '#' },
    { id: 'skills', name: 'skills', icon: '#' },
    { id: 'education', name: 'education', icon: '#' },
    { id: 'contact', name: 'contact', icon: '#' }
  ];

  return (
    <div className="flex h-full bg-[#36393f] rounded-lg overflow-hidden">
      {/* Server List */}
      <div className="w-[72px] bg-[#202225] flex-shrink-0">
        <ServerList />
      </div>

      {/* Channel List */}
      <div className="w-60 bg-[#2f3136] flex-shrink-0">
        <ChannelList 
          channels={channels} 
          selectedChannel={selectedChannel}
          onChannelSelect={setSelectedChannel}
          isPreview={true}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <WindowContainer>
          <div className="flex-1 overflow-y-auto p-4">
            {getMessagesForChannel(selectedChannel).map((message: any) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center">
                    {message.author.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{message.author.name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-gray-100 whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </WindowContainer>
      </div>
    </div>
  );
} 