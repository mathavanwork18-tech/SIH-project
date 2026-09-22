import React from 'react';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import { Mic, MicOff, Volume2, Sparkles, X, Compass, HelpCircle, ChevronRight, Zap } from 'lucide-react';

export const VoiceButton = () => {
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
    simulateVoicePrompt,
    voiceHistory
  } = useVoice();
  const { currentLang, t } = useLanguage();

  const sampleVoicePrompts = {
    ta: [
      { text: 'நான் ஒரு product post போடணும்', label: 'பொருள் பதிவேற்றம்' },
      { text: 'என்னுடைய products காட்டு', label: 'என் தயாரிப்புகள்' },
      { text: 'எனக்கு வந்த enquiries காட்டு', label: 'வாங்குபவர் செய்திகள்' },
      { text: 'Buyers தேடணும்', label: 'சந்தை வாய்ப்புகள்' },
      { text: 'இந்த page என்ன?', label: 'பக்க உதவி' }
    ],
    en: [
      { text: 'I want to post a product', label: 'Post Product' },
      { text: 'Show my products', label: 'My Catalogue' },
      { text: 'Show my enquiries', label: 'Buyer Enquiries' },
      { text: 'Search buyers', label: 'Market Linkage' },
      { text: 'What is this page?', label: 'Context Help' }
    ],
    hi: [
      { text: 'मुझे नया प्रोडक्ट पोस्ट करना है', label: 'उत्पाद अपलोड' },
      { text: 'मेरे प्रोडक्ट्स दिखाओ', label: 'कैटलॉग' },
      { text: 'मेरी इन्क्वायरी दिखाओ', label: 'खरीदार संदेश' },
      { text: 'बायर्स ढूंढो', label: 'बाजार अवसर' },
      { text: 'यह पेज क्या है?', label: 'सहायता' }
    ]
  };

  const currentPrompts = sampleVoicePrompts[currentLang] || sampleVoicePrompts.en;

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`floating-voice-btn ${isListening ? 'listening' : ''}`}
        title={t.voicePrompt}
        aria-label="Activate AI Voice Assistant"
      >
        {isListening ? (
          <div className="audio-waves">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        ) : (
          <Mic size={32} />
        )}
      </button>

      {/* Full AI Voice HUD Modal Overlay */}
      {showVoiceOverlay && (
        <div className="voice-modal-backdrop" onClick={() => setShowVoiceOverlay(false)}>
          <div className="voice-modal-card" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => { stopListening(); setShowVoiceOverlay(false); }}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              <X size={18} />
            </button>

            {/* Pulsing Mic Core */}
            <div style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              margin: '0 auto 20px auto',
              background: isListening
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : isSpeaking
                ? 'linear-gradient(135deg, #6366F1, #8B5CF6)'
                : 'linear-gradient(135deg, #F97316, #DC2626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: isListening
                ? '0 0 35px rgba(16, 185, 129, 0.6)'
                : isSpeaking
                ? '0 0 35px rgba(99, 102, 241, 0.6)'
                : '0 0 30px rgba(249, 115, 22, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={isListening ? stopListening : startListening}
            >
              {isListening ? (
                <div className="audio-waves" style={{ height: 40 }}>
                  <span style={{ width: 6 }} />
                  <span style={{ width: 6 }} />
                  <span style={{ width: 6 }} />
                  <span style={{ width: 6 }} />
                  <span style={{ width: 6 }} />
                </div>
              ) : isSpeaking ? (
                <Volume2 size={46} className="animate-pulse" />
              ) : (
                <Mic size={46} />
              )}
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              {isListening ? t.listening : isSpeaking ? 'AI Speaking...' : t.talkToAi}
            </h3>

            <p style={{ color: '#64748B', fontSize: '0.95rem', marginBottom: 20 }}>
              {isListening
                ? 'Speak in your native tongue (Tamil, Hindi, English, etc.)'
                : 'Tap microphone to speak or click any quick prompt below'}
            </p>

            {/* Live Voice Speech Recognition Output */}
            {(transcript || interimTranscript) && (
              <div style={{
                background: '#FFF7ED',
                border: '1.5px solid #FED7AA',
                borderRadius: 16,
                padding: '14px 18px',
                marginBottom: 16,
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Zap size={13} /> You Said:
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B' }}>
                  {transcript} <span style={{ color: '#94A3B8' }}>{interimTranscript}</span>
                </div>
              </div>
            )}

            {/* AI Synthesized Response Output */}
            {aiResponse && (
              <div style={{
                background: '#F0FDF4',
                border: '1.5px solid #BBF7D0',
                borderRadius: 16,
                padding: '14px 18px',
                marginBottom: 20,
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sparkles size={13} /> ArtisanBridge AI:
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#14532D', lineHeight: 1.4 }}>
                  {aiResponse}
                </div>
              </div>
            )}

            {/* Quick Demo Test Chips */}
            <div style={{ textAlign: 'left', marginTop: 10 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Compass size={14} /> Quick Demo Voice Commands (Click to simulate speech):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {currentPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => simulateVoicePrompt(p.text)}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 999,
                      padding: '7px 14px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#0F172A',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 0.15s'
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = '#FFEDD5'; e.currentTarget.style.borderColor = '#FDBA74'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                  >
                    <span>🗣️</span>
                    <span>“{p.text}”</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
