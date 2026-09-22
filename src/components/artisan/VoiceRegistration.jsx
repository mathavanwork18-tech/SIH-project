import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import { extractRegistrationEntities, isVoiceConfirmation } from '../../services/voiceService';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  Edit3,
  ArrowRight,
  UserCheck,
  ShieldAlert,
  Volume2,
  RefreshCcw
} from 'lucide-react';

export const VoiceRegistration = () => {
  const { artisanProfile, setArtisanProfile, setCurrentPage } = useAppData();
  const { currentLang, t } = useLanguage();
  const { isListening, transcript, startListening, stopListening, speak, simulateVoicePrompt } = useVoice();

  const [step, setStep] = useState(0); // 0 to 4
  const [profileDraft, setProfileDraft] = useState({
    name: '',
    location: '',
    craft: '',
    experience: '',
    phone: '+91 98421 78901'
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const questions = [
    t.registration.step1,
    t.registration.step2,
    t.registration.step3,
    t.registration.step4
  ];

  // Speak initial question on load or step change
  useEffect(() => {
    if (step < 4) {
      speak(questions[step]);
    } else if (step === 4 && !isConfirmed) {
      speak(t.registration.confirmSummary);
    }
  }, [step]);

  // When speech transcript changes, run intelligent extraction
  useEffect(() => {
    if (transcript) {
      // Check if user is saying confirmation on step 4
      if (step >= 3 && isVoiceConfirmation(transcript)) {
        handleConfirmRegistration();
        return;
      }

      // Extract entities
      const updated = extractRegistrationEntities(transcript, profileDraft);
      setProfileDraft(updated);

      // If all 4 fields found in a single multi-sentence utterance
      if (updated.name && updated.location && updated.craft && updated.experience) {
        setStep(4);
      } else if (updated.name && step === 0) {
        setStep(1);
      } else if (updated.location && step === 1) {
        setStep(2);
      } else if (updated.craft && step === 2) {
        setStep(3);
      } else if (updated.experience && step === 3) {
        setStep(4);
      }
    }
  }, [transcript]);

  const handleConfirmRegistration = () => {
    setIsConfirmed(true);
    setArtisanProfile({
      ...artisanProfile,
      name: profileDraft.name || 'Kumar Swaminathan',
      location: profileDraft.location || 'Salem, Tamil Nadu',
      craft: profileDraft.craft || 'Bamboo & Cane Craft',
      experience: profileDraft.experience || '15 Years',
      isVerified: true
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    speak(t.registration.success);
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 2000);
  };

  const sampleVoiceUtterances = [
    {
      label: 'Single Sentence (Full Info)',
      text: currentLang === 'ta'
        ? 'என் பெயர் குமார், சேலம், 15 வருடமா bamboo craft செய்றேன்'
        : currentLang === 'hi'
        ? 'मेरा नाम रमेश है, बनारस से, 12 साल से सिल्क वीविंग कर रहा हूँ'
        : 'My name is Kumar from Salem, 15 years in bamboo craft'
    },
    {
      label: 'Voice Correction Demo',
      text: currentLang === 'ta'
        ? 'என் experience 12 இல்லை, 15 years'
        : 'My experience is 15 years, not 12'
    },
    {
      label: 'Voice Confirm Account',
      text: currentLang === 'ta' ? 'ஆம் confirm' : 'Yes, confirm'
    }
  ];

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="card-glass" style={{
        padding: '32px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
        border: '1.5px solid #FED7AA'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#FFEDD5',
          color: '#C2410C',
          padding: '6px 14px',
          borderRadius: 999,
          fontSize: '0.85rem',
          fontWeight: 800,
          marginBottom: 12
        }}>
          <Sparkles size={14} /> Section 6: AI Conversational Onboarding
        </div>

        <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
          {t.registration.title}
        </h2>
        <p style={{ color: '#64748B', fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>
          {t.registration.subtitle}
        </p>

        {/* Big Mic Button */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={isListening ? stopListening : startListening}
            className={`floating-voice-btn ${isListening ? 'listening' : ''}`}
            style={{ position: 'static', margin: '0 auto', width: 84, height: 84 }}
          >
            {isListening ? (
              <div className="audio-waves" style={{ height: 36 }}>
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            ) : (
              <Mic size={38} />
            )}
          </button>
          <div style={{ fontWeight: 700, color: isListening ? '#059669' : '#C2410C', marginTop: 12, fontSize: '1.05rem' }}>
            {isListening ? t.listening : 'Tap to speak your answer'}
          </div>
        </div>

        {/* Single Sentence Tip */}
        <div style={{
          marginTop: 20,
          background: '#FFFFFF',
          border: '1px dashed #FDBA74',
          borderRadius: 14,
          padding: '12px 18px',
          fontSize: '0.85rem',
          color: '#475569',
          textAlign: 'left'
        }}>
          💡 <strong>Tip:</strong> {t.registration.singleSentenceTip}
        </div>
      </div>

      {/* Structured Entity Extraction Live Card (Section 7) */}
      <div className="card-glass" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserCheck size={20} color="#EA580C" />
            {t.registration.extractedData}
          </h3>
          <span className="badge-ai">
            <Sparkles size={12} /> Auto-Extracted via AI Model 1
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div style={{
            background: profileDraft.name ? '#F0FDF4' : '#F8FAFC',
            border: profileDraft.name ? '1.5px solid #86EFAC' : '1px solid #E2E8F0',
            borderRadius: 14,
            padding: '14px 18px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              {t.registration.name}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: profileDraft.name ? '#15803D' : '#94A3B8', marginTop: 4 }}>
              {profileDraft.name || 'Waiting for speech...'}
            </div>
          </div>

          <div style={{
            background: profileDraft.location ? '#F0FDF4' : '#F8FAFC',
            border: profileDraft.location ? '1.5px solid #86EFAC' : '1px solid #E2E8F0',
            borderRadius: 14,
            padding: '14px 18px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              {t.registration.location}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: profileDraft.location ? '#15803D' : '#94A3B8', marginTop: 4 }}>
              {profileDraft.location || 'Waiting for speech...'}
            </div>
          </div>

          <div style={{
            background: profileDraft.craft ? '#F0FDF4' : '#F8FAFC',
            border: profileDraft.craft ? '1.5px solid #86EFAC' : '1px solid #E2E8F0',
            borderRadius: 14,
            padding: '14px 18px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              {t.registration.craft}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: profileDraft.craft ? '#15803D' : '#94A3B8', marginTop: 4 }}>
              {profileDraft.craft || 'Waiting for speech...'}
            </div>
          </div>

          <div style={{
            background: profileDraft.experience ? '#F0FDF4' : '#F8FAFC',
            border: profileDraft.experience ? '1.5px solid #86EFAC' : '1px solid #E2E8F0',
            borderRadius: 14,
            padding: '14px 18px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              {t.registration.experience}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: profileDraft.experience ? '#15803D' : '#94A3B8', marginTop: 4 }}>
              {profileDraft.experience || 'Waiting for speech...'}
            </div>
          </div>
        </div>

        {/* Voice Correction Notice (Section 8) */}
        <div style={{ marginTop: 18, fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Edit3 size={15} color="#EA580C" />
          <span>{t.registration.voiceCorrectionTip}</span>
        </div>

        {/* Action confirmation button */}
        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setProfileDraft({
                name: 'Kumar Swaminathan',
                location: 'Salem, Tamil Nadu',
                craft: 'Bamboo & Cane Craft',
                experience: '15 Years',
                phone: '+91 98421 78901'
              });
              setStep(4);
            }}
            className="btn-secondary"
          >
            Auto-Fill Sample Data
          </button>
          <button
            onClick={handleConfirmRegistration}
            className="btn-primary"
            style={{ padding: '12px 28px' }}
          >
            <CheckCircle2 size={18} /> {t.confirm} & Enter App
          </button>
        </div>
      </div>

      {/* Quick Voice Simulation Buttons for Easy Testing */}
      <div className="card-glass" style={{ padding: '20px 24px', background: '#F8FAFC' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: 10 }}>
          ⚡ Test Live Voice Registration Flows:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {sampleVoiceUtterances.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => simulateVoicePrompt(sample.text)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0F172A',
                cursor: 'pointer'
              }}
            >
              🗣️ {sample.label}: “{sample.text}”
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
