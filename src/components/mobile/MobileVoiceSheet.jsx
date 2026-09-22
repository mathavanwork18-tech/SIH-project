import React, { useState, useEffect } from 'react';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { MainAIOrchestrator } from '../../services/MainAIOrchestrator';
import { ActionExecutor } from '../../services/ActionExecutor';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  X,
  Send,
  Keyboard,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Zap,
  PlusCircle,
  Package,
  Handshake,
  MessageSquare
} from 'lucide-react';

export const MobileVoiceSheet = ({ onExecuteAction }) => {
  const {
    isListening,
    isSpeaking,
    transcript,
    interimTranscript,
    aiResponse,
    showVoiceOverlay,
    setShowVoiceOverlay,
    startListening,
    stopListening,
    speak
  } = useVoice();
  const { currentLang, t } = useLanguage();
  const { currentPage, setCurrentPage, workingDraft, setWorkingDraft } = useAppData();

  const [textInputMode, setTextInputMode] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [lastActionPayload, setLastActionPayload] = useState(null);
  const [autoExecuteCountdown, setAutoExecuteCountdown] = useState(null);

  // When speech transcript changes, feed directly into MainAIOrchestrator
  useEffect(() => {
    if (transcript && transcript.trim()) {
      handleProcessSpeech(transcript);
    }
  }, [transcript]);

  const handleProcessSpeech = (inputText) => {
    const payload = MainAIOrchestrator.processInput({
      user_id: 'artisan_001',
      language: currentLang,
      input_type: textInputMode ? 'text' : 'voice',
      transcript: inputText,
      current_screen: currentPage,
      workflow_state: workingDraft
    });

    setLastActionPayload(payload);

    // Confidence-based execution logic (Section 16)
    if (payload.confidence > 0.85) {
      // High confidence: Automatically execute after short natural delay
      speak(payload.response_text);
      setAutoExecuteCountdown(1.2);
      setTimeout(() => {
        executePayload(payload);
        setAutoExecuteCountdown(null);
      }, 1200);
    } else if (payload.confidence >= 0.60) {
      // Medium confidence: Ask for user confirmation
      speak(`நீங்கள் ${payload.intent} செய்ய விரும்புகிறீர்களா?`);
    } else {
      // Low confidence: Ask to clarify or pick quick action
      speak(payload.response_text);
    }
  };

  const executePayload = (payload) => {
    if (onExecuteAction) {
      onExecuteAction(payload);
    }
    setShowVoiceOverlay(false);
  };

  if (!showVoiceOverlay) return null;

  const sampleTanglishPrompts = [
    { text: 'Enakku pottery product post panna venum', label: '🏺 Pottery Post' },
    { text: 'Enna product post poda koopitu poo', label: '🚀 Product Post' },
    { text: 'Camera open pannu', label: '📷 Open Camera' },
    { text: 'Description konjam short ah pannu', label: '✍️ Shorten Desc' },
    { text: 'Pottery buyers kaatu', label: '🤝 Pottery Buyers' },
    { text: 'En products kaatu', label: '📦 My Products' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={() => { stopListening(); setShowVoiceOverlay(false); }}
    >
      {/* Mobile Bottom Sheet Card */}
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: 480,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: '24px 20px 32px 20px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          animation: 'slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle indicator */}
        <div style={{ width: 44, height: 5, background: '#CBD5E1', borderRadius: 999, margin: '0 auto 16px auto' }} />

        {/* Sheet Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #EA580C, #C2410C)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>
                ArtisanBridge AI Action Assistant
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Voice-First Controller • Performs Real Actions
              </div>
            </div>
          </div>

          <button
            onClick={() => { stopListening(); setShowVoiceOverlay(false); }}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Pulsing Mic Core or Text Mode */}
        {!textInputMode ? (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div
              onClick={isListening ? stopListening : startListening}
              style={{
                width: 84,
                height: 84,
                borderRadius: '50%',
                margin: '0 auto 14px auto',
                background: isListening
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : isSpeaking
                  ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                  : 'linear-gradient(135deg, #F97316, #EA580C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: isListening ? '0 0 30px rgba(16, 185, 129, 0.6)' : '0 8px 24px rgba(234, 88, 12, 0.4)',
                cursor: 'pointer'
              }}
            >
              {isListening ? (
                <div className="audio-waves" style={{ height: 32 }}>
                  <span style={{ width: 5 }} />
                  <span style={{ width: 5 }} />
                  <span style={{ width: 5 }} />
                  <span style={{ width: 5 }} />
                  <span style={{ width: 5 }} />
                </div>
              ) : isSpeaking ? (
                <Volume2 size={38} className="animate-pulse" />
              ) : (
                <Mic size={38} />
              )}
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              {isListening ? 'Listening... Speak naturally' : isSpeaking ? 'AI Speaking...' : 'Tap Mic to Speak'}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 4 }}>
              Tamil, Tanglish, English, Hindi supported
            </div>
          </div>
        ) : (
          <div style={{ margin: '16px 0' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Type command: e.g. pottery product post pannanum..."
                value={typedMessage}
                onChange={e => setTypedMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && typedMessage.trim()) {
                    handleProcessSpeech(typedMessage);
                    setTypedMessage('');
                  }
                }}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 14,
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.95rem'
                }}
              />
              <button
                onClick={() => {
                  if (typedMessage.trim()) {
                    handleProcessSpeech(typedMessage);
                    setTypedMessage('');
                  }
                }}
                className="btn-primary"
                style={{ padding: '12px 18px', borderRadius: 14 }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Live Speech Recognition Transcript */}
        {(transcript || interimTranscript) && (
          <div style={{
            background: '#FFF7ED',
            border: '1.5px solid #FED7AA',
            borderRadius: 16,
            padding: '12px 16px',
            marginBottom: 14,
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', marginBottom: 2 }}>
              🗣️ You Spoke:
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B' }}>
              {transcript} <span style={{ color: '#94A3B8' }}>{interimTranscript}</span>
            </div>
          </div>
        )}

        {/* Action Decision & Structured Output Box */}
        {lastActionPayload && (
          <div style={{
            background: lastActionPayload.confidence > 0.85 ? '#F0FDF4' : '#FEF3C7',
            border: `1.5px solid ${lastActionPayload.confidence > 0.85 ? '#86EFAC' : '#FDE68A'}`,
            borderRadius: 16,
            padding: '14px 16px',
            marginBottom: 16,
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: lastActionPayload.confidence > 0.85 ? '#15803D' : '#92400E',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}>
                <Zap size={13} /> Action: {lastActionPayload.action}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803D' }}>
                {Math.round(lastActionPayload.confidence * 100)}% Confidence
              </span>
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
              {lastActionPayload.response_text}
            </div>

            {lastActionPayload.extracted_params?.category && (
              <div style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                Category Extracted: <strong>{lastActionPayload.extracted_params.category}</strong>
              </div>
            )}

            {/* High confidence auto-execution status */}
            {autoExecuteCountdown && (
              <div style={{ fontSize: '0.8rem', color: '#16A34A', fontWeight: 700, marginTop: 6 }}>
                ⚡ Auto-navigating to screen...
              </div>
            )}

            {/* Medium confidence manual confirmation buttons */}
            {lastActionPayload.confidence >= 0.60 && lastActionPayload.confidence <= 0.85 && (
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  onClick={() => executePayload(lastActionPayload)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  Yes, Execute
                </button>
                <button
                  onClick={() => setLastActionPayload(null)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Low confidence quick tiles (Section 16) */}
        {lastActionPayload && lastActionPayload.confidence < 0.60 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 8 }}>
              Tap a direct action:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button
                onClick={() => executePayload({ action: 'NAVIGATE_TO_PRODUCT_POST', target_screen: 'create_product', requires_camera: true })}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <PlusCircle size={15} color="#EA580C" /> Post Product
              </button>
              <button
                onClick={() => executePayload({ action: 'OPEN_MY_PRODUCTS', target_screen: 'products' })}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Package size={15} color="#0F172A" /> My Products
              </button>
              <button
                onClick={() => executePayload({ action: 'OPEN_MARKET_MATCHES', target_screen: 'matches' })}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Handshake size={15} color="#4F46E5" /> Buyer Matches
              </button>
              <button
                onClick={() => executePayload({ action: 'OPEN_ENQUIRIES', target_screen: 'enquiries' })}
                className="btn-secondary"
                style={{ padding: '10px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <MessageSquare size={15} color="#059669" /> Enquiries
              </button>
            </div>
          </div>
        )}

        {/* Tanglish & Action Chips for Instant Demo */}
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', marginBottom: 8 }}>
            ⚡ Sample Tanglish & Tamil Action Commands (Tap to test):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {sampleTanglishPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessSpeech(p.text)}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 999,
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                {p.label}: “{p.text}”
              </button>
            ))}
          </div>
        </div>

        {/* Mode Switcher: Voice vs Text Fallback */}
        <div style={{ marginTop: 18, textAlign: 'center', borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
          <button
            onClick={() => setTextInputMode(!textInputMode)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Keyboard size={15} />
            <span>{textInputMode ? 'Switch to Voice Mode' : 'Type instead (Keyboard Fallback)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
