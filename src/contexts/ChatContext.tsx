'use client';

import { createContext, useContext, useState, ReactNode, ReactElement } from 'react';

interface MessageAuthor {
  name: string;
  bot?: boolean;
  emoji?: string;
  color?: string;
  initials?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string|ReactElement;
  timestamp: string;
  author?: MessageAuthor;
}

interface ChatContextType {
  messages: Record<string, Message[]>;
  addMessage: (channelId: string, message: Message) => void;
  updateMessage: (channelId: string, messageId: string, updatedMessage: Partial<Message>) => void;
  clearMessages: (channelId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (channelId: string, message: Message) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), message]
    }));
  };

  const updateMessage = (channelId: string, messageId: string, updatedFields: Partial<Message>) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: prev[channelId]?.map(msg => 
        msg.id === messageId 
          ? { ...msg, ...updatedFields }
          : msg
      ) || []
    }));
  };

  const clearMessages = (channelId: string) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: []
    }));
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      addMessage,
      updateMessage,
      clearMessages,
      isLoading,
      setIsLoading
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export type { Message, MessageAuthor };