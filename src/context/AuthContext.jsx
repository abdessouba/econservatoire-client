import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { getAuthData } from '../api/eleveService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const syncAuthUser = async () => {
    const response = await getAuthData();
    const nextUser = response.data?.data ?? response.data ?? null;
    setUser(nextUser);
    setAuthenticated(true);
    return nextUser;
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await syncAuthUser();
      } catch {
        setAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      authenticated,
      loading,
      login: async () => {
        return syncAuthUser();
      },
      logout: () => {
        setUser(null);
        setAuthenticated(false);
      },
    }),
    [user, authenticated, loading],
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
