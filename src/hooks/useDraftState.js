import { useEffect, useState } from 'react';

/**
 * Like useState, but automatically persists the value to sessionStorage and
 * restores it on mount. Used to avoid losing a partially filled registration
 * form when the page is accidentally reloaded.
 *
 * Sensitive keys (e.g. password) can be excluded from persistence.
 */
export function useDraftState(storageKey, initialState, excludeKeys = []) {
  const [state, setState] = useState(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return initialState;
      const parsed = JSON.parse(raw);
      return { ...initialState, ...parsed };
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      const toStore = { ...state };
      excludeKeys.forEach((key) => {
        delete toStore[key];
      });
      sessionStorage.setItem(storageKey, JSON.stringify(toStore));
    } catch {
      // Ignore storage failures (private browsing, quota, etc.)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  return [state, setState, clearDraft];
}
