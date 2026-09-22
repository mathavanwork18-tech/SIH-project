import { AI_INTENT_DATASET } from '../data/aiIntentDataset.js';
import { RouteIntentRegistry, APP_ROUTES } from './RouteIntentRegistry.js';
import { AppKnowledgeBase } from './AppKnowledgeBase.js';

/**
 * Master MainAIOrchestrator
 * High-precision NLU, Question vs Action classifier, Context-aware State Machine,
 * Confidence Threshold Engine, and Structured Action Dispatcher.
 */

export const ACTION_TYPES = {
  // Navigation
  NAVIGATE: 'NAVIGATE',
  NAVIGATE_TO_PRODUCT_POST: 'NAVIGATE_TO_PRODUCT_POST',
  OPEN_MY_PRODUCTS: 'OPEN_MY_PRODUCTS',
  OPEN_MARKET_MATCHES: 'OPEN_MARKET_MATCHES',
  OPEN_ENQUIRIES: 'OPEN_ENQUIRIES',
  OPEN_MESSAGES: 'OPEN_MESSAGES',
  OPEN_PROFILE: 'OPEN_PROFILE',
  OPEN_SETTINGS: 'OPEN_SETTINGS',
  BUYER_EXPLORE: 'BUYER_EXPLORE',
  BUYER_REQUIREMENTS: 'BUYER_REQUIREMENTS',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD',

  // Camera & Vision
  OPEN_CAMERA: 'OPEN_CAMERA',
  OPEN_GALLERY: 'OPEN_GALLERY',
  CAPTURE_IMAGE: 'CAPTURE_IMAGE',
  RETAKE_IMAGE: 'RETAKE_IMAGE',
  ANALYZE_IMAGE: 'ANALYZE_IMAGE',
  IDENTIFY_PRODUCT: 'IDENTIFY_PRODUCT',

  // Catalog & Editing
  GENERATE_CATALOGUE: 'GENERATE_CATALOGUE',
  EDIT_FIELD: 'EDIT_FIELD',
  EDIT_PRODUCT_NAME: 'EDIT_PRODUCT_NAME',
  EDIT_DESCRIPTION: 'EDIT_DESCRIPTION',
  EDIT_CATEGORY: 'EDIT_CATEGORY',
  EDIT_MATERIAL: 'EDIT_MATERIAL',
  EDIT_PRICE: 'EDIT_PRICE',
  EDIT_KEYWORDS: 'EDIT_KEYWORDS',

  // Workflow & Confirmation
  REQUEST_PUBLISH_CONFIRMATION: 'REQUEST_PUBLISH_CONFIRMATION',
  PUBLISH_PRODUCT: 'PUBLISH_PRODUCT',
  SAVE_DRAFT: 'SAVE_DRAFT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  ARCHIVE_PRODUCT: 'ARCHIVE_PRODUCT',

  // System & Utilities
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  SHOW_HELP: 'SHOW_HELP',
  ANSWER_FAQ: 'ANSWER_FAQ',
  GO_BACK: 'GO_BACK',
  CANCEL: 'CANCEL',
  CONFIRM: 'CONFIRM'
};

export class MainAIOrchestrator {
  /**
   * Process raw voice transcript or text with complete context awareness
   * @param {Object} params
   * @returns {Object} Structured Action JSON
   */
  static processInput(params) {
    const rawResult = MainAIOrchestrator._evaluate(params);
    const ent = rawResult.entities || rawResult.extracted_params || {};
    return {
      ...rawResult,
      entities: ent,
      extracted_params: ent,
      response_text: rawResult.response || rawResult.response_text || ''
    };
  }

  static _evaluate({
    user_id = 'artisan_001',
    language = 'ta',
    input_type = 'voice',
    transcript = '',
    current_screen = 'dashboard',
    workflow_state = null
  }) {
    if (!transcript || !transcript.trim()) {
      return {
        intent: 'UNKNOWN',
        confidence: 0.0,
        action: ACTION_TYPES.SHOW_HELP,
        target_screen: current_screen,
        route: APP_ROUTES.ARTISAN_HOME,
        entities: {},
        requires_confirmation: false,
        response: language === 'ta' ? 'தயவுசெய்து சொல்லுங்கள்.' : 'Please speak or type your request.'
      };
    }

    const cleanInput = transcript.toLowerCase().trim();

    // 1. Language Detection heuristic
    const isTamilScript = /[\u0B80-\u0BFF]/.test(cleanInput);
    const effectiveLang = isTamilScript ? 'ta' : language;

    // ============================================================
    // STEP 1: QUESTION VS ACTION SEPARATION (Section 32 & 33)
    // ============================================================
    const faqResult = AppKnowledgeBase.matchQuestion(cleanInput, effectiveLang);
    if (faqResult) {
      return {
        intent: 'FAQ_QUESTION',
        confidence: faqResult.confidence,
        action: ACTION_TYPES.ANSWER_FAQ,
        target_screen: current_screen,
        route: null,
        entities: { faqId: faqResult.faqId, category: faqResult.category },
        requires_confirmation: false,
        response: faqResult.response_text,
        followUpAction: faqResult.followUpAction
      };
    }


    // ============================================================
    // STEP 3: CONTEXT-AWARE STATE MACHINE (Section 9 & 10)
    // ============================================================
    
    // Context A: In Camera Screen
    if (current_screen === 'camera' || (current_screen === 'create_product' && workflow_state?.current_step === 'CAMERA')) {
      if (cleanInput.includes('retake') || cleanInput.includes('மீண்டும்') || cleanInput.includes('marupadi')) {
        return {
          intent: 'RETAKE_IMAGE',
          confidence: 0.96,
          action: ACTION_TYPES.RETAKE_IMAGE,
          target_screen: 'create_product',
          route: APP_ROUTES.ARTISAN_CAMERA,
          entities: {},
          requires_confirmation: false,
          response: effectiveLang === 'ta' ? 'மீண்டும் படம் எடுக்கலாம்.' : 'Ready to retake photo.'
        };
      }
      if (cleanInput.includes('capture') || cleanInput.includes('click') || cleanInput.includes('snap') || cleanInput.includes('eduthuten')) {
        return {
          intent: 'CAPTURE_IMAGE',
          confidence: 0.95,
          action: ACTION_TYPES.CAPTURE_IMAGE,
          target_screen: 'create_product',
          route: APP_ROUTES.ARTISAN_IMAGE_PREVIEW,
          entities: {},
          requires_confirmation: false,
          response: effectiveLang === 'ta' ? 'படம் பெறப்பட்டது. AI பகுப்பாய்வு செய்கிறது.' : 'Photo captured. Running AI analysis.'
        };
      }
    }

    // Context B: In Catalogue / Editing Screen
    const isEditingScreen = current_screen === 'catalogAi' ||
      current_screen === 'catalogue' ||
      (current_screen === 'create_product' && (workflow_state?.current_step === 'CATALOGUE' || workflow_state?.current_step === 'PREVIEW'));

    if (isEditingScreen) {
      // B1: Edit Description
      if (cleanInput.includes('description') || cleanInput.includes('விளக்கம்') || cleanInput.includes('short') || cleanInput.includes('சுருக்க')) {
        return {
          intent: 'EDIT_DESCRIPTION',
          confidence: 0.95,
          action: ACTION_TYPES.EDIT_FIELD,
          target_screen: current_screen,
          route: APP_ROUTES.ARTISAN_CATALOGUE_EDIT,
          entities: { field: 'description', modifyType: 'shorten' },
          requires_confirmation: false,
          response: effectiveLang === 'ta'
            ? 'விளக்கத்தை சுருக்கமாக மாற்றியுள்ளேன்.'
            : 'I have shortened the product description.'
        };
      }

      // B2: Edit Product Name
      if (cleanInput.includes('name') || cleanInput.includes('பெயர்') || cleanInput.includes('title') || cleanInput.includes('தலைப்பு')) {
        return {
          intent: 'EDIT_PRODUCT_NAME',
          confidence: 0.94,
          action: ACTION_TYPES.EDIT_FIELD,
          target_screen: current_screen,
          route: APP_ROUTES.ARTISAN_CATALOGUE_EDIT,
          entities: { field: 'name', modifyType: 'prompt' },
          requires_confirmation: false,
          response: effectiveLang === 'ta'
            ? 'தயாரிப்பின் பெயரை மாற்றலாம். என்ன பெயர் வைக்க வேண்டும்?'
            : 'What would you like the new product title to be?'
        };
      }

      // B3: Edit Material
      if (cleanInput.includes('material') || cleanInput.includes('பொருள் வகை') || cleanInput.includes('cane') || cleanInput.includes('clay') || cleanInput.includes('wood')) {
        let mat = 'Bamboo';
        if (cleanInput.includes('cane') || cleanInput.includes('பிரம்பு')) mat = 'Cane';
        if (cleanInput.includes('clay') || cleanInput.includes('மண்')) mat = 'Terracotta Clay';
        if (cleanInput.includes('wood') || cleanInput.includes('மரம்')) mat = 'Rosewood';
        return {
          intent: 'EDIT_MATERIAL',
          confidence: 0.95,
          action: ACTION_TYPES.EDIT_FIELD,
          target_screen: current_screen,
          route: APP_ROUTES.ARTISAN_CATALOGUE_EDIT,
          entities: { field: 'material', value: mat },
          requires_confirmation: false,
          response: effectiveLang === 'ta'
            ? `மூலப்பொருளை ${mat} என மாற்றியுள்ளேன்.`
            : `Updated material to ${mat}.`
        };
      }
    }

    // ============================================================
    // STEP 4: ENTITY & CRAFT EXTRACTION
    // ============================================================
    let extractedCategory = null;
    let craftType = null;
    let material = null;

    if (cleanInput.includes('potter') || cleanInput.includes('மண்') || cleanInput.includes('clay') || cleanInput.includes('terracotta') || cleanInput.includes('பானை')) {
      extractedCategory = 'Pottery';
      craftType = 'Clay Pottery & Kiln Firing';
      material = 'Terracotta Clay';
    } else if (cleanInput.includes('bamboo') || cleanInput.includes('மூங்கில்') || cleanInput.includes('cane') || cleanInput.includes('கூடை') || cleanInput.includes('basket')) {
      extractedCategory = 'Bamboo & Cane';
      craftType = 'Handwoven Bamboo Craft';
      material = 'Natural Bamboo Cane';
    } else if (cleanInput.includes('wood') || cleanInput.includes('மரம்') || cleanInput.includes('rosewood') || cleanInput.includes('சிற்ப')) {
      extractedCategory = 'Wood Carving';
      craftType = 'Traditional Woodcraft';
      material = 'Rosewood / Teak';
    } else if (cleanInput.includes('silk') || cleanInput.includes('பட்டு') || cleanInput.includes('handloom') || cleanInput.includes('சேலை')) {
      extractedCategory = 'Handloom';
      craftType = 'Silk Handloom Weaving';
      material = 'Pure Mulberry Silk';
    }

    // ============================================================
    // STEP 5: DESTRUCTIVE / CONFIRMATION INTENTS (Section 31)
    // ============================================================
    if (
      cleanInput.includes('publish') ||
      cleanInput.includes('வெளியிடு') ||
      cleanInput.includes('submit') ||
      cleanInput.includes('confirm') ||
      cleanInput.includes('make live') ||
      cleanInput.includes('சரி publish')
    ) {
      return {
        intent: 'PUBLISH_PRODUCT',
        confidence: 0.96,
        action: ACTION_TYPES.PUBLISH_PRODUCT,
        target_screen: 'catalogue',
        route: APP_ROUTES.ARTISAN_CATALOGUE,
        entities: { category: extractedCategory },
        requires_confirmation: true,
        response: effectiveLang === 'ta'
          ? 'சரி, தயாரிப்பை Master Catalogue-ல் வெளியிடுகிறேன்!'
          : 'Publishing your product to Master Catalogue!'
      };
    }

    if (cleanInput.includes('delete') || cleanInput.includes('remove') || cleanInput.includes('நீக்கு')) {
      return {
        intent: 'DELETE_PRODUCT',
        confidence: 0.95,
        action: ACTION_TYPES.DELETE_PRODUCT,
        target_screen: 'catalogue',
        route: APP_ROUTES.ARTISAN_CATALOGUE,
        entities: {},
        requires_confirmation: true,
        response: effectiveLang === 'ta'
          ? 'இந்த தயாரிப்பை நீக்க உறுதிப்படுத்துங்கள்.'
          : 'Please confirm deletion of this product.'
      };
    }

    // ============================================================
    // STEP 6: ROUTE REGISTRY & N-GRAM SEMANTIC MATCHING
    // ============================================================
    const routeMatch = RouteIntentRegistry.matchRouteFromSpeech(cleanInput);

    // 1. Direct High-Confidence Route Matches
    if (
      cleanInput.includes('post') ||
      cleanInput.includes('போட') ||
      cleanInput.includes('பதிவேற்றம்') ||
      cleanInput.includes('kuputu poo') ||
      cleanInput.includes('create product') ||
      cleanInput.includes('add product') ||
      cleanInput.includes('sell')
    ) {
      return {
        intent: 'CREATE_PRODUCT',
        confidence: 0.97,
        action: ACTION_TYPES.NAVIGATE_TO_PRODUCT_POST,
        target_screen: 'create_product',
        route: APP_ROUTES.ARTISAN_CREATE_PRODUCT,
        entities: { category: extractedCategory || 'Pottery', craftType, material },
        requires_confirmation: false,
        response: extractedCategory && effectiveLang === 'ta'
          ? `சரி, உங்கள் ${extractedCategory} product-ஐ post செய்யும் இடத்திற்கு அழைத்துச் செல்கிறேன்.`
          : effectiveLang === 'ta'
          ? 'சரி, product post செய்யும் இடத்துக்கு அழைத்துச் செல்கிறேன்.'
          : `Sure, opening studio to post your ${extractedCategory || 'craft'} product.`
      };
    }

    if (cleanInput.includes('camera') || cleanInput.includes('கேமரா') || cleanInput.includes('photo edu') || cleanInput.includes('padam edu') || cleanInput.includes('take photo')) {
      return {
        intent: 'OPEN_CAMERA',
        confidence: 0.96,
        action: ACTION_TYPES.OPEN_CAMERA,
        target_screen: 'create_product',
        route: APP_ROUTES.ARTISAN_CAMERA,
        entities: { category: extractedCategory },
        requires_confirmation: false,
        response: effectiveLang === 'ta'
          ? 'கேமராவை திறக்கிறேன். கைவினைப் பொருளை ஃப்ரேமுக்குள் வையுங்கள்.'
          : 'Opening live mobile camera. Position your craft inside the frame.'
      };
    }

    if (cleanInput.includes('my product') || cleanInput.includes('en product') || cleanInput.includes('products காட்டு') || cleanInput.includes('catalogue')) {
      return {
        intent: 'VIEW_PRODUCTS',
        confidence: 0.96,
        action: ACTION_TYPES.OPEN_MY_PRODUCTS,
        target_screen: 'catalogue',
        route: APP_ROUTES.ARTISAN_PRODUCTS,
        entities: {},
        requires_confirmation: false,
        response: effectiveLang === 'ta'
          ? 'உங்கள் தயாரிப்புகள் பட்டியலை திறக்கிறேன்.'
          : 'Opening your master catalogue.'
      };
    }

    if (cleanInput.includes('buyer') || cleanInput.includes('வாங்குபவர்') || cleanInput.includes('match') || cleanInput.includes('வாய்ப்பு')) {
      return {
        intent: 'VIEW_MARKET_MATCHES',
        confidence: 0.96,
        action: ACTION_TYPES.OPEN_MARKET_MATCHES,
        target_screen: 'matches',
        route: APP_ROUTES.ARTISAN_MATCHES,
        entities: { filterCategory: extractedCategory },
        requires_confirmation: false,
        response: effectiveLang === 'ta'
          ? 'உங்களுக்கு பொருத்தமான வாங்குபவர் தேவைகளை காட்டுகிறேன்.'
          : 'Showing matched corporate and bulk buyers.'
      };
    }

    if (cleanInput.includes('enquiry') || cleanInput.includes('செய்தி') || cleanInput.includes('message') || cleanInput.includes('chat')) {
      return {
        intent: 'VIEW_ENQUIRIES',
        confidence: 0.96,
        action: ACTION_TYPES.OPEN_ENQUIRIES,
        target_screen: 'enquiries',
        route: APP_ROUTES.ARTISAN_ENQUIRIES,
        entities: {},
        requires_confirmation: false,
        response: effectiveLang === 'ta'
          ? 'வாடிக்கையாளர் விசாரணைகளை திறக்கிறேன்.'
          : 'Opening buyer enquiries and messages.'
      };
    }

    if (routeMatch && routeMatch.score >= 0.85) {
      const r = routeMatch.routeObj;
      return {
        intent: r.intent,
        confidence: Number(routeMatch.score.toFixed(2)),
        action: r.action,
        target_screen: r.screen_name,
        route: r.route,
        entities: { category: extractedCategory },
        requires_confirmation: false,
        response: effectiveLang === 'ta' ? r.response_ta : r.response_en
      };
    }

    // ============================================================
    // STEP 7: DATASET STATISTICAL N-GRAM FALLBACK
    // ============================================================
    let bestItem = null;
    let maxItemScore = 0;
    const inputWords = cleanInput.split(/\s+/);

    AI_INTENT_DATASET.forEach(item => {
      const itemWords = item.text.toLowerCase().split(/\s+/);
      let matched = 0;
      inputWords.forEach(w => {
        if (itemWords.includes(w)) matched++;
      });
      const score = matched / Math.max(inputWords.length, itemWords.length);
      if (score > maxItemScore) {
        maxItemScore = score;
        bestItem = item;
      }
    });

    if (bestItem && maxItemScore >= 0.5) {
      const isHigh = maxItemScore >= 0.75;
      return {
        intent: bestItem.intent,
        confidence: Number(Math.min(0.95, maxItemScore).toFixed(2)),
        action: bestItem.action || ACTION_TYPES.NAVIGATE,
        target_screen: bestItem.target_screen || 'dashboard',
        route: APP_ROUTES.ARTISAN_HOME,
        entities: { category: extractedCategory },
        requires_confirmation: !isHigh,
        response: effectiveLang === 'ta'
          ? `சரி, ${bestItem.intent} செய்கிறேன்.`
          : `Executing ${bestItem.intent}.`
      };
    }

    // ============================================================
    // STEP 8: LOW-CONFIDENCE CLARIFICATION FALLBACK (Section 35)
    // ============================================================
    return {
      intent: 'GET_HELP',
      confidence: 0.4,
      action: ACTION_TYPES.SHOW_HELP,
      target_screen: current_screen,
      route: null,
      entities: {},
      requires_confirmation: true,
      response: effectiveLang === 'ta'
        ? 'நான் சரியாக புரிந்துகொள்ளவில்லை. நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?'
        : 'I didn\'t quite catch that. What would you like to do?',
      suggestedActions: [
        { label: 'Post Product', text: 'Product post pannanum' },
        { label: 'My Products', text: 'My products kaatu' },
        { label: 'Buyer Matches', text: 'Buyer matches kaatu' },
        { label: 'Enquiries', text: 'Enquiries open pannu' }
      ]
    };
  }
}
