/**
 * Internationalization (i18n) service for TRON Snap
 * Handles language detection, translation, and persistence
 */

import { translations, TranslationKey, TranslationStrings } from './translations';

export type SupportedLanguage = keyof typeof translations;

export class I18nService {
  private currentLanguage: SupportedLanguage = 'en';
  private static instance: I18nService | null = null;

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  private constructor() {
    this.initializeLanguage();
  }

  /**
   * Initialize language from stored preference or browser settings
   */
  private async initializeLanguage() {
    try {
      // Try to get stored language preference
      const state = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });
      
      const userLang = state?.userLanguage;
      if (userLang && typeof userLang === 'string' && this.isValidLanguage(userLang)) {
        this.currentLanguage = userLang;
      } else {
        // Detect from browser if no preference stored
        this.currentLanguage = this.detectBrowserLanguage();
      }
    } catch (error) {
      console.error('Failed to initialize language:', error);
      this.currentLanguage = 'en';
    }
  }

  /**
   * Detect language from browser settings
   */
  private detectBrowserLanguage(): SupportedLanguage {
    // Navigator is not available in snap environment, default to English
    return 'en';
  }

  /**
   * Check if language is supported
   */
  private isValidLanguage(lang: string): lang is SupportedLanguage {
    return lang in translations;
  }

  /**
   * Get current language
   */
  getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  /**
   * Set language and persist preference
   */
  async setLanguage(language: SupportedLanguage): Promise<void> {
    if (!this.isValidLanguage(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    this.currentLanguage = language;
    
    // Persist language preference
    try {
      const state = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      }) || {};
      
      await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: {
            ...state,
            userLanguage: language,
          },
        },
      });
    } catch (error) {
      console.error('Failed to persist language preference:', error);
    }
  }

  /**
   * Get translated text
   */
  t(key: TranslationKey, params?: Record<string, string>): string {
    // Get translation from current language or fallback to English
    const currentLang = translations[this.currentLanguage] as any;
    const englishLang = translations['en'] as any;
    
    const translation = currentLang?.[key] || englishLang?.[key] || key;
    
    if (!params || typeof translation !== 'string') {
      return translation;
    }
    
    // Replace template variables
    return Object.entries(params).reduce((text, [key, value]) => {
      return text.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }, translation);
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages(): Array<{ code: SupportedLanguage; name: string }> {
    return [
      { code: 'en', name: 'English' },
      { code: 'zh', name: '中文' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'ja', name: '日本語' },
    ];
  }
}

// Export singleton instance
export const i18n = I18nService.getInstance();