'use client';

import { FC } from 'react';
import { notFound } from 'next/navigation';
import ChannelContent, { generateChannelContent } from '@/components/layout/ChannelContent/ChannelContent';
import { useResume } from '@/contexts/ResumeContext';
interface ClientChannelProps {
  channelId: string;
}


const ClientChannel: FC<ClientChannelProps> = ({ channelId }) => {
  const { resume } = useResume();


  const messages = generateChannelContent(resume, channelId);

  if (!messages) {
    notFound();
  }

  return <ChannelContent channelName={channelId} messages={messages} />;
};

export default ClientChannel;