'use client';

import { FC } from 'react';
import Message, { MessageProps } from '@/components/common/Message/Message';
import { Users } from 'lucide-react';
import { useUi } from '@/contexts/UiContext';
import MemberList from '@/components/layout/MemberList/MemberList';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/common/Tooltip/Tooltip';
import ChatInput from '@/components/common/ChatInput';
import { useChat } from '@/contexts/ChatContext';

interface ChannelContentProps {
  channelName: string;
  messages: MessageProps[];
  isPreview: boolean;
}

const ChannelContent: FC<ChannelContentProps> = ({ channelName, messages: initialMessages, isPreview }) => {
  const { showMemberList: isMembersListVisible, setShowMemberList: toggleMembersList } = useUi();
  const { messages: chatMessages } = useChat();

  // Combine initial messages with chat messages
  const allMessages = [
    ...initialMessages,
    ...(chatMessages[channelName] || [])
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0">
        {/* Channel Header */}
        <div className="h-12 px-4 border-b border-discord-tertiary flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <span className="text-xl text-discord-channel mr-2">#</span>
            <h2 className="font-semibold text-channel-name truncate">{channelName}</h2>
          </div>

          {/* Members Toggle Button */}
          {!isPreview && (
            <Tooltip
              content={`${isMembersListVisible ? 'Hide' : 'Show'} Member List`}
              position="bottom"
            >
              <button
                onClick={() => toggleMembersList(!isMembersListVisible)}
                className={cn(
                  "p-2 rounded hover:bg-discord-hover transition-colors",
                  isMembersListVisible && "bg-discord-active"
                )}
              >
                <Users
                  size={20}
                  className={cn(
                    "text-discord-text-muted transition-colors",
                    isMembersListVisible && "text-discord-text-primary"
                  )}
                />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Messages Area */}
        <div className="p-3 flex-1 overflow-y-auto min-h-0">
          {allMessages.map((message, index) => (
            <Message key={`${message.timestamp}-${index}`} {...message} />
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 mt-2">
          <ChatInput
            disabled={isPreview}
            channelId={channelName}
            placeholder={`Message #${channelName} ...`}
          />
        </div>
      </div>

      {/* Members List - Mobile Responsive */}
      {!isPreview && (
        <div className={cn(
          "fixed inset-y-0 right-0 w-60 lg:w-auto lg:relative lg:flex-shrink-0",
          "transform transition-transform duration-300 ease-in-out",
          "bg-discord-secondary lg:bg-transparent",
          "z-20 lg:z-0",
          isMembersListVisible
            ? "translate-x-0 lg:translate-x-0 lg:w-60"
            : "translate-x-full lg:w-0"
        )}>
          {isMembersListVisible && <MemberList />}
        </div>
      )}

      {/* Mobile Members List Backdrop */}
      {isMembersListVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => toggleMembersList(!isMembersListVisible)}
        />
      )}
    </div>
  );
};

export default ChannelContent;