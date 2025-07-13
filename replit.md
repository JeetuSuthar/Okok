# Voice Admissions Counselor

## Overview

This is a simplified voice-powered admissions counselor application using Vapi.ai for voice interactions. The application provides a clean React frontend with static course data, allowing prospective students to interact with an AI voice counselor for course information, fees, and scholarships.

## User Preferences

Preferred communication style: Simple, everyday language.
User requested: Simple voice agent using Vapi without database complexity.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with custom styling (shadcn/ui approach)
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript (minimal server for hosting)
- **Database**: None (using static course data)
- **API**: Simple health check endpoint only

### Voice Integration
- **Voice AI**: Vapi.ai (@vapi-ai/web) for voice interface functionality
- **Real-time Communication**: WebRTC-based voice calls through Vapi service

## Key Components

### Data Architecture
- **Static Course Data**: Hardcoded course information in React components
- **Course Information**: 15 courses including undergraduate, postgraduate, and certificate programs
- **No Database**: All data is stored in TypeScript arrays within the application

### API Endpoints
- `GET /api/health` - Simple health check endpoint

### Frontend Components
- **VoiceInterface**: Main voice interaction component with call controls
- **CourseGrid**: Display and filter course catalog
- **ScholarshipCalculator**: Calculate potential savings with scholarships
- **UI Components**: Comprehensive set of accessible UI primitives

## Data Flow

1. **Course Data**: Stored in PostgreSQL, accessed via Drizzle ORM, served through Express API
2. **Voice Interactions**: Handled by Vapi.ai service, with call logs stored in database
3. **Frontend State**: Managed by TanStack Query for server state, local React state for UI
4. **Real-time Updates**: Voice status updates through Vapi event system

## External Dependencies

### Core Services
- **Vapi.ai**: AI voice interaction service requiring API keys
- **Neon Database**: Serverless PostgreSQL hosting
- **OpenAI**: GPT-4o model for voice AI conversations (configured in Vapi)

### Development Tools
- **Replit Integration**: Development environment optimization
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Server-side bundling for production

## Deployment Strategy

### Development
- **Development Server**: Vite dev server for frontend, tsx for backend hot-reloading
- **Database**: Drizzle migrations with `npm run db:push`
- **Environment**: NODE_ENV=development with Replit-specific optimizations

### Production
- **Build Process**: 
  - Frontend: Vite build to `dist/public`
  - Backend: ESBuild bundle to `dist/index.js`
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Environment Variables Required
- `VITE_VAPI_PUBLIC_KEY`: Vapi.ai public API key (bdc47639-21e8-4208-9330-fef67b130b0b)
- `VITE_VAPI_ASSISTANT_ID`: Vapi.ai assistant configuration ID (0456b8a7-e22e-40f7-b7be-d83df60e3635)

### Current Issue
The assistant ID provided (0456b8a7-e22e-40f7-b7be-d83df60e3635) doesn't exist in your Vapi dashboard. You'll need to:
1. Create a new assistant in your Vapi dashboard
2. Use the correct assistant ID
3. Or use the assistant creation API to create one programmatically

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with shared TypeScript types and schema
2. **Memory Storage Fallback**: IStorage interface allows switching between database and in-memory storage
3. **Voice-First Design**: Application prioritizes voice interaction with traditional UI as secondary
4. **Type Safety**: Full TypeScript coverage with shared types between frontend and backend
5. **Modern React Patterns**: Hooks-based architecture with custom hooks for mobile detection and toast notifications

The application is designed to be easily deployable on Replit with minimal configuration, while maintaining production-ready architecture patterns.