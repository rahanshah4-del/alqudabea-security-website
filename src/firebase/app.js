import { initializeApp, getApps } from 'firebase/app';
import { getFirebaseConfig } from '@/firebase/config';

/**
 * Lazy-initialized Firebase app instance.
 *
 * Firebase is initialized only once — subsequent calls return the existing
 * instance. If Firebase hasn't been initialized yet (e.g. first import),
 * it creates the app with the config from environment variables.
 *
 * @returns {import('firebase/app').FirebaseApp}
 */
export function getApp() {
  const apps = getApps();

  if (apps.length > 0) {
    return apps[0];
  }

  return initializeApp(getFirebaseConfig());
}
