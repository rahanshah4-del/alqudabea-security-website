/**
 * Production Admin Data Service — ALQUDABEA Security Services W.L.L.
 *
 * All functions fetch from Firestore. Each returns a promise.
 * Callers should handle loading and empty states.
 */
import { db } from '@/firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

function mapDocs(snap) {
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function fetchAll(path, ...constraints) {
  if (!db) return [];
  try {
    const q = constraints.length > 0 ? query(collection(db, path), ...constraints) : collection(db, path);
    const snap = await getDocs(q);
    return mapDocs(snap);
  } catch (e) {
    console.error(`[AdminData] fetchAll(${path}) failed:`, e.message);
    return [];
  }
}

// ── Core Stats ────────────────────────────────────────────
export async function getDashboardStats() {
  const [guards, incidents, patrols, visitors] = await Promise.all([
    fetchAll('guards'),
    fetchAll('incidents'),
    fetchAll('patrols'),
    fetchAll('visitors'),
  ]);

  return {
    guardsOnDuty: guards.filter((g) => g.status === 'On Duty').length,
    guardsOffDuty: guards.filter((g) => g.status !== 'On Duty').length,
    totalGuards: guards.length,
    activeIncidents: incidents.filter((i) => i.status === 'Open').length,
    activePatrols: patrols.filter((p) => p.status === 'Active').length,
    visitorsToday: visitors.length,
    lastUpdated: new Date().toISOString(),
  };
}

// ── Activity Feed ─────────────────────────────────────────
export async function getActivityFeed() {
  const docs = await fetchAll('notifications', orderBy('createdAt', 'desc'), limit(10));
  return docs.map((a) => ({
    id: a.id,
    user: a.user || 'System',
    action: a.title || '',
    target: a.desc || '',
    time: a.createdAt?.toDate ? a.createdAt.toDate().toLocaleTimeString() : '—',
  }));
}

// ── Guards ────────────────────────────────────────────────
export async function getGuards() {
  return fetchAll('guards');
}

// ── Attendance ────────────────────────────────────────────
export async function getAttendance() {
  return fetchAll('attendance');
}

// ── Shifts ────────────────────────────────────────────────
export async function getShifts() {
  const docs = await fetchAll('shifts');
  return {
    morning: docs.filter((s) => s.shift === 'morning'),
    evening: docs.filter((s) => s.shift === 'evening'),
    night: docs.filter((s) => s.shift === 'night'),
  };
}

// ── Clients ───────────────────────────────────────────────
export async function getClients() {
  return fetchAll('clients');
}

// ── Sites ─────────────────────────────────────────────────
export async function getSites() {
  return fetchAll('sites');
}

// ── Vehicles ──────────────────────────────────────────────
export async function getVehicles() {
  return fetchAll('vehicles');
}

// ── Finance ───────────────────────────────────────────────
export async function getFinance() {
  const invoices = await fetchAll('invoices');
  return { invoices };
}

// ── Notifications ─────────────────────────────────────────
export async function getNotifications() {
  return fetchAll('notifications', orderBy('createdAt', 'desc'), limit(20));
}

// ── Shifts by type ────────────────────────────────────────
export async function getShiftsByType(type) {
  const docs = await fetchAll('shifts');
  return docs.filter((s) => s.shift === type);
}
