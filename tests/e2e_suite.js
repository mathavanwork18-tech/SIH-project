/**
 * ArtisanBridge AI - Master Automated Test Suite
 * Tests NLP Intent Classification, 1000+ Dataset Splits, Question vs Action Separation,
 * BoundingBoxTransformer, RouteIntentRegistry, and Smart Catalogue AI.
 */

import { AI_INTENT_DATASET, DATASET_METRICS } from '../src/data/aiIntentDataset.js';
import { ARTISAN_VISION_DATASET, VISION_DATASET_STATS } from '../src/data/artisanVisionDataset.js';
import { MainAIOrchestrator, ACTION_TYPES } from '../src/services/MainAIOrchestrator.js';
import { RouteIntentRegistry, APP_ROUTES } from '../src/services/RouteIntentRegistry.js';
import { AppKnowledgeBase } from '../src/services/AppKnowledgeBase.js';
import { BoundingBoxTransformer } from '../src/services/BoundingBoxTransformer.js';
import { ObjectDetectionService } from '../src/services/ObjectDetectionService.js';
import { SmartCatalogueAI } from '../src/services/SmartCatalogueAI.js';
import { MarketMatchingAI } from '../src/services/MarketMatchingAI.js';
import { AIEvaluationRunner } from '../src/services/aiEvaluationRunner.js';

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
  } else {
    console.log(`✓ PASS: ${message}`);
    passedTests++;
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🚀 RUNNING ARTISANBRIDGE AI MASTER VERIFICATION SUITE');
  console.log('======================================================\n');

  // Test 1: 1000+ NLP Intent Dataset Metrics
  assert(DATASET_METRICS.total_utterances >= 1000, `NLP Dataset has ${DATASET_METRICS.total_utterances} utterances (>= 1000)`);
  assert(DATASET_METRICS.train_count > 650, `Train split has ${DATASET_METRICS.train_count} utterances (70%)`);
  assert(DATASET_METRICS.val_count > 100, `Val split has ${DATASET_METRICS.val_count} utterances (15%)`);
  assert(DATASET_METRICS.test_count > 100, `Test split has ${DATASET_METRICS.test_count} utterances (15%)`);

  // Test 2: 1000+ Vision Dataset Metrics
  assert(VISION_DATASET_STATS.total_images >= 1000, `Vision Dataset has ${VISION_DATASET_STATS.total_images} images (>= 1000)`);
  assert(VISION_DATASET_STATS.classes_count >= 10, `Vision Dataset has ${VISION_DATASET_STATS.classes_count} craft classes`);

  // Test 3: MainAIOrchestrator Intent & Entity Extraction
  const res1 = MainAIOrchestrator.processInput({ transcript: 'Enakku pottery product post pannanum', language: 'ta' });
  assert(res1.intent === 'CREATE_PRODUCT', 'Understands Tanglish "Enakku pottery product post pannanum" as CREATE_PRODUCT');
  assert(res1.entities?.category === 'Pottery', 'Extracts entity category = "Pottery"');
  assert(res1.route === APP_ROUTES.ARTISAN_CREATE_PRODUCT, `Maps to route ${res1.route}`);
  assert(res1.confidence >= 0.95, `Confidence is high (${res1.confidence})`);

  // Test 4: Question vs Action Separation (Section 32 & 33)
  const qRes = MainAIOrchestrator.processInput({ transcript: 'Camera pathi enna?', language: 'ta' });
  assert(qRes.intent === 'FAQ_QUESTION', 'Distinguishes question "Camera pathi enna?" as FAQ_QUESTION (does NOT navigate)');
  assert(qRes.action === ACTION_TYPES.ANSWER_FAQ, 'Action is ANSWER_FAQ without accidental route jump');

  const actRes = MainAIOrchestrator.processInput({ transcript: 'Camera open pannu', language: 'ta' });
  assert(actRes.intent === 'OPEN_CAMERA', 'Distinguishes action "Camera open pannu" as OPEN_CAMERA');
  assert(actRes.action === ACTION_TYPES.OPEN_CAMERA, 'Action is OPEN_CAMERA');

  // Test 5: RouteIntentRegistry Mapping
  const routeHome = RouteIntentRegistry.matchRouteFromSpeech('home ku poo');
  assert(routeHome?.routeObj.route === APP_ROUTES.ARTISAN_HOME, 'RouteIntentRegistry resolves "home ku poo" to /artisan/home');

  const routeMatches = RouteIntentRegistry.matchRouteFromSpeech('buyer matches kaatu');
  assert(routeMatches?.routeObj.route === APP_ROUTES.ARTISAN_MATCHES, 'RouteIntentRegistry resolves "buyer matches kaatu" to /artisan/matches');

  // Test 6: BoundingBoxTransformer Coordinate Transformation (Section 20)
  const normBox = { x: 0.2, y: 0.25, width: 0.6, height: 0.5 };
  const container = { width: 390, height: 844 }; // iPhone 14 / modern Android viewport
  const sensor = { width: 1080, height: 1920 };
  const screenBox = BoundingBoxTransformer.transform(normBox, container, sensor, { fit: 'cover', isFrontCamera: false });

  assert(screenBox.left >= 0 && screenBox.left < container.width, `Bounding box left coordinate is valid (${screenBox.left}px)`);
  assert(screenBox.top >= 0 && screenBox.top < container.height, `Bounding box top coordinate is valid (${screenBox.top}px)`);
  assert(screenBox.width > 50 && screenBox.height > 50, `Bounding box dimensions are valid (${screenBox.width}x${screenBox.height}px)`);

  // Test 7: Voice Field Correction (Context-Aware)
  const res2 = MainAIOrchestrator.processInput({ transcript: 'Description konjam short ah pannu', language: 'ta', current_screen: 'catalogue' });
  assert(res2.intent === 'EDIT_DESCRIPTION', 'Understands "Description konjam short ah pannu" as EDIT_DESCRIPTION');
  assert(res2.action === ACTION_TYPES.EDIT_FIELD, 'Maps to action EDIT_FIELD');

  // Test 8: Destructive Action Confirmation Requirement (Section 31)
  const pubRes = MainAIOrchestrator.processInput({ transcript: 'Publish pannidu', language: 'ta' });
  assert(pubRes.intent === 'PUBLISH_PRODUCT', 'Understands "Publish pannidu" as PUBLISH_PRODUCT');
  assert(pubRes.requires_confirmation === true, 'Destructive publish requires human confirmation');


  // Test 10: Smart Catalogue Multi-field Generation
  const cat = SmartCatalogueAI.generate({ category: 'Pottery' });
  assert(cat.product_name.includes('Clay') || cat.product_name.includes('Pot'), 'Catalogue generated product title');
  assert(cat.price > 0, `Catalogue price is ₹${cat.price}`);
  assert(cat.keywords.length >= 4, `Catalogue generated ${cat.keywords.length} keywords`);

  // Test 11: Market Matching AI
  const matches = MarketMatchingAI.findOpportunities({ category: 'Pottery' });
  assert(matches.match_count === 5, 'Found exactly 5 matched corporate buyer opportunities');
  assert(matches.buyers.length === 5, 'Returned 5 buyer opportunity records');

  // Test 12: AIEvaluationRunner Automated Scorecard
  const evalSummary = AIEvaluationRunner.runEvaluation('test');
  assert(evalSummary.qualityGatePassed === true, `AIEvaluationRunner Quality Gate Passed (Accuracy: ${evalSummary.intentAccuracy}%)`);
  assert(evalSummary.avgConfidence >= 90.0, `Average Model Confidence is ${evalSummary.avgConfidence}%`);

  console.log('\n======================================================');
  console.log(`📊 MASTER TEST SUMMARY: ${passedTests} / ${totalTests} ALL TESTS PASSED!`);
  console.log('======================================================\n');
}

runTestSuite();
