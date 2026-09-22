// Language mapping for Web Speech API
export const SPEECH_LANG_MAP = {
  ta: 'ta-IN',
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ml: 'ml-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
  mr: 'mr-IN'
};

// Text-to-Speech synthesizer
export const speakText = (text, langCode = 'ta') => {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    return;
  }
  
  window.speechSynthesis.cancel(); // cancel any pending speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG_MAP[langCode] || 'en-IN';
  utterance.rate = 0.95; // slightly relaxed for clear local accent
  utterance.pitch = 1.0;

  // Try to find a matching voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(langCode) || v.lang.includes(langCode));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
};

// Intent Recognizer for Global Navigation
export const parseVoiceIntent = (transcript, lang = 'en') => {
  const text = transcript.toLowerCase();

  // Navigation: Post Product / Camera Studio
  if (
    text.includes('camera') ||
    text.includes('photo') ||
    text.includes('கேமரா') ||
    text.includes('படம்') ||
    text.includes('புகைப்படம்') ||
    text.includes('post') ||
    text.includes('upload') ||
    text.includes('add product') ||
    text.includes('போடணும்') ||
    text.includes('பதிவேற்றம்') ||
    text.includes('தயாரிப்பு') ||
    text.includes('சேர்') ||
    text.includes('नया प्रोडक्ट') ||
    text.includes('कैमरा') ||
    text.includes('फोटो') ||
    text.includes('जोड़ें') ||
    text.includes('ఉత్పత్తి')
  ) {
    return {
      intent: 'NAV_POST_PRODUCT',
      page: 'camera',
      reply: {
        ta: 'சரி! பொருள் பதிவேற்ற பக்கத்திற்கு செல்கிறேன். உங்கள் கைவினைப் பொருளின் புகைப்படத்தை எடுப்போம்.',
        en: 'Sure! Opening the Product Studio. Let’s capture a photo of your craft creation.',
        hi: 'जी हाँ! उत्पाद अपलोड पृष्ठ पर ले जा रहे हैं। चलिए आपके शिल्प की फोटो लेते हैं।'
      }
    };
  }

  // Navigation: Master Catalogue / My Products
  if (
    text.includes('my products') ||
    text.includes('catalogue') ||
    text.includes('products காட்டு') ||
    text.includes('பொருட்கள்') ||
    text.includes('பட்டியல்') ||
    text.includes('मेरे उत्पाद') ||
    text.includes('कैटलॉग') ||
    text.includes('నా ఉత్పత్తులు')
  ) {
    return {
      intent: 'NAV_CATALOGUE',
      page: 'catalogue',
      reply: {
        ta: 'உங்கள் மாஸ்டர் தயாரிப்புகள் பட்டியலை திறக்கிறேன்.',
        en: 'Opening your Master Product Catalogue.',
        hi: 'आपका उत्पाद कैटलॉग खोल रहे हैं।'
      }
    };
  }

  // Navigation: Enquiries / Messages
  if (
    text.includes('enquir') ||
    text.includes('message') ||
    text.includes('செய்தி') ||
    text.includes('விசாரணை') ||
    text.includes('கேள்வி') ||
    text.includes('पूछताछ') ||
    text.includes('संदेश') ||
    text.includes('విచారణ')
  ) {
    return {
      intent: 'NAV_ENQUIRIES',
      page: 'enquiries',
      reply: {
        ta: 'வாங்குபவர்களிடமிருந்து வந்த செய்திகள் மற்றும் விசாரணைகளை காட்டுகிறேன்.',
        en: 'Showing your buyer inquiries and negotiation messages.',
        hi: 'खरीदारों से आई पूछताछ और संदेश दिखा रहे हैं।'
      }
    };
  }

  // Navigation: Market Linkage / Buyer Matches
  if (
    text.includes('buyer') ||
    text.includes('market') ||
    text.includes('match') ||
    text.includes('தேடு') ||
    text.includes('வாய்ப்பு') ||
    text.includes('சந்தை') ||
    text.includes('बायर्स') ||
    text.includes('बाजार')
  ) {
    return {
      intent: 'NAV_MATCHES',
      page: 'matches',
      reply: {
        ta: 'உங்கள் தயாரிப்புகளுக்கு பொருத்தமான வாங்குபவர் தேவைகளை காட்டுகிறேன்.',
        en: 'Matching your creations with top corporate and retail buyers.',
        hi: 'आपके उत्पादों से मेल खाने वाले खरीदारों की सूची दिखा रहे हैं।'
      }
    };
  }

  // Navigation: Profile
  if (
    text.includes('profile') ||
    text.includes('சுயவிவரம்') ||
    text.includes('ப்ரோஃபைல்') ||
    text.includes('प्रोफाइल')
  ) {
    return {
      intent: 'NAV_PROFILE',
      page: 'profile',
      reply: {
        ta: 'உங்கள் கைவினைஞர் சுயவிவர பக்கத்தை காட்டுகிறேன்.',
        en: 'Opening your Artisan profile and workshop details.',
        hi: 'आपकी कारीगर प्रोफ़ाइल खोल रहे हैं।'
      }
    };
  }

  // Help / Context query: "What is this page?"
  if (
    text.includes('page என்ன') ||
    text.includes('என்ன செய்யணும்') ||
    text.includes('help') ||
    text.includes('what is this') ||
    text.includes('உதவி') ||
    text.includes('यह क्या है') ||
    text.includes('मदद')
  ) {
    return {
      intent: 'CONTEXT_HELP',
      page: null,
      reply: {
        ta: 'இது உங்கள் ArtisanBridge AI தளம். நீங்கள் குரல் வழியே புதிய பொருட்கள் பதிவேற்றலாம், புகைப்படங்களை மேம்படுத்தலாம், மேலும் வாங்குபவர்களை கண்டறியலாம்.',
        en: 'This is your ArtisanBridge AI workspace. You can voice-record new crafts, enhance product photos, and match with buyers effortlessly.',
        hi: 'यह आपका आर्टिसनब्रिज AI प्लेटफॉर्म है। आप बोलकर नए उत्पाद अपलोड कर सकते हैं और खरीदारों से जुड़ सकते हैं।'
      }
    };
  }

  // Default general intent
  return {
    intent: 'GENERAL_CHAT',
    page: null,
    reply: {
      ta: `நீங்கள் கூறியதை கவனித்தேன்: "${transcript}". உங்களுக்கு நான் எவ்வாறு உதவ முடியும்?`,
      en: `Understood: "${transcript}". How can I assist your artisan business today?`,
      hi: `मैंने सुना: "${transcript}"। मैं आपकी क्या मदद कर सकता हूँ?`
    }
  };
};

// Conversational Entity Extractor for Registration
export const extractRegistrationEntities = (transcript, currentProfile = {}) => {
  const text = transcript.toLowerCase();
  const updated = { ...currentProfile };

  // Check for Experience (e.g. "15 years", "12 வருடமா", "10 साल")
  const expMatch = text.match(/(\d+)\s*(?:years?|வருட|வருஷ|سال|साल|సంవత్సరాలు|ವರ್ಷ)/i);
  if (expMatch) {
    updated.experience = `${expMatch[1]} Years`;
  }

  // Check for Name patterns: "என் பெயர் குமார்", "my name is Ramesh", "मेरा नाम सुरेश"
  const namePatterns = [
    /(?:என் பெயர்|பெயர்|name is|i am|my name's|मेरा नाम|నా పేరు|ಹೆಸರು)\s+([a-zA-Z\u0B80-\u0BFF\u0900-\u097F]+)/i,
    /^([a-zA-Z\u0B80-\u0BFF\u0900-\u097F]{3,20})$/
  ];
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const cleanName = match[1].trim();
      if (!['yes', 'no', 'confirm', 'ஆம்', 'சரி', 'ना'].includes(cleanName.toLowerCase())) {
        updated.name = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        break;
      }
    }
  }

  // Check for Locations: Salem, Madurai, Varanasi, Mysore, Thanjavur, Jaipur, Kolkata, Kanchipuram, Palakkad
  const locations = [
    'Salem', 'Madurai', 'Kanchipuram', 'Thanjavur', 'Coimbatore', 'Chennai', 'Nagercoil', 'Tirunelveli',
    'Varanasi', 'Jaipur', 'Mysore', 'Bastar', 'Kolkata', 'Warangal', 'Palakkad', 'Guwahati', 'Moradabad'
  ];
  for (const loc of locations) {
    if (text.includes(loc.toLowerCase())) {
      updated.location = loc;
      break;
    }
  }

  // Check for Crafts: Bamboo, Terracotta / Clay, Wood Carving, Handloom / Silk, Brass / Bell metal, Stone
  if (text.includes('bamboo') || text.includes('மூங்கில்') || text.includes('பிரம்பு') || text.includes('बांस') || text.includes('వెదురు')) {
    updated.craft = 'Bamboo & Cane Craft';
  } else if (text.includes('terracotta') || text.includes('clay') || text.includes('மண்') || text.includes('குயவர்') || text.includes('मिट्टी') || text.includes('పాత్రలు')) {
    updated.craft = 'Terracotta & Pottery';
  } else if (text.includes('wood') || text.includes('மரம்') || text.includes('மர வேலை') || text.includes('लकड़ी') || text.includes('నక్కాशी')) {
    updated.craft = 'Traditional Wood Carving';
  } else if (text.includes('silk') || text.includes('handloom') || text.includes('பட்டு') || text.includes('நெசவு') || text.includes('सिल्क') || text.includes('हथकरघा')) {
    updated.craft = 'Handloom & Silk Weaving';
  } else if (text.includes('brass') || text.includes('metal') || text.includes('பித்தளை') || text.includes('வெண்கலம்') || text.includes('पीतल')) {
    updated.craft = 'Brass & Bronze Metalcraft';
  }

  return updated;
};

// Check if voice input indicates Confirmation
export const isVoiceConfirmation = (transcript) => {
  const text = transcript.toLowerCase();
  return (
    text.includes('confirm') ||
    text.includes('yes') ||
    text.includes('ஆம்') ||
    text.includes('சரி') ||
    text.includes('உறுதி') ||
    text.includes('हाँ') ||
    text.includes('सही है') ||
    text.includes('అవును') ||
    text.includes('ಹೌದು') ||
    text.includes('হ্যাঁ')
  );
};
