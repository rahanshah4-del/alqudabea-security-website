/**
 * Firebase initialization — production-ready.
 * All keys must come from environment variables.
 * No hardcoded fallback values in production.
 */
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID,
};

let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

// Log which env vars are present (without exposing values)
if (typeof window !== 'undefined') {
  const missing = [];
  if (!firebaseConfig.apiKey) missing.push('VITE_FIREBASE_API_KEY');
  if (!firebaseConfig.authDomain) missing.push('VITE_FIREBASE_AUTH_DOMAIN');
  if (!firebaseConfig.projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
  if (missing.length > 0) {
    console.warn(`[Firebase] Missing env vars: ${missing.join(', ')}. Auth will not work.`);
  }
}

try {
  if (firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('[Firebase] Initialized successfully — project:', firebaseConfig.projectId);
    if (typeof window !== 'undefined') {
      isSupported().then((yes) => { if (yes) { analytics = getAnalytics(app); } });
    }
  } else {
    console.warn('[Firebase] Config missing — running without backend. Copy .env.example to .env for full features.');
  }
} catch (e) {
  console.error('[Firebase] Init failed:', e.message, e);
}

export { auth, db, storage, analytics };
export default app;
