import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import {
  Handshake,
  Sparkles,
  CheckCircle2,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight,
  Send,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Filter
} from 'lucide-react';

export const MarketMatches = () => {
  const { buyers, products, setCurrentPage, setActiveEnquiryId, createNewEnquiry } = useAppData();
  const { currentLang, t } = useLanguage();
  const { speak } = useVoice();

  const [activeTab, setActiveTab] = useState('directMatches'); // 'directMatches' | 'bulkDemands'
  const [offerSentIds, setOfferSentIds] = useState({});

  const handleConnect = (buyer, product) => {
    const defaultProduct = product || products[0];
    createNewEnquiry(
      defaultProduct,
      buyer,
      `Vanakkam! We noticed your requirement for ${buyer.requirements[0]?.title}. Our artisan group can fulfill this with superior craftsmanship.`
    );
    setOfferSentIds(prev => ({ ...prev, [buyer.id]: true }));
    speak(`Inquiry initiated with ${buyer.name}. Opening conversation thread.`);
    setTimeout(() => {
      setCurrentPage('enquiries');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header Banner */}
      <div className="card-glass" style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #EEF2FF 100%)',
        border: '1.5px solid #C7D2FE'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#E0E7FF',
          color: '#4338CA',
          padding: '4px 10px',
          borderRadius: 999,
          fontSize: '0.75rem',
          fontWeight: 800,
          width: 'fit-content'
        }}>
          <Sparkles size={13} /> AI Market Linkage
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
          {t.marketLinkage.title}
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.8rem' }}>
          Direct algorithmic linkage to verified corporate buyers & export emporiums.
        </p>
      </div>

      {/* Tabs: AI Direct Matches vs Reverse Procurement Demands */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button
          onClick={() => setActiveTab('directMatches')}
          style={{
            padding: '10px 8px',
            borderRadius: 12,
            border: activeTab === 'directMatches' ? '2px solid #4F46E5' : '1px solid #CBD5E1',
            background: activeTab === 'directMatches' ? '#EEF2FF' : '#FFFFFF',
            color: activeTab === 'directMatches' ? '#4338CA' : '#475569',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <Sparkles size={14} />
          <span>Matched Buyers</span>
        </button>

        <button
          onClick={() => setActiveTab('bulkDemands')}
          style={{
            padding: '10px 8px',
            borderRadius: 12,
            border: activeTab === 'bulkDemands' ? '2px solid #4F46E5' : '1px solid #CBD5E1',
            background: activeTab === 'bulkDemands' ? '#EEF2FF' : '#FFFFFF',
            color: activeTab === 'bulkDemands' ? '#4338CA' : '#475569',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}
        >
          <TrendingUp size={14} />
          <span>Bulk Demands</span>
        </button>
      </div>

      {/* Matches Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {buyers.map(buyer => {
          const matchInfo = buyer.matchedProducts?.[0] || {
            score: 94,
            reasons: [
              'Craft material matches buyer sustainability mandate',
              'Price point compatible with regional export margins',
              'Artisan cluster located in prioritized handcraft belt'
            ]
          };

          return (
            <div
              key={buyer.id}
              className="card-glass"
              style={{
                padding: '26px 30px',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 18
              }}
            >
              {/* Top Row: Buyer Info + Match Score */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: '#0F172A',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    fontWeight: 800
                  }}>
                    {buyer.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                        {buyer.name}
                      </h3>
                      {buyer.verified && (
                        <span className="badge-verified">
                          <ShieldCheck size={12} /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 12, marginTop: 2 }}>
                      <span>👤 {buyer.contactPerson}</span>
                      <span>📍 {buyer.location}</span>
                      <span>🏷️ {buyer.type}</span>
                    </div>
                  </div>
                </div>

                {/* Match Score Badge (Section 24) */}
                <div style={{
                  background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
                  border: '1.5px solid #86EFAC',
                  borderRadius: 16,
                  padding: '10px 18px',
                  textAlign: 'right'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                    {t.marketLinkage.matchScore}
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#14532D', lineHeight: 1 }}>
                    {matchInfo.score}%
                  </div>
                </div>
              </div>

              {/* Requirement Scope Box */}
              {buyer.requirements?.[0] && (
                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 14,
                  padding: '16px 20px'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A', marginBottom: 4 }}>
                    📋 Requirement: {buyer.requirements[0].title}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: 10 }}>
                    {buyer.requirements[0].description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: '0.85rem', color: '#334155' }}>
                    <span><strong>Target Qty:</strong> {buyer.requirements[0].targetQuantity} units</span>
                    <span><strong>Budget:</strong> {buyer.requirements[0].budgetPerUnit}</span>
                    <span><strong>Timeline:</strong> {buyer.requirements[0].deliveryTimeline}</span>
                  </div>
                </div>
              )}

              {/* Explainable AI Match Rationale (Section 24) */}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} color="#4F46E5" />
                  {t.marketLinkage.whyMatched}:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 8 }}>
                  {matchInfo.reasons.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: '#1E293B' }}>
                      <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                <button
                  onClick={() => handleConnect(buyer)}
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.9rem' }}
                >
                  <Send size={15} />
                  <span>{offerSentIds[buyer.id] ? 'Connected!' : t.marketLinkage.sendOffer}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
