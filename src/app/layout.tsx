import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { loadResume } from "@/lib/utils/resumeLoader";
import { ggSans } from "@/config/fonts";
import { Suspense } from "react";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import { Analytics } from '@vercel/analytics/next';

export async function generateMetadata(): Promise<Metadata> {
  const resume = await loadResume();
  
  return {
    title: `${resume.basics.name} | Discorfolio`,
    description: `${resume.basics.name}'s portfolio - ${resume.basics.label}`,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resume = await loadResume()
  return (
    <html lang="en" className={`h-full ${ggSans.variable}`}>
      <body className="h-full overflow-hidden font-sans">
        <Providers initialResume={resume}>
          <Suspense fallback={<LoadingScreen />}>
            {children}
          </Suspense>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
} 