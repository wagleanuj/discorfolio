'use client';

import { FC } from 'react';
import Message, { MessageProps } from '@/components/common/Message/Message';
import { Users } from 'lucide-react';
import { useUi } from '@/contexts/UiContext';
import MemberList from '@/components/layout/MemberList/MemberList';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/common/Tooltip/Tooltip';

interface ChannelContentProps {
  channelName: string;
  messages: MessageProps[];
}

const ChannelContent: FC<ChannelContentProps> = ({ channelName, messages }) => {
  const { isMembersListVisible, toggleMembersList } = useUi();

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0">
        {/* Channel Header */}
        <div className="h-12 px-4 border-b border-discord-tertiary flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <span className="text-xl text-discord-channel mr-2">#</span>
            <h2 className="font-semibold text-channel-name">{channelName}</h2>
          </div>
          
          {/* Members Toggle Button */}
          <Tooltip 
            content={`${isMembersListVisible ? 'Hide' : 'Show'} Member List`}
            position="bottom"
          >
            <button
              onClick={toggleMembersList}
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
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </div>

        {/* Input Area (disabled for now) */}
        <div className="h-16 px-4 m-4 bg-discord-tertiary rounded-lg flex items-center flex-shrink-0">
          <input
            type="text"
            disabled
            placeholder="Chat coming soon..."
            className="w-full bg-transparent text-discord-text-primary outline-none"
          />
        </div>
      </div>

      {/* Members List */}
      <div className={cn(
        "h-full transition-all duration-200 ease-in-out overflow-hidden",
        isMembersListVisible ? "w-60" : "w-0"
      )}>
        {isMembersListVisible && <MemberList />}
      </div>
    </div>
  );
};

export default ChannelContent;