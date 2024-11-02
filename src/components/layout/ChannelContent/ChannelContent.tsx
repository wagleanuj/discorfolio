'use client';

import { FC, useRef, useEffect, useState } from 'react';
import Message, { MessageProps } from '@/components/common/Message/Message';
import { Users, ArrowDown } from 'lucide-react';
import { useUi } from '@/contexts/UiContext';
import MemberList from '@/components/layout/MemberList/MemberList';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/common/Tooltip/Tooltip';
import { ChatInput } from '@/components/common/ChatInput';
import { useChat } from '@/contexts/ChatContext';

interface ChannelContentProps {
  channelName: string;
  messages: MessageProps[];
}

const ChannelContent: FC<ChannelContentProps> = ({ channelName, messages: initialMessages }) => {
  const { isMembersListVisible, toggleMembersList } = useUi();
  const { messages: chatMessages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Combine initial messages with chat messages
  const allMessages = [
    ...initialMessages,
    ...(chatMessages[channelName] || [])
  ].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Smooth scroll to bottom
  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior,
        block: 'end'
      });
    }
  };

  // Initial scroll and new message scroll
  useEffect(() => {
    if (!userHasScrolled || isLoading) {
      scrollToBottom(userHasScrolled ? 'smooth' : 'auto');
    }
  }, [allMessages.length, isLoading, userHasScrolled]);

  // Handle scroll events
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
    const isAtBottom = distanceFromBottom < 100;
    const shouldShowButton = distanceFromBottom > 400;

    setUserHasScrolled(!isAtBottom);
    setShowScrollButton(shouldShowButton);
  };

  // Reset scroll state when changing channels
  useEffect(() => {
    setUserHasScrolled(false);
    setShowScrollButton(false);
    scrollToBottom('auto');
  }, [channelName]);

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
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto min-h-0 relative scroll-smooth"
        >
          <div className="min-h-full flex flex-col justify-end">
            {allMessages.map((message, index) => (
              <Message key={`${message.timestamp}-${index}`} {...message} />
            ))}
            <div className="h-6" />
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to Bottom Button */}
          {showScrollButton && (
            <button
              onClick={() => {
                scrollToBottom();
                setUserHasScrolled(false);
              }}
              className={cn(
                "absolute bottom-8 right-4",
                "bg-discord-primary shadow-elevation-high rounded-full p-2",
                "text-discord-text-primary hover:text-white",
                "transition-all duration-200 ease-in-out",
                "flex items-center gap-2",
                "animate-bounce"
              )}
            >
              <ArrowDown size={20} />
            </button>
          )}
        </div>

        {/* Chat Input with top margin */}
        <div className="mt-4">
          <ChatInput 
            channelId={channelName}
            placeholder={`Message #${channelName}`}
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