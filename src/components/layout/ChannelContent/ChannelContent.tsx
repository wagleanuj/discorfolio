'use client';

import { FC, useEffect, useRef } from 'react';
import Message, { MessageProps } from '@/components/common/Message/Message';

interface ChannelContentProps {
  channelName: string;
  messages: MessageProps[];
}

const ChannelContent: FC<ChannelContentProps> = ({ channelName, messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Channel Header */}
      <div className="h-12 px-4 border-b border-discord-tertiary flex items-center">
        <span className="text-xl text-discord-channel mr-2">#</span>
        <h2 className="font-semibold text-discord-text-primary">{channelName}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area (disabled for now) */}
      <div className="h-16 px-4 m-4 bg-discord-tertiary rounded-lg flex items-center">
        <input
          type="text"
          disabled
          placeholder="Chat coming soon..."
          className="w-full bg-transparent text-discord-text-primary outline-none"
        />
      </div>
    </div>
  );
};

export default ChannelContent; 