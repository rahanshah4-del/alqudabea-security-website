/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

const ADMIN_EMAIL = 'admin@nexora.com';
const ADMIN_PASS = '12345';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth) { setLoading(false); return; }
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  const login = useCallback(async (email, password) => {
    if (!auth) { setError('Authentication unavailable — Firebase not configured.'); return false; }
    setLoading(true); setError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      return true;
    } catch (err) {
      if (err.code === 'auth/user-not-found' && email === ADMIN_EMAIL) {
        try {
          const cred = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASS);
          setUser(cred.user);
          return true;
        } catch (e) { setError(e.message); return false; }
      }
      setError(err.message.replace('Firebase: ', '').replace(/\(auth\/.*\)/, ''));
      return false;
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth); setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, error, login, logout }), [user, loading, error, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
