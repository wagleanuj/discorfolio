
import { ggSans } from "@/config/fonts";
import { ChatProvider } from "@/contexts/ChatContext";


export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`h-full ${ggSans.variable}`}>
            <body className="h-full overflow-hidden font-sans">

                    <ChatProvider>  
                        {children}
                    </ChatProvider>

            </body>
        </html>

    );
} 