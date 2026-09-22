import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';

export const MobileDeviceContainer = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#090D16',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 8px'
    }}>
      {/* Strict 390 x 844 px Mobile Frame */}
      <div style={{
        width: '100%',
        maxWidth: 390,
        height: 844,
        maxHeight: '100vh',
        background: '#FFFFFF',
        borderRadius: 44,
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 0 10px #1E293B',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Native Status Bar (Notch, Clock, Battery, Wifi) */}
        <div style={{
          height: 44,
          padding: '12px 24px 0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#0F172A',
          zIndex: 100,
          flexShrink: 0
        }}>
          <span>12:45</span>

          {/* Camera Notch / Dynamic Island */}
          <div style={{
            width: 110,
            height: 24,
            background: '#0F172A',
            borderRadius: 999,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 8
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Signal size={13} strokeWidth={2.5} />
            <Wifi size={13} strokeWidth={2.5} />
            <Battery size={15} strokeWidth={2.5} />
          </div>
        </div>

        {/* Mobile Viewport Body */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          background: '#FDFBF7'
        }}>
          {children}
        </div>

        {/* Bottom Home Indicator Bar (SafeArea) */}
        <div style={{
          height: 20,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 501,
          flexShrink: 0
        }}>
          <div style={{ width: 130, height: 4, background: '#CBD5E1', borderRadius: 999 }} />
        </div>
      </div>
    </div>
  );
};
