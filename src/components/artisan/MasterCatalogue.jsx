import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Package,
  Search,
  PlusCircle,
  QrCode,
  Share2,
  Trash2,
  Copy,
  Edit,
  Eye,
  CheckCircle2,
  Sliders,
  Filter,
  X,
  Sparkles
} from 'lucide-react';

export const MasterCatalogue = () => {
  const { products, deleteProduct, updateProduct, setCurrentPage } = useAppData();
  const { currentLang, t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [qrModalProduct, setQrModalProduct] = useState(null);

  const categories = ['all', 'Home & Lifestyle', 'Garden & Outdoor', 'Art & Collectibles', 'Fashion & Apparel'];

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.craftType?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDuplicate = (prod) => {
    const duplicate = {
      ...prod,
      id: `prod-${Date.now()}`,
      name: `${prod.name} (Copy)`,
      views: 0,
      enquiriesCount: 0
    };
    updateProduct(duplicate.id, duplicate);
  };

  const handleToggleStock = (prod) => {
    const nextStatus = prod.availability === 'inStock' ? 'outOfStock' : 'inStock';
    updateProduct(prod.id, { availability: nextStatus });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div className="card-glass" style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)',
        border: '1.5px solid #FED7AA'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
              {t.nav.catalogue}
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.8rem' }}>
              {products.length} Verified Craft Listings
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('create_product')}
            className="btn-primary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', height: 40 }}
          >
            <PlusCircle size={15} />
            <span>Post Craft</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card-glass" style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search title, craft, material..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: 10,
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: selectedCategory === c ? '2px solid #EA580C' : '1px solid #CBD5E1',
                background: selectedCategory === c ? '#FFEDD5' : '#FFFFFF',
                color: selectedCategory === c ? '#C2410C' : '#475569',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {c === 'all' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Grid */}
      <div className="product-grid">
        {filtered.map(prod => (
          <div key={prod.id} className="product-card">
            <div className="product-card-img-wrap">
              <img src={prod.images.front} alt={prod.name} />

              <span style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(15, 23, 42, 0.85)',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 999,
                backdropFilter: 'blur(6px)'
              }}>
                ₹{prod.price}
              </span>

              <span style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: prod.availability === 'inStock' ? '#10B981' : '#F59E0B',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 6
              }}>
                {prod.availability === 'inStock' ? 'In Stock' : 'Made to Order'}
              </span>

              <span style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                color: '#0F172A',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: 6,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                ★ Quality: {prod.qualityScore}%
              </span>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                {prod.craftType}
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', marginBottom: 8, lineHeight: 1.3 }}>
                {prod.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {prod.description[currentLang] || prod.description.en}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: 16 }}>
                <strong>Material:</strong> {prod.material}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #F1F5F9' }}>
                <button
                  onClick={() => setQrModalProduct(prod)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: 5 }}
                  title="Generate QR code exhibition card"
                >
                  <QrCode size={14} /> QR Card
                </button>

                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => handleToggleStock(prod)}
                    style={{
                      background: '#F1F5F9',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: 8,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      color: '#334155'
                    }}
                    title="Toggle In Stock / Out of Stock"
                  >
                    {prod.availability === 'inStock' ? 'Stock: YES' : 'Stock: NO'}
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    style={{
                      background: '#FEE2E2',
                      border: 'none',
                      padding: '6px 8px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      color: '#DC2626'
                    }}
                    title="Delete product"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exhibition QR Code Card Modal */}
      {qrModalProduct && (
        <div className="voice-modal-backdrop" onClick={() => setQrModalProduct(null)}>
          <div className="voice-modal-card" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setQrModalProduct(null)}
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

            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
              border: '2px solid #FDBA74',
              borderRadius: 20,
              padding: '24px 20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                {qrModalProduct.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#EA580C', fontWeight: 700, marginBottom: 16 }}>
                Artisan: {qrModalProduct.artisanName} ({qrModalProduct.location})
              </div>

              {/* QR Code Graphic Box */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: 20,
                width: 200,
                height: 200,
                margin: '0 auto 16px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
              }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://artisanbridge.ai/product/${qrModalProduct.id}`}
                  alt="QR Code"
                  style={{ width: 160, height: 160 }}
                />
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
                ₹{qrModalProduct.price}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Scan to view craft story, verify GI authenticity, and buy directly
              </div>
            </div>

            <button
              onClick={() => alert('Exhibition Card printed to standard craft tag format!')}
              className="btn-primary"
              style={{ width: '100%', marginTop: 18 }}
            >
              Print Exhibition Craft Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
