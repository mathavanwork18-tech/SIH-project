import React, { useState, useRef, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import {
  Camera,
  RotateCcw,
  Sparkles,
  Zap,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  Maximize2,
  RefreshCw,
  ArrowRight,
  Layers,
  Volume2
} from 'lucide-react';

const SAMPLE_DEMO_IMAGES = [
  {
    name: 'Bamboo Storage Basket (Salem)',
    category: 'Bamboo & Cane',
    url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Manamadurai Terracotta Planter',
    category: 'Clay & Pottery',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Rosewood Carved Elephant',
    category: 'Wood Carving',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Kanchipuram Handloom Silk Stole',
    category: 'Handloom & Silk',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80'
  }
];

export const CameraCapture = () => {
  const { workingDraft, setWorkingDraft, setCurrentPage } = useAppData();
  const { currentLang, t } = useLanguage();
  const { speak } = useVoice();

  const [activeAngleStep, setActiveAngleStep] = useState('front'); // 'front' | 'angle' | 'detail'
  const [capturedImages, setCapturedImages] = useState({
    front: workingDraft.images?.front || SAMPLE_DEMO_IMAGES[0].url,
    angle: workingDraft.images?.angle || null,
    detail: workingDraft.images?.detail || null
  });
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [flashEffect, setFlashEffect] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Audio prompt when camera opens (Section 11)
  useEffect(() => {
    const audioPrompts = {
      ta: 'உங்கள் தயாரிப்பின் புகைப்படத்தை எடுக்கவும். பொருளை திரையின் நடுவே வைத்து எடுக்கவும்.',
      en: 'Please capture a photo of your craft. Keep the entire product centered within the framing guide.',
      hi: 'उत्पाद को कैमरे के फ्रेम के बीच में रखकर स्पष्ट फोटो लें।'
    };
    speak(audioPrompts[currentLang] || audioPrompts.en);
  }, []);

  const startWebcam = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn('Camera permission or availability:', err);
      setCameraError('Live camera not available in this environment. You can use gallery upload or demo sample crafts below.');
      setIsCameraActive(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCaptureSnapshot = () => {
    if (videoRef.current && isCameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 800;
      canvas.height = videoRef.current.videoHeight || 600;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      setFlashEffect(true);
      setTimeout(() => setFlashEffect(false), 200);

      const updated = { ...capturedImages, [activeAngleStep]: dataUrl };
      setCapturedImages(updated);
      setWorkingDraft({ ...workingDraft, images: updated });
    }
  };

  const handleSelectSample = (sampleUrl) => {
    const updated = { ...capturedImages, [activeAngleStep]: sampleUrl };
    setCapturedImages(updated);
    setWorkingDraft({ ...workingDraft, images: updated });
  };

  const handleProceedToImageAi = () => {
    setWorkingDraft({
      ...workingDraft,
      images: capturedImages
    });
    setCurrentPage('imageAi');
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
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
            <Sparkles size={13} /> Section 10 & 11: Product Photography Studio
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
            {t.camera.title}
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            {t.camera.guidance}
          </p>
        </div>

        {/* Proceed button */}
        <button
          onClick={handleProceedToImageAi}
          className="btn-primary"
          style={{ padding: '12px 24px' }}
        >
          <span>AI Image Studio</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Angle Selection Tabs (Front / Perspective Angle / Intricate Detail) */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveAngleStep('front')}
          style={{
            flex: 1,
            minWidth: 160,
            padding: '12px 16px',
            borderRadius: 14,
            border: activeAngleStep === 'front' ? '2px solid #EA580C' : '1px solid #E2E8F0',
            background: activeAngleStep === 'front' ? '#FFF7ED' : '#FFFFFF',
            fontWeight: 700,
            color: activeAngleStep === 'front' ? '#C2410C' : '#475569',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: activeAngleStep === 'front' ? '0 4px 12px rgba(234, 88, 12, 0.15)' : 'none'
          }}
        >
          <Camera size={18} />
          <span>{t.camera.stepFront}</span>
          {capturedImages.front && <CheckCircle2 size={16} color="#10B981" />}
        </button>

        <button
          onClick={() => setActiveAngleStep('angle')}
          style={{
            flex: 1,
            minWidth: 160,
            padding: '12px 16px',
            borderRadius: 14,
            border: activeAngleStep === 'angle' ? '2px solid #EA580C' : '1px solid #E2E8F0',
            background: activeAngleStep === 'angle' ? '#FFF7ED' : '#FFFFFF',
            fontWeight: 700,
            color: activeAngleStep === 'angle' ? '#C2410C' : '#475569',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <Layers size={18} />
          <span>{t.camera.stepAngle}</span>
          {capturedImages.angle && <CheckCircle2 size={16} color="#10B981" />}
        </button>

        <button
          onClick={() => setActiveAngleStep('detail')}
          style={{
            flex: 1,
            minWidth: 160,
            padding: '12px 16px',
            borderRadius: 14,
            border: activeAngleStep === 'detail' ? '2px solid #EA580C' : '1px solid #E2E8F0',
            background: activeAngleStep === 'detail' ? '#FFF7ED' : '#FFFFFF',
            fontWeight: 700,
            color: activeAngleStep === 'detail' ? '#C2410C' : '#475569',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <Sparkles size={18} />
          <span>{t.camera.stepDetail}</span>
          {capturedImages.detail && <CheckCircle2 size={16} color="#10B981" />}
        </button>
      </div>

      {/* Main Viewfinder Box with Framing Overlay */}
      <div className="card-glass" style={{
        position: 'relative',
        height: 440,
        borderRadius: 24,
        overflow: 'hidden',
        background: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {flashEffect && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'white',
            zIndex: 30,
            animation: 'fade-out 0.2s'
          }} />
        )}

        {isCameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img
            src={capturedImages[activeAngleStep] || capturedImages.front}
            alt="Current Product View"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}

        {/* Product Framing Boundary Guide (Section 11) */}
        <div style={{
          position: 'absolute',
          width: '74%',
          height: '74%',
          border: '2px dashed rgba(255, 255, 255, 0.85)',
          borderRadius: 20,
          pointerEvents: 'none',
          boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 16
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 18, height: 18, borderTop: '4px solid #EA580C', borderLeft: '4px solid #EA580C' }} />
            <div style={{ width: 18, height: 18, borderTop: '4px solid #EA580C', borderRight: '4px solid #EA580C' }} />
          </div>
          <div style={{
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.75)',
            color: 'white',
            fontSize: '0.8rem',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 999,
            margin: '0 auto',
            backdropFilter: 'blur(6px)'
          }}>
            🎯 Align Product Inside Center Box
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 18, height: 18, borderBottom: '4px solid #EA580C', borderLeft: '4px solid #EA580C' }} />
            <div style={{ width: 18, height: 18, borderBottom: '4px solid #EA580C', borderRight: '4px solid #EA580C' }} />
          </div>
        </div>

        {/* Camera Control Overlay Bar */}
        <div style={{
          position: 'absolute',
          bottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          zIndex: 20
        }}>
          {!isCameraActive ? (
            <button
              onClick={startWebcam}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#0F172A',
                border: 'none',
                borderRadius: 999,
                padding: '12px 24px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}
            >
              <Camera size={20} color="#EA580C" /> Open Live Camera
            </button>
          ) : (
            <>
              <button
                onClick={stopWebcam}
                style={{
                  background: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={20} />
              </button>
              <button
                onClick={handleCaptureSnapshot}
                style={{
                  background: '#EA580C',
                  color: 'white',
                  border: '4px solid white',
                  borderRadius: '50%',
                  width: 72,
                  height: 72,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 25px rgba(234, 88, 12, 0.7)'
                }}
                title="Capture Photo"
              >
                <Camera size={30} />
              </button>
            </>
          )}
        </div>
      </div>

      {cameraError && (
        <div style={{
          background: '#FFFBEB',
          border: '1px solid #FCD34D',
          borderRadius: 14,
          padding: '12px 18px',
          color: '#92400E',
          fontSize: '0.85rem'
        }}>
          ℹ️ {cameraError}
        </div>
      )}

      {/* Sample Craft Gallery Selection (For Demo Testing) */}
      <div className="card-glass" style={{ padding: '24px' }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ImageIcon size={18} color="#EA580C" />
          {t.camera.sampleImages}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
          {SAMPLE_DEMO_IMAGES.map((sample, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectSample(sample.url)}
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: capturedImages[activeAngleStep] === sample.url ? '2.5px solid #EA580C' : '1px solid #E2E8F0',
                cursor: 'pointer',
                background: '#FFFFFF',
                boxShadow: capturedImages[activeAngleStep] === sample.url ? '0 4px 14px rgba(234, 88, 12, 0.25)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <img src={sample.url} alt={sample.name} style={{ width: '100%', height: 110, objectFit: 'cover' }} />
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sample.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  {sample.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
