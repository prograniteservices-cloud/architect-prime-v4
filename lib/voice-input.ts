import { useCallback, useRef, useState } from 'react';

export interface VoiceInputState {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
}

export function useVoiceInput() {
  const [state, setState] = useState<VoiceInputState>({
    isListening: false,
    transcript: '',
    error: null,
    isSupported: false,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef('');

  const startListening = useCallback((onResult?: (text: string) => void) => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setState(prev => ({
        ...prev,
        isSupported: false,
        error: 'Speech recognition is not supported in this browser',
      }));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setState(prev => ({
          ...prev,
          isListening: true,
          error: null,
          isSupported: true,
        }));
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        let errorMessage = 'Speech recognition error';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone detected';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied';
            break;
          case 'network':
            errorMessage = 'Network error';
            break;
          case 'aborted':
            errorMessage = 'Speech recognition aborted';
            break;
        }

        setState(prev => ({
          ...prev,
          error: errorMessage,
          isListening: false,
        }));
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = finalTranscriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          
          if (result.isFinal) {
            finalTranscript += result[0].transcript + ' ';
            finalTranscriptRef.current = finalTranscript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        const fullTranscript = finalTranscript + interimTranscript;
        
        setState(prev => ({
          ...prev,
          transcript: fullTranscript,
        }));

        if (onResult && finalTranscript.trim().length > 0) {
          onResult(finalTranscript.trim());
        }
      };

      recognition.onend = () => {
        setState(prev => ({
          ...prev,
          isListening: false,
        }));
      };

      recognition.start();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start speech recognition',
        isListening: false,
      }));
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    setState(prev => ({
      ...prev,
      isListening: false,
    }));
  }, []);

  const toggleListening = useCallback((onResult?: (text: string) => void) => {
    if (state.isListening) {
      stopListening();
    } else {
      startListening(onResult);
    }
  }, [state.isListening, startListening, stopListening]);

  const clearTranscript = useCallback(() => {
    finalTranscriptRef.current = '';
    setState(prev => ({
      ...prev,
      transcript: '',
    }));
  }, []);

  const reset = useCallback(() => {
    stopListening();
    clearTranscript();
    setState(prev => ({
      ...prev,
      error: null,
    }));
  }, [stopListening, clearTranscript]);

  return {
    ...state,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
    reset,
  };
}

export function formatTranscript(transcript: string): string {
  return transcript
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b(\w)\.\s?/g, '$1.') // Fix common speech recognition issues
    .replace(/\b(comma|period|question mark|exclamation mark)\b/g, (match) => {
      const punctuation: Record<string, string> = {
        'comma': ',',
        'period': '.',
        'question mark': '?',
        'exclamation mark': '!',
      };
      return punctuation[match.toLowerCase()] || match;
    });
}

export function appendPunctuation(transcript: string): string {
  const trimmed = transcript.trim();
  if (!trimmed) return trimmed;

  const lastChar = trimmed[trimmed.length - 1];
  const needsPunctuation = /[a-zA-Z]$/.test(lastChar);

  if (needsPunctuation) {
    return trimmed + '.';
  }

  return trimmed;
}

export function capitalizeSentences(text: string): string {
  return text.replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

export function getVoiceInputInstructions(): string[] {
  return [
    'Click the microphone button to start/stop voice input',
    'Speak clearly and at a natural pace',
    'Punctuation will be added automatically',
    'Voice input works best in Chrome, Edge, and Safari',
    'Make sure your microphone is enabled and permitted',
    'For best results, use in a quiet environment',
  ];
}

// Type definitions for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onstart: (() => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}
