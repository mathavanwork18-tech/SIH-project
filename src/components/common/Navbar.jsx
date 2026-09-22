import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { Globe, User, Bell } from 'lucide-react';

export const Navbar = () => {
  const { currentLang, languages, setIsLanguageModalOpen } = useLanguage();
  const { currentRole, setCurrentRole, setCurrentPage, enquiries } = useAppData();

  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0];
  const unreadCount = enquiries.filter(e => e.unread).length;

  return (
    <header style={{
      height: 52,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      flexShrink: 0,
      zIndex: 100
    }}>
      {/* Brand Logo & Name */}
      <div
        onClick={() => setCurrentPage(currentRole === 'artisan' ? 'dashboard' : 'buyerExplore')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #F97316, #EA580C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.95rem',
          color: '#FFFFFF'
        }}>
          🏺
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
          ArtisanBridge <span style={{ color: '#EA580C', fontSize: '0.75rem', fontWeight: 900 }}>AI</span>
        </div>
      </div>

      {/* Right Compact Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Role Switcher Pill */}
        <div style={{
          display: 'flex',
          background: '#F1F5F9',
          padding: 2,
          borderRadius: 999,
          border: '1px solid #E2E8F0'
        }}>
          <button
            onClick={() => { setCurrentRole('artisan'); setCurrentPage('dashboard'); }}
            style={{
              border: 'none',
              background: currentRole === 'artisan' ? '#EA580C' : 'transparent',
              color: currentRole === 'artisan' ? '#FFFFFF' : '#64748B',
              padding: '3px 8px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '0.7rem',
              cursor: 'pointer'
            }}
          >
            Artisan
          </button>
          <button
            onClick={() => { setCurrentRole('buyer'); setCurrentPage('buyerExplore'); }}
            style={{
              border: 'none',
              background: currentRole === 'buyer' ? '#0F172A' : 'transparent',
              color: currentRole === 'buyer' ? '#FFFFFF' : '#64748B',
              padding: '3px 8px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: '0.7rem',
              cursor: 'pointer'
            }}
          >
            Buyer
          </button>
        </div>


        {/* Language Button */}
        <button
          onClick={() => setIsLanguageModalOpen(true)}
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            padding: '4px 8px',
            borderRadius: 999,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 700,
            fontSize: '0.72rem',
            color: '#0F172A'
          }}
          title="Change Language"
        >
          <span>{currentLangObj.flag}</span>
          <span>{currentLangObj.name}</span>
        </button>
      </div>
    </header>
  );
};
