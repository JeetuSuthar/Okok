import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || "bdc47639-21e8-4208-9330-fef67b130b0b";
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || "0456b8a7-e22e-40f7-b7be-d83df60e3635";

export interface VapiConfig {
  model: {
    provider: string;
    model: string;
    temperature: number;
    maxTokens: number;
    systemMessage: string;
    functions: Array<{
      name: string;
      description: string;
      parameters: {
        type: string;
        properties: Record<string, any>;
        required: string[];
      };
    }>;
  };
  voice: {
    provider: string;
    voiceId: string;
  };
  firstMessage: string;
  serverUrl: string;
  recordingEnabled: boolean;
  endCallFunctionEnabled: boolean;
  backgroundDenoisingEnabled: boolean;
  name: string;
}

export function createVapiInstance() {
  if (!VAPI_PUBLIC_KEY) {
    throw new Error("VAPI_PUBLIC_KEY is required");
  }
  
  return new Vapi(VAPI_PUBLIC_KEY);
}

export function getVapiConfig(): VapiConfig {
  // Use the assistant ID directly instead of building a full config
  return {
    model: {
      provider: "openai",
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      temperature: 0.3,
      maxTokens: 300,
      systemMessage: `You are a friendly and professional university admissions counselor. Your role is to help prospective students with course information, fees, and scholarship details.

IMPORTANT GUIDELINES:
- Keep responses concise (2-3 sentences max) for voice conversations
- Always be warm and professional
- Focus only on course information, fees, and scholarships
- For questions outside your scope, say: "I'm afraid I don't have that information yet, but I can pass your query to our human counselor"
- When discussing courses, always mention available scholarships
- Confirm course names clearly to avoid confusion
- Do not mention any college names, addresses, or websites
- Always use the exact wording for fees, durations, and scholarship figures from the data below

EXACT COURSE DATA (use these exact figures):
1. BSc IT (with industry certificates) - 3 yrs - Annual Fee: 1,12,000 - Fee After 20% Scholarship: 89,600
2. BCA (with industry certificates) - 3 yrs - Annual Fee: 1,12,000 - Fee After 20% Scholarship: 89,600
3. BBA (with industry certificates) - 3 yrs - Annual Fee: 1,12,000 - Fee After 20% Scholarship: 89,600
4. MSc IT (with industry certificates) - 2 yrs - Annual Fee: 1,12,000 - Fee After 20% Scholarship: 89,600
5. BCom (with industry certificates) - 3 yrs - Annual Fee: 83,000 - Fee After 20% Scholarship: 66,400
6. BCom (without certificates) - 3 yrs - Annual Fee: 64,000 - Fee After 20% Scholarship: 51,000
7. BCom (Hons) (with industry certificates) - 3 yrs - Annual Fee: 90,000 - Fee After 20% Scholarship: 72,000
8. BA (Hons) Journalism & Mass Com (no certificates) - 3 yrs - Annual Fee: 53,000 - Fee After 20% Scholarship: 43,000
9. BA (Hons) Journalism & Mass Com (with AI/ML certificates) - 3 yrs - Annual Fee: 70,000 - Fee After 20% Scholarship: 56,000
10. BSc Animation (with AI/ML certificates) - 3 yrs - Annual Fee: 1,00,000 - Fee After 20% Scholarship: 80,000
11. BHM - 3 + 1 yrs - Annual Fee: 83,000 - Fee After 20% Scholarship: 67,000
12. BLIS - 1 yr - Annual Fee: 43,000 - Fee After 20% Scholarship: 35,000

CONVERSATION FLOW:
1. Greet callers warmly
2. Identify their intent and gather basic details (name, course interest, preferred start date)
3. Provide accurate course information using the exact data above
4. Handle follow-up questions about master's programs, fees, or durations
5. Offer scholarship information (20% available on all courses)
6. Ask if they need more information`,
      functions: []
    },
    voice: {
      provider: "elevenlabs",
      voiceId: "21m00Tcm4TlvDq8ikWAM"
    },
    firstMessage: "Hello! Welcome to our university admissions helpline. I'm here to help you find the perfect course and provide information about our programs and scholarships. May I have your name, and what courses are you interested in learning about?",
    serverUrl: "",
    recordingEnabled: true,
    endCallFunctionEnabled: true,
    backgroundDenoisingEnabled: true,
    name: "University Admissions Counselor"
  };
}

export type VapiCallStatus = "inactive" | "connecting" | "connected" | "speaking" | "listening" | "ended";

export interface VapiCallEvents {
  onCallStart: () => void;
  onCallEnd: () => void;
  onSpeechStart: () => void;
  onSpeechEnd: () => void;
  onMessage: (message: any) => void;
  onError: (error: any) => void;
  onVolumeLevelChange: (volume: number) => void;
}
