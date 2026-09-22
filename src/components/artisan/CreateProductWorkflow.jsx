import React, { useState, useEffect } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import { CameraPermissionScreen } from '../camera/CameraPermissionScreen';
import { RealMobileCamera } from '../camera/RealMobileCamera';
import { ObjectDetectionResultScreen } from '../camera/ObjectDetectionResultScreen';
import { ObjectDetectionService } from '../../services/ObjectDetectionService';
import { SmartCatalogueAI } from '../../services/SmartCatalogueAI';
import { MarketMatchingAI } from '../../services/MarketMatchingAI';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Edit3,
  FileCheck,
  Building2,
  ArrowRight,
  RotateCcw,
  Mic,
  DollarSign
} from 'lucide-react';

export const CreateProductWorkflow = () => {
  const { workingDraft, setWorkingDraft, addProduct, setCurrentPage, artisanProfile } = useAppData();
  const { currentLang, t } = useLanguage();
  const { speak, startListening, transcript } = useVoice();

  // Screen Sub-states: 'PERMISSION' | 'CAMERA' | 'ANALYZING' | 'DETECTION_RESULT' | 'CATALOGUE' | 'MARKET_OPPORTUNITIES'
  const [subState, setSubState] = useState('PERMISSION');
  const [category, setCategory] = useState(workingDraft?.product_category || 'Pottery');

  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [catalogueData, setCatalogueData] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [marketOpportunities, setMarketOpportunities] = useState(null);
  const [voiceNotice, setVoiceNotice] = useState('');

  // Voice editing listener during catalogue review
  useEffect(() => {
    if (subState === 'CATALOGUE' && transcript && catalogueData) {
      const text = transcript.toLowerCase();
      if (text.includes('short') || text.includes('சுருக்க')) {
        const modified = SmartCatalogueAI.modifyField(catalogueData, { field: 'description', modifyType: 'shorten' });
        setCatalogueData(modified);
        setVoiceNotice('✓ Description shortened via voice');
        speak('Description has been condensed for quick reading.');
      } else if (text.includes('name') || text.includes('பெயர்')) {
        const modified = SmartCatalogueAI.modifyField(catalogueData, { field: 'product_name', value: 'Traditional Handmade Clay Pot' });
        setCatalogueData(modified);
        setVoiceNotice('✓ Product name updated');
        speak('Updated product title.');
      } else if (text.includes('publish') || text.includes('வெளியிடு') || text.includes('correct') || text.includes('சரி')) {
        setShowPublishModal(true);
      }
    }
  }, [transcript, subState]);

  // Step 1 -> Step 2: Permission granted
  const handleAllowCamera = () => {
    setSubState('CAMERA');
  };

  const handleChooseGallery = (imageSrc) => {
    setCapturedPhotoUrl(imageSrc);
    runObjectDetectionPipeline(imageSrc);
  };

  // Step 2 -> Step 3: Shutter capture & real model inference
  const handleCaptureComplete = (photoUrl) => {
    setCapturedPhotoUrl(photoUrl);
    runObjectDetectionPipeline(photoUrl);
  };

  const runObjectDetectionPipeline = async (imageSrc) => {
    setSubState('ANALYZING');
    speak(currentLang === 'ta' ? 'தயாரிப்பை AI ஆய்வு செய்கிறது...' : 'Analyzing product image with AI...');

    // Run real model detection on canvas
    const result = await ObjectDetectionService.detectObjects(imageSrc, category);
    setDetectionResult(result);
    setSubState('DETECTION_RESULT');

    speak(currentLang === 'ta' ? 'படம் நல்லா இருக்கு. Product detect பண்ணிட்டேன்.' : 'Product detected successfully.');
  };

  // Step 3 -> Step 4: Proceed from detection result to Catalogue AI
  const handleProceedToCatalogue = (selectedObj, finalImage) => {
    const generated = SmartCatalogueAI.generate({
      category: selectedObj?.category || category,
      craftType: selectedObj?.label || 'Handcrafted Pottery',
      material: selectedObj?.label?.includes('Clay') ? 'Terracotta Clay' : 'Natural Organic Material',
      artisanName: artisanProfile.name,
      location: artisanProfile.location,
      language: currentLang
    });

    setCatalogueData(generated);
    setSubState('CATALOGUE');

    speak(currentLang === 'ta'
      ? `AI உங்கள் ${generated.product_name} அட்டவணையை உருவாக்கியுள்ளது.`
      : `Catalogue generated for ${generated.product_name}. Please review.`);
  };

  // Step 5: Publish confirmation & 5 Buyer matches
  const handleConfirmPublish = () => {
    setShowPublishModal(false);

    const newProd = {
      id: `prod-${Date.now()}`,
      name: catalogueData.product_name,
      category: catalogueData.category,
      subcategory: catalogueData.subcategory,
      material: catalogueData.material,
      craftType: catalogueData.craft_type,
      price: catalogueData.price,
      description: catalogueData.translations,
      images: {
        front: capturedPhotoUrl,
        processedStudio: detectionResult?.processed_image || capturedPhotoUrl
      },
      status: 'published',
      qualityScore: detectionResult?.quality_metrics?.quality_score || 94,
      views: 1,
      enquiriesCount: 0
    };

    addProduct(newProd);

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    const opps = MarketMatchingAI.findOpportunities(newProd);
    setMarketOpportunities(opps);
    setSubState('MARKET_OPPORTUNITIES');

    speak(currentLang === 'ta'
      ? `இந்த ${newProd.category} product-க்கு 5 relevant buyer opportunities கிடைத்திருக்கிறது.`
      : `Found 5 qualified corporate buyer opportunities!`);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Camera Permission Pre-check Screen (Section 3) */}
      {subState === 'PERMISSION' && (
        <CameraPermissionScreen
          onAllowCamera={handleAllowCamera}
          onChooseGallery={handleChooseGallery}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}

      {/* 2. Real Live Mobile Camera Screen (Section 4, 5, 6) */}
      {subState === 'CAMERA' && (
        <RealMobileCamera
          initialCategory={category}
          onCaptureComplete={handleCaptureComplete}
          onBack={() => setSubState('PERMISSION')}
        />
      )}

      {/* 3. Real AI Processing Status Screen (Section 19) */}
      {subState === 'ANALYZING' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: '#FFF7ED',
            border: '2px solid #FED7AA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EA580C',
            marginBottom: 20
          }}>
            <Sparkles size={36} className="animate-spin" />
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
            Analyzing your product...
          </h3>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: '16px 20px',
            width: '100%',
            maxWidth: 320,
            textAlign: 'left',
            fontSize: '0.85rem',
            color: '#334155',
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontWeight: 700 }}>
              <CheckCircle2 size={16} /> Image quality checked
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontWeight: 700 }}>
              <CheckCircle2 size={16} /> Product detected
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontWeight: 700 }}>
              <CheckCircle2 size={16} /> Object identified
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#EA580C', fontWeight: 700 }}>
              <Sparkles size={16} /> Creating product catalogue
            </div>
          </div>
        </div>
      )}

      {/* 4. Object Detection Result with Bounding Box Screen (Section 8, 9, 20) */}
      {subState === 'DETECTION_RESULT' && detectionResult && (
        <ObjectDetectionResultScreen
          detectionResult={detectionResult}
          onProceedToCatalogue={handleProceedToCatalogue}
          onRetake={() => setSubState('CAMERA')}
        />
      )}

      {/* 5. Smart Catalogue Preview & Voice Edit (Section 11, 12, 17) */}
      {subState === 'CATALOGUE' && catalogueData && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
              Smart Catalogue
            </h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16A34A' }}>
              Confidence: 98%
            </span>
          </div>

          {voiceNotice && (
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 10, padding: '8px 12px', fontSize: '0.85rem', color: '#15803D', fontWeight: 700 }}>
              {voiceNotice}
            </div>
          )}

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Product Name</label>
              <input
                type="text"
                value={catalogueData.product_name}
                onChange={e => setCatalogueData({ ...catalogueData, product_name: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontWeight: 700, fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Category</label>
                <input
                  type="text"
                  value={catalogueData.category}
                  readOnly
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Material</label>
                <input
                  type="text"
                  value={catalogueData.material}
                  onChange={e => setCatalogueData({ ...catalogueData, material: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Heritage Description</label>
                <button
                  onClick={() => {
                    const modified = SmartCatalogueAI.modifyField(catalogueData, { field: 'description', modifyType: 'shorten' });
                    setCatalogueData(modified);
                    setVoiceNotice('✓ Description shortened via voice');
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#EA580C', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  ⚡ Voice Shorten
                </button>
              </div>
              <textarea
                rows={3}
                value={catalogueData.description}
                onChange={e => setCatalogueData({ ...catalogueData, description: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: '0.85rem', lineHeight: 1.4 }}
              />
            </div>

            <div style={{ background: '#FFF7ED', borderRadius: 12, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9A3412' }}>Fair Market Price</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontWeight: 800 }}>₹</span>
                <input
                  type="number"
                  value={catalogueData.price}
                  onChange={e => setCatalogueData({ ...catalogueData, price: Number(e.target.value) || 0 })}
                  style={{ width: 84, padding: '6px 8px', borderRadius: 8, border: '2px solid #EA580C', fontWeight: 800, fontSize: '0.95rem' }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowPublishModal(true)}
            className="btn-primary"
            style={{ width: '100%', height: 50, borderRadius: 14, marginTop: 8 }}
          >
            <FileCheck size={18} /> Request Publish Approval
          </button>
        </div>
      )}

      {/* 6. Mandatory Publish Confirmation Modal (Section 13, 28) */}
      {showPublishModal && (
        <div className="voice-modal-backdrop" onClick={() => setShowPublishModal(false)}>
          <div className="voice-modal-card" style={{ maxWidth: 340, padding: '24px 20px' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '2.2rem', marginBottom: 6 }}>🏺</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
              {currentLang === 'ta' ? 'இந்த product-ஐ publish செய்யலாமா?' : 'Do you want to publish this product?'}
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: 18 }}>
              {catalogueData?.product_name} (₹{catalogueData?.price})
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={handleConfirmPublish}
                className="btn-primary"
                style={{ width: '100%', height: 48, borderRadius: 12, fontSize: '0.95rem' }}
              >
                ✓ YES, PUBLISH
              </button>
              <button
                onClick={() => setShowPublishModal(false)}
                className="btn-secondary"
                style={{ width: '100%', height: 44, borderRadius: 12, fontSize: '0.9rem' }}
              >
                EDIT
              </button>
              <button
                onClick={() => { setShowPublishModal(false); setSubState('PERMISSION'); }}
                style={{ background: 'transparent', border: 'none', color: '#DC2626', fontWeight: 700, padding: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. 5 Relevant Buyer Opportunities Screen (Section 25) */}
      {subState === 'MARKET_OPPORTUNITIES' && marketOpportunities && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
            border: '1.5px solid #86EFAC',
            borderRadius: 16,
            padding: '14px 16px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#14532D', marginBottom: 2 }}>
              Product Published!
            </h3>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534' }}>
              {marketOpportunities.summary_text}
            </p>
          </div>

          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building2 size={16} color="#4F46E5" />
            <span>5 Matched Corporate Buyers</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {marketOpportunities.buyers.map((b) => (
              <div
                key={b.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 12,
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>
                    {b.buyer_name}
                  </span>
                  <span style={{ background: '#DCFCE7', color: '#15803D', fontWeight: 800, fontSize: '0.7rem', padding: '2px 6px', borderRadius: 999 }}>
                    {b.match_score}% Match
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: 2 }}>
                  📋 {b.demand}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  Budget: <strong>{b.budget}</strong>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage('matches')}
            className="btn-primary"
            style={{ width: '100%', height: 48, borderRadius: 12, marginTop: 4 }}
          >
            <span>View All Market Matches</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
