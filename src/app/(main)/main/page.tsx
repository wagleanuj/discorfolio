'use client';

import Link from 'next/link';
import { useResume } from '@/contexts/ResumeContext';


export default function MainPage() {
  const { resume } = useResume();

  const channels = [
    {
      id: 'intro',
      name: 'introduction',
      description: `Learn more about ${resume.basics.name} and their background`,
      emoji: '👋'
    },
    {
      id: 'exp',
      name: 'experience',
      description: `${resume.work.length} years of professional experience`,
      emoji: '💼'
    },
    {
      id: 'projects',
      name: 'projects',
      description: `${resume.projects.length} featured projects`,
      emoji: '🚀'
    },
    {
      id: 'skills',
      name: 'skills',
      description: `${resume.skills.length} skill categories`,
      emoji: '🎯'
    },
    {
      id: 'edu',
      name: 'education',
      description: `${resume.education.length} educational qualifications`,
      emoji: '🎓'
    },
    {
      id: 'contact',
      name: 'contact',
      description: `Connect with ${resume.basics.name}`,
      emoji: '📬'
    }
  ];

  return (

    <div className="flex flex-col h-full text-discord-text-primary p-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-discord-channel font-semibold mb-4">
          Welcome to {resume.basics.name}&apos;s Discorfolio Server! 👋
        </h1>
        <p className="text-discord-message text-discord-text-secondary">
          I am a {resume.basics.label}. Find more information about me and what I do in the channels list.
        </p>
      </div>

      {/* Channel Guide */}
      <div className="space-y-4">
        <h2 className="text-discord-channel font-semibold mb-2">Channel Guide:</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map(channel => (
            <Link
              key={channel.id}
              href={`main/channel/${channel.id}`}
              className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors group"
            >
              <div className="flex items-center text-discord-text-primary mb-2">
                <span className="text-xl mr-2 text-discord-text-muted group-hover:text-discord-text-primary transition-colors">#</span>
                <span className="font-semibold flex items-center gap-2">
                  {channel.name}
                  <span className="text-base">{channel.emoji}</span>
                </span>
              </div>
              <p className="text-discord-small text-discord-text-secondary">
                {channel.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Info */}
      <div className="mt-8 p-4 bg-discord-secondary/50 rounded-lg">
        <p className="text-discord-text-secondary">
          Currently in {resume.basics.location.city}, {resume.basics.location.region} •
          {' '}{resume.basics.profiles.length} social profiles •
          {' '}{resume.work.length} work experiences •
          {' '}{resume.projects.length} projects
        </p>
      </div>
    </div>

  );
} 