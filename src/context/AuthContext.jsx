import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'conservatoire.eleve';

export function AuthProvider({ children }) {
  const [eleve, setEleve] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (eleve) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eleve));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [eleve]);

  const value = useMemo(
    () => ({
      eleve,
      isAuthenticated: Boolean(eleve),
      login: (eleveSignInReponse) => setEleve(eleveSignInReponse),
      logout: () => setEleve(null),
    }),
    [eleve],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
  }
  return ctx;
}
