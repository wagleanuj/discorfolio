export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-12 px-4 border-b border-discord-tertiary flex items-center">
        <div className="w-32 h-6 bg-discord-secondary animate-pulse rounded"></div>
      </div>
      <div className="flex-1 p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-discord-secondary animate-pulse rounded-full"></div>
              <div className="flex-1">
                <div className="w-32 h-4 bg-discord-secondary animate-pulse rounded mb-2"></div>
                <div className="w-full h-16 bg-discord-secondary animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 