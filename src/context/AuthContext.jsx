/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

const LOGIN_TIMEOUT_MS = 15000;
const INIT_TIMEOUT_MS = 8000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Firebase auth state listener ──────────────────────────
  useEffect(() => {
    if (!auth) {
      setInitializing(false);
      return;
    }

    const unsub = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setInitializing(false);
      },
      (err) => {
        console.error('[Auth] State change error:', err.message);
        setInitializing(false);
      },
    );

    // Safety timeout so the UI never hangs on init
    const safety = setTimeout(() => setInitializing(false), INIT_TIMEOUT_MS);

    return () => {
      unsub();
      clearTimeout(safety);
    };
  }, []);

  // ── Login ────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    if (!auth) {
      setError('Authentication service unavailable. Please check your connection.');
      return false;
    }

    setLoginLoading(true);
    setError('');

    try {
      const result = await Promise.race([
        signInWithEmailAndPassword(auth, email, password),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Login timed out — please try again.')), LOGIN_TIMEOUT_MS),
        ),
      ]);

      // onAuthStateChanged will also fire and set user — this is fine,
      // React batches state updates so no double render.
      setUser(result.user);
      return true;
    } catch (err) {
      const friendly =
        {
          'auth/invalid-credential': 'Invalid email or password.',
          'auth/user-not-found': 'No account found with this email.',
          'auth/wrong-password': 'Invalid email or password.',
          'auth/invalid-email': 'Please enter a valid email address.',
          'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
          'auth/network-request-failed': 'Network error. Please check your connection.',
        }[err.code] ||
        err.message?.replace('Firebase: ', '').replace(/\(auth\/[^)]*\)\.?\s*/g, '').trim() ||
        'Login failed. Please try again.';

      setError(friendly);
      return false;
    } finally {
      setLoginLoading(false);
    }
  }, []);

  // ── Logout ───────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('[Auth] Sign out error:', err.message);
    }
    setUser(null);
    setError('');
  }, []);

  // ── Context value ────────────────────────────────────────
  const value = useMemo(
    () => ({
      user,
      /** True while Firebase is checking the initial auth state */
      initializing,
      /** True only during an active login attempt (for button spinner) */
      loginLoading,
      error,
      login,
      logout,
      /** Auth system is ready — safe to make routing decisions */
      isReady: !initializing,
    }),
    [user, initializing, loginLoading, error, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
