'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat, Message } from '@/contexts/ChatContext';
import { useUser } from '@/contexts/UserContext';
import { getBotByChannel } from '@/config/bots';
import ReactMarkdown from 'react-markdown';

interface ChatInputProps {
  channelId: string;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: FC<ChatInputProps> = ({ 
  channelId, 
  disabled = false,
  placeholder = "Message #channel..."
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, updateMessage, isLoading, setIsLoading, messages } = useChat();
  const { user } = useUser();
  const botResponseRef = useRef('');

  // Get the bot for this channel
  const channelBot = getBotByChannel(channelId);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '0px';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = Math.min(scrollHeight, 200) + 'px';
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled || isLoading || !channelBot) return;

    setIsLoading(true);
    botResponseRef.current = '';

    const userMessageId = crypto.randomUUID();
    const botMessageId = crypto.randomUUID();

    // Add user message with visitor info
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString(),
      author: {
        name: user.name,
        color: user.color,
        initials: user.initials
      }
    };

    // Add initial bot message
    const initialBotMessage: Message = {
      id: botMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      author: {
        name: channelBot.name,
        bot: true,
        emoji: channelBot.emoji
      }
    };

    // Add messages to chat
    addMessage(channelId, userMessage);
    addMessage(channelId, initialBotMessage);

    // Clear input
    setMessage('');

    try {
      // Get previous messages for context
      const channelMessages = messages[channelId] || [];
      const contextMessages = channelMessages
        .slice(-5)
        .map(msg => ({
          role: msg.role,
          content: typeof msg.content === 'string' ? msg.content : 'Complex content'
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...contextMessages, { role: 'user', content: message.trim() }],
          channelId
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        botResponseRef.current += chunk;

        // Update the existing bot message with accumulated response
        updateMessage(channelId, botMessageId, {
          content: <ReactMarkdown>{botResponseRef.current}</ReactMarkdown>
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsLoading(false);
      botResponseRef.current = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className=""
    >
      <div className={cn(
        "relative bg-discord-tertiary rounded-lg",
        disabled && "opacity-60 cursor-not-allowed"
      )}>
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={disabled || isLoading}
          placeholder={disabled ? "Chat is disabled" : placeholder}
          className={cn(
            "w-full bg-transparent text-discord-text-primary px-4 py-3 max-h-[200px]",
            "outline-none resize-none",
            "placeholder:text-discord-text-muted"
          )}
          rows={1}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || disabled || isLoading}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2",
            "p-2 rounded hover:bg-discord-secondary transition-colors",
            "text-discord-text-muted hover:text-discord-text-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;