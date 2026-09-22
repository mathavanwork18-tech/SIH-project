import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Type, Wifi, WifiOff, Volume2, RefreshCw, Eye } from 'lucide-react';

export const AccessibilityBar = () => {
  const { fontSizeScale, setFontSizeScale, isOffline, setIsOffline, offlineDraftCount } = useAppData();
  const { currentLang } = useLanguage();

  const handleFontChange = (scale) => {
    setFontSizeScale(scale);
    document.body.className = `font-scale-${scale}`;
  };

  return (
    <div style={{
      background: '#1E293B',
      color: '#E2E8F0',
      padding: '6px 16px',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8' }}>
          <Eye size={14} /> Accessibility & Low-Literacy Mode:
        </span>
        
        {/* Font Scaler */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#334155', borderRadius: 6, padding: '2px 6px' }}>
          <button
            onClick={() => handleFontChange('normal')}
            style={{
              background: fontSizeScale === 'normal' ? '#EA580C' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            A
          </button>
          <button
            onClick={() => handleFontChange('large')}
            style={{
              background: fontSizeScale === 'large' ? '#EA580C' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            A+
          </button>
          <button
            onClick={() => handleFontChange('extra-large')}
            style={{
              background: fontSizeScale === 'extra-large' ? '#EA580C' : 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '2px 6px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            A++
          </button>
        </div>
      </div>

      {/* Offline simulation status and quick toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setIsOffline(!isOffline)}
          style={{
            background: isOffline ? '#DC2626' : '#059669',
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '3px 10px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5
          }}
          title="Click to toggle offline mode simulation"
        >
          {isOffline ? <WifiOff size={12} /> : <Wifi size={12} />}
          <span>{isOffline ? 'Offline Mode (Local Drafts)' : 'Online (Auto-Sync)'}</span>
        </button>

        {isOffline && offlineDraftCount > 0 && (
          <span style={{ background: '#F59E0B', color: '#78350F', padding: '2px 8px', borderRadius: 999, fontWeight: 700, fontSize: '0.7rem' }}>
            {offlineDraftCount} Drafts waiting to sync
          </span>
        )}
      </div>
    </div>
  );
};
