import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, ShieldAlert, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CameraPermissionScreen = ({ onAllowCamera, onChooseGallery, onBack }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && onChooseGallery) {
          onChooseGallery(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '20px 16px',
      justifyContent: 'space-between'
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#0F172A'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
          Camera Permission
        </h2>
      </div>

      {/* Main Content Card (Section 3) */}
      <div style={{ textAlign: 'center', padding: '0 8px' }}>
        <div style={{
          width: 88,
          height: 88,
          borderRadius: 28,
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          border: '2px solid #FED7AA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          color: '#EA580C',
          boxShadow: '0 8px 24px rgba(234, 88, 12, 0.15)'
        }}>
          <Camera size={42} />
        </div>

        <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: 10 }}>
          Camera Access Required
        </h3>

        <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.5, marginBottom: 24 }}>
          Your camera is used to capture your product image for AI-based product identification and catalogue creation.
        </p>

        <div style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '12px 16px',
          textAlign: 'left',
          fontSize: '0.85rem',
          color: '#475569',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} color="#10B981" />
            <span>High resolution product framing guide</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} color="#10B981" />
            <span>Automatic AI blur & lighting check</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={16} color="#10B981" />
            <span>Accurate object detection & bounding box</span>
          </div>
        </div>
      </div>

      {/* Action Buttons (Section 3) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
        <button
          onClick={onAllowCamera}
          className="btn-primary"
          style={{
            width: '100%',
            height: 52,
            fontSize: '1rem',
            fontWeight: 800,
            borderRadius: 14
          }}
        >
          <Camera size={20} />
          <span>Allow Camera</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary"
          style={{
            width: '100%',
            height: 50,
            fontSize: '0.95rem',
            fontWeight: 700,
            borderRadius: 14
          }}
        >
          <ImageIcon size={18} />
          <span>Choose from Gallery</span>
        </button>

        {/* Hidden real file picker input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
