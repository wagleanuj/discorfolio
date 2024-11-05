import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import { ggSans } from "@/config/fonts";
import { UiProvider } from "@/contexts/UiContext";
import { Suspense } from "react";

export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`h-full ${ggSans.variable}`}>
            <body className="h-full overflow-hidden font-sans">
                <Suspense fallback={<LoadingScreen />}>
                    {children}
                </Suspense>
            </body>
        </html>

    );
} 