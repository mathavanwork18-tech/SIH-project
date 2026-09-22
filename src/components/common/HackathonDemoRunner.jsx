import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useVoice } from '../../context/VoiceContext';
import { MainAIOrchestrator } from '../../services/MainAIOrchestrator';
import { ActionExecutor } from '../../services/ActionExecutor';
import { Play, RotateCcw, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const HackathonDemoRunner = ({ onExecuteAction }) => {
  const { setCurrentPage, setWorkingDraft, setIsMissingPosterOpen } = useAppData();
  const { currentLang, changeLanguage } = useLanguage();
  const { speak, simulateVoicePrompt } = useVoice();

  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  const [isRunningAuto, setIsRunningAuto] = useState(false);

  const demoSteps = [
    {
      title: 'Step 1: Open App & Tamil Welcome',
      actionText: 'AI announces Tamil greeting',
      run: () => {
        changeLanguage('ta', false);
        setCurrentPage('dashboard');
        speak('வணக்கம்! என்ன செய்ய வேண்டும்?');
        setCurrentDemoStep(1);
      }
    },
    {
      title: 'Step 2 & 3: User says "Enakku pottery product post pannanum"',
      actionText: 'AI understands CREATE_PRODUCT + Category Pottery ➔ Navigates',
      run: () => {
        simulateVoicePrompt('Enakku pottery product post pannanum, enna post poda kuputu poo.');
        setWorkingDraft({
          product_category: 'Pottery',
          craft_type: 'Clay Pottery & Kiln Firing',
          material: 'Terracotta Clay'
        });
        setTimeout(() => {
          setCurrentPage('create_product');
          setCurrentDemoStep(2);
        }, 1400);
      }
    },
    {
      title: 'Step 4: Image AI Quality Check',
      actionText: 'AI validates image: "படம் நல்லா இருக்கு. Product detect பண்ணிட்டேன்."',
      run: () => {
        setCurrentPage('create_product');
        setCurrentDemoStep(3);
      }
    },
    {
      title: 'Step 5 & 6: Voice Edit: "Description konjam short ah pannu"',
      actionText: 'AI modifies ONLY description without touching other fields',
      run: () => {
        simulateVoicePrompt('Description konjam short ah pannu.');
        setCurrentDemoStep(4);
      }
    },
    {
      title: 'Step 7: User says "Correct" & Confirms Publish',
      actionText: 'AI asks confirmation ➔ Publishes to Master Catalogue',
      run: () => {
        simulateVoicePrompt('Correct, publish pannidu.');
        setCurrentDemoStep(5);
      }
    },
    {
      title: 'Step 8: Market Matching AI finds 5 Opportunities',
      actionText: 'AI announces 5 buyer matches ➔ Opens Market Linkage',
      run: () => {
        speak('இந்த pottery productக்கு 5 relevant buyer opportunities கிடைத்திருக்கிறது.');
        setCurrentPage('matches');
        setCurrentDemoStep(6);
      }
    }
  ];

  const handleRunFullAuto = async () => {
    setIsRunningAuto(true);
    for (let i = 0; i < demoSteps.length; i++) {
      demoSteps[i].run();
      await new Promise(r => setTimeout(r, 3200));
    }
    setIsRunningAuto(false);
  };

  const handleReset = () => {
    setCurrentDemoStep(0);
    setCurrentPage('dashboard');
    setIsRunningAuto(false);
  };

  return (
    <div style={{
      background: '#0F172A',
      color: 'white',
      padding: '10px 16px',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          background: 'linear-gradient(135deg, #EA580C, #F97316)',
          color: 'white',
          padding: '2px 8px',
          borderRadius: 999,
          fontWeight: 800,
          fontSize: '0.7rem'
        }}>
          SIH DEMO SCENARIO
        </span>
        <span style={{ fontWeight: 700, color: '#E2E8F0' }}>
          Section 25 Action-Based Flow:
        </span>
        <span style={{ color: '#FDBA74' }}>
          {demoSteps[Math.min(currentDemoStep, demoSteps.length - 1)].title}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Next Step Button */}
        <button
          onClick={() => {
            if (currentDemoStep < demoSteps.length) {
              demoSteps[currentDemoStep].run();
            } else {
              handleReset();
            }
          }}
          style={{
            background: '#EA580C',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '4px 12px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Zap size={12} />
          <span>{currentDemoStep < demoSteps.length ? `Next: Step ${currentDemoStep + 1}` : 'Restart Demo'}</span>
        </button>

        {/* 1-Click Auto Run */}
        <button
          onClick={handleRunFullAuto}
          disabled={isRunningAuto}
          style={{
            background: isRunningAuto ? '#10B981' : '#334155',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '4px 12px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <Play size={12} />
          <span>{isRunningAuto ? 'Running 8 Steps...' : '1-Click Auto Run (Section 25)'}</span>
        </button>

        {/* Missing Karthi Poster Button */}
        <button
          onClick={() => setIsMissingPosterOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
          title="Open Missing Karthi Poster"
        >
          <span>🚨</span>
          <span>Missing: Karthi</span>
        </button>

        <button
          onClick={handleReset}
          style={{
            background: 'transparent',
            border: '1px solid #475569',
            color: '#94A3B8',
            borderRadius: 8,
            padding: '4px 8px',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
          title="Reset"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
};
