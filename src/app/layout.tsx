import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { loadResume } from "@/lib/utils/resumeLoader";
import { ggSans } from "@/config/fonts";
import { WindowContainer } from "@/components/layout/WindowContainer";

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
        <Providers initialResume={resume}>
          <WindowContainer>
            {children}
          </WindowContainer>
        </Providers>
      </body>
    </html>
  );
} 