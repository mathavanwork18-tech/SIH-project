/**
 * AppKnowledgeBase
 * Comprehensive FAQ & Knowledge Engine for ArtisanBridge AI.
 * Handles multilingual explanations (Tamil, Tanglish, English) and cleanly
 * separates Informational Questions from Direct Action Requests.
 */

export const FAQ_DATABASE = [
  {
    id: 'faq_what_is_app',
    category: 'general',
    patterns: [
      'what is artisanbridge ai',
      'what is this app',
      'artisanbridge ai na enna',
      'artisanbridge enna app',
      'indha app enna pannum',
      'app pathi sollu',
      'explain artisanbridge',
      'இந்த ஆப் என்ன'
    ],
    answer_ta: 'ArtisanBridge AI என்பது பாரம்பரிய கைவினைஞர்களுக்கான குரல்-வழி டிஜிட்டல் தளம். இது உங்கள் தயாரிப்புகளுக்கு AI மூலம் தானாக அட்டவணை உருவாக்கி, நேரடியாக மொத்த வாங்குபவர்களுடன் இணைக்கிறது.',
    answer_en: 'ArtisanBridge AI is a voice-first platform that empowers rural and traditional artisans to create instant multilingual catalogues using camera AI and connects directly with corporate and bulk buyers.',
    followUpAction: null
  },
  {
    id: 'faq_how_to_post',
    category: 'product',
    patterns: [
      'how do i post a product',
      'how to upload craft',
      'how to add product',
      'product eppadi post panradhu',
      'product upload eppadi seivathu',
      'porul eppadi podanum',
      'product poda step enna',
      'தயாரிப்பு எப்படி பதிவேற்றுவது'
    ],
    answer_ta: 'நீங்கள் "Product post பண்ணனும்" என்று சொன்னாலே போதும்! கேமரா மூலம் உங்கள் கைவினைப் பொருளின் புகைப்படத்தை எடுத்தால், AI தானாக பெயர், விவரம் மற்றும் விலையை உருவாக்கும். நீங்கள் சரிபார்த்து உடனே வெளியிடலாம்.',
    answer_en: 'Simply say "I want to post a product". Our AI will guide your camera to capture the craft, automatically extract materials, generate descriptions and fair prices, allowing you to review and publish in seconds.',
    followUpAction: {
      action: 'NAVIGATE_TO_PRODUCT_POST',
      prompt_ta: 'இப்போதே தயாரிப்பு பதிவேற்ற பக்கத்திற்கு செல்லவா?',
      prompt_en: 'Would you like to open the product posting studio now?'
    }
  },
  {
    id: 'faq_camera_info',
    category: 'camera',
    patterns: [
      'what is camera used for',
      'how does camera work',
      'camera pathi enna',
      'camera enna seiyum',
      'camera pathi sollu',
      'camera guidance na enna',
      'கேமரா எப்படி வேலை செய்கிறது'
    ],
    answer_ta: 'எங்கள் கேமரா நேரடி AI காட்சி பகுப்பாய்வு கொண்டது. இது உங்கள் பொருளின் தெளிவு (Blur), வெளிச்சம் மற்றும் சரியான ஃப்ரேமிங்கை நிகழ்நேரத்தில் சரிபார்த்து சிறந்த புகைப்படத்தை எடுக்க வழிகாட்டுகிறது.',
    answer_en: 'Our camera studio uses real-time computer vision to evaluate sharpness, lighting balance, and centering to ensure studio-grade product photos for buyers.',
    followUpAction: {
      action: 'OPEN_CAMERA',
      prompt_ta: 'கேமராவை இப்போது திறக்க வேண்டுமா?',
      prompt_en: 'Would you like to open the live camera now?'
    }
  },
  {
    id: 'faq_image_detection',
    category: 'ai_vision',
    patterns: [
      'how does image detection work',
      'how does ai recognize product',
      'image detection eppadi work aagum',
      'ai eppadi kandupidikudhu',
      'object detection enna pannum',
      'பட பகுப்பாய்வு எப்படி வேலை செய்கிறது'
    ],
    answer_ta: 'புகைப்படத்தை எடுத்ததும் கணினி பார்வை மாதிரி (Computer Vision) உங்கள் கைவினைப் பொருளின் வடிவம், அமைப்பு மற்றும் நிறங்களை பகுப்பாய்வு செய்து பானை, மூங்கில் கூடை, மரச்சிற்பம் போன்றவற்றை 94%+ துல்லியத்துடன் கண்டறிகிறது.',
    answer_en: 'Once captured, our vision pipeline analyzes pixel contours, textures, and color histograms to classify the craft category (pottery, bamboo, handloom) with 94%+ confidence.'
  },
  {
    id: 'faq_edit_details',
    category: 'catalog',
    patterns: [
      'can i edit ai details',
      'can i change generated description',
      'ai generate panna details maathalama',
      'name description change panna mudiyuma',
      'ai thappa pota enna seivathu',
      'விவரங்களை மாற்ற முடியுமா'
    ],
    answer_ta: 'ஆம்! AI உருவாக்கிய பெயர், விளக்கம், விலை அல்லது குறிச்சொற்களை உங்கள் குரல் மூலமாகவே ("Description short பண்ணு" அல்லது "Material மாத்து") எளிதாக மாற்றலாம்.',
    answer_en: 'Yes! You have full control. You can edit any field (title, description, price, tags) using natural voice commands like "Shorten description" or "Change material to cane".'
  },
  {
    id: 'faq_tamil_support',
    category: 'language',
    patterns: [
      'can i speak in tamil',
      'does it support tanglish',
      'tamil la pesa mudiyuma',
      'tanglish puriyuma',
      'tamil voice support irukka',
      'தமிழ் புரியுமா'
    ],
    answer_ta: 'ஆம்! தமிழ், தங்க்லீஷ் (Tanglish), ஆங்கிலம் மற்றும் மேலும் 8 இந்திய மொழிகளில் நீங்கள் பேசலாம். எங்கள் AI உங்கள் இயல்பான பேச்சு வழக்கை முழுமையாகப் புரிந்து கொள்ளும்.',
    answer_en: 'Yes! We fully support Tamil, Tanglish, English, and 8 Indian languages with natural conversational speech understanding.'
  },
  {
    id: 'faq_auto_publish',
    category: 'governance',
    patterns: [
      'will my product publish automatically',
      'does ai publish without asking',
      'auto publish aaguma',
      'en kitta kekkama publish pannuma',
      'தானாக வெளியிடுமா'
    ],
    answer_ta: 'இல்லை! உங்கள் ஒப்புதல் (Human Confirmation) இல்லாமல் எந்த தயாரிப்பும் வெளியிடப்படாது. AI தகவல்களை உருவாக்கிய பின், நீங்கள் சரிபார்த்து "Confirm" என்று சொன்ன பிறகே வெளியாகும்.',
    answer_en: 'No! No product is ever published without your explicit confirmation. You always review and approve the details before it goes live to buyers.'
  },
  {
    id: 'faq_blurry_image',
    category: 'camera_quality',
    patterns: [
      'what happens if image is blurry',
      'photo blur ah irundha enna aagum',
      'blur photo accept pannuma',
      'மங்கலான படம் எடுத்தால் என்ன ஆகும்'
    ],
    answer_ta: 'புகைப்படம் மங்கலாகவோ அல்லது வெளிச்சம் குறைவாகவோ இருந்தால், AI உடனே அதை எச்சரித்து மீண்டும் படம் எடுக்க அல்லது கேலரியிலிருந்து தேர்ந்தெடுக்க வழிகாட்டும்.',
    answer_en: 'If a photo is blurry or underexposed, the AI Quality Assessment rejects low-quality frames and prompts you to retake or adjust lighting.'
  },
  {
    id: 'faq_offline_support',
    category: 'offline',
    patterns: [
      'can i save product without internet',
      'does it work offline',
      'internet illana work aaguma',
      'offline la save pannalama',
      'இணையம் இல்லாமல் வேலை செய்யுமா'
    ],
    answer_ta: 'ஆம்! இணைய இணைப்பு இல்லாத போதும் உங்கள் தயாரிப்புகள் Local Draft-ஆக சேமிக்கப்படும். மீண்டும் Network வந்ததும் தானாக சர்வரில் Synchronize செய்யப்படும்.',
    answer_en: 'Yes! All product creation, photos, and voice drafts are saved locally when offline and automatically synchronize once internet connection is restored.'
  },
  {
    id: 'faq_buyer_visibility',
    category: 'market',
    patterns: [
      'who can see my product',
      'who are the buyers',
      'en product ah yaar paapanga',
      'buyers yaar',
      'யாருக்கு என் தயாரிப்புகள் தெரியும்'
    ],
    answer_ta: 'FabIndia, Dastkar, சர்வதேச சில்லறை விற்பனையாளர்கள் மற்றும் சரிபார்க்கப்பட்ட மொத்த வாங்குபவர்கள் உங்கள் தயாரிப்புகளை நேரடியாகப் பார்த்து ஆர்டர்களை அனுப்புவார்கள்.',
    answer_en: 'Verified corporate buyers, retail chains (e.g. FabIndia, craft boutiques), and institutional bulk purchasers can view your verified catalogue and send direct purchase inquiries.'
  }
];

export class AppKnowledgeBase {
  /**
   * Check if user input is an informational question (FAQ)
   * @param {string} input - User query transcript
   * @param {string} language - 'ta' | 'en'
   * @returns {Object|null} FAQ answer or null
   */
  static matchQuestion(input, language = 'ta') {
    if (!input || !input.trim()) return null;
    const clean = input.toLowerCase().trim();

    // Check if sentence starts with or contains question markers
    const isQuestionForm =
      clean.endsWith('?') ||
      clean.includes('what is') ||
      clean.includes('how to') ||
      clean.includes('how do') ||
      clean.includes('can i') ||
      clean.includes('will it') ||
      clean.includes('who can') ||
      clean.includes('pathi enna') ||
      clean.includes('enna nu') ||
      clean.includes('eppadi') ||
      clean.includes('mudiyuma') ||
      clean.includes('irukka') ||
      clean.includes('aaguma') ||
      clean.includes('சொல்லு') ||
      clean.includes('விளக்கு');

    // Scan patterns
    let bestFaq = null;
    let maxMatch = 0;

    const inputTokens = clean.split(/\s+/);

    for (const faq of FAQ_DATABASE) {
      for (const pattern of faq.patterns) {
        const patTokens = pattern.split(/\s+/);
        let matches = 0;
        patTokens.forEach(t => {
          if (inputTokens.includes(t)) matches++;
        });
        const score = matches / Math.max(patTokens.length, 1);
        if (score > maxMatch) {
          maxMatch = score;
          bestFaq = faq;
        }
      }
    }

    if (bestFaq && (maxMatch >= 0.55 || (isQuestionForm && maxMatch >= 0.4))) {
      return {
        isFaq: true,
        faqId: bestFaq.id,
        confidence: Math.min(0.98, 0.7 + maxMatch * 0.3),
        category: bestFaq.category,
        response_text: language === 'ta' ? bestFaq.answer_ta : bestFaq.answer_en,
        followUpAction: bestFaq.followUpAction || null
      };
    }

    return null;
  }
}
