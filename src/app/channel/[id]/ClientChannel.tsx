'use client';

import { FC } from 'react';
import { notFound } from 'next/navigation';
import ChannelContent from '@/components/layout/ChannelContent/ChannelContent';
import { useResume } from '@/contexts/ResumeContext';
import { MessageProps } from '@/components/common/Message/Message';

interface ClientChannelProps {
  channelId: string;
}

// Helper function to create a stable timestamp
const createStableTimestamp = (date?: string) => {
  if (date) {
    return new Date(date).toISOString();
  }
  // Use a fixed timestamp for messages without dates
  return '2024-01-01T00:00:00.000Z';
};

const ClientChannel: FC<ClientChannelProps> = ({ channelId }) => {
  const { resume } = useResume();

  const generateChannelContent = (channelId: string): MessageProps[] | null => {
    switch (channelId) {
      case 'intro':
        return [{
          content: resume.basics.summary,
          timestamp: createStableTimestamp(),
          author: {
            name: 'Doorman',
            bot: true,
            emoji: '👋'
          }
        }];

      case 'exp':
        return resume.work.map(job => ({
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
              {job.summary && (
                <p className="text-discord-text-secondary italic">{job.summary}</p>
              )}
              <ul className="list-disc ml-4 space-y-2">
                {job.highlights.map((highlight, i) => (
                  <li key={i} className="text-discord-text-primary">{highlight}</li>
                ))}
              </ul>
              {job.url && (
                <a 
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-discord-link hover:underline inline-block mt-2"
                >
                  🔗 Company Website
                </a>
              )}
            </div>
          ),
          timestamp: createStableTimestamp(job.startDate),
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
                  {resume.skills.map((skillGroup, index) => (
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
          timestamp: createStableTimestamp(),
          pinned: true,
          author: {
            name: 'Arsenal',
            bot: true,
            emoji: '🎯'
          }
        }];

      case 'projects':
        return resume.projects.map(project => ({
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
          timestamp: createStableTimestamp(project.startDate),
          author: {
            name: 'Maker',
            bot: true,
            emoji: '🚀'
          }
        }));

      case 'edu':
        return resume.education.map(edu => ({
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
          timestamp: createStableTimestamp(edu.startDate),
          author: {
            name: 'Scholar',
            bot: true,
            emoji: '🎓'
          }
        }));

      case 'contact':
        return [{
          content: (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="text-xl">📧</span>
                    <a href={`mailto:${resume.basics.email}`} className="text-discord-link hover:underline">
                      {resume.basics.email}
                    </a>
                  </p>
                  {resume.basics.phone && (
                    <p className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <span>{resume.basics.phone}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    <span>
                      {resume.basics.location.city}, {resume.basics.location.province}, {resume.basics.location.country}
                    </span>
                  </p>
                </div>
              </div>

              {resume.basics.profiles && resume.basics.profiles.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Professional Profiles</h4>
                  <div className="space-y-2">
                    {resume.basics.profiles.map((profile, i) => (
                      <a 
                        key={i}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-discord-link hover:underline"
                      >
                        <span className="text-xl">
                          {profile.network === 'Linkedin' ? '💼' : 
                           profile.network === 'Github' ? '💻' : '🔗'}
                        </span>
                        {profile.network}: @{profile.username}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ),
          timestamp: createStableTimestamp(),
          author: {
            name: 'Postman',
            bot: true,
            emoji: '📬'
          }
        }];

      default:
        return null;
    }
  };

  const messages = generateChannelContent(channelId);
  
  if (!messages) {
    notFound();
  }

  return <ChannelContent channelName={channelId} messages={messages} />;
};

export default ClientChannel;