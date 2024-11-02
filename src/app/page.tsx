import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-full text-discord-text-primary p-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-discord-channel font-semibold mb-4">Welcome to My Portfolio Server! 👋</h1>
        <p className="text-discord-message text-discord-text-secondary">
          I'm Anuj Wagle, a Full Stack Developer passionate about creating scalable and efficient applications.
        </p>
      </div>

      {/* Channel Guide */}
      <div className="space-y-4">
        <h2 className="text-discord-channel font-semibold mb-2">Channel Guide:</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Introduction Channel */}
          <Link href="/channel/intro" 
                className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors">
            <div className="flex items-center text-discord-text-primary mb-2">
              <span className="text-xl mr-2">#</span>
              <span className="font-semibold">introduction</span>
            </div>
            <p className="text-discord-small text-discord-text-secondary">
              Learn more about me and my background
            </p>
          </Link>

          {/* Experience Channel */}
          <Link href="/channel/exp" 
                className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors">
            <div className="flex items-center text-discord-text-primary mb-2">
              <span className="text-xl mr-2">#</span>
              <span className="font-semibold">experience</span>
            </div>
            <p className="text-discord-small text-discord-text-secondary">
              Check out my professional journey
            </p>
          </Link>

          {/* Projects Channel */}
          <Link href="/channel/projects" 
                className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors">
            <div className="flex items-center text-discord-text-primary mb-2">
              <span className="text-xl mr-2">#</span>
              <span className="font-semibold">projects</span>
            </div>
            <p className="text-discord-small text-discord-text-secondary">
              Explore my portfolio projects
            </p>
          </Link>

          {/* Skills Channel */}
          <Link href="/channel/skills" 
                className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors">
            <div className="flex items-center text-discord-text-primary mb-2">
              <span className="text-xl mr-2">#</span>
              <span className="font-semibold">skills</span>
            </div>
            <p className="text-discord-small text-discord-text-secondary">
              View my technical expertise
            </p>
          </Link>

          {/* Education Channel */}
          <Link href="/channel/edu" 
                className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors">
            <div className="flex items-center text-discord-text-primary mb-2">
              <span className="text-xl mr-2">#</span>
              <span className="font-semibold">education</span>
            </div>
            <p className="text-discord-small text-discord-text-secondary">
              My academic background
            </p>
          </Link>

          {/* Contact Channel */}
          <Link href="/channel/contact" 
                className="p-4 bg-discord-secondary rounded-lg hover:bg-discord-hover transition-colors">
            <div className="flex items-center text-discord-text-primary mb-2">
              <span className="text-xl mr-2">#</span>
              <span className="font-semibold">contact</span>
            </div>
            <p className="text-discord-small text-discord-text-secondary">
              Get in touch with me
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
} 