import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getApp } from '@/firebase/app';

/**
 * Lazy-initialized Firebase Auth instance.
 *
 * @returns {import('firebase/auth').Auth}
 */
export function auth() {
  return getAuth(getApp());
}

/**
 * Sign in with email and password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth(), email, password);
}

/**
 * Sign out the current user.
 *
 * @returns {Promise<void>}
 */
export async function signOut() {
  return firebaseSignOut(auth());
}

/**
 * Create a new user account with email and password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth(), email, password);
}

/**
 * Send a password reset email.
 *
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function resetPassword(email) {
  return sendPasswordResetEmail(auth(), email);
}

/**
 * Listen for authentication state changes.
 *
 * @param {(user: import('firebase/auth').User | null) => void} callback
 * @returns {() => void} Unsubscribe function.
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth(), callback);
}
