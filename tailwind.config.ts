import type { Config } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-gg-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'discord-category': ['12px', '16px'],     // Category headers
        'discord-channel': ['16px', '20px'],      // Channel names
        'discord-message': ['16px', '1.375rem'],  // Message text
        'discord-username': ['16px', '20px'],     // Usernames
        'discord-timestamp': ['12px', '16px'],    // Message timestamps
        'discord-small': ['14px', '18px'],        // Secondary text
      },
      letterSpacing: {
        'discord-category': '0.02em',
      },
      colors: {
        discord: {
          // Main backgrounds
          'primary': '#313338',    // Main chat area
          'secondary': '#2B2D31',  // Channel/Server list
          'tertiary': '#1E1F22',   // Server bar
          'modal': '#313338',      // Modal background

          // Text colors
          'text-primary': '#F2F3F5',    // Primary text
          'text-secondary': '#B5BAC1',  // Secondary text
          'text-muted': '#949BA4',      // Muted text
          'text-link': '#00A8FC',       // Link text
          
          // Interactive elements
          'channel': '#949BA4',         // Channel icon
          'channel-hover': '#F2F3F5',   // Channel hover text
          'hover': 'rgba(79, 84, 92, 0.4)', // Hover background
          'active': '#404249',          // Active/selected background
          
          // Brand colors
          'brand': '#5865F2',           // Blurple
          'brand-hover': '#4752C4',     // Darker blurple
          'brand-active': '#3C45A5',    // Darkest blurple
          
          // Status colors
          'online': '#23A559',          // Online/success
          'warning': '#F0B232',         // Warning
          'danger': '#F23F42',          // Danger/error
          'boost': '#F47FFF',           // Nitro boost
          
          // Misc
          'mention-bg': 'rgba(88, 101, 242, 0.3)',  // Mention background
          'divider': '#3F4147',         // Divider lines
          'input': '#1E1F22',           // Input background
          'input-border': '#1A1B1E',    // Input border
        },
      },
      boxShadow: {
        'elevation-low': '0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)',
        'elevation-medium': '0 4px 4px rgba(0,0,0,0.16)',
        'elevation-high': '0 8px 16px rgba(0,0,0,0.24)',
      },
    },
  },
  plugins: [],
};

export default config; 