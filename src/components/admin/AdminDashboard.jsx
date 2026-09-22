import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  Sparkles,
  Users,
  Package,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  Search,
  Check,
  X,
  Layers
} from 'lucide-react';

export const AdminDashboard = () => {
  const { products, buyers, aiLogs, updateProduct } = useAppData();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState('moderation'); // 'moderation' | 'aiLogs' | 'stats'
  const [moderationList, setModerationList] = useState([
    {
      id: 'mod-1',
      title: 'Handloom Cotton Khes Blanket',
      artisan: 'Ram Lal Weavers',
      location: 'Panipat, Haryana',
      aiScore: 92,
      flagReason: 'AI Duplicate Detection: 94% similarity with existing catalog item #104',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'mod-2',
      title: 'Terracotta Handcrafted Temple Lamp',
      artisan: 'Muthu Pottery Works',
      location: 'Vilachery, Tamil Nadu',
      aiScore: 98,
      flagReason: 'Routine Quality Check: High-res studio lighting approved',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'
    }
  ]);

  const handleApprove = (id) => {
    setModerationList(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' } : m));
  };

  const handleReject = (id) => {
    setModerationList(prev => prev.map(m => m.id === id ? { ...m, status: 'rejected' } : m));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div className="card-glass" style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'white',
        borderRadius: 16
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,255,255,0.15)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: 999,
          fontSize: '0.75rem',
          fontWeight: 800,
          width: 'fit-content'
        }}>
          <ShieldCheck size={13} /> AI Governance & Admin
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>
          {t.admin.title}
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
          Audit AI pipelines, duplicate detection & content moderation.
        </p>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div className="card-glass" style={{ padding: '14px 12px' }}>
          <div style={{ color: '#64748B', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>
            {t.admin.totalArtisans}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>
            1,248
          </div>
          <div style={{ color: '#16A34A', fontSize: '0.7rem', fontWeight: 700 }}>
            +18% this month
          </div>
        </div>

        <div className="card-glass" style={{ padding: '14px 12px' }}>
          <div style={{ color: '#64748B', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>
            {t.admin.totalProducts}
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0F172A' }}>
            {products.length + 842}
          </div>
          <div style={{ color: '#EA580C', fontSize: '0.7rem', fontWeight: 700 }}>
            98% AI verified
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => setActiveTab('moderation')}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: activeTab === 'moderation' ? '2px solid #4338CA' : '1px solid #CBD5E1',
            background: activeTab === 'moderation' ? '#EEF2FF' : '#FFFFFF',
            color: activeTab === 'moderation' ? '#4338CA' : '#475569',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <AlertTriangle size={16} />
          <span>{t.admin.moderationQueue} ({moderationList.filter(m => m.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('aiLogs')}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: activeTab === 'aiLogs' ? '2px solid #4338CA' : '1px solid #CBD5E1',
            background: activeTab === 'aiLogs' ? '#EEF2FF' : '#FFFFFF',
            color: activeTab === 'aiLogs' ? '#4338CA' : '#475569',
            fontWeight: 800,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Activity size={16} />
          <span>{t.admin.aiAuditLogs} ({aiLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {moderationList.map(item => (
            <div
              key={item.id}
              className="card-glass"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 68, height: 68, borderRadius: 12, objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0F172A' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 2 }}>
                    Artisan: <strong>{item.artisan}</strong> • {item.location}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 600, marginTop: 4 }}>
                    ⚠️ {item.flagReason}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {item.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleReject(item.id)}
                      style={{
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: 'none',
                        borderRadius: 10,
                        padding: '8px 16px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5
                      }}
                    >
                      <X size={15} /> {t.admin.reject}
                    </button>

                    <button
                      onClick={() => handleApprove(item.id)}
                      className="btn-primary"
                      style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                    >
                      <Check size={15} /> {t.admin.approve}
                    </button>
                  </>
                ) : (
                  <span style={{
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    color: item.status === 'approved' ? '#16A34A' : '#DC2626'
                  }}>
                    {item.status === 'approved' ? '✓ Approved' : '✗ Flagged for Correction'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: AI Audit Logs (Section 35) */}
      {activeTab === 'aiLogs' && (
        <div className="card-glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {aiLogs.map(log => (
              <div
                key={log.id}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 14,
                  padding: '14px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4338CA' }}>
                    {log.model}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {log.timestamp} • Confidence: <strong style={{ color: '#16A34A' }}>{log.confidence}</strong>
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 700 }}>
                  Action: {log.action}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                  <strong>Input:</strong> {log.input} ➔ <strong>Output:</strong> {log.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
