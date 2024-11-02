# Project Structure

## Root Structure
```
portfolio/
├── src/              # Main application code
├── public/           # Static files
└── docker/           # Docker configuration files (if needed)
```

## Application Structure (src/)
```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   ├── channel/      # Channel pages
│   │   └── [id]/
│   │       └── page.tsx
│   └── api/         # API Routes
│       ├── chat/    # Chat endpoints
│       ├── resume/  # Resume data endpoints
│       └── llm/     # LLM integration endpoints
├── components/
│   ├── layout/
│   │   ├── ServerList/
│   │   ├── ChannelList/
│   │   ├── ChatArea/
│   │   └── UserInfo/
│   └── common/
│       ├── Button/
│       ├── Avatar/
│       ├── Message/
│       ├── ChannelItem/
│       └── ServerIcon/
├── lib/             # Core functionality
│   ├── services/    # Business logic
│   │   ├── llm/
│   │   ├── resume/
│   │   └── websocket/
│   ├── db/         # Database utilities
│   └── utils/      # Helper functions
├── hooks/          # Custom React hooks
│   ├── useWebSocket/
│   ├── useTheme/
│   └── useChat/
├── contexts/       # React contexts
│   ├── ThemeContext/
│   ├── ChatContext/
│   └── UserContext/
├── styles/         # Styling
│   ├── theme/
│   ├── global/
│   └── variables/
└── types/         # TypeScript types

## Data Structure
```
src/
├── data/
│   └── resume.ts    # Resume data with proper typing
```

## Component Structure Convention
Each component folder should contain:
```
ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.styles.ts
└── ComponentName.types.ts
```

## API Route Structure Convention
```
route/
├── route.ts        # Next.js API route handler
├── service.ts      # Business logic
└── types.ts        # Type definitions
```

## Technology Stack
- Next.js 14 with App Router
- TypeScript
- Styled Components
- WebSocket (through Next.js API routes)
- OpenAI SDK
- Vercel for deployment (optional)

## Benefits of Next.js Architecture
1. Unified Frontend/Backend
   - API routes replace separate backend
   - Simplified deployment
   - Shared types and utilities

2. Performance
   - Server-side rendering
   - Automatic code splitting
   - Edge runtime support

3. Development Experience
   - Hot reloading
   - Built-in TypeScript support
   - File-based routing
   - API routes

## Change Log
- Initial project structure created
- Converted to Next.js architecture
- Removed separate backend structure
- Added API routes structure

## Notes
- Components follow client/server component patterns
- API routes handle backend functionality
- Structure may be modified as the project evolves