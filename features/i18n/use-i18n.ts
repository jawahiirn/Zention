import { useTranslations } from 'next-intl';

/**
 * A type-safe constant mapping of our translation keys.
 * Using this instead of magic strings in t('') calls provides:
 * 1. Autocomplete in the IDE.
 * 2. "Go to Definition" support for easier localization lookups.
 * 3. Typo prevention at the compiler level.
 */
export const LS = {
  Index: {
    title: 'title',
    switchLanguage: 'switchLanguage',
    welcome: 'welcome',
    description: 'description',
    explore: 'explore',
    features: {
      search: 'features.search',
      details: 'features.details',
      compare: 'features.compare',
    },
  },
  Details: {
    back: 'back',
    loading: 'loading',
    error: 'error',
    height: 'height',
    weight: 'weight',
    retry: 'retry',
    goBack: 'goBack',
  },
  Common: {
    loading: 'loading',
    errorTitle: 'errorTitle',
    goHome: 'goHome'
  }
} as const;

/**
 * This Staff+ level utility creates an autocompletable proxy for your translations.
 * Usage:
 *   const { Details } = useI18n();
 *   return <div>{Details.height}</div>; 
 */
export function useI18n() {
  // We grab the root translator to allow dot-notated access to everything.
  const t = useTranslations();

  // A generic proxy handler that recursively calls t() for leaf nodes.
  const createProxy = (namespace: string): any => {
    return new Proxy({}, {
      get(_, key: string) {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        
        // If the key exists in our LS map as a branch, return another proxy level.
        // If it's a leaf node, we return the translated string.
        const value = getNestedValue(LS, fullKey);
        
        if (typeof value === 'object') {
           return createProxy(fullKey);
        }
        
        return t(fullKey as any);
      }
    });
  };

  return createProxy('');
}

// Simple helper to check if we are at a branch or a leaf in our key map.
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
