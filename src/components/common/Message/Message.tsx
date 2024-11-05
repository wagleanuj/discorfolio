'use client';

import ReactMarkdown, { Components } from 'react-markdown';

export interface MessageAuthor {
  name: string;
  avatar?: string;
  emoji?: string;
  isBot?: boolean;
  bot?: boolean;
}

export interface MessageProps {
  id?: string;
  author: MessageAuthor;
  content: string | React.ReactNode;
  timestamp: string;
  isMobile?: boolean;
  role?: 'user' | 'assistant' | 'system';
}

const MarkdownComponents: Partial<Components> = {
  h1: ({ children }) => (
    <h1 className="text-xl font-bold mt-2 mb-1">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-bold mt-2 mb-1">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-md font-bold mt-2 mb-1">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-2">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-4 mb-2">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="mb-1">{children}</li>
  ),
  a: ({ href, children }) => (
    <a 
      href={href}
      className="text-[#00b0f4] hover:underline" 
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-bold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  code: ({ children }) => (
    <code className="bg-[#2f3136] px-1 py-0.5 rounded text-sm">{children}</code>
  ),
};

export default function Message({ author, content, timestamp, isMobile = false }: MessageProps) {
  return (
    <div className="mb-4">
      <div className={`flex items-start gap-2 ${
        isMobile ? 'text-sm' : 'text-base'
      }`}>
        <div className={`flex-shrink-0 rounded-full bg-[#5865f2] flex items-center justify-center ${
          isMobile ? 'w-8 h-8 text-base' : 'w-10 h-10 text-xl'
        }`}>
          <span className="flex items-center justify-center">
            {author.emoji || author.avatar || '👤'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white truncate">
              {author.name}
            </span>
            <span className="flex-shrink-0 text-xs text-gray-400">
              {new Date(timestamp).toLocaleDateString()}
            </span>
          </div>
          <div className="text-gray-100 prose prose-invert max-w-none">
            {typeof content === 'string' ? (
              <ReactMarkdown components={MarkdownComponents}>
                {content}
              </ReactMarkdown>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
    </div>
  );
}