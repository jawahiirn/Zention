import { useEffect, useCallback } from 'react';

type ShortcutConfig = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
};

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      shortcuts.forEach(
        ({ key, ctrlKey, metaKey, shiftKey, altKey, callback }) => {
          if (
            event.key.toLowerCase() === key.toLowerCase() &&
            !!event.ctrlKey === !!ctrlKey &&
            !!event.metaKey === !!metaKey &&
            !!event.shiftKey === !!shiftKey &&
            !!event.altKey === !!altKey
          ) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            callback();
            return;
          }
        }
      );
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [onKeyDown]);
};
