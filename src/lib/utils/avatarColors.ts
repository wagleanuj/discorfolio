export const getAvatarColor = (name: string) => {
    const colors = [
        'bg-[#5865f2]', // Discord Blue
        'bg-[#57f287]', // Discord Green
        'bg-[#fee75c]', // Discord Yellow
        'bg-[#eb459e]', // Discord Pink
        'bg-[#ed4245]', // Discord Red
    ];

    // Simple hash function to get a consistent index
    const hash = name.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const color = colors[Math.abs(hash) % colors.length];
    const hex = color.match(/#[0-9A-F]{6}/i)?.[0];
    return { hex, color };
};

// For bots, we want consistent colors
export const getBotColor = (botName: string) => {
    const botColors: Record<string, string> = {
        'Doorman': 'bg-[#5865f2]',   // Blue for intro
        'Scribe': 'bg-[#57f287]',    // Green for experience
        'Maker': 'bg-[#eb459e]',     // Pink for projects
        'Arsenal': 'bg-[#fee75c]',   // Yellow for skills
        'Scholar': 'bg-[#ed4245]',   // Red for education
        'Postman': 'bg-[#5865f2]',   // Blue for contact
    };

    const color = botColors[botName] || 'bg-[#5865f2]';
    const hex = color.match(/#[0-9A-F]{6}/i)?.[0];
    return { hex, color };
}; 