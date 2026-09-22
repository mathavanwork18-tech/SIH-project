import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import confetti from 'canvas-confetti';
import {
  FileText,
  Sparkles,
  Building2,
  Package,
  Calendar,
  DollarSign,
  CheckCircle2,
  Send,
  ArrowRight
} from 'lucide-react';

export const BuyerRequirementPost = () => {
  const { addBuyerRequirement, setCurrentPage } = useAppData();
  const { t } = useLanguage();
  const { speak } = useVoice();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Home & Lifestyle');
  const [material, setMaterial] = useState('Bamboo & Cane');
  const [targetQuantity, setTargetQuantity] = useState(500);
  const [budgetPerUnit, setBudgetPerUnit] = useState('₹1,200 - ₹1,500');
  const [deliveryTimeline, setDeliveryTimeline] = useState('Within 30 Days');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReq = {
      reqId: `req-${Date.now()}`,
      title: title || 'Bulk Festive Handcrafted Hampers',
      category,
      material,
      targetQuantity: Number(targetQuantity) || 200,
      budgetPerUnit,
      deliveryTimeline,
      preferredRegions: ['Tamil Nadu', 'Karnataka', 'Assam'],
      description: description || 'Seeking authentic handmade handicraft items with eco-friendly certifications for corporate procurement.'
    };

    addBuyerRequirement(newReq);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    speak('Your bulk procurement requirement has been broadcasted to matched artisans.');
    setTimeout(() => {
      setCurrentPage('buyerExplore');
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div className="card-glass" style={{
        padding: '28px 32px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 800, marginBottom: 8 }}>
          <Sparkles size={13} /> Section 35: Reverse Matching Engine
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: 6 }}>
          Post Procurement Requirement
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
          Describe what crafts, volumes, and timelines you need. Our AI will automatically notify and match qualified rural master artisans.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="card-glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
            Requirement Title
          </label>
          <input
            type="text"
            placeholder="e.g. 500 Handwoven Bamboo Storage Hampers for Corporate Gifting"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1.5px solid #CBD5E1',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
              Craft Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                background: 'white'
              }}
            >
              <option value="Home & Lifestyle">Home & Lifestyle</option>
              <option value="Garden & Outdoor">Garden & Outdoor</option>
              <option value="Art & Collectibles">Art & Collectibles</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
              Primary Material
            </label>
            <input
              type="text"
              placeholder="e.g. Bamboo, Clay, Silk, Rosewood"
              value={material}
              onChange={e => setMaterial(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
              Target Quantity (Units)
            </label>
            <input
              type="number"
              value={targetQuantity}
              onChange={e => setTargetQuantity(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
              Target Budget Range Per Unit
            </label>
            <input
              type="text"
              placeholder="e.g. ₹1,200 - ₹1,500"
              value={budgetPerUnit}
              onChange={e => setBudgetPerUnit(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
            Detailed Scope & Specifications
          </label>
          <textarea
            rows={4}
            placeholder="Specify any custom logo embossing, natural dyes preference, packaging, or certification requirements..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1.5px solid #CBD5E1',
              fontSize: '0.95rem'
            }}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ padding: '14px', marginTop: 10, fontSize: '1rem' }}
        >
          <Send size={18} />
          <span>{isSubmitted ? 'Broadcasted Successfully!' : 'Broadcast to Matched Artisans'}</span>
        </button>
      </form>
    </div>
  );
};
