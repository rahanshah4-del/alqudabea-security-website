/**
 * Firestore & Storage CRUD Services — production-ready.
 * Modular, tree-shakeable, with error handling on every operation.
 */
import { db, storage } from '@/firebase/config';
import { collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy, limit, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// ── Error Handler ────────────────────────────────────────
function handleError(op, err) {
  console.error(`[Firebase] ${op} failed:`, err.message);
  throw err;
}

// ── Generic CRUD ─────────────────────────────────────────
export async function getCollection(path, ...constraints) {
  try {
    const q = constraints.length > 0 ? query(collection(db, path), ...constraints) : collection(db, path);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) { handleError(`getCollection(${path})`, e); return []; }
}

export async function getDocument(path, id) {
  try { const snap = await getDoc(doc(db, path, id)); return snap.exists() ? { id: snap.id, ...snap.data() } : null; }
  catch (e) { handleError(`getDocument(${path}/${id})`, e); return null; }
}

export async function addDocument(path, data) {
  try { const ref = await addDoc(collection(db, path), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }); return ref.id; }
  catch (e) { handleError(`addDocument(${path})`, e); return null; }
}

export async function setDocument(path, id, data) {
  try { await setDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() }, { merge: true }); }
  catch (e) { handleError(`setDocument(${path}/${id})`, e); }
}

export async function updateDocument(path, id, data) {
  try { await updateDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() }); }
  catch (e) { handleError(`updateDocument(${path}/${id})`, e); }
}

export async function deleteDocument(path, id) {
  try { await deleteDoc(doc(db, path, id)); }
  catch (e) { handleError(`deleteDocument(${path}/${id})`, e); }
}

export function listenCollection(path, callback, ...constraints) {
  const q = constraints.length > 0 ? query(collection(db, path), ...constraints) : collection(db, path);
  return onSnapshot(q, (snap) => { callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); }, (e) => handleError(`listenCollection(${path})`, e));
}

// ── Storage ──────────────────────────────────────────────
export async function uploadFile(path, file) {
  try { const storageRef = ref(storage, path); const snap = await uploadBytes(storageRef, file); return getDownloadURL(snap.ref); }
  catch (e) { handleError(`uploadFile(${path})`, e); return null; }
}

export async function deleteFile(path) {
  try { await deleteObject(ref(storage, path)); }
  catch (e) { handleError(`deleteFile(${path})`, e); }
}

// ── Named Collection APIs ────────────────────────────────
export const GuardsAPI = {
  getAll: () => getCollection('guards'),
  add: (data) => addDocument('guards', data),
  update: (id, data) => updateDocument('guards', id, data),
  delete: (id) => deleteDocument('guards', id),
  listen: (cb) => listenCollection('guards', cb),
  uploadPhoto: (id, file) => uploadFile(`guards/${id}/photo`, file),
};

export const ClientsAPI = {
  getAll: () => getCollection('clients'),
  add: (data) => addDocument('clients', data),
  update: (id, data) => updateDocument('clients', id, data),
  delete: (id) => deleteDocument('clients', id),
};

export const SitesAPI = { getAll: () => getCollection('sites'), add: (data) => addDocument('sites', data), update: (id, data) => updateDocument('sites', id, data), delete: (id) => deleteDocument('sites', id) };
export const AttendanceAPI = { getAll: () => getCollection('attendance'), clockIn: (guardId, data) => addDocument('attendance', { guardId, type: 'in', timestamp: serverTimestamp(), ...data }), clockOut: (guardId, data) => addDocument('attendance', { guardId, type: 'out', timestamp: serverTimestamp(), ...data }) };
export const IncidentsAPI = { getAll: () => getCollection('incidents', orderBy('createdAt', 'desc')), add: (data) => addDocument('incidents', { ...data, status: 'Open', createdAt: serverTimestamp() }), update: (id, data) => updateDocument('incidents', id, data) };
export const VehiclesAPI = { getAll: () => getCollection('vehicles'), add: (data) => addDocument('vehicles', data), update: (id, data) => updateDocument('vehicles', id, data) };
export const NotificationsAPI = { getAll: () => getCollection('notifications', orderBy('createdAt', 'desc'), limit(20)), listen: (cb) => listenCollection('notifications', cb, orderBy('createdAt', 'desc'), limit(20)), markRead: (id) => updateDocument('notifications', id, { read: true }), add: (data) => addDocument('notifications', { ...data, read: false, createdAt: serverTimestamp() }) };
export const CompanyAPI = { get: () => getCollection('company', limit(1)).then((r) => r[0] || null), update: (data) => getCollection('company', limit(1)).then((r) => { if (r[0]) { return setDocument('company', r[0].id, data); } return addDocument('company', data); }) };
export const MarketingAPI = { getAll: () => getCollection('marketing', orderBy('createdAt', 'desc')), add: (data) => addDocument('marketing', { ...data, createdAt: serverTimestamp() }), update: (id, data) => updateDocument('marketing', id, data), delete: (id) => deleteDocument('marketing', id) };
