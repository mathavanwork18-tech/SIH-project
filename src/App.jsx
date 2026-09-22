import React from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { VoiceProvider, useVoice } from './context/VoiceContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { ActionExecutor } from './services/ActionExecutor';

import { MobileDeviceContainer } from './components/mobile/MobileDeviceContainer';
import { Navbar } from './components/common/Navbar';
import { MobileVoiceSheet } from './components/mobile/MobileVoiceSheet';
import { MobileBottomNav } from './components/mobile/MobileBottomNav';
import { LanguageModal } from './components/common/LanguageModal';
import { HackathonDemoRunner } from './components/common/HackathonDemoRunner';

import { ArtisanDashboard } from './components/artisan/ArtisanDashboard';
import { VoiceRegistration } from './components/artisan/VoiceRegistration';
import { CreateProductWorkflow } from './components/artisan/CreateProductWorkflow';
import { MasterCatalogue } from './components/artisan/MasterCatalogue';
import { MarketMatches } from './components/artisan/MarketMatches';
import { EnquiryChat } from './components/artisan/EnquiryChat';

import { BuyerDiscovery } from './components/buyer/BuyerDiscovery';
import { BuyerRequirementPost } from './components/buyer/BuyerRequirementPost';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent = () => {
  const { currentRole, currentPage, setCurrentPage, workingDraft, setWorkingDraft } = useAppData();
  const { t, currentLang, changeLanguage } = useLanguage();
  const { speak } = useVoice();

  // Central Action Dispatcher
  const handleExecuteAIAction = (actionPayload) => {
    ActionExecutor.execute(actionPayload, {
      navigate: (screen) => setCurrentPage(screen),
      setWorkflowState: (state) => setWorkingDraft(prev => ({ ...prev, ...state })),
      triggerCamera: () => setCurrentPage('create_product'),
      triggerGallery: () => setCurrentPage('create_product'),
      changeLanguage: (lang) => changeLanguage(lang),
      speak: (msg) => speak(msg)
    });
  };

  return (
    <MobileDeviceContainer>
      {/* Top Mobile App Header */}
      <Navbar />

      {/* Main Mobile Screen View */}
      <div style={{ flex: 1, paddingBottom: 76, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Artisan Screens */}
        {currentRole === 'artisan' && (
          <>
            {currentPage === 'dashboard' && <ArtisanDashboard />}
            {currentPage === 'registration' && <VoiceRegistration />}
            {(currentPage === 'create_product' || currentPage === 'camera' || currentPage === 'imageAi' || currentPage === 'catalogAi') && (
              <CreateProductWorkflow />
            )}
            {currentPage === 'catalogue' && <MasterCatalogue />}
            {currentPage === 'matches' && <MarketMatches />}
            {currentPage === 'enquiries' && <EnquiryChat />}
          </>
        )}

        {/* Buyer Screens */}
        {currentRole === 'buyer' && (
          <>
            {currentPage === 'buyerExplore' && <BuyerDiscovery />}
            {currentPage === 'buyerRequests' && <BuyerRequirementPost />}
            {currentPage === 'enquiries' && <EnquiryChat />}
          </>
        )}

        {/* Admin Screens */}
        {currentRole === 'admin' && (
          <AdminDashboard />
        )}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Mobile Voice Bottom Sheet */}
      <MobileVoiceSheet onExecuteAction={handleExecuteAIAction} />

      {/* Language Selector Modal */}
      <LanguageModal />
    </MobileDeviceContainer>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppDataProvider>
        <AppWithVoice />
      </AppDataProvider>
    </LanguageProvider>
  );
}

const AppWithVoice = () => {
  const { setCurrentPage } = useAppData();
  return (
    <VoiceProvider onNavigate={setCurrentPage}>
      <div style={{ minHeight: '100vh', background: '#090D16', display: 'flex', flexDirection: 'column' }}>
        {/* Top Hackathon Demo Control Bar (Section 25) */}
        <HackathonDemoRunner onExecuteAction={(payload) => ActionExecutor.execute(payload, { navigate: setCurrentPage })} />
        <AppContent />
      </div>
    </VoiceProvider>
  );
};
