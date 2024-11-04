import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { loadResume } from "@/lib/utils/resumeLoader";
import { ggSans } from "@/config/fonts";
import { WindowContainer } from "@/components/layout/WindowContainer";
import { Suspense } from "react";
import MinLoadingScreen from "@/components/common/LoadingScreen/MinLoadingScreen";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";

export async function generateMetadata(): Promise<Metadata> {
  const resume = await loadResume();
  
  return {
    title: `${resume.basics.name} | Discordfolio`,
    description: `${resume.basics.name}'s portfolio - ${resume.basics.label}`,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resume = await loadResume();
  
  return (
    <html lang="en" className={`h-full ${ggSans.variable}`}>
      <body className="h-full overflow-hidden font-sans">
        <Suspense fallback={<LoadingScreen />}>
          <MinLoadingScreen>
            <Providers initialResume={resume}>
              {children}
            </Providers>
          </MinLoadingScreen>
        </Suspense>
      </body>
    </html>
  );
} 