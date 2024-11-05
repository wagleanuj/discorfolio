'use client';

import Message, { MessageProps } from '@/components/common/Message/Message';
import ChatInput from '@/components/common/ChatInput';
import WindowContainer from '@/components/layout/WindowContainer';

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