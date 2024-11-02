export interface Bot {
    id: string;
    name: string;
    emoji: string;
    role: 'owner' | 'bot';
    channel: string;
    description: string;
    defaultActivity?: string;
  }
  
  export const BOTS: Bot[] = [
    {
      id: 'doorman',
      name: 'Doorman',
      emoji: '👋',
      role: 'bot',
      channel: 'intro',
      description: 'Welcomes visitors and presents basic information',
      defaultActivity: 'Greeting visitors'
    },
    {
      id: 'scribe',
      name: 'Scribe',
      emoji: '💼',
      role: 'bot',
      channel: 'exp',
      description: 'Documents and presents professional experiences',
      defaultActivity: 'Documenting experiences'
    },
    {
      id: 'arsenal',
      name: 'Arsenal',
      emoji: '🎯',
      role: 'bot',
      channel: 'skills',
      description: 'Organizes and showcases technical skills',
      defaultActivity: 'Organizing skills'
    },
    {
      id: 'maker',
      name: 'Maker',
      emoji: '🚀',
      role: 'bot',
      channel: 'projects',
      description: 'Presents and explains projects',
      defaultActivity: 'Showcasing projects'
    },
    {
      id: 'scholar',
      name: 'Scholar',
      emoji: '🎓',
      role: 'bot',
      channel: 'edu',
      description: 'Shares educational background',
      defaultActivity: 'Teaching history'
    },
    {
      id: 'postman',
      name: 'Postman',
      emoji: '📬',
      role: 'bot',
      channel: 'contact',
      description: 'Manages contact information and professional profiles',
      defaultActivity: 'Managing contacts'
    }
  ];
  
  export const getBotByChannel = (channelId: string): Bot | undefined => {
    return BOTS.find(bot => bot.channel === channelId);
  };
  
  export const getBotById = (botId: string): Bot | undefined => {
    return BOTS.find(bot => bot.id === botId);
  };
  
  export const getFullBotName = (bot: Bot): string => {
    return `${bot.emoji} ${bot.name}`;
  };