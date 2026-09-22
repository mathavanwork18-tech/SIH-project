import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import {
  Mic,
  Camera,
  Package,
  Handshake,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Eye,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Building2,
  ChevronRight
} from 'lucide-react';

export const ArtisanDashboard = () => {
  const { artisanProfile, products, enquiries, buyers, setCurrentPage } = useAppData();
  const { t, currentLang } = useLanguage();
  const { startListening, isListening, simulateVoicePrompt } = useVoice();

  const publishedProducts = products.filter(p => p.status === 'published');
  const totalViews = products.reduce((acc, curr) => acc + (curr.views || 0), 0) + 1248;

  const quickActions = [
    {
      id: 'post_product',
      title: 'Post Product',
      desc: 'Take photo & AI catalogue',
      icon: Camera,
      color: '#EA580C',
      bg: '#FFF7ED',
      action: () => setCurrentPage('create_product')
    },
    {
      id: 'my_products',
      title: 'My Products',
      desc: `${products.length} crafts listed`,
      icon: Package,
      color: '#0F172A',
      bg: '#F8FAFC',
      action: () => setCurrentPage('catalogue')
    },
    {
      id: 'buyer_matches',
      title: 'Buyer Matches',
      desc: '5 active demands',
      icon: Handshake,
      color: '#4F46E5',
      bg: '#EEF2FF',
      action: () => setCurrentPage('matches')
    },
    {
      id: 'enquiries',
      title: 'Enquiries',
      desc: `${enquiries.length} conversations`,
      icon: MessageSquare,
      color: '#059669',
      bg: '#ECFDF5',
      action: () => setCurrentPage('enquiries')
    }
  ];

  const sampleTanglishPrompts = [
    { text: 'Enakku pottery product post pannanum', label: '🏺 Pottery Post' },
    { text: 'En products kaatu', label: '📦 My Products' },
    { text: 'Pottery buyers thedu', label: '🤝 Buyer Matches' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '4px 0' }}>
      {/* 1. Artisan Welcome Bar (Compact) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: '#FFFFFF',
        borderRadius: 14,
        border: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src={artisanProfile.avatar}
              alt={artisanProfile.name}
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #EA580C'
              }}
            />
            {artisanProfile.isVerified && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                background: '#10B981',
                color: 'white',
                borderRadius: '50%',
                width: 15,
                height: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid white'
              }}>
                <CheckCircle2 size={10} />
              </span>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Vanakkam, {artisanProfile.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
              📍 {artisanProfile.location} • {artisanProfile.craft}
            </div>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage('registration')}
          style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: 8,
            padding: '4px 8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#475569',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          Profile
        </button>
      </div>

      {/* 2. Main AI Voice Interaction Hero Card (Section 7 & 8) */}
      <div className="card-glass" style={{
        padding: '20px 16px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
        border: '1.5px solid #FED7AA',
        boxShadow: '0 4px 16px rgba(234, 88, 12, 0.08)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          background: '#FFEDD5',
          color: '#C2410C',
          padding: '3px 10px',
          borderRadius: 999,
          fontSize: '0.72rem',
          fontWeight: 800,
          marginBottom: 8
        }}>
          <Sparkles size={12} /> AI Voice Assistant • Just Talk
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: 2 }}>
          Tell me what you want to do
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.8rem', marginBottom: 16 }}>
          {currentLang === 'ta' ? 'என்ன செய்ய வேண்டும் என்று சொல்லுங்கள்' : 'Speak naturally in Tamil, English, or Hindi'}
        </p>

        {/* 80px Visual Tactile Central Voice Button */}
        <button
          onClick={startListening}
          className="btn-voice-hero"
          title="Tap to speak"
        >
          {isListening ? (
            <div className="audio-waves" style={{ height: 26 }}>
              <span style={{ width: 4 }} />
              <span style={{ width: 4 }} />
              <span style={{ width: 4 }} />
              <span style={{ width: 4 }} />
              <span style={{ width: 4 }} />
            </div>
          ) : (
            <Mic size={36} />
          )}
        </button>

        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isListening ? '#10B981' : '#EA580C', marginTop: 10 }}>
          {isListening ? '● Listening... Speak now' : 'Tap & Speak'}
        </div>

        {/* Tanglish Quick Prompt Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {sampleTanglishPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => simulateVoicePrompt(p.text)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #FED7AA',
                borderRadius: 999,
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#C2410C',
                cursor: 'pointer'
              }}
            >
              “{p.text}”
            </button>
          ))}
        </div>
      </div>

      {/* 3. Quick Actions Grid (2x2 Compact Cards - Section 11) */}
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: 8, paddingLeft: 2 }}>
          Quick Actions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                onClick={action.action}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 14,
                  padding: '14px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  transition: 'transform 0.1s'
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: action.bg,
                  color: action.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                    {action.title}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: 2 }}>
                    {action.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Compact Overview Statistics Bar (Section 15) */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: '12px 14px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Products</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A' }}>{products.length}</div>
        </div>
        <div style={{ borderLeft: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Published</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#16A34A' }}>{publishedProducts.length}</div>
        </div>
        <div style={{ borderLeft: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Views</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#EA580C' }}>{totalViews}</div>
        </div>
        <div style={{ borderLeft: '1px solid #F1F5F9' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Enquiries</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#4F46E5' }}>{enquiries.length}</div>
        </div>
      </div>

      {/* 5. Top Market Match Alert Card */}
      <div
        onClick={() => setCurrentPage('matches')}
        style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
          border: '1px solid #C7D2FE',
          borderRadius: 14,
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: '#4F46E5',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Building2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E1B4B' }}>
              5 Corporate Buyer Matches Ready
            </div>
            <div style={{ fontSize: '0.72rem', color: '#4338CA' }}>
              FabIndia & Urban Living demand ₹4.5 Lakhs
            </div>
          </div>
        </div>
        <ChevronRight size={18} color="#4338CA" />
      </div>

      {/* 6. Recent Products (Commerce List - Section 13 & 14) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingLeft: 2 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A' }}>
            Recent Products
          </div>
          <button
            onClick={() => setCurrentPage('catalogue')}
            style={{ background: 'transparent', border: 'none', color: '#EA580C', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
          >
            View All →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {products.slice(0, 3).map(prod => (
            <div
              key={prod.id}
              onClick={() => setCurrentPage('catalogue')}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <img
                src={prod.images?.front || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&auto=format&fit=crop&q=80'}
                alt={prod.name}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  objectFit: 'cover',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {prod.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  {prod.category} • {prod.craftType}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#EA580C' }}>
                    ₹{prod.price}
                  </span>
                  <span style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: 999
                  }}>
                    {prod.status}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
