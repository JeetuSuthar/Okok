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
      
      // Use the assistant ID directly
      const assistantId = "eb81cbd4-0f61-4e08-a113-9a770881c505";
      await vapiRef.current.start(assistantId);
      
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
