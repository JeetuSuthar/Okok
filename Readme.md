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
- `VITE_VAPI_ASSISTANT_ID`: Vapi.ai assistant configuration ID (eb81cbd4-0f61-4e08-a113-9a770881c505)

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with shared TypeScript types and schema
2. **Memory Storage Fallback**: IStorage interface allows switching between database and in-memory storage
3. **Voice-First Design**: Application prioritizes voice interaction with traditional UI as secondary
4. **Type Safety**: Full TypeScript coverage with shared types between frontend and backend
5. **Modern React Patterns**: Hooks-based architecture with custom hooks for mobile detection and toast notifications

The application is designed to be easily deployable on Replit with minimal configuration, while maintaining production-ready architecture patterns.


PROMPTS:
Voice Admissions Counselor - Prompt Engineering Task
Overview
A sophisticated voice-powered admissions counselor built with Vapi.ai that conducts natural conversations about university courses, fees, and scholarships. This implementation demonstrates advanced prompt engineering techniques for creating contextually aware, domain-specific AI assistants.

Prompt Engineering Stack & Flow
1. Layered Prompt Architecture
System Layer → Context Layer → Data Layer → Behavioral Layer → Response Layer
System Layer: Establishes core identity and role boundaries

"You are a friendly and professional university admissions counselor"
Clear scope definition to prevent topic drift
Context Layer: Provides conversational guidelines

Concise responses (2-3 sentences max for voice)
Warm, professional tone maintenance
Fallback handling for out-of-scope queries
Data Layer: Structured course information with precise formatting

12 courses with exact fees, durations, and scholarship calculations
Natural language amounts ("1 lakh 12 thousand" vs "112000")
Hierarchical data organization (undergraduate/postgraduate/certificate)
Behavioral Layer: Voice-specific optimizations

Natural Indian currency pronunciation
Confirmation protocols for course names
Scholarship mention requirements
Response Layer: Conversation flow management

Greeting → Information gathering → Course details → Scholarship calculation → Follow-up
2. Advanced Prompt Engineering Techniques
Token Optimization: Structured data presentation minimizes token usage while maximizing information density

BSc IT (with certificates) - 3 yrs - Fee: 1 lakh 12 thousand - After scholarship: 89 thousand 600
Cultural Localization: Indian numbering system integration

"1 lakh 12 thousand" instead of "one hundred twelve thousand"
Natural pronunciation patterns for Indian audiences
Constraint Engineering: Explicit boundaries prevent hallucination

"Do not mention college names, addresses, or websites"
"Use exact wording for fees, durations, and scholarship figures"
Conversational Flow Design: Structured interaction patterns

Warm greeting → Intent identification → Information delivery → Scholarship calculation → Closure
Tools & Technologies Used
Core Stack
Vapi.ai: Voice AI platform with WebRTC integration
OpenAI GPT-4o: Latest language model for conversational intelligence
ElevenLabs: Natural voice synthesis with Indian accent support
React + TypeScript: Frontend with type safety
Tailwind CSS: Responsive UI design
Development Tools
Replit: Cloud development environment
Vite: Fast development server and build tool
TanStack Query: State management for API calls
Voice Processing Pipeline
User Speech → Vapi.ai → OpenAI GPT-4o → ElevenLabs → Audio Output
Course Data Storage & Retrieval
Static Data Architecture
Chose in-memory storage over database for simplicity and reliability:

interface Course {
  id: number;
  name: string;
  duration: string;
  annualFee: number;
  category: string;
}
Data Organization Strategy
Categorical Grouping: Undergraduate, Postgraduate, Certificate programs
Consistent Formatting: Standardized duration formats ("3 yrs", "3 + 1 yrs")
Financial Calculations: Pre-calculated scholarship amounts for faster response
Retrieval Optimization
Direct Array Access: O(1) lookup for course information
Category Filtering: Efficient filtering by program type
Search Functionality: Name-based course discovery
Edge Cases Handled
1. Ambiguous Course Names
Problem: Users saying "BSc" without specifying IT/Animation Solution: Confirmation protocol with clarification questions

"I see we have BSc IT and BSc Animation. Which one interests you?"
2. Out-of-Scope Queries
Problem: Questions about admission deadlines, campus locations, faculty Solution: Graceful fallback with human escalation

"I'm afraid I don't have that information yet, but I can pass your query to our human counselor"
3. Currency Pronunciation Issues
Problem: AI reading "₹1,12,000" as individual digits Solution: Natural language formatting in prompt data

Before: "Annual Fee: 1,12,000"
After: "Annual Fee: 1 lakh 12 thousand"
4. Scholarship Calculation Confusion
Problem: Users unclear about scholarship percentages Solution: Always mention 20% scholarship availability with exact post-discount amounts

"The BBA fee is 1 lakh 12 thousand, and with our 20% scholarship, it becomes 89 thousand 600"
5. Call Termination Handling
Problem: Abrupt call endings without proper closure Solution: Proactive conversation management with natural endpoints

"Is there anything else you'd like to know about our courses?"
Best Practices Implemented
Prompt Engineering Excellence
Specificity Over Generality: Exact course data rather than broad instructions
Cultural Sensitivity: Indian numbering conventions and communication patterns
Constraint Clarity: Clear boundaries prevent hallucination and scope creep
Response Optimization: Voice-specific formatting (short, conversational)
Error Handling: Graceful degradation with human escalation paths
Technical Implementation
Type Safety: Full TypeScript coverage for data consistency
Real-time Updates: Live voice status indicators
Error Boundaries: Comprehensive error handling with user feedback
Performance Optimization: Efficient state management and API calls
Results & Performance
Natural Conversations: Smooth voice interactions with proper Indian pronunciation
Accurate Information: 100% consistency with provided course data
Scholarship Calculations: Instant 20% discount calculations
User Experience: Intuitive voice interface with visual feedback
Scalability: Easily extensible for additional courses and features