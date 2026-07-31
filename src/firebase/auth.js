// Re-export auth from new config
export { auth } from '@/firebase/config';
export {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
