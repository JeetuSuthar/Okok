import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { createVapiInstance, getVapiConfig, type VapiCallStatus } from '@/lib/vapi';
import { useToast } from '@/hooks/use-toast';

export function VoiceInterface() {
  const [callStatus, setCallStatus] = useState<VapiCallStatus>('inactive');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const vapiRef = useRef<any>(null);
  const callStartTimeRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      vapiRef.current = createVapiInstance();
      
      // Set up event listeners
      const vapi = vapiRef.current;
      
      vapi.on('call-start', () => {
        setCallStatus('connected');
        setIsConnecting(false);
        callStartTimeRef.current = Date.now();
        startDurationTimer();
        toast({
          title: "Call Connected",
          description: "You're now connected to our AI counselor",
        });
      });
      
      vapi.on('call-end', () => {
        setCallStatus('ended');
        setIsConnecting(false);
        stopDurationTimer();
        setTimeout(() => {
          setCallStatus('inactive');
          setCallDuration(0);
        }, 2000);
        toast({
          title: "Call Ended",
          description: "Thank you for using our voice counselor service",
        });
      });
      
      vapi.on('speech-start', () => {
        setCallStatus('speaking');
      });
      
      vapi.on('speech-end', () => {
        setCallStatus('listening');
      });
      
      vapi.on('volume-level', (level: number) => {
        setVolumeLevel(level);
      });
      
      vapi.on('error', (error: any) => {
        console.error('Vapi error:', error);
        setCallStatus('inactive');
        setIsConnecting(false);
        stopDurationTimer();
        toast({
          title: "Call Error",
          description: "There was an issue with the voice call. Please try again.",
          variant: "destructive",
        });
      });
      
      vapi.on('message', (message: any) => {
        console.log('Vapi message:', message);
      });
      
    } catch (error) {
      console.error('Failed to initialize Vapi:', error);
      toast({
        title: "Initialization Error",
        description: "Voice service is not available. Please check your configuration.",
        variant: "destructive",
      });
    }
    
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      stopDurationTimer();
    };
  }, [toast]);

  const startDurationTimer = () => {
    durationIntervalRef.current = setInterval(() => {
      if (callStartTimeRef.current) {
        const elapsed = Math.floor((Date.now() - callStartTimeRef.current) / 1000);
        setCallDuration(elapsed);
      }
    }, 1000);
  };

  const stopDurationTimer = () => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    callStartTimeRef.current = null;
  };

  const handleStartCall = async () => {
    if (!vapiRef.current) return;
    
    try {
      setIsConnecting(true);
      setCallStatus('connecting');
      
      // Use custom configuration instead of assistant ID
      const assistantConfig = {
        model: {
          provider: "openai",
          model: "gpt-4o",
          temperature: 0.3,
          maxTokens: 300,
          messages: [
            {
              role: "system",
              content: `You are a friendly and professional university admissions counselor. Your role is to help prospective students with course information, fees, and scholarship details.

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
6. Ask if they need more information`
            }
          ]
        },
        voice: {
          provider: "11labs",
          voiceId: "21m00Tcm4TlvDq8ikWAM"
        },
        firstMessage: "Hello! I'm your university admissions counselor. I can help you learn about our courses, fees, and scholarship opportunities. What would you like to know?",
        recordingEnabled: true,
        endCallFunctionEnabled: true,
        backgroundDenoisingEnabled: true,
        name: "University Admissions Counselor"
      };
      
      await vapiRef.current.start(assistantConfig);
      
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsConnecting(false);
      setCallStatus('inactive');
      toast({
        title: "Connection Failed",
        description: "Unable to connect to voice service. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEndCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      if (isMuted) {
        vapiRef.current.unmute();
      } else {
        vapiRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'inactive':
        return 'Ready to connect';
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'Connected - Listening';
      case 'speaking':
        return 'AI Counselor Speaking...';
      case 'listening':
        return 'Listening...';
      case 'ended':
        return 'Call ended';
      default:
        return 'Ready to connect';
    }
  };

  const getStatusIndicatorColor = () => {
    switch (callStatus) {
      case 'inactive':
        return 'bg-gray-400';
      case 'connecting':
        return 'bg-orange-500 animate-pulse';
      case 'connected':
      case 'listening':
        return 'bg-green-500';
      case 'speaking':
        return 'bg-blue-500 animate-pulse';
      case 'ended':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const isCallActive = callStatus !== 'inactive' && callStatus !== 'ended';

  return (
    <Card className="bg-white rounded-2xl shadow-xl">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Call Status Display */}
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${getStatusIndicatorColor()}`}></div>
            <span className="text-sm font-medium text-gray-600">{getStatusText()}</span>
          </div>
          
          {/* Voice Animation Circle */}
          <div className="relative">
            <div 
              className={`w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                callStatus === 'speaking' ? 'animate-pulse scale-110' : ''
              }`}
            >
              {callStatus === 'speaking' ? (
                <Volume2 className="text-white text-3xl" />
              ) : (
                <Mic className="text-white text-3xl" />
              )}
            </div>
            {isCallActive && (
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
            )}
          </div>
          
          {/* Call Controls */}
          <div className="flex items-center space-x-4">
            {!isCallActive ? (
              <Button
                onClick={handleStartCall}
                disabled={isConnecting}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Start Voice Call
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleEndCall}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <PhoneOff className="mr-2 h-4 w-4" />
                End Call
              </Button>
            )}
            
            <Button
              onClick={toggleMute}
              disabled={!isCallActive}
              variant="outline"
              className="px-6 py-3 rounded-full font-medium transition-colors"
            >
              {isMuted ? (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  Unmute
                </>
              ) : (
                <>
                  <MicOff className="mr-2 h-4 w-4" />
                  Mute
                </>
              )}
            </Button>
          </div>
          
          {/* Call Duration */}
          {isCallActive && (
            <div className="text-sm text-gray-500 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>{formatDuration(callDuration)}</span>
            </div>
          )}
          
          {/* Volume Level Indicator */}
          {isCallActive && volumeLevel > 0 && (
            <div className="w-full max-w-xs">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-150"
                    style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
