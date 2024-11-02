/** @type {import('tailwindcss').Config} */
module.exports = {
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
            'channel-name': ['16px', '20px'],      // Channel names
            'category': ['12px', '16px'],          // Category headers
            'server-name': ['16px', '20px'],       // Server name
            'message': ['16px', '1.375rem'],       // Message content
            'username': ['16px', '20px'],          // Usernames
            'timestamp': ['12px', '16px'],         // Timestamps
            'description': ['14px', '20px'],       // Channel descriptions
            'button': ['14px', '16px'],           // Button text
          },
          letterSpacing: {
            'category': '0.02em',                  // Discord category spacing
          },
          colors: {
            discord: {
              'primary': '#36393f',
              'secondary': '#2f3136',
              'tertiary': '#202225',
              'text-primary': '#dcddde',
              'text-secondary': '#96989d',
              'text-muted': '#72767d',
              'brand': '#5865f2',
              'link': '#00b0f4',
              'online': '#3ba55c',
              'danger': '#ed4245',
              'warning': '#faa81a',
              'channel': '#8e9297',
              'hover': '#42464d',
              'mention-bg': 'rgba(88, 101, 242, 0.3)',
            },
          },
          keyframes: {
            'fade-in': {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            'slide-in': {
              '0%': { transform: 'translateX(20px)', opacity: '0' },
              '100%': { transform: 'translateX(0)', opacity: '1' },
            },
            'fade-up': {
              '0%': { transform: 'translateY(10px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            'scale-in': {
              '0%': { transform: 'scale(0.95)', opacity: '0' },
              '100%': { transform: 'scale(1)', opacity: '1' },
            },
            gradient: {
              '0%': { backgroundPosition: '0 0' },
              '100%': { backgroundPosition: '24px 24px' },
            },
          },
          animation: {
            'fade-in': 'fade-in 200ms ease-out',
            'slide-in': 'slide-in 200ms ease-out',
            'fade-up': 'fade-up 200ms ease-out',
            'scale-in': 'scale-in 200ms ease-out',
            'gradient': 'gradient 3s linear infinite',
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