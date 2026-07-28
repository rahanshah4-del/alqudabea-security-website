import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { getApp } from '@/firebase/app';

/**
 * Lazy-initialized Firestore instance.
 *
 * @returns {import('firebase/firestore').Firestore}
 */
export function db() {
  return getFirestore(getApp());
}

// Re-export Firestore helpers for convenience.
// Import directly from this module rather than 'firebase/firestore'
// to ensure the correct app instance is used.
export {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
};
