'use client';

import { useResume } from '@/contexts/ResumeContext';

import ChannelContent from '@/components/layout/ChannelContent/ChannelContent';
import { generateChannelContent } from '@/lib/utils/contentGenerator';

interface ClientChannelProps {
  channelId: string;
}

export default function ClientChannel({ channelId }: ClientChannelProps) {
  const { resume } = useResume();

  if (!resume) {
    return <div>Loading...</div>;
  }

  const messages = generateChannelContent(resume, channelId);

  return (
    <ChannelContent 
      channelName={channelId} 
      messages={messages || []} 
    />
  );
}