/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Theme values: 'light' | 'dark' | 'system'.
 *
 * Priority:
 *   1. User selection (stored in localStorage)
 *   2. System preference (prefers-color-scheme)
 *   3. Default: 'system'
 */
const THEME_STORAGE_KEY = 'alqudabea-theme';

/** @type {React.Context<{theme: string, resolved: 'light'|'dark', setTheme: (t: string) => void}>} */
const ThemeContext = createContext({
  theme: 'system',
  resolved: 'dark',
  setTheme: () => {},
});

/**
 * Resolve a theme value to 'light' or 'dark'.
 *
 * @param {string} theme — 'light' | 'dark' | 'system'
 * @returns {'light' | 'dark'}
 */
function resolveTheme(theme) {
  if (theme === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  }
  return theme === 'light' ? 'light' : 'dark';
}

/**
 * Apply the resolved theme to <html data-theme=""> and the meta theme-color.
 *
 * @param {'light' | 'dark'} resolved
 */
function applyThemeToDOM(resolved) {
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);

  // Update theme-color meta tag for browser chrome
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', resolved === 'light' ? '#FFFFFF' : '#000000');
  }

  // Update color-scheme for native UI elements (scrollbars, form inputs, etc.)
  root.style.colorScheme = resolved;
}

/**
 * Theme provider.
 *
 * Wraps the application. Reads initial theme from localStorage (with system
 * fallback), listens for OS-level changes, and persists user overrides.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') { return 'system'; }
    return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
  });

  const resolved = useMemo(() => resolveTheme(theme), [theme]);

  // Apply on mount and whenever resolved changes
  useEffect(() => {
    applyThemeToDOM(resolved);
  }, [resolved]);

  // Listen for system theme changes when in 'system' mode
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) { return; }

    const mq = window.matchMedia('(prefers-color-scheme: light)');

    const handler = () => {
      if (theme === 'system') {
        const next = mq.matches ? 'light' : 'dark';
        applyThemeToDOM(next);
      }
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  // Persist and apply theme changes
  const setTheme = useCallback((next) => {
    setThemeState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    }
  }, []);

  const value = useMemo(() => ({ theme, resolved, setTheme }), [theme, resolved, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme and setter.
 *
 * @returns {{ theme: string, resolved: 'light' | 'dark', setTheme: (t: string) => void }}
 */
export function useTheme() {
  return useContext(ThemeContext);
}
