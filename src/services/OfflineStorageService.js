/**
 * OfflineStorageService (Phases 18 & 19)
 * Local draft persistence and automatic network synchronization
 */

const STORAGE_KEYS = {
  DRAFT_PRODUCT: 'artisan_offline_draft',
  UNSYNCED_QUEUE: 'artisan_unsynced_queue',
  OFFLINE_STATUS: 'artisan_network_status'
};

export class OfflineStorageService {
  /**
   * Save a product draft to local storage
   */
  static saveLocalDraft(draftData) {
    try {
      const payload = {
        ...draftData,
        saved_at: new Date().toISOString(),
        is_synced: false
      };
      localStorage.setItem(STORAGE_KEYS.DRAFT_PRODUCT, JSON.stringify(payload));
      return { success: true, message: 'Draft saved locally' };
    } catch (err) {
      console.warn('LocalStorage save error:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Retrieve saved offline draft
   */
  static getLocalDraft() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DRAFT_PRODUCT);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      return null;
    }
  }

  /**
   * Clear local draft after successful server publish
   */
  static clearLocalDraft() {
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAFT_PRODUCT);
    } catch (err) {}
  }

  /**
   * Register auto-sync listener when browser reconnects
   */
  static initAutoSync(syncCallback) {
    window.addEventListener('online', () => {
      const draft = OfflineStorageService.getLocalDraft();
      if (draft && !draft.is_synced && syncCallback) {
        syncCallback(draft);
      }
    });
  }
}
