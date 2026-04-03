import messages from '@/messages/en.json';

/**
 * A type-safe constant mapping of our translation keys, derived directly from en.json.
 * This prevents the need to manually sync keys between the JSON and our code.
 *
 * Benefits:
 * 1. Single source of truth (en.json).
 * 2. Full IDE autocomplete based on actual keys.
 * 3. Type-safe localization throughout the app.
 */
export const LS = messages;

// Re-exporting the type for use in other parts of the application if needed.
export type TranslationMessages = typeof messages;
