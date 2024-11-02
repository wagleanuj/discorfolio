# Project Requirements

## Overview
A Discord-style portfolio website that presents professional information through a familiar chat interface, combining static content with dynamic AI-powered interactions.

## Core Requirements

### UI/UX Requirements
- Implement Discord-like interface design
- Create a server/group dedicated to the portfolio owner
- Include multiple channels for different aspects of the portfolio
- Support both dark and light themes (Discord-style)
- Responsive design for mobile and desktop views

#### Color Palette
1. Dark Theme (Default)
   - Primary Background: #36393f (Dark grey - main chat area)
   - Secondary Background: #2f3136 (Darker grey - channels sidebar)
   - Tertiary Background: #202225 (Darkest grey - servers sidebar)
   - Text Primary: #dcddde (Almost white)
   - Text Secondary: #96989d (Light grey)
   - Text Muted: #72767d (Muted grey)
   - Brand Color: #5865f2 (Discord Blurple)
   - Link Color: #00b0f4 (Discord Blue)
   - Success/Online: #3ba55c (Green)
   - Danger/Error: #ed4245 (Red)
   - Warning: #faa81a (Yellow)
   - Channel Hashtag: #8e9297 (Grey)
   - Selected/Hover: #42464d (Slightly lighter than primary)
   - Mention Background: rgba(88, 101, 242, 0.3) (Transparent Blurple)

2. Light Theme
   - Primary Background: #ffffff (White)
   - Secondary Background: #f2f3f5 (Light grey)
   - Tertiary Background: #e3e5e8 (Slightly darker grey)
   - Text Primary: #2e3338 (Almost black)
   - Text Secondary: #4f5660 (Dark grey)
   - Text Muted: #747f8d (Muted grey)
   - Other colors remain consistent with dark theme

### Channel Structure
1. Main Information Channels
   - #introduction (About me)
   - #experience
   - #projects
   - #skills
   - #education
   - #contact

2. Interactive Features
   - Each channel should display pre-loaded content from resume data
   - AI chat functionality to answer detailed questions about each topic
   - Support for markdown formatting in messages
   - Message history preservation within session

### Technical Requirements
1. Frontend
   - React-based implementation
   - Discord-like UI components
   - Responsive design system
   - State management for chat history
   - WebSocket integration for real-time chat feel

2. Backend
   - REST API for serving resume data
   - WebSocket server for real-time communication
   - LLM integration for answering queries
   - Resume data storage using provided JSON schema
   - Context-aware AI responses based on channel topic

3. Data Structure
   - Follow JSON Resume schema for structured data
   - Custom extensions for Discord-specific features
   - Proper data validation and sanitization

### AI Integration Requirements
- Context-aware responses based on current channel
- Access to complete resume data for accurate responses
- Ability to provide detailed explanations about projects, skills, and experiences
- Professional and consistent tone in responses
- Rate limiting for AI interactions

### Bot Characters
1. Introduction Channel
   - Name: 👋 Doorman
   - Role: Welcomes visitors and presents basic information

2. Experience Channel
   - Name: 💼 Scribe
   - Role: Documents and presents professional experiences

3. Skills Channel
   - Name: 🎯 Arsenal
   - Role: Organizes and showcases technical skills

4. Projects Channel
   - Name: 🚀 Maker
   - Role: Presents and explains projects

5. Education Channel
   - Name: 🎓 Scholar
   - Role: Shares educational background

6. Contact Channel
   - Name: 📬 Postman
   - Role: Manages contact information and professional profiles

Each bot has:
- Unique emoji identifier
- Single-word name
- Specific channel responsibility
- Consistent message formatting
- Bot badge indicator
- Online status

## Change Log
- Initial creation of requirements document
- Added detailed requirements for Discord-style portfolio concept
- Included AI integration specifications
- Added channel structure and technical requirements
- Added detailed color palette specifications for both themes

## Notes
- Requirements will be updated as we refine the implementation details
- Each requirement should be clear, specific, and testable
- Changes to requirements will be tracked in the Change Log section

### Project Structure
```src/