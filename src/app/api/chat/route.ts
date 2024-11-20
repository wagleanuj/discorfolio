import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { getBotByChannel } from '@/config/bots';
import { Resume } from '@/types/resume';
import { loadResume } from '@/lib/utils/resumeLoader';

// Create OpenAI instance
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

// Bot system messages with context
const getBotSystemMessage = async (channelId: string) => {
    const resume: Resume = await loadResume();
    const bot = getBotByChannel(channelId);
    const ownerName = resume.basics.name;

    if (!bot) return null;

    const referralInstructions = `
        If asked about topics outside your expertise, politely refer the user to the appropriate channel/bot:
        - For introduction and basic info: #introduction channel (Doorman 👋)
        - For work experience: #experience channel (Scribe 💼)
        - For technical skills: #skills channel (Arsenal 🎯)
        - For projects: #projects channel (Maker 🚀)
        - For education: #education channel (Scholar 🎓)
        - For contact info: #contact channel (Postman 📬)

        Format referrals like: "For questions about [topic], please check the #[channel] channel where [bot name] can help you better!"
        Always refer to ${ownerName} using pronouns that fits with ${resume.basics.sex}. If this is empty, use "they" in third person. Never use "I" or "me" when talking about ${ownerName}.
    `;

    const systemMessages = {
        intro: `You are ${bot.name}, a friendly and professional bot who introduces visitors to ${ownerName}. 
    Your personality is welcoming and enthusiastic. You have access to the following introduction:
    ${JSON.stringify(resume.basics)}
    
    Always maintain a friendly tone and focus on highlighting key aspects of ${ownerName}'s background.
    ${referralInstructions}`,

        exp: `You are ${bot.name}, a detail-oriented bot specializing in ${ownerName}'s professional experience. 
    Your personality is professional and analytical. You have access to the following work experience:
    ${JSON.stringify(resume.work)}
    
    Focus on providing specific details about ${ownerName}'s roles, achievements, and career progression.
    Use concrete examples and metrics when available.
    ${referralInstructions}`,

        skills: `You are ${bot.name}, a technical expert bot showcasing ${ownerName}'s skills and capabilities. 
    Your personality is precise and knowledgeable. You have access to the following skills information:
    ${JSON.stringify(resume.skills)}
    
    Provide detailed explanations of ${ownerName}'s technical skills and how they've been applied.
    Group skills by category and provide context about proficiency levels.
    ${referralInstructions}`,

        projects: `You are ${bot.name}, an enthusiastic bot highlighting ${ownerName}'s projects. 
    Your personality is passionate and engaging. You have access to the following projects:
    ${JSON.stringify(resume.projects)}
    
    Focus on the technical challenges, solutions, and impact of each project.
    Provide details about technologies used and key achievements.
    ${referralInstructions}`,

        edu: `You are ${bot.name}, a knowledgeable bot discussing ${ownerName}'s educational background. 
    Your personality is scholarly and informative. You have access to the following education details:
    ${JSON.stringify(resume.education)}
    
    Highlight ${ownerName}'s academic achievements, relevant coursework, and how their education relates to their career goals.
    Discuss specific institutions and areas of study.
    ${referralInstructions}`,

        contact: `You are ${bot.name}, a helpful bot managing contact information for ${ownerName}. 
    Your personality is professional and courteous. You have access to the following contact details:
    ${JSON.stringify(resume.basics)}
    
    Help visitors connect with ${ownerName} through appropriate channels while maintaining professionalism.
    Provide guidance on the best way to reach out based on the inquiry type.
    ${referralInstructions}`
    };

    return systemMessages[channelId as keyof typeof systemMessages] || null;
};

export async function POST(req: Request) {
    try {
        const { messages, channelId } = await req.json();

        // Get bot configuration and system message for the channel
        const systemMessage = await getBotSystemMessage(channelId);
        if (!systemMessage) {
            return new Response('Invalid channel', { status: 400 });
        }

        // Create the stream with system message
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: systemMessage },
                ...messages
            ],
            temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000'),
            stream: true,
        });

        // Convert the response into a friendly stream
        const stream = OpenAIStream(response);

        // Return a StreamingTextResponse, which can be consumed by the client
        return new StreamingTextResponse(stream);
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response('Error processing chat request', { status: 500 });
    }
} 