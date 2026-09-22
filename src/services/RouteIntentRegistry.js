/**
 * RouteIntentRegistry
 * Centralized registry mapping every screen, route, allowed role,
 * keyword triggers, Tamil/Tanglish synonyms, actions, and required context.
 */

export const APP_ROUTES = {
  // Global & Onboarding
  SPLASH: '/splash',
  LANGUAGE: '/language',
  WELCOME: '/welcome',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY: '/verify',
  ONBOARDING: '/onboarding',

  // Artisan Routes
  ARTISAN_HOME: '/artisan/home',
  ARTISAN_CREATE_PRODUCT: '/artisan/create-product',
  ARTISAN_CAMERA: '/artisan/camera',
  ARTISAN_IMAGE_PREVIEW: '/artisan/image-preview',
  ARTISAN_AI_ANALYSIS: '/artisan/ai-analysis',
  ARTISAN_CATALOGUE: '/artisan/catalogue',
  ARTISAN_CATALOGUE_EDIT: '/artisan/catalogue/edit',
  ARTISAN_PRODUCTS: '/artisan/products',
  ARTISAN_MATCHES: '/artisan/matches',
  ARTISAN_ENQUIRIES: '/artisan/enquiries',
  ARTISAN_MESSAGES: '/artisan/messages',
  ARTISAN_NOTIFICATIONS: '/artisan/notifications',
  ARTISAN_PROFILE: '/artisan/profile',
  ARTISAN_SETTINGS: '/artisan/settings',

  // Buyer Routes
  BUYER_HOME: '/buyer/home',
  BUYER_SEARCH: '/buyer/search',
  BUYER_PRODUCTS: '/buyer/products',
  BUYER_ARTISANS: '/buyer/artisans',
  BUYER_WISHLIST: '/buyer/wishlist',
  BUYER_ENQUIRIES: '/buyer/enquiries',
  BUYER_REQUIREMENTS: '/buyer/requirements',
  BUYER_MATCHES: '/buyer/matches',
  BUYER_PROFILE: '/buyer/profile',
  BUYER_SETTINGS: '/buyer/settings',

  // Admin Routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_ARTISANS: '/admin/artisans',
  ADMIN_BUYERS: '/admin/buyers',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_MODERATION: '/admin/moderation',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_MATCHES: '/admin/matches',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_AI_MONITORING: '/admin/ai-monitoring',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
  ADMIN_SETTINGS: '/admin/settings'
};

export const ROUTE_INTENT_REGISTRY = [
  {
    intent: 'NAVIGATE_HOME',
    route: APP_ROUTES.ARTISAN_HOME,
    screen_name: 'dashboard',
    description: 'Artisan Dashboard / Home Screen',
    allowed_roles: ['artisan', 'buyer', 'admin'],
    keywords: ['home', 'dashboard', 'main', 'start', 'முகப்பு', 'ஹோம்'],
    synonyms: [
      'home ku poo',
      'dashboard open pannu',
      'mukappu pakkam poo',
      'go to home',
      'take me to home',
      'main screen'
    ],
    action: 'NAVIGATE',
    response_ta: 'முகப்பு பக்கத்திற்கு செல்கிறேன்.',
    response_en: 'Navigating to home dashboard.'
  },
  {
    intent: 'CREATE_PRODUCT',
    route: APP_ROUTES.ARTISAN_CREATE_PRODUCT,
    screen_name: 'create_product',
    description: 'Create and post new handicraft product listing',
    allowed_roles: ['artisan'],
    keywords: [
      'post', 'product', 'upload', 'add product', 'sell', 'listing', 'item', 'create',
      'பதிவேற்றம்', 'பொருள் போடு', 'விற்க', 'சேர்க்க'
    ],
    synonyms: [
      'product post pannanum',
      'product add pannanum',
      'item upload pannanum',
      'product poda venum',
      'product sell panna venum',
      'enna product poda koopitu poo',
      'oru product post podanum',
      'puthu product add pannu',
      'sell my craft'
    ],
    action: 'NAVIGATE_TO_PRODUCT_POST',
    response_ta: 'சரி, product post செய்யும் இடத்துக்கு அழைத்துச் செல்கிறேன்.',
    response_en: 'Sure, opening product creation studio.'
  },
  {
    intent: 'OPEN_CAMERA',
    route: APP_ROUTES.ARTISAN_CAMERA,
    screen_name: 'create_product',
    sub_step: 'CAMERA',
    description: 'Open real mobile camera viewfinder to take craft photo',
    allowed_roles: ['artisan'],
    keywords: [
      'camera', 'photo', 'picture', 'capture', 'click', 'snap', 'scan',
      'கேமரா', 'படம்', 'புகைப்படம்', 'படம் எடு'
    ],
    synonyms: [
      'camera open pannu',
      'photo edukka camera open pannu',
      'camera thora',
      'camera thira',
      'photo edu',
      'padam edu',
      'photo edukka poren',
      'take photo now',
      'open camera viewfinder'
    ],
    action: 'OPEN_CAMERA',
    response_ta: 'கேமராவை திறக்கிறேன். கைவினைப் பொருளை ஃப்ரேமுக்குள் வையுங்கள்.',
    response_en: 'Opening live mobile camera. Position your craft inside the frame.'
  },
  {
    intent: 'VIEW_PRODUCTS',
    route: APP_ROUTES.ARTISAN_PRODUCTS,
    screen_name: 'catalogue',
    description: 'View Artisan Master Product Catalogue & Inventory',
    allowed_roles: ['artisan'],
    keywords: [
      'my products', 'products', 'inventory', 'stock', 'catalogue', 'catalog', 'drafts', 'items',
      'பொருட்கள்', 'தயாரிப்புகள்', 'பட்டியல்'
    ],
    synonyms: [
      'my products kaatu',
      'en products kaatu',
      'products list open pannu',
      'catalogue open pannu',
      'show my listings',
      'open my catalog',
      'view inventory'
    ],
    action: 'OPEN_MY_PRODUCTS',
    response_ta: 'உங்கள் தயாரிப்புகள் பட்டியலை திறக்கிறேன்.',
    response_en: 'Opening your master product catalogue.'
  },
  {
    intent: 'VIEW_MARKET_MATCHES',
    route: APP_ROUTES.ARTISAN_MATCHES,
    screen_name: 'matches',
    description: 'View AI Market Linkage & Buyer Demands',
    allowed_roles: ['artisan', 'admin'],
    keywords: [
      'buyer', 'buyers', 'customer', 'market', 'matches', 'demand', 'opportunity',
      'வாங்குபவர்', 'சந்தை', 'வாய்ப்புகள்'
    ],
    synonyms: [
      'buyer matches kaatu',
      'buyers thedu',
      'pottery buyers thedu',
      'bamboo buyers thedu',
      'en product ku buyers iruka',
      'show market demand',
      'find buyers for my craft'
    ],
    action: 'OPEN_MARKET_MATCHES',
    response_ta: 'உங்களுக்கு பொருத்தமான வாங்குபவர் தேவைகளை காட்டுகிறேன்.',
    response_en: 'Showing matched corporate and retail buyers.'
  },
  {
    intent: 'VIEW_ENQUIRIES',
    route: APP_ROUTES.ARTISAN_ENQUIRIES,
    screen_name: 'enquiries',
    description: 'View buyer inquiries and chat conversations',
    allowed_roles: ['artisan', 'buyer', 'admin'],
    keywords: [
      'enquiry', 'enquiries', 'message', 'messages', 'chat', 'contact', 'inbox',
      'விசாரணை', 'செய்தி', 'உரையாடல்'
    ],
    synonyms: [
      'buyer enquiry irukka',
      'enquiries open pannu',
      'messages open pannu',
      'enquiry list kaatu',
      'check buyer messages',
      'open enquiry chat'
    ],
    action: 'OPEN_ENQUIRIES',
    response_ta: 'வாடிக்கையாளர் விசாரணைகளை திறக்கிறேன்.',
    response_en: 'Opening your buyer inquiries and messages.'
  },
  {
    intent: 'OPEN_PROFILE',
    route: APP_ROUTES.ARTISAN_PROFILE,
    screen_name: 'registration',
    description: 'Artisan profile and registration details',
    allowed_roles: ['artisan', 'buyer'],
    keywords: [
      'profile', 'account', 'registration', 'craftsman details', 'my account',
      'சுயவிவரம்', 'கணக்கு'
    ],
    synonyms: [
      'profile open pannu',
      'en profile kaatu',
      'update profile',
      'voice registration open pannu',
      'my details'
    ],
    action: 'OPEN_PROFILE',
    response_ta: 'உங்கள் சுயவிவர பக்கத்தை திறக்கிறேன்.',
    response_en: 'Opening your profile and registration details.'
  },
  {
    intent: 'OPEN_SETTINGS',
    route: APP_ROUTES.ARTISAN_SETTINGS,
    screen_name: 'settings',
    description: 'Application settings & preferences',
    allowed_roles: ['artisan', 'buyer', 'admin'],
    keywords: ['settings', 'preferences', 'config', 'அமைப்புகள்'],
    synonyms: [
      'settings ku poo',
      'settings open pannu',
      'app settings',
      'open settings'
    ],
    action: 'OPEN_SETTINGS',
    response_ta: 'அமைப்புகள் பக்கத்தை திறக்கிறேன்.',
    response_en: 'Opening settings.'
  },
  {
    intent: 'CHANGE_LANGUAGE',
    route: APP_ROUTES.LANGUAGE,
    screen_name: 'language_modal',
    description: 'Language selection modal',
    allowed_roles: ['artisan', 'buyer', 'admin'],
    keywords: ['language', 'tamil', 'english', 'hindi', 'மொழி', 'தமிழ்'],
    synonyms: [
      'language change pannu',
      'language tamil la maathu',
      'change to english',
      'mozhi maathu',
      'switch language'
    ],
    action: 'CHANGE_LANGUAGE',
    response_ta: 'மொழியை மாற்றுகிறேன்.',
    response_en: 'Opening language selector.'
  },
  {
    intent: 'BUYER_EXPLORE',
    route: APP_ROUTES.BUYER_HOME,
    screen_name: 'buyerExplore',
    description: 'Buyer Discovery Marketplace',
    allowed_roles: ['buyer', 'artisan', 'admin'],
    keywords: ['buyer explore', 'marketplace', 'buy crafts', 'discover', 'பொருட்கள் வாங்கு'],
    synonyms: [
      'buyer explore open pannu',
      'marketplace kaatu',
      'switch to buyer',
      'explore crafts'
    ],
    action: 'NAVIGATE',
    target_screen: 'buyerExplore',
    response_ta: 'வாங்குபவர் அங்காடிக்கு செல்கிறேன்.',
    response_en: 'Navigating to buyer discovery marketplace.'
  },
  {
    intent: 'BUYER_REQUIREMENTS',
    route: APP_ROUTES.BUYER_REQUIREMENTS,
    screen_name: 'buyerRequests',
    description: 'Buyer Procurement & Requirement Posting',
    allowed_roles: ['buyer', 'admin'],
    keywords: ['post requirement', 'bulk demand', 'buyer request', 'தேவை பதிவு'],
    synonyms: [
      'buyer request podanum',
      'post buyer requirement',
      'bulk requirement open pannu'
    ],
    action: 'NAVIGATE',
    target_screen: 'buyerRequests',
    response_ta: 'வாங்குபவர் தேவை பதிவேற்றம் பக்கத்திற்கு செல்கிறேன்.',
    response_en: 'Opening buyer requirement posting screen.'
  },
  {
    intent: 'ADMIN_DASHBOARD',
    route: APP_ROUTES.ADMIN_DASHBOARD,
    screen_name: 'admin',
    description: 'Platform Admin Analytics & Governance',
    allowed_roles: ['admin'],
    keywords: ['admin', 'governance', 'monitoring', 'analytics', 'நிர்வாகம்'],
    synonyms: [
      'admin dashboard open pannu',
      'platform analytics kaatu',
      'switch to admin'
    ],
    action: 'NAVIGATE',
    target_screen: 'admin',
    response_ta: 'நிர்வாக பகுப்பாய்வு பக்கத்திற்கு செல்கிறேன்.',
    response_en: 'Opening admin governance and analytics dashboard.'
  },
  {
    intent: 'SHOW_MISSING_POSTER',
    route: '/easter-egg/missing-karthi',
    screen_name: 'missing_poster',
    description: 'Hackathon Missing Karthi Poster Modal',
    allowed_roles: ['artisan', 'buyer', 'admin'],
    keywords: ['karthi', 'missing', 'poster', 'கார்த்தி', 'காணவில்லை', 'போஸ்டர்'],
    synonyms: [
      'karthi missing poster podu',
      'karthi enga',
      'missing poster kaatu',
      'karthi poster'
    ],
    action: 'SHOW_MISSING_POSTER',
    response_ta: 'இதோ, ஹேக்கத்தானில் காணாமல் போன கார்த்தியைத் தேடும் போஸ்டர்!',
    response_en: 'Displaying the Hackathon Missing Poster for Karthi!'
  }
];

export class RouteIntentRegistry {
  /**
   * Find matching route by intent name
   */
  static findByIntent(intentName) {
    return ROUTE_INTENT_REGISTRY.find(r => r.intent === intentName) || null;
  }

  /**
   * Match text against route keywords and synonyms
   */
  static matchRouteFromSpeech(text) {
    if (!text) return null;
    const clean = text.toLowerCase().trim();

    // 1. Direct synonym match
    for (const routeObj of ROUTE_INTENT_REGISTRY) {
      for (const syn of routeObj.synonyms) {
        if (clean.includes(syn.toLowerCase()) || syn.toLowerCase().includes(clean)) {
          return { routeObj, score: 0.96, matchType: 'synonym' };
        }
      }
    }

    // 2. Keyword density match
    let bestMatch = null;
    let maxScore = 0;

    for (const routeObj of ROUTE_INTENT_REGISTRY) {
      let matchedCount = 0;
      for (const kw of routeObj.keywords) {
        if (clean.includes(kw.toLowerCase())) {
          matchedCount++;
        }
      }
      const score = matchedCount / Math.max(routeObj.keywords.length, 1);
      if (score > maxScore && score > 0.3) {
        maxScore = score;
        bestMatch = routeObj;
      }
    }

    if (bestMatch) {
      return { routeObj: bestMatch, score: Math.min(0.92, 0.6 + maxScore * 0.4), matchType: 'keyword' };
    }

    return null;
  }
}
