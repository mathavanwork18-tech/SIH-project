import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import {
  MessageSquare,
  Send,
  Mic,
  Volume2,
  CheckCircle2,
  Phone,
  Building2,
  ShieldCheck,
  Sparkles,
  Paperclip,
  CheckCheck
} from 'lucide-react';

export const EnquiryChat = () => {
  const { enquiries, activeEnquiryId, setActiveEnquiryId, sendEnquiryMessage } = useAppData();
  const { currentLang, t } = useLanguage();
  const { speak } = useVoice();

  const [inputMessage, setInputMessage] = useState('');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  const activeEnquiry = enquiries.find(e => e.id === activeEnquiryId) || enquiries[0];

  const handleSendMessage = (textToSend = inputMessage, isAudio = false) => {
    if (!textToSend.trim() && !isAudio) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'artisan',
      senderName: 'Kumar Swaminathan',
      text: textToSend,
      audioUrl: isAudio ? 'audio-sample' : null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    sendEnquiryMessage(activeEnquiry.id, newMsg);
    setInputMessage('');

    // Buyer automated response simulation after 1.5s
    setTimeout(() => {
      const buyerReply = {
        id: `msg-reply-${Date.now()}`,
        sender: 'buyer',
        senderName: activeEnquiry.buyerName,
        text: 'Thank you for the quick update! We have noted this and our procurement team will release the purchase order.',
        audioUrl: null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      sendEnquiryMessage(activeEnquiry.id, buyerReply);
      speak(`New response received from ${activeEnquiry.buyerName}`);
    }, 1800);
  };

  const handleVoiceNoteRecord = () => {
    setIsRecordingAudio(true);
    setTimeout(() => {
      setIsRecordingAudio(false);
      handleSendMessage('🎤 [Voice Message]: Vanakkam! We have reviewed the requirement and our master artisans will begin packing the sample today.', true);
    }, 1500);
  };

  const quickReplyTemplates = [
    'Vanakkam! We can supply 250 units in 20 days.',
    'Sample piece is ready for dispatch via courier.',
    'We offer special wholesale bulk pricing at ₹1,350/unit.',
    'Customized packaging with eco-friendly branding available.'
  ];

  if (!activeEnquiry) {
    return (
      <div className="card-glass" style={{ padding: 40, textAlign: 'center' }}>
        <MessageSquare size={40} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
        <h3>No Enquiries Yet</h3>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 20, minHeight: 640 }}>
      {/* Left Sidebar: Enquiries List */}
      <div className="card-glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageSquare size={18} color="#EA580C" />
          {t.nav.enquiries} ({enquiries.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', flex: 1 }}>
          {enquiries.map(enq => {
            const isSelected = enq.id === activeEnquiry.id;
            const lastMsg = enq.messages[enq.messages.length - 1];
            return (
              <div
                key={enq.id}
                onClick={() => setActiveEnquiryId(enq.id)}
                style={{
                  padding: '14px',
                  borderRadius: 14,
                  border: isSelected ? '2px solid #EA580C' : '1px solid #E2E8F0',
                  background: isSelected ? '#FFF7ED' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isSelected ? '0 4px 12px rgba(234, 88, 12, 0.12)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>
                    {enq.buyerName}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {enq.date}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#EA580C', fontWeight: 700, marginBottom: 4 }}>
                  📦 {enq.productName}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {lastMsg?.text || 'New message'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Thread Panel */}
      <div className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: 640 }}>
        {/* Chat Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 16,
          borderBottom: '1px solid #E2E8F0',
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#0F172A',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}>
              {activeEnquiry.buyerName.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
                {activeEnquiry.buyerName}
                <span className="badge-verified" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>
                  <ShieldCheck size={11} /> Verified
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Regarding: <strong>{activeEnquiry.productName}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => alert(`Calling verified procurement desk for ${activeEnquiry.buyerName}...`)}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Phone size={14} color="#16A34A" /> Direct Call
            </button>
          </div>
        </div>

        {/* Message Bubble List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, paddingRight: 8, marginBottom: 16 }}>
          {activeEnquiry.messages.map(msg => {
            const isMe = msg.sender === 'artisan';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  background: isMe ? 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)' : '#F1F5F9',
                  color: isMe ? '#FFFFFF' : '#0F172A',
                  borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '12px 18px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: isMe ? '#FED7AA' : '#64748B', marginBottom: 4 }}>
                  {msg.senderName}
                </div>
                <div style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: '0.7rem', color: isMe ? 'rgba(255,255,255,0.8)' : '#94A3B8', textAlign: 'right', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck size={13} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Response Chips */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 10 }}>
          {quickReplyTemplates.map((template, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(template)}
              style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: 999,
                padding: '5px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              💬 {template}
            </button>
          ))}
        </div>

        {/* Bottom Input Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handleVoiceNoteRecord}
            style={{
              background: isRecordingAudio ? '#DC2626' : '#FFF7ED',
              border: '1.5px solid #FDBA74',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isRecordingAudio ? 'white' : '#EA580C',
              flexShrink: 0
            }}
            title="Record Voice Note"
          >
            <Mic size={20} className={isRecordingAudio ? 'animate-pulse' : ''} />
          </button>

          <input
            type="text"
            placeholder="Type message or click mic to send voice note in your language..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: 14,
              border: '1.5px solid #CBD5E1',
              fontSize: '0.95rem'
            }}
          />

          <button
            onClick={() => handleSendMessage()}
            className="btn-primary"
            style={{ padding: '12px 20px', borderRadius: 14 }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
