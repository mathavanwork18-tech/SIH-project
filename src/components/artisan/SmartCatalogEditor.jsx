import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import { generateSmartCatalog, applyVoiceCatalogEdit } from '../../services/catalogAiService';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Edit3,
  Mic,
  DollarSign,
  Tag,
  Globe,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  FileCheck
} from 'lucide-react';

export const SmartCatalogEditor = () => {
  const { workingDraft, addProduct, setCurrentPage, artisanProfile } = useAppData();
  const { currentLang, languages, t } = useLanguage();
  const { isListening, transcript, startListening, stopListening, speak, simulateVoicePrompt } = useVoice();

  const [catalog, setCatalog] = useState(null);
  const [activeLangTab, setActiveLangTab] = useState(currentLang);
  const [voiceEditFeedback, setVoiceEditFeedback] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // Generate AI Model 3 Smart Catalog
    const initialCatalog = generateSmartCatalog({
      craftType: workingDraft.detectedCraft?.craftType || artisanProfile.craft,
      material: workingDraft.detectedCraft?.material || 'Organic Bamboo',
      location: artisanProfile.location,
      artisanName: artisanProfile.name,
      detectedObject: workingDraft.detectedCraft?.detectedObject
    });
    setCatalog(initialCatalog);

    speak('AI has generated your comprehensive product catalogue with multilingual translations and fair pricing recommendations.');
  }, []);

  // Listen to voice corrections on this screen (Section 20)
  useEffect(() => {
    if (transcript && catalog) {
      const { updatedCatalog, feedbackMessage } = applyVoiceCatalogEdit(catalog, transcript);
      setCatalog(updatedCatalog);
      setVoiceEditFeedback(feedbackMessage);
      speak(feedbackMessage);
    }
  }, [transcript]);

  const handlePublish = () => {
    setIsPublishing(true);
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: catalog.title,
      artisanId: artisanProfile.artisanId || 'art-001',
      artisanName: artisanProfile.name,
      location: artisanProfile.location,
      category: catalog.category,
      subCategory: catalog.subCategory,
      craftType: catalog.craftType,
      material: catalog.material,
      color: catalog.color,
      price: catalog.price,
      suggestedPriceMin: catalog.suggestedPriceMin,
      suggestedPriceMax: catalog.suggestedPriceMax,
      availability: catalog.availability,
      qualityScore: 96,
      status: 'published',
      views: 12,
      enquiriesCount: 0,
      confidence: catalog.confidence,
      images: workingDraft.images || {
        front: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
        processedStudio: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80'
      },
      description: catalog.descriptions,
      shortDesc: catalog.shortDesc,
      keywords: catalog.keywords,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addProduct(newProduct);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    speak('Congratulations! Your product has been published to the Master Catalogue and matched with active corporate buyers.');
    setTimeout(() => {
      setCurrentPage('catalogue');
    }, 1800);
  };

  if (!catalog) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <Sparkles size={40} className="animate-spin" color="#EA580C" style={{ margin: '0 auto 16px auto' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{t.catalogAi.generating}</h3>
      </div>
    );
  }

  const sampleVoiceEdits = [
    { label: 'Edit Material', text: 'Material cane, not bamboo' },
    { label: 'Shorten Description', text: 'Description short பண்ணு' },
    { label: 'Change Price', text: 'Change price to 1500' },
    { label: 'Add Tag', text: 'Add heritage tag' }
  ];

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Banner */}
      <div className="card-glass" style={{
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
        border: '1.5px solid #FED7AA'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#FFEDD5',
            color: '#C2410C',
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: 6
          }}>
            <Sparkles size={13} /> Section 16-21: AI Model 3 Smart Cataloguing
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
            {t.catalogAi.title}
          </h2>
        </div>

        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="btn-primary"
          style={{ padding: '12px 28px' }}
        >
          <FileCheck size={18} />
          <span>{isPublishing ? 'Publishing...' : t.catalogAi.publishToMarket}</span>
        </button>
      </div>

      {/* Voice-Driven Field Correction HUD (Section 20) */}
      <div className="card-glass" style={{ padding: '20px 24px', background: '#FFF7ED', border: '1.5px solid #FDBA74' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#9A3412', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mic size={18} color="#EA580C" />
            <span>{t.catalogAi.voiceEditTitle} (No Typing Needed)</span>
          </div>

          <button
            onClick={isListening ? stopListening : startListening}
            style={{
              background: isListening ? '#10B981' : '#EA580C',
              color: 'white',
              border: 'none',
              borderRadius: 999,
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Mic size={14} />
            <span>{isListening ? 'Listening...' : 'Speak Changes'}</span>
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#7C2D12', marginBottom: 12 }}>
          Say what you want to change: <em>“Material bamboo இல்லை cane”</em> or <em>“Description short பண்ணு”</em>
        </p>

        {voiceEditFeedback && (
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #86EFAC',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: '0.85rem',
            color: '#15803D',
            fontWeight: 700,
            marginBottom: 12
          }}>
            ✓ AI Action: {voiceEditFeedback}
          </div>
        )}

        {/* Quick Voice Demo Simulation chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sampleVoiceEdits.map((v, i) => (
            <button
              key={i}
              onClick={() => simulateVoicePrompt(v.text)}
              style={{
                background: '#FFFFFF',
                border: '1px solid #FED7AA',
                borderRadius: 999,
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#9A3412',
                cursor: 'pointer'
              }}
            >
              🗣️ “{v.text}”
            </button>
          ))}
        </div>
      </div>

      {/* Main Extracted Fields Grid */}
      <div className="card-glass" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
            Structured Metadata & AI Confidence
          </h3>
          <span className="badge-confidence">
            ★ Overall AI Confidence: {catalog.confidence.overall}%
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {/* Title */}
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                {t.catalogAi.productName}
              </label>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                {catalog.confidence.title}% match
              </span>
            </div>
            <input
              type="text"
              value={catalog.title}
              onChange={e => setCatalog({ ...catalog, title: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#0F172A'
              }}
            />
          </div>

          {/* Category */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                {t.catalogAi.category}
              </label>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                {catalog.confidence.category}% match
              </span>
            </div>
            <input
              type="text"
              value={catalog.category}
              onChange={e => setCatalog({ ...catalog, category: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                color: '#0F172A'
              }}
            />
          </div>

          {/* Sub-Category */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 4 }}>
              {t.catalogAi.subCategory}
            </label>
            <input
              type="text"
              value={catalog.subCategory}
              onChange={e => setCatalog({ ...catalog, subCategory: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                color: '#0F172A'
              }}
            />
          </div>

          {/* Material */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                {t.catalogAi.material}
              </label>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                {catalog.confidence.material}% match
              </span>
            </div>
            <input
              type="text"
              value={catalog.material}
              onChange={e => setCatalog({ ...catalog, material: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                color: '#0F172A'
              }}
            />
          </div>

          {/* Craft Technique */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                {t.catalogAi.craftType}
              </label>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                {catalog.confidence.craftType}% match
              </span>
            </div>
            <input
              type="text"
              value={catalog.craftType}
              onChange={e => setCatalog({ ...catalog, craftType: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                color: '#0F172A'
              }}
            />
          </div>
        </div>

        {/* AI Smart Pricing Assistant (Section 35) */}
        <div style={{
          marginTop: 24,
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 16,
          padding: '18px 22px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
              <DollarSign size={16} color="#16A34A" />
              {t.catalogAi.pricingAssistant}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 2 }}>
              {t.catalogAi.suggestedPrice}: <strong>₹{catalog.suggestedPriceMin} - ₹{catalog.suggestedPriceMax}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
              {t.catalogAi.yourPrice}:
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: 9, fontWeight: 700, color: '#64748B' }}>₹</span>
              <input
                type="number"
                value={catalog.price}
                onChange={e => setCatalog({ ...catalog, price: parseInt(e.target.value, 10) || 0 })}
                style={{
                  width: 130,
                  padding: '8px 12px 8px 26px',
                  borderRadius: 10,
                  border: '2px solid #EA580C',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  color: '#0F172A'
                }}
              />
            </div>
          </div>
        </div>

        {/* Stock Availability Selector */}
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 8 }}>
            {t.catalogAi.availability}
          </label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => setCatalog({ ...catalog, availability: 'inStock' })}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: catalog.availability === 'inStock' ? '2px solid #10B981' : '1px solid #CBD5E1',
                background: catalog.availability === 'inStock' ? '#DCFCE7' : '#FFFFFF',
                color: catalog.availability === 'inStock' ? '#15803D' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ✓ {t.catalogAi.inStock}
            </button>

            <button
              onClick={() => setCatalog({ ...catalog, availability: 'madeToOrder' })}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: catalog.availability === 'madeToOrder' ? '2px solid #F59E0B' : '1px solid #CBD5E1',
                background: catalog.availability === 'madeToOrder' ? '#FEF3C7' : '#FFFFFF',
                color: catalog.availability === 'madeToOrder' ? '#B45309' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🛠️ {t.catalogAi.madeToOrder}
            </button>
          </div>
        </div>

        {/* Keywords & Tags */}
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: 8 }}>
            {t.catalogAi.keywords}
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {catalog.keywords.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: '#EEF2FF',
                  color: '#4338CA',
                  borderRadius: 999,
                  padding: '4px 12px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  border: '1px solid #C7D2FE'
                }}
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Multilingual Catalogue Previews (Section 21) */}
      <div className="card-glass" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Globe size={18} color="#EA580C" />
            {t.catalogAi.multilingualPreview}
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Original preserved + auto-translated for national buyers
          </span>
        </div>

        {/* Language Tabs */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 14 }}>
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => setActiveLangTab(l.code)}
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                border: activeLangTab === l.code ? '2px solid #EA580C' : '1px solid #CBD5E1',
                background: activeLangTab === l.code ? '#FFEDD5' : '#FFFFFF',
                color: activeLangTab === l.code ? '#C2410C' : '#475569',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {l.flag} {l.name}
            </button>
          ))}
        </div>

        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '18px 22px'
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
            {t.catalogAi.storyDescription} ({languages.find(l => l.code === activeLangTab)?.name}):
          </div>
          <div style={{ fontSize: '1rem', color: '#1E293B', lineHeight: 1.6 }}>
            {catalog.descriptions[activeLangTab] || catalog.descriptions.en}
          </div>
        </div>
      </div>
    </div>
  );
};
