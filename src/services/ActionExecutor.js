import { ACTION_TYPES } from './MainAIOrchestrator';

/**
 * Master ActionExecutor
 * Executes structured application actions dispatched by MainAIOrchestrator.
 * AI decides WHAT should happen; ActionExecutor handles HOW it happens on the UI.
 */
export class ActionExecutor {
  /**
   * Execute an AI action payload
   * @param {Object} actionPayload - Structured output from MainAIOrchestrator
   * @param {Object} contextHandlers - Handlers for navigation, state changes, speech, modals
   */
  static execute(actionPayload, contextHandlers) {
    if (!actionPayload) return { success: false, error: 'No action payload provided' };

    const {
      action,
      target_screen,
      route,
      requires_confirmation,
      response,
      entities,
      next_step,
      followUpAction
    } = actionPayload;

    // 1. Announce speech feedback if present
    if (response && contextHandlers.speak) {
      contextHandlers.speak(response);
    }

    // 2. Execute target action
    switch (action) {
      case ACTION_TYPES.NAVIGATE_TO_PRODUCT_POST:
        if (contextHandlers.setWorkflowState) {
          contextHandlers.setWorkflowState({
            workflow: 'CREATE_PRODUCT',
            current_step: entities?.category ? 'CAMERA' : 'CATEGORY',
            product_category: entities?.category || 'Pottery',
            craft_type: entities?.craftType || 'Clay Pottery & Kiln Firing',
            material: entities?.material || 'Terracotta Clay'
          });
        }
        if (contextHandlers.navigate) {
          contextHandlers.navigate('create_product');
        }
        if (contextHandlers.triggerCamera) {
          setTimeout(() => contextHandlers.triggerCamera(), 400);
        }
        break;

      case ACTION_TYPES.OPEN_CAMERA:
      case ACTION_TYPES.RETAKE_IMAGE:
        if (contextHandlers.triggerCamera) {
          contextHandlers.triggerCamera();
        }
        if (contextHandlers.navigate) {
          contextHandlers.navigate('create_product');
        }
        break;

      case ACTION_TYPES.OPEN_GALLERY:
        if (contextHandlers.triggerGallery) {
          contextHandlers.triggerGallery();
        }
        break;

      case ACTION_TYPES.EDIT_FIELD:
      case ACTION_TYPES.EDIT_DESCRIPTION:
      case ACTION_TYPES.EDIT_PRODUCT_NAME:
      case ACTION_TYPES.EDIT_MATERIAL:
      case ACTION_TYPES.EDIT_CATEGORY:
      case ACTION_TYPES.EDIT_PRICE:
      case ACTION_TYPES.EDIT_KEYWORDS:
        if (contextHandlers.updateDraftField && entities) {
          contextHandlers.updateDraftField(entities.field, entities.value, entities.modifyType);
        }
        break;

      case ACTION_TYPES.REQUEST_PUBLISH_CONFIRMATION:
        if (contextHandlers.openPublishModal) {
          contextHandlers.openPublishModal();
        }
        break;

      case ACTION_TYPES.PUBLISH_PRODUCT:
        if (contextHandlers.publishProduct) {
          contextHandlers.publishProduct();
        } else if (contextHandlers.navigate) {
          contextHandlers.navigate('catalogue');
        }
        break;

      case ACTION_TYPES.DELETE_PRODUCT:
        if (contextHandlers.deleteProduct && entities?.productId) {
          contextHandlers.deleteProduct(entities.productId);
        }
        break;

      case ACTION_TYPES.OPEN_MY_PRODUCTS:
        if (contextHandlers.navigate) {
          contextHandlers.navigate('catalogue');
        }
        break;

      case ACTION_TYPES.OPEN_ENQUIRIES:
      case ACTION_TYPES.OPEN_MESSAGES:
        if (contextHandlers.navigate) {
          contextHandlers.navigate('enquiries');
        }
        break;

      case ACTION_TYPES.OPEN_MARKET_MATCHES:
        if (contextHandlers.navigate) {
          contextHandlers.navigate('matches', entities?.filterCategory);
        }
        break;

      case ACTION_TYPES.CHANGE_LANGUAGE:
        if (contextHandlers.changeLanguage && entities?.language) {
          contextHandlers.changeLanguage(entities.language);
        } else if (contextHandlers.openLanguageModal) {
          contextHandlers.openLanguageModal();
        }
        break;

      case ACTION_TYPES.OPEN_PROFILE:
        if (contextHandlers.navigate) {
          contextHandlers.navigate('registration');
        }
        break;


      case ACTION_TYPES.ANSWER_FAQ:
        // Speech announced; if follow-up action present, offer choice
        if (followUpAction && contextHandlers.offerFollowUp) {
          contextHandlers.offerFollowUp(followUpAction);
        }
        break;

      case ACTION_TYPES.NAVIGATE:
        if (contextHandlers.navigate && target_screen) {
          contextHandlers.navigate(target_screen);
        }
        break;

      default:
        if (contextHandlers.navigate && target_screen) {
          contextHandlers.navigate(target_screen);
        }
        break;
    }

    return { success: true, executed_action: action, route };
  }
}
