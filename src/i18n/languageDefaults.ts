/**
 * Helper to create complete translations by merging with English defaults
 */
import { TranslationStrings } from './translations';

export function createTranslation(
  partialTranslation: Partial<TranslationStrings>,
  baseTranslation: TranslationStrings
): TranslationStrings {
  return { ...baseTranslation, ...partialTranslation };
}