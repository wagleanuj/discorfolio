'use client';

import Message, { MessageProps } from '@/components/common/Message/Message';
import ChatInput from '@/components/common/ChatInput';
import { Resume } from '@/types';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';


interface ChannelContentProps {
  messages: MessageProps[];
  isMobile?: boolean;
  isPreview?: boolean;
  selectedChannel?: string;
  channelName?: string;
}

export default function ChannelContent({
  messages,
  isMobile = false,
  isPreview = false,
  selectedChannel,
  channelName
}: ChannelContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      {!isPreview && channelName && (
        <div className="border-b border-[#202225] p-4 flex-shrink-0">
          <h2 className="text-lg font-semibold text-white">#{channelName}</h2>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message
            key={`${message.timestamp}-${index}`}
            author={message.author}
            content={message.content}
            timestamp={message.timestamp}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Chat Input */}
      {!isPreview && (
        <div className="p-4 border-t border-[#202225] flex-shrink-0">
          <ChatInput channelId={selectedChannel || channelName || ''} />
        </div>
      )}
    </div>

  );
}

  // Helper function to get a safe timestamp
  const getSafeTimestamp = (date?: string) => {
    if (!date) return new Date().toISOString();
    return new Date(date).toISOString();
  };

export const generateChannelContent = (resume: Resume, channelId: string): MessageProps[] | null => {
  switch (channelId) {
    case 'intro':
      return [{
        content: resume.basics?.summary,
        timestamp: getSafeTimestamp(),
        author: {
          name: 'Doorman',
          bot: true,
          emoji: '👋'
        }
      }];

    case 'exp':
      return resume?.work?.map(job => ({
        content: (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{job.name}</h3>
                <p className="text-discord-text-secondary">
                  {job.position} | {job.location}
                </p>
              </div>
              <span className="text-discord-text-muted text-sm">
                {new Date(job.startDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  year: 'numeric' 
                })} - {
                  job.endDate ? new Date(job.endDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  }) : 'Present'
                }
              </span>
            </div>
            {job?.summary && (
              <p className="text-discord-text-secondary italic">{job?.summary}</p>
            )}
            <ul className="list-disc ml-4 space-y-2">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="text-discord-text-primary">{highlight}</li>
              ))}
            </ul>
            {job?.url && (
              <a 
                href={job?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-discord-link hover:underline inline-block mt-2"
              >
                🔗 Company Website
              </a>
            )}
          </div>
        ),
        timestamp: getSafeTimestamp(job.startDate),
        author: {
          name: 'Scribe',
          bot: true,
          emoji: '💼'
        }
      }));

    case 'skills':
      return [{
        content: (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="space-y-6">
                {resume?.skills?.map((skillGroup, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-lg font-medium text-discord-text-primary">
                      {skillGroup.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.keywords.map((skill, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 bg-discord-secondary rounded-full text-sm hover:bg-discord-hover transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
        timestamp: getSafeTimestamp(),
        author: {
          name: 'Arsenal',
          bot: true,
          emoji: '🎯'
        }
      }];

    case 'projects':
      return resume?.projects?.map(project => ({
        content: (
          <div className="space-y-4 bg-discord-secondary/10 p-4 rounded-lg">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-discord-text-primary">{project.name}</h3>
                {project.url && (
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-discord-link hover:underline text-sm flex items-center gap-1"
                  >
                    <span>View Project</span>
                    <span className="text-xs">↗</span>
                  </a>
                )}
              </div>
              
              <p className="text-discord-text-secondary mt-2">{project.description}</p>
              
              {project.keywords && project.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.keywords.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-discord-brand/10 text-discord-brand rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc ml-4 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-discord-text-secondary text-sm">{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ),
        timestamp: getSafeTimestamp(project.startDate),
        author: {
          name: 'Maker',
          bot: true,
          emoji: '🚀'
        }
      }));

    case 'edu':
      return resume?.education?.map(edu => ({
        content: (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <span className="text-discord-text-muted text-sm">
                  {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                </span>
              </div>
              <p className="text-discord-text-secondary">
                {edu.studyType} in {edu.area}
              </p>
              <p className="text-discord-text-muted mt-1">
                {edu.location}
              </p>
              {edu.score && (
                <p className="text-discord-text-secondary mt-2">
                  GPA: {edu.score}
                </p>
              )}
              {edu.url && (
                <a 
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-discord-link hover:underline text-sm mt-2 inline-block"
                >
                  Visit Institution →
                </a>
              )}
            </div>
          </div>
        ),
        timestamp: getSafeTimestamp(edu.startDate),
        author: {
          name: 'Scholar',
          bot: true,
          emoji: '🎓'
        }
      }));

    case 'contact':
      return [{
        content: (
          <div className="space-y-4">
            <div className="bg-discord-secondary/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              </div>
              
              <div className="grid gap-3">
                {/* Email */}
                <a 
                  href={`mailto:${resume.basics?.email}`}
                  className="flex items-center gap-3 p-3 bg-discord-secondary/30 rounded-md hover:bg-discord-secondary/50 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-full bg-discord-brand/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-discord-brand group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-discord-text-muted">Email</div>
                    <div className="text-discord-text-primary font-medium">{resume.basics?.email}</div>
                  </div>
                </a>

                {/* Phone */}
                <div className="flex items-center gap-3 p-3 bg-discord-secondary/30 rounded-md">
                  <div className="w-14 h-14 rounded-full bg-discord-brand/20 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-discord-brand" />
                  </div>
                  <div>
                    <div className="text-sm text-discord-text-muted">Phone</div>
                    <div className="text-discord-text-primary font-medium">{resume.basics?.phone}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 bg-discord-secondary/30 rounded-md">
                  <div className="w-10 h-10 rounded-full bg-discord-brand/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-discord-brand" />
                  </div>
                  <div>
                    <div className="text-sm text-discord-text-muted">Location</div>
                    <div className="text-discord-text-primary font-medium">
                      {resume.basics?.location?.city}, {resume.basics?.location?.region}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {resume.basics?.profiles.map((profile) => (
                    <a
                      key={profile.network}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-discord-secondary/30 rounded-md hover:bg-discord-secondary/50 transition-colors group"
                    >
                      <div className="text-discord-brand group-hover:text-white transition-colors">
                        {profile.network === 'GitHub' && <Github className="w-5 h-5" />}
                        {profile.network === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                      </div>
                      <span className="text-discord-text-primary font-medium">{profile.network}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
        timestamp: getSafeTimestamp(),
        author: {
          name: 'Postman',
          bot: true,
          emoji: '📬'
        }
      }];

    default:
      return [];
  }
};