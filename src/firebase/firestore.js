// Re-export Firestore from new config
export { db, storage } from '@/firebase/config';
export { collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp, onSnapshot } from 'firebase/firestore';
