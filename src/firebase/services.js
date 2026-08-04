/**
 * Firestore & Storage CRUD Services — production-ready.
 * Modular, tree-shakeable, with error handling on every operation.
 */
import { db, storage } from '@/firebase/config';
import { collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy, limit, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

function handleError(op, err) {
  if (err.message === 'Firebase not configured') { console.warn(`[Firebase] ${op} skipped — not configured`); return null; }
  console.error(`[Firebase] ${op} failed:`, err.message);
  throw err;
}

function checkDb() { if (!db) { throw new Error('Firebase not configured'); } }
function checkStorage() { if (!storage) { throw new Error('Firebase Storage not configured'); } }

// ── Generic CRUD ─────────────────────────────────────────
export async function getCollection(path, ...constraints) {
  try { checkDb(); const q = constraints.length > 0 ? query(collection(db, path), ...constraints) : collection(db, path); const snap = await getDocs(q); return snap.docs.map((d) => ({ id: d.id, ...d.data() })); }
  catch (e) { return handleError(`getCollection(${path})`, e) || []; }
}
export async function getDocument(path, id) {
  try { checkDb(); const snap = await getDoc(doc(db, path, id)); return snap.exists() ? { id: snap.id, ...snap.data() } : null; }
  catch (e) { return handleError(`getDocument(${path}/${id})`, e) || null; }
}
export async function addDocument(path, data) {
  try { checkDb(); const r = await addDoc(collection(db, path), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }); return r.id; }
  catch (e) { return handleError(`addDocument(${path})`, e) || null; }
}
export async function setDocument(path, id, data) {
  try { checkDb(); await setDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() }, { merge: true }); }
  catch (e) { handleError(`setDocument(${path}/${id})`, e); }
}
export async function updateDocument(path, id, data) {
  try { checkDb(); await updateDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() }); }
  catch (e) { handleError(`updateDocument(${path}/${id})`, e); }
}
export async function deleteDocument(path, id) {
  try { checkDb(); await deleteDoc(doc(db, path, id)); }
  catch (e) { handleError(`deleteDocument(${path}/${id})`, e); }
}
export function listenCollection(path, callback, ...constraints) {
  if (!db) { console.warn('[Firebase] listenCollection skipped — not configured'); return () => {}; }
  const q = constraints.length > 0 ? query(collection(db, path), ...constraints) : collection(db, path);
  return onSnapshot(q, (snap) => { callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); }, (e) => { handleError(`listenCollection(${path})`, e); });
}

// ── Storage ──────────────────────────────────────────────
export async function uploadFile(path, file) {
  try { checkStorage(); const storageRef = ref(storage, path); const snap = await uploadBytes(storageRef, file); return getDownloadURL(snap.ref); }
  catch (e) { return handleError(`uploadFile(${path})`, e) || null; }
}
export async function deleteFile(path) {
  try { checkStorage(); await deleteObject(ref(storage, path)); }
  catch (e) { handleError(`deleteFile(${path})`, e); }
}

// ── Named Collection APIs ────────────────────────────────
export const GuardsAPI = {
  getAll: () => getCollection('guards'),
  getById: (id) => getDocument('guards', id),
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
  listen: (cb) => listenCollection('clients', cb),
};

export const SitesAPI = {
  getAll: () => getCollection('sites'),
  add: (data) => addDocument('sites', data),
  update: (id, data) => updateDocument('sites', id, data),
  delete: (id) => deleteDocument('sites', id),
  listen: (cb) => listenCollection('sites', cb),
};

export const AttendanceAPI = {
  getAll: () => getCollection('attendance'),
  clockIn: (guardId, data) => addDocument('attendance', { guardId, type: 'in', timestamp: serverTimestamp(), ...data }),
  clockOut: (guardId, data) => addDocument('attendance', { guardId, type: 'out', timestamp: serverTimestamp(), ...data }),
  listen: (cb) => listenCollection('attendance', cb),
};

export const IncidentsAPI = {
  getAll: () => getCollection('incidents', orderBy('createdAt', 'desc')),
  add: (data) => addDocument('incidents', { ...data, status: 'Open', createdAt: serverTimestamp() }),
  update: (id, data) => updateDocument('incidents', id, data),
  delete: (id) => deleteDocument('incidents', id),
  listen: (cb) => listenCollection('incidents', cb, orderBy('createdAt', 'desc')),
};

export const VehiclesAPI = {
  getAll: () => getCollection('vehicles'),
  add: (data) => addDocument('vehicles', data),
  update: (id, data) => updateDocument('vehicles', id, data),
  delete: (id) => deleteDocument('vehicles', id),
  listen: (cb) => listenCollection('vehicles', cb),
};

export const ShiftsAPI = {
  getAll: () => getCollection('shifts'),
  add: (data) => addDocument('shifts', data),
  update: (id, data) => updateDocument('shifts', id, data),
  delete: (id) => deleteDocument('shifts', id),
  listen: (cb) => listenCollection('shifts', cb),
};

export const VisitorsAPI = {
  getAll: () => getCollection('visitors'),
  add: (data) => addDocument('visitors', data),
  update: (id, data) => updateDocument('visitors', id, data),
  delete: (id) => deleteDocument('visitors', id),
  listen: (cb) => listenCollection('visitors', cb),
};

export const NotificationsAPI = {
  getAll: () => getCollection('notifications', orderBy('createdAt', 'desc'), limit(20)),
  listen: (cb) => listenCollection('notifications', cb, orderBy('createdAt', 'desc'), limit(20)),
  markRead: (id) => updateDocument('notifications', id, { read: true }),
  add: (data) => addDocument('notifications', { ...data, read: false, createdAt: serverTimestamp() }),
  delete: (id) => deleteDocument('notifications', id),
};

export const CompanyAPI = {
  get: () => getCollection('company', limit(1)).then((r) => r[0] || null),
  update: (data) => getCollection('company', limit(1)).then((r) => { if (r[0]) { return setDocument('company', r[0].id, data); } return addDocument('company', data); }),
  listen: (cb) => listenCollection('company', cb),
};

export const MarketingAPI = {
  getAll: () => getCollection('marketing', orderBy('createdAt', 'desc')),
  add: (data) => addDocument('marketing', { ...data, createdAt: serverTimestamp() }),
  update: (id, data) => updateDocument('marketing', id, data),
  delete: (id) => deleteDocument('marketing', id),
  listen: (cb) => listenCollection('marketing', cb, orderBy('createdAt', 'desc')),
};

export const UsersAPI = {
  getAll: () => getCollection('users'),
  add: (data) => addDocument('users', data),
  update: (id, data) => updateDocument('users', id, data),
  delete: (id) => deleteDocument('users', id),
  listen: (cb) => listenCollection('users', cb),
};

export const PatrolsAPI = {
  getAll: () => getCollection('patrols'),
  add: (data) => addDocument('patrols', data),
  update: (id, data) => updateDocument('patrols', id, data),
  delete: (id) => deleteDocument('patrols', id),
  listen: (cb) => listenCollection('patrols', cb),
};

export const HrAPI = {
  getEmployees: () => getCollection('employees'),
  getInterviews: () => getCollection('interviews'),
  addEmployee: (data) => addDocument('employees', data),
  updateEmployee: (id, data) => updateDocument('employees', id, data),
  deleteEmployee: (id) => deleteDocument('employees', id),
  addInterview: (data) => addDocument('interviews', data),
  deleteInterview: (id) => deleteDocument('interviews', id),
  listenEmployees: (cb) => listenCollection('employees', cb),
  listenInterviews: (cb) => listenCollection('interviews', cb),
};

export const FinanceAPI = {
  getInvoices: () => getCollection('invoices'),
  getQuotes: () => getCollection('quotes'),
  addInvoice: (data) => addDocument('invoices', data),
  addQuote: (data) => addDocument('quotes', data),
  updateInvoice: (id, data) => updateDocument('invoices', id, data),
  updateQuote: (id, data) => updateDocument('quotes', id, data),
  deleteInvoice: (id) => deleteDocument('invoices', id),
  deleteQuote: (id) => deleteDocument('quotes', id),
  listenInvoices: (cb) => listenCollection('invoices', cb),
  listenQuotes: (cb) => listenCollection('quotes', cb),
};

export const ComplaintsAPI = {
  getAll: () => getCollection('complaints'),
  add: (data) => addDocument('complaints', data),
  update: (id, data) => updateDocument('complaints', id, data),
  delete: (id) => deleteDocument('complaints', id),
  listen: (cb) => listenCollection('complaints', cb),
};
