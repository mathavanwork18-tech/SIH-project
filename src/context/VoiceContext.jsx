import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { SPEECH_LANG_MAP, speakText, parseVoiceIntent } from '../services/voiceService';

const VoiceContext = createContext();

export const VoiceProvider = ({ children, onNavigate }) => {
  const { currentLang, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [voiceHistory, setVoiceHistory] = useState([]);
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let currentInterim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (currentInterim) {
          setInterimTranscript(currentInterim);
        }

        if (final) {
          setTranscript(final);
          setInterimTranscript('');
          processVoiceCommand(final);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLang]);

  const startListening = () => {
    setTranscript('');
    setInterimTranscript('');
    setShowVoiceOverlay(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = SPEECH_LANG_MAP[currentLang] || 'ta-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech start error, already active');
      }
    } else {
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const speak = (text) => {
    setAiResponse(text);
    setIsSpeaking(true);
    speakText(text, currentLang);
    setTimeout(() => setIsSpeaking(false), Math.max(2500, text.length * 70));
  };

  const processVoiceCommand = (userSpeech) => {
    const parsed = parseVoiceIntent(userSpeech, currentLang);
    const replyText = parsed.reply[currentLang] || parsed.reply.en || parsed.reply.ta;

    setVoiceHistory(prev => [
      ...prev,
      { sender: 'user', text: userSpeech, time: new Date().toLocaleTimeString() },
      { sender: 'ai', text: replyText, time: new Date().toLocaleTimeString() }
    ]);

    speak(replyText);

    if (parsed.page && onNavigate) {
      setTimeout(() => {
        onNavigate(parsed.page);
        setShowVoiceOverlay(false);
      }, 1400);
    }
  };

  const simulateVoicePrompt = (promptText) => {
    setTranscript(promptText);
    setShowVoiceOverlay(true);
    setTimeout(() => {
      processVoiceCommand(promptText);
    }, 400);
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        isSpeaking,
        transcript,
        interimTranscript,
        aiResponse,
        voiceHistory,
        showVoiceOverlay,
        setShowVoiceOverlay,
        startListening,
        stopListening,
        speak,
        simulateVoicePrompt,
        processVoiceCommand
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
