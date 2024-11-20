# Discorfolio 🎮

A Discord-inspired portfolio website that turns your resume into an interactive chat experience. Built with Next.js, TypeScript, and Tailwind CSS.

## Features ✨

- **Discord-like Interface**: Familiar Discord UI with channels, members list, and chat
- **Interactive Chat**: Talk to specialized AI bots about different aspects of the portfolio
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Interactions**: Smooth animations and transitions
- **AI Integration**: Supports both OpenAI and local LLMs (Ollama)
- **Resume-Driven**: Automatically generates content from a JSON resume

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (or Ollama for local LLMs)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wagleanuj/discorfolio.git
cd discorfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
VERCEL_RESUME_BLOB_URL=  // production var
BLOB_READ_WRITE_TOKEN= // production var
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=
OPENAI_MAX_TOKENS=1000
OPENAI_TEMPERATURE=0.7
```

# Other configurations...
```

4. Add your resume:
- Update `.data/resume.json` with your information
- Follow the JSON Resume schema (resume-schema.json)

5. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## Structure 📁

```
src/
├── app/                  # Next.js app router
├── components/          
│   ├── common/          # Reusable components
│   └── layout/          # Layout components
├── contexts/            # React contexts
├── lib/                 # Utilities
└── types/              # TypeScript types
```

## Customization 🎨

### Themes
- Modify `tailwind.config.js` to change colors and styling
- Update Discord-like components in the components directory

### Bots
- Each channel has a dedicated bot with specific knowledge
- Customize bot personalities in `src/app/api/chat/route.ts`

### Resume
- Update `.data/resume.json` following the JSON Resume schema
- Add new sections by modifying the channel structure

## Tech Stack 💻

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://openai.com/api/)
- [Ollama](https://ollama.ai/)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Inspired by Discord's beautiful UI
- Built with modern web technologies
- Uses the JSON Resume schema

## Support 💬

For support, please open an issue in the GitHub repository.
