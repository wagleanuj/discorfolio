'use client';

import { FC } from 'react';
import { cn } from '@/lib/utils';

export const LoadingScreen: FC = () => {
  return (
    <div className="fixed inset-0 bg-discord-primary flex flex-col items-center justify-center">
      {/* Discord-like Logo Container */}
      <div className="relative w-24 h-24 mb-8">
        {/* Main Spinning Ring */}
        <div className={cn(
          "absolute inset-0",
          "border-4 border-t-discord-brand border-r-discord-brand/40 border-b-discord-brand/10 border-l-discord-brand/70",
          "rounded-full",
          "animate-discord-spin"
        )} />
        
        {/* Inner Pulse */}
        <div className={cn(
          "absolute inset-4",
          "bg-discord-brand",
          "rounded-full",
          "animate-pulse-slow",
          "opacity-80"
        )} />
        
        {/* Center Dot */}
        <div className={cn(
          "absolute inset-[42%]",
          "bg-white",
          "rounded-full",
          "animate-pulse",
          "shadow-glow"
        )} />

        {/* Decorative Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 bg-discord-brand rounded-full",
              "animate-float",
              "opacity-60"
            )}
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translateY(-40px)`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <div className="text-discord-text-muted text-sm font-medium">
        <span className="animate-pulse">Loading</span>
        <span className="inline-block w-4 text-center animate-bounce delay-100">.</span>
        <span className="inline-block w-4 text-center animate-bounce delay-200">.</span>
        <span className="inline-block w-4 text-center animate-bounce delay-300">.</span>
      </div>
    </div>
  );
};

export default LoadingScreen; 