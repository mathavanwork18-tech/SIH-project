import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Check, Volume2 } from 'lucide-react';

export const LanguageModal = () => {
  const { currentLang, changeLanguage, languages, isLanguageModalOpen, setIsLanguageModalOpen, t } = useLanguage();

  if (!isLanguageModalOpen) return null;

  return (
    <div className="voice-modal-backdrop" onClick={() => setIsLanguageModalOpen(false)}>
      <div className="voice-modal-card" style={{ maxWidth: 640 }} onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setIsLanguageModalOpen(false)}
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

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: '2.4rem', marginBottom: 8 }}>🇮🇳</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
            {t.selectLanguage}
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.95rem' }}>
            Choose your comfortable native language for voice, AI guidance, and marketplace cataloguing
          </p>
        </div>

        {/* 8 Indian Languages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12,
          marginBottom: 24
        }}>
          {languages.map((lang) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' : '#F8FAFC',
                  border: isSelected ? '2px solid #EA580C' : '1px solid #E2E8F0',
                  borderRadius: 16,
                  padding: '16px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 4px 14px rgba(234, 88, 12, 0.2)' : 'none',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)'
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{lang.flag}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: isSelected ? '#C2410C' : '#0F172A' }}>
                  {lang.name}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>
                  {lang.label}
                </span>
                {isSelected && (
                  <span style={{
                    background: '#EA580C',
                    color: 'white',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 4
                  }}>
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{
          background: '#F1F5F9',
          padding: '12px 18px',
          borderRadius: 14,
          fontSize: '0.85rem',
          color: '#475569',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'center'
        }}>
          <Volume2 size={16} color="#6366F1" />
          <span>Speech Recognition and Audio synthesis automatically configure for selected language.</span>
        </div>
      </div>
    </div>
  );
};
