import React, { useState, useEffect, useRef } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import { analyzeImageQuality, processStudioBackground, detectCraftFromImage } from '../../services/imageAiService';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Sun,
  Layers,
  Wand2,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Volume2
} from 'lucide-react';

export const ImageAiStudio = () => {
  const { workingDraft, setWorkingDraft, setCurrentPage, addAiLog } = useAppData();
  const { currentLang, t } = useLanguage();
  const { speak } = useVoice();

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [qualityReport, setQualityReport] = useState(null);
  const [detectedCraft, setDetectedCraft] = useState(null);
  const [activeBgOption, setActiveBgOption] = useState('studioWhite'); // 'transparent' | 'studioWhite' | 'warmParchment' | 'modernGradient'
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage for before/after comparison

  const sourceImgRef = useRef(null);

  const rawImage = workingDraft.images?.front || 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80';

  useEffect(() => {
    // Run AI Model 2 Pipeline
    setIsAnalyzing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = rawImage;
    sourceImgRef.current = img;

    img.onload = async () => {
      const report = await analyzeImageQuality(img);
      const craft = detectCraftFromImage(rawImage);
      const studioImg = await processStudioBackground(img, activeBgOption);

      setQualityReport(report);
      setDetectedCraft(craft);
      setEnhancedImage(studioImg);
      setIsAnalyzing(false);

      addAiLog({
        model: 'AI Model 2 (Image Intelligence)',
        action: 'Image Quality & Studio Enhancement',
        input: `Source Image (${report.resolution})`,
        output: `Sharpness: ${report.blurScore}%, Object: ${craft.detectedObject}`,
        confidence: `${craft.confidence}%`
      });

      const audioMsg = report.isBlurry
        ? t.imageAi.qualityWarning
        : t.imageAi.qualityPassed;
      speak(audioMsg);
    };
  }, [rawImage]);

  const handleBgChange = async (mode) => {
    setActiveBgOption(mode);
    if (sourceImgRef.current) {
      const newStudio = await processStudioBackground(sourceImgRef.current, mode);
      setEnhancedImage(newStudio);
    }
  };

  const handleProceedToCatalogue = () => {
    setWorkingDraft({
      ...workingDraft,
      images: {
        ...workingDraft.images,
        processedStudio: enhancedImage || rawImage
      },
      imageAnalysis: qualityReport,
      detectedCraft
    });
    setCurrentPage('catalogAi');
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
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
            <Sparkles size={13} /> Section 12-15: AI Model 2 Image Intelligence
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
            {t.imageAi.title}
          </h2>
        </div>

        <button
          onClick={handleProceedToCatalogue}
          className="btn-primary"
          style={{ padding: '12px 24px' }}
        >
          <span>{t.imageAi.nextToCatalog}</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Quality Check Metrics Bar (Section 12) */}
      <div className="card-glass" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: qualityReport?.isBlurry ? '#FEE2E2' : '#DCFCE7',
              color: qualityReport?.isBlurry ? '#DC2626' : '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {qualityReport?.isBlurry ? <AlertTriangle size={22} /> : <CheckCircle2 size={22} />}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>
                {t.imageAi.blurCheck}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                {qualityReport ? `${qualityReport.blurScore}% Sharp` : 'Scanning...'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sun size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>
                {t.imageAi.lightingCheck}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                {qualityReport ? `Optimal (${qualityReport.avgLuminance} lx)` : 'Evaluating...'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#EEF2FF',
              color: '#4F46E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Wand2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>
                {t.imageAi.objectDetected}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {detectedCraft?.detectedObject || 'Traditional Craft'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Before/After Split Comparison Slider */}
      <div className="card-glass" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sliders size={18} color="#EA580C" />
            <span>Interactive Split Preview: Original vs AI Studio Enhanced</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Drag slider horizontally ↔
          </div>
        </div>

        <div className="compare-container">
          {/* Enhanced Image (Full Width background) */}
          <img
            src={enhancedImage || rawImage}
            alt="AI Enhanced"
            className="compare-img"
          />

          {/* Original Image (Clipped by slider width) */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${sliderPos}%`,
            height: '100%',
            overflow: 'hidden',
            borderRight: '3px solid #FFFFFF',
            boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
          }}>
            <img
              src={rawImage}
              alt="Original"
              style={{
                width: 832,
                maxWidth: 'none',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <span style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              background: 'rgba(15, 23, 42, 0.8)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 6
            }}>
              Original Photo
            </span>
          </div>

          <span style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: 'linear-gradient(135deg, #EA580C, #C2410C)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 6
          }}>
            ✨ AI Studio Enhanced
          </span>

          {/* Slider input control */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={e => setSliderPos(e.target.value)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'ew-resize',
              zIndex: 20
            }}
          />
        </div>
      </div>

      {/* Studio Background Removal Options (Section 14) */}
      <div className="card-glass" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Layers size={18} color="#EA580C" />
          {t.imageAi.bgRemoval}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <button
            onClick={() => handleBgChange('studioWhite')}
            style={{
              padding: '14px',
              borderRadius: 14,
              border: activeBgOption === 'studioWhite' ? '2px solid #EA580C' : '1px solid #E2E8F0',
              background: activeBgOption === 'studioWhite' ? '#FFF7ED' : '#FFFFFF',
              fontWeight: 700,
              color: activeBgOption === 'studioWhite' ? '#C2410C' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left'
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FFFFFF', border: '1px solid #CBD5E1' }} />
            <div>
              <div style={{ fontSize: '0.85rem' }}>{t.imageAi.bgOptions.studioWhite}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Amazon/Etsy Ready</div>
            </div>
          </button>

          <button
            onClick={() => handleBgChange('warmParchment')}
            style={{
              padding: '14px',
              borderRadius: 14,
              border: activeBgOption === 'warmParchment' ? '2px solid #EA580C' : '1px solid #E2E8F0',
              background: activeBgOption === 'warmParchment' ? '#FFF7ED' : '#FFFFFF',
              fontWeight: 700,
              color: activeBgOption === 'warmParchment' ? '#C2410C' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left'
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#F5E8D0', border: '1px solid #E2C99F' }} />
            <div>
              <div style={{ fontSize: '0.85rem' }}>{t.imageAi.bgOptions.warmParchment}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Heritage Terracotta</div>
            </div>
          </button>

          <button
            onClick={() => handleBgChange('modernGradient')}
            style={{
              padding: '14px',
              borderRadius: 14,
              border: activeBgOption === 'modernGradient' ? '2px solid #EA580C' : '1px solid #E2E8F0',
              background: activeBgOption === 'modernGradient' ? '#FFF7ED' : '#FFFFFF',
              fontWeight: 700,
              color: activeBgOption === 'modernGradient' ? '#C2410C' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left'
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#0F172A' }} />
            <div>
              <div style={{ fontSize: '0.85rem' }}>{t.imageAi.bgOptions.modernGradient}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Luxury Showcase</div>
            </div>
          </button>

          <button
            onClick={() => handleBgChange('transparent')}
            style={{
              padding: '14px',
              borderRadius: 14,
              border: activeBgOption === 'transparent' ? '2px solid #EA580C' : '1px solid #E2E8F0',
              background: activeBgOption === 'transparent' ? '#FFF7ED' : '#FFFFFF',
              fontWeight: 700,
              color: activeBgOption === 'transparent' ? '#C2410C' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left'
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)' }} />
            <div>
              <div style={{ fontSize: '0.85rem' }}>{t.imageAi.bgOptions.transparent}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>PNG Cutout</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
