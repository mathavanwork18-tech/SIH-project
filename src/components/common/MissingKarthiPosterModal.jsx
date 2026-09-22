import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useVoice } from '../../context/VoiceContext';
import { X, Download, AlertTriangle, Coffee, Sparkles, MapPin, Share2 } from 'lucide-react';

export const MissingKarthiPosterModal = () => {
  const { isMissingPosterOpen, setIsMissingPosterOpen } = useAppData();
  const { speak } = useVoice();

  if (!isMissingPosterOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/missing_karthi_poster.jpg';
    link.download = 'MISSING_KARTHI_POSTER.jpg';
    link.click();
  };

  const handleAnnounce = () => {
    speak('அறிவிப்பு! ஹேக்கத்தானில் கார்த்தி காணாமல் போயுள்ளார். பார்த்தவர்கள் உடனடியாக பிரியாணி மற்றும் காபியுடன் ஒப்படைக்கவும்!');
  };

  return (
    <div
      onClick={() => setIsMissingPosterOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 8, 18, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 480,
          maxHeight: '92vh',
          background: '#111827',
          borderRadius: 20,
          border: '1px solid #DC2626',
          boxShadow: '0 25px 60px -15px rgba(220, 38, 38, 0.4), 0 0 30px rgba(239, 68, 68, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '12px 18px',
          background: 'linear-gradient(90deg, #991B1B, #DC2626)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={20} color="#FEF08A" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.05em' }}>
              🚨 HACKATHON MISSING POSTER: KARTHI
            </span>
          </div>
          <button
            onClick={() => setIsMissingPosterOpen(false)}
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Poster Image Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          background: '#0B0F19'
        }}>
          {/* Main Poster Image */}
          <div style={{
            position: 'relative',
            borderRadius: 14,
            overflow: 'hidden',
            border: '2px solid #374151',
            boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
            width: '100%',
            maxWidth: 380,
            aspectRatio: '3/4',
            background: '#1F2937'
          }}>
            <img
              src="/missing_karthi_poster.jpg"
              alt="Missing Karthi Poster"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                // Fallback if direct public path takes a moment
                e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Humorous Summary Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'center',
            width: '100%'
          }}>
            <span style={{
              background: '#7F1D1D',
              color: '#FECACA',
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <MapPin size={12} /> Last Seen: SIH Finale Lab
            </span>
            <span style={{
              background: '#78350F',
              color: '#FDE68A',
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <Coffee size={12} /> Reward: Biryani & Coffee
            </span>
            <span style={{
              background: '#1E293B',
              color: '#94A3B8',
              padding: '4px 10px',
              borderRadius: 999,
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <Sparkles size={12} /> Dedicated for Thiru
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '12px 18px',
          background: '#111827',
          borderTop: '1px solid #1F2937',
          display: 'flex',
          gap: 10
        }}>
          <button
            onClick={handleAnnounce}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 10,
              padding: '10px 14px',
              fontWeight: 800,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            📢 AI Voice Alert
          </button>

          <button
            onClick={handleDownload}
            style={{
              background: '#374151',
              color: '#F3F4F6',
              border: '1px solid #4B5563',
              borderRadius: 10,
              padding: '10px 14px',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <Download size={16} /> Save Poster
          </button>
        </div>
      </div>
    </div>
  );
};
