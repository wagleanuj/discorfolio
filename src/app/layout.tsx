import type { Metadata } from "next";
import "./globals.css";
import ServerList from "../components/layout/ServerList/ServerList";
import ChannelList from "../components/layout/ChannelList/ChannelList";
import { Providers } from "./providers";
import { loadResume } from "@/lib/utils/resumeLoader";
import WindowControls from "@/components/common/WindowControls/WindowControls";
import { ggSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Portfolio | Discord Style",
  description: "A Discord-style portfolio website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resume = await loadResume();
  
  return (
    <html lang="en" className={`h-full ${ggSans.variable}`}>
      <body className="h-full overflow-hidden font-sans">
        <div className="h-full bg-gray-900">
          <div className="h-full max-w-7xl mx-auto bg-discord-tertiary">
            {/* Window Controls */}
            <div className="bg-discord-tertiary">
              <WindowControls />
            </div>
            
            {/* Main Content */}
            <Providers initialResume={resume}>
              <div className="h-[calc(100%-32px)]">
                <div className="flex h-full">
                  <ServerList />
                  <ChannelList />
                  <main className="flex-1 bg-discord-primary overflow-hidden">
                    {children}
                  </main>
                </div>
              </div>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
} 