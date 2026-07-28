/**
 * Firebase configuration.
 *
 * Values are sourced from environment variables prefixed with VITE_FIREBASE_.
 * These are bundled at build time by Vite — never hardcode secrets.
 *
 * @see /.env.example for the full list of required variables.
 */

/** @returns {import('firebase/app').FirebaseOptions} */
export function getFirebaseConfig() {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Firebase configuration is incomplete. Missing env vars: ${missing.join(', ')}. ` +
        'Copy .env.example to .env and fill in your Firebase project values.',
    );
  }

  return config;
}
