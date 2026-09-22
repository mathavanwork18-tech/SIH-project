import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useVoice } from '../../context/VoiceContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Home,
  Package,
  Mic,
  Handshake,
  MessageSquare,
  Compass,
  FileText
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { currentRole, currentPage, setCurrentPage, enquiries } = useAppData();
  const { startListening, isListening } = useVoice();
  const { t } = useLanguage();

  const unreadEnquiriesCount = enquiries.filter(e => e.unread).length;

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 390,
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '8px 8px 12px 8px',
      zIndex: 500,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.04)'
    }}>
      {currentRole === 'artisan' && (
        <>
          {/* Home */}
          <button
            onClick={() => setCurrentPage('dashboard')}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: currentPage === 'dashboard' ? '#EA580C' : '#64748B',
              fontWeight: currentPage === 'dashboard' ? 800 : 600,
              fontSize: '0.72rem',
              flex: 1,
              padding: '4px 0'
            }}
          >
            <Home size={20} color={currentPage === 'dashboard' ? '#EA580C' : '#64748B'} />
            <span>Home</span>
          </button>

          {/* Products */}
          <button
            onClick={() => setCurrentPage('catalogue')}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: currentPage === 'catalogue' ? '#EA580C' : '#64748B',
              fontWeight: currentPage === 'catalogue' ? 800 : 600,
              fontSize: '0.72rem',
              flex: 1,
              padding: '4px 0'
            }}
          >
            <Package size={20} color={currentPage === 'catalogue' ? '#EA580C' : '#64748B'} />
            <span>Products</span>
          </button>

          {/* Matches */}
          <button
            onClick={() => setCurrentPage('matches')}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: currentPage === 'matches' ? '#EA580C' : '#64748B',
              fontWeight: currentPage === 'matches' ? 800 : 600,
              fontSize: '0.72rem',
              flex: 1,
              padding: '4px 0'
            }}
          >
            <Handshake size={20} color={currentPage === 'matches' ? '#EA580C' : '#64748B'} />
            <span>Matches</span>
          </button>

          {/* Enquiries */}
          <button
            onClick={() => setCurrentPage('enquiries')}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: currentPage === 'enquiries' ? '#EA580C' : '#64748B',
              fontWeight: currentPage === 'enquiries' ? 800 : 600,
              fontSize: '0.72rem',
              position: 'relative',
              flex: 1,
              padding: '4px 0'
            }}
          >
            <MessageSquare size={20} color={currentPage === 'enquiries' ? '#EA580C' : '#64748B'} />
            <span>Enquiries</span>
            {unreadEnquiriesCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: '25%',
                background: '#EA580C',
                color: 'white',
                borderRadius: '50%',
                width: 14,
                height: 14,
                fontSize: '0.6rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadEnquiriesCount}
              </span>
            )}
          </button>
        </>
      )}

      {currentRole === 'buyer' && (
        <>
          <button
            onClick={() => setCurrentPage('buyerExplore')}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: currentPage === 'buyerExplore' ? '#0F172A' : '#64748B',
              fontWeight: currentPage === 'buyerExplore' ? 800 : 600,
              fontSize: '0.72rem',
              flex: 1
            }}
          >
            <Compass size={20} color={currentPage === 'buyerExplore' ? '#0F172A' : '#64748B'} />
            <span>Explore</span>
          </button>

          <button
            onClick={() => setCurrentPage('buyerRequests')}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              color: currentPage === 'buyerRequests' ? '#0F172A' : '#64748B',
              fontWeight: currentPage === 'buyerRequests' ? 800 : 600,
              fontSize: '0.72rem',
              flex: 1
            }}
          >
            <FileText size={20} color={currentPage === 'buyerRequests' ? '#0F172A' : '#64748B'} />
            <span>Post Need</span>
          </button>
        </>
      )}
    </nav>
  );
};
