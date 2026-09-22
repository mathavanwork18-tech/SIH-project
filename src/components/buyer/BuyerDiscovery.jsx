import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import { CRAFT_CATEGORIES } from '../../data/sampleProducts';
import {
  Search,
  Filter,
  ShieldCheck,
  Sparkles,
  MapPin,
  Tag,
  MessageSquare,
  Eye,
  Heart,
  Sliders,
  CheckCircle2,
  X,
  Send
} from 'lucide-react';

export const BuyerDiscovery = () => {
  const { products, createNewEnquiry, setCurrentPage } = useAppData();
  const { currentLang, t } = useLanguage();
  const { speak } = useVoice();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCraft, setSelectedCraft] = useState('all');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState(null);
  const [enquiryNote, setEnquiryNote] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.material?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCraft === 'all' || p.category?.toLowerCase().includes(selectedCraft.toLowerCase()) || p.craftType?.toLowerCase().includes(selectedCraft.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleSendEnquirySubmit = () => {
    if (enquiryModalProduct) {
      createNewEnquiry(
        enquiryModalProduct,
        { name: 'FabIndia Corporate Desk', id: 'buyer-001' },
        enquiryNote || 'Vanakkam! We are interested in procuring this handicraft in bulk. Please share your availability.'
      );
      setEnquiryModalProduct(null);
      setEnquiryNote('');
      speak('Your inquiry has been submitted directly to the artisan. Opening chat thread.');
      setCurrentPage('enquiries');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Buyer Hero Exploration Banner */}
      <div className="card-glass" style={{
        padding: '20px 16px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'white',
        borderRadius: 18
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 800, marginBottom: 8 }}>
          ✨ Verified Artisan Marketplace
        </div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'white', marginBottom: 4 }}>
          Discover Authentic Indian Crafts
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: 16 }}>
          Source directly from verified master artisans with AI-audited material integrity.
        </p>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          background: 'white',
          borderRadius: 14,
          padding: 4,
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 10, color: '#64748B' }}>
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder={t.buyer.searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              padding: '10px 12px',
              fontSize: '0.85rem',
              outline: 'none',
              color: '#0F172A'
            }}
          />
        </div>
      </div>

      {/* Craft Categories Pills */}
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
        {CRAFT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCraft(cat.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 999,
              border: selectedCraft === cat.id ? '2px solid #EA580C' : '1px solid #CBD5E1',
              background: selectedCraft === cat.id ? '#FFEDD5' : '#FFFFFF',
              color: selectedCraft === cat.id ? '#C2410C' : '#475569',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              boxShadow: selectedCraft === cat.id ? '0 4px 12px rgba(234, 88, 12, 0.15)' : 'none'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.map(prod => (
          <div key={prod.id} className="product-card" onClick={() => setSelectedProductModal(prod)}>
            <div className="product-card-img-wrap">
              <img src={prod.images.front} alt={prod.name} />

              <span style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(15, 23, 42, 0.85)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 999,
                backdropFilter: 'blur(6px)'
              }}>
                ₹{prod.price}
              </span>

              <span style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                background: '#10B981',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 6
              }}>
                <ShieldCheck size={11} style={{ display: 'inline', marginRight: 3 }} />
                Verified Artisan
              </span>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <MapPin size={12} color="#EA580C" /> {prod.location}
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: 8, lineHeight: 1.3 }}>
                {prod.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {prod.description[currentLang] || prod.description.en}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700 }}>
                  By {prod.artisanName}
                </span>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    setEnquiryModalProduct(prod);
                  }}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  <MessageSquare size={13} /> {t.buyer.sendEnquiry}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProductModal && (
        <div className="voice-modal-backdrop" onClick={() => setSelectedProductModal(null)}>
          <div className="voice-modal-card" style={{ maxWidth: 680, textAlign: 'left', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProductModal(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <img
              src={selectedProductModal.images.front}
              alt={selectedProductModal.name}
              style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 16, marginBottom: 18 }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <span className="badge-verified" style={{ marginBottom: 6 }}>
                  📍 {selectedProductModal.location}
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>
                  {selectedProductModal.name}
                </h2>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#EA580C' }}>
                ₹{selectedProductModal.price}
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
              {selectedProductModal.description[currentLang] || selectedProductModal.description.en}
            </p>

            <div style={{ background: '#F8FAFC', borderRadius: 14, padding: '14px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: '0.85rem', marginBottom: 20 }}>
              <div><strong>Artisan:</strong> {selectedProductModal.artisanName}</div>
              <div><strong>Craft:</strong> {selectedProductModal.craftType}</div>
              <div><strong>Material:</strong> {selectedProductModal.material}</div>
              <div><strong>Dimensions:</strong> {selectedProductModal.dimensions || 'Standard'}</div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => {
                  const prod = selectedProductModal;
                  setSelectedProductModal(null);
                  setEnquiryModalProduct(prod);
                }}
                className="btn-primary"
                style={{ flex: 1, padding: '12px' }}
              >
                <MessageSquare size={16} /> Contact Artisan for Bulk Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Enquiry Modal */}
      {enquiryModalProduct && (
        <div className="voice-modal-backdrop" onClick={() => setEnquiryModalProduct(null)}>
          <div className="voice-modal-card" style={{ maxWidth: 520, textAlign: 'left' }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setEnquiryModalProduct(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              Send Direct Enquiry to {enquiryModalProduct.artisanName}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 14 }}>
              Product: <strong>{enquiryModalProduct.name}</strong> (₹{enquiryModalProduct.price})
            </p>

            <textarea
              rows={4}
              placeholder="Specify your required quantity, delivery timeline, or custom requirements..."
              value={enquiryNote}
              onChange={e => setEnquiryNote(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                marginBottom: 16
              }}
            />

            <button
              onClick={handleSendEnquirySubmit}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              <Send size={16} /> Submit Direct Enquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
