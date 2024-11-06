
import { ggSans } from "@/config/fonts";
import { ChatProvider } from "@/contexts/ChatContext";


export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ChatProvider>
            {children}
        </ChatProvider>
    );
} 