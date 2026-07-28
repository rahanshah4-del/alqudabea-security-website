/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AdminAuthContext = createContext(null);

const VALID_CREDENTIALS = {
  email: 'admin@nexora.com',
  password: '12345',
};

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('admin_user')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = useCallback(async (email, password) => {
    setLoading(true); setError('');
    await new Promise((r) => setTimeout(r, 800));
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const u = { email, name: 'Admin', role: 'Administrator' };
      sessionStorage.setItem('admin_user', JSON.stringify(u));
      setUser(u);
      setLoading(false);
      return true;
    }
    setError('Invalid credentials');
    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin_user');
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, error, login, logout }), [user, loading, error, login, logout]);
  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() { return useContext(AdminAuthContext); }
