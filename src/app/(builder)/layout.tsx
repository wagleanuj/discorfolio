import { ggSans } from "@/config/fonts";
import { ChatProvider } from "@/contexts/ChatContext";


export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col bg-[#2f3136]">
            {children}
        </div>
    );
} 