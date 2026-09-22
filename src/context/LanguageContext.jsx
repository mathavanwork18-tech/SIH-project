import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speakText } from '../services/voiceService';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('artisan_lang') || 'ta';
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('artisan_lang', currentLang);
  }, [currentLang]);

  const changeLanguage = (langCode, announce = true) => {
    setCurrentLang(langCode);
    setIsLanguageModalOpen(false);

    if (announce) {
      const selected = LANGUAGES.find(l => l.code === langCode);
      const greeting = selected ? selected.greeting : 'Hello';
      speakText(`${greeting}! ArtisanBridge AI.`, langCode);
    }
  };

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        setCurrentLang,
        changeLanguage,
        t,
        languages: LANGUAGES,
        isLanguageModalOpen,
        setIsLanguageModalOpen
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
