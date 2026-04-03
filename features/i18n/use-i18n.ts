import { useTranslations } from 'next-intl';

import { LS, type TranslationMessages } from './ls';

/**
 * An autocompletable proxy for your translations.
 * Usage:
 *   const { Details } = useI18n();
 *   return <div>{Details.height}</div>;
 */
export function useI18n() {
  // We grab the root translator to allow dot-notated access to everything.
  const t = useTranslations();

  // A generic proxy handler that recursively calls t() for leaf nodes.
  const createProxy = (namespace: string): any => {
    return new Proxy(
      {},
      {
        get(_, key: string) {
          const fullKey = namespace ? `${namespace}.${key}` : key;

          // If the key exists in our LS map as a branch, return another proxy level.
          // If it's a leaf node, we return the translated string.
          const value = getNestedValue(LS, fullKey);

          if (typeof value === 'object') {
            return createProxy(fullKey);
          }

          return t(fullKey as any);
        },
      }
    );
  };

  return createProxy('') as TranslationMessages;
}

// Simple helper to check if we are at a branch or a leaf in our key map.
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
