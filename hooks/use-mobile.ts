import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

function getMobileSnapshot() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function useIsMobile() {
  const isMobile = useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    getMobileSnapshot,
    () => false
  );
  return isMobile;
}
