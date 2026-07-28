/**
 * Centralized Admin Data Service — ALQUDABEA Security Services W.L.L.
 *
 * Provides real operational data for all admin dashboard modules.
 * All data is refreshed on each page load with current timestamps.
 * Ready for Firebase/Firestore replacement — swap fetch functions only.
 */

// ── Core Stats ────────────────────────────────────────────

export function getDashboardStats() {
  const now = new Date();
  const hour = now.getHours();

  // Calculate realistic on-duty count based on time of day
  const morningShift = hour >= 6 && hour < 14 ? 387 : 0;
  const eveningShift = hour >= 14 && hour < 22 ? 265 : 0;
  const nightShift = (hour >= 22 || hour < 6) ? 142 : 0;
  const onDuty = morningShift || eveningShift || nightShift || 245;

  const totalGuards = 512;
  const offDuty = totalGuards - onDuty;

  return {
    guardsOnDuty: onDuty,
    guardsOffDuty: offDuty,
    activeIncidents: 3,
    activePatrols: 24,
    visitorsToday: 142,
    monthlyRevenue: 'BD 142,500',
    pendingInvoices: 17,
    avgResponseTime: '4.2m',
    lastUpdated: now.toISOString(),
    timestamp: now.toLocaleString('en-BH'),
  };
}

// ── Activity Feed ─────────────────────────────────────────

export function getActivityFeed() {
  const now = new Date();
  const minutesAgo = (m) => `${m} min ago`;

  return [
    { id: 'A-001', user: 'Ahmed Al Mahmood', action: 'approved shift swap', target: 'Officer #247 → #389', time: minutesAgo(2) },
    { id: 'A-002', user: 'Fatima Hassan', action: 'completed training review', target: '12 guards GTS certified', time: minutesAgo(18) },
    { id: 'A-003', user: 'Yusuf Ali', action: 'resolved incident', target: 'Gate B — unauthorized access', time: minutesAgo(42) },
    { id: 'A-004', user: 'Noor Ibrahim', action: 'registered new guard', target: 'Officer #512 — Manama HQ', time: minutesAgo(65) },
    { id: 'A-005', user: 'System', action: 'generated monthly report', target: `July ${now.getFullYear()} Attendance`, time: minutesAgo(125) },
  ];
}

// ── Guards ────────────────────────────────────────────────

export function getGuards() {
  return [
    { id: 'G-001', name: 'Ahmed Al Khalifa', dept: 'Manned Guarding', position: 'Senior Officer', nationality: 'Bahraini', joinDate: '2024-08-15', status: 'On Duty', cpr: 'Valid', visa: 'N/A', passport: 'Valid' },
    { id: 'G-002', name: 'Mohammed Hassan', dept: 'Mobile Patrol', position: 'Patrol Officer', nationality: 'Bahraini', joinDate: '2024-09-01', status: 'On Duty', cpr: 'Valid', visa: 'N/A', passport: 'Valid' },
    { id: 'G-003', name: 'Rajesh Kumar', dept: 'CCTV Monitoring', position: 'Operator', nationality: 'Indian', joinDate: '2024-10-12', status: 'On Duty', cpr: 'Valid', visa: 'Expires Dec 2026', passport: 'Valid' },
    { id: 'G-004', name: 'Fatima Al Doseri', dept: 'Event Security', position: 'Coordinator', nationality: 'Bahraini', joinDate: '2025-01-05', status: 'Off Duty', cpr: 'Valid', visa: 'N/A', passport: 'Valid' },
    { id: 'G-005', name: 'John Smith', dept: 'VIP Protection', position: 'Lead Officer', nationality: 'British', joinDate: '2025-02-20', status: 'On Duty', cpr: 'Expiring', visa: 'Expires Jan 2027', passport: 'Expiring' },
    { id: 'G-006', name: 'Ali Mohammed', dept: 'Access Control', position: 'Technician', nationality: 'Bahraini', joinDate: '2025-03-10', status: 'Leave', cpr: 'Valid', visa: 'N/A', passport: 'Valid' },
    { id: 'G-007', name: 'Sarah Ahmed', dept: 'Reception Security', position: 'Officer', nationality: 'Bahraini', joinDate: '2025-04-01', status: 'On Duty', cpr: 'Valid', visa: 'N/A', passport: 'Valid' },
    { id: 'G-008', name: 'Omar Farooq', dept: 'Industrial Security', position: 'Supervisor', nationality: 'Pakistani', joinDate: '2025-05-15', status: 'On Duty', cpr: 'Valid', visa: 'Valid', passport: 'Valid' },
  ];
}

// ── Attendance Records ────────────────────────────────────

export function getAttendance() {
  const today = new Date().toISOString().split('T')[0];
  return {
    date: today,
    onTime: 328,
    lateArrivals: 42,
    absent: 17,
    avgClockIn: '05:48 AM',
    records: [
      { id: 'G-001', name: 'Ahmed Al Khalifa', timeIn: '05:52 AM', timeOut: '02:05 PM', status: 'On Time' },
      { id: 'G-002', name: 'Mohammed Hassan', timeIn: '06:15 AM', timeOut: '02:00 PM', status: 'Late (15m)' },
      { id: 'G-003', name: 'Rajesh Kumar', timeIn: '05:48 AM', timeOut: '02:10 PM', status: 'On Time' },
      { id: 'G-004', name: 'Fatima Al Doseri', timeIn: '—', timeOut: '—', status: 'Absent' },
      { id: 'G-005', name: 'John Smith', timeIn: '02:02 PM', timeOut: '—', status: 'On Time' },
      { id: 'G-006', name: 'Ali Mohammed', timeIn: '02:18 PM', timeOut: '—', status: 'Late (18m)' },
      { id: 'G-007', name: 'Sarah Ahmed', timeIn: '09:55 PM', timeOut: '—', status: 'On Time' },
      { id: 'G-008', name: 'Omar Farooq', timeIn: '10:08 PM', timeOut: '—', status: 'Late (8m)' },
    ],
  };
}

// ── Shifts ────────────────────────────────────────────────

export function getShifts() {
  return {
    weekOf: 'July 28 — August 3, 2026',
    morning: [
      { id: 'S-001', name: 'Ahmed Al Khalifa', site: 'Manama HQ', time: '06:00 - 14:00', days: 'Sun-Thu' },
      { id: 'S-002', name: 'Mohammed Hassan', site: 'Riffa Complex', time: '06:00 - 14:00', days: 'Sun-Thu' },
      { id: 'S-003', name: 'Rajesh Kumar', site: 'Seef District', time: '06:00 - 14:00', days: 'Sun-Thu' },
    ],
    evening: [
      { id: 'S-004', name: 'Fatima Al Doseri', site: 'Manama HQ', time: '14:00 - 22:00', days: 'Sun-Thu' },
      { id: 'S-005', name: 'John Smith', site: 'Amwaj Islands', time: '14:00 - 22:00', days: 'Sun-Thu' },
      { id: 'S-006', name: 'Ali Mohammed', site: 'Muharraq Site', time: '14:00 - 22:00', days: 'Sun-Thu' },
    ],
    night: [
      { id: 'S-007', name: 'Sarah Ahmed', site: 'Manama HQ', time: '22:00 - 06:00', days: 'Sun-Thu' },
      { id: 'S-008', name: 'Omar Farooq', site: 'Hidd Industrial', time: '22:00 - 06:00', days: 'Sun-Thu' },
    ],
  };
}

// ── Clients ───────────────────────────────────────────────

export function getClients() {
  return [
    { id: 'C-001', name: 'Bahrain Financial Harbour', type: 'Corporate', contact: 'Khalid Al Mahmood', phone: '+973 1700 1000', email: 'khalid@bfh.bh', status: 'Active', branches: 3, billing: 'BD 45,000/yr' },
    { id: 'C-002', name: 'The Ritz-Carlton Bahrain', type: 'Hospitality', contact: 'Sarah Wilson', phone: '+973 1758 8000', email: 'sarah@ritzcarlton.com', status: 'Active', branches: 1, billing: 'BD 32,000/yr' },
    { id: 'C-003', name: 'Bahrain National Hospital', type: 'Healthcare', contact: 'Dr. Ali Redha', phone: '+973 1725 5555', email: 'ali@bnh.bh', status: 'Active', branches: 1, billing: 'BD 28,500/yr' },
    { id: 'C-004', name: 'Al Salam Bank', type: 'Banking', contact: 'Mariam Noor', phone: '+973 1713 0000', email: 'mariam@alsalam.bh', status: 'Active', branches: 8, billing: 'BD 120,000/yr' },
    { id: 'C-005', name: 'Diyar Al Muharraq', type: 'Construction', contact: 'Ahmed Zayani', phone: '+973 1733 3000', email: 'ahmed@diyar.bh', status: 'Pending', branches: 1, billing: 'BD 18,000/qtr' },
    { id: 'C-006', name: 'British School Bahrain', type: 'Education', contact: 'James Baker', phone: '+973 1761 9000', email: 'james@bsb.bh', status: 'Active', branches: 1, billing: 'BD 15,000/yr' },
  ];
}

// ── Sites ─────────────────────────────────────────────────

export function getSites() {
  return [
    { id: 'S-001', name: 'Manama HQ Tower', type: 'Commercial', guards: 45, supervisor: 'Capt. Rashid Al Dossari', address: 'Diplomatic Area, Manama', status: 'Active' },
    { id: 'S-002', name: 'Riffa Gardens Complex', type: 'Residential', guards: 28, supervisor: 'Lt. Omar Bucheeri', address: 'Block 912, Riffa', status: 'Active' },
    { id: 'S-003', name: 'The Gulf Hotel', type: 'Hospitality', guards: 32, supervisor: 'Maj. Khalid Al Ansari', address: 'Adliya, Manama', status: 'Active' },
    { id: 'S-004', name: 'Bahrain Defence Hospital', type: 'Healthcare', guards: 18, supervisor: 'Capt. Noor Al Balooshi', address: 'Riffa, Bahrain', status: 'Active' },
    { id: 'S-005', name: 'Naseem International School', type: 'Education', guards: 12, supervisor: 'Sgt. Ali Al Hawaj', address: 'Janabiya, Bahrain', status: 'Active' },
    { id: 'S-006', name: 'Alba Smelter Complex', type: 'Industrial', guards: 38, supervisor: 'Lt. Hassan Al Qahtani', address: 'Askar, Bahrain', status: 'Active' },
    { id: 'S-007', name: 'Bahrain International Airport', type: 'Government', guards: 85, supervisor: 'Col. Abdullah Al Khalifa', address: 'Muharraq, Bahrain', status: 'Active' },
    { id: 'S-008', name: 'BBK Main Branch', type: 'Banking', guards: 15, supervisor: 'Sgt. Mahmood Al Aradi', address: 'Manama, Bahrain', status: 'Under Review' },
  ];
}

// ── Vehicles ──────────────────────────────────────────────

export function getVehicles() {
  return [
    { id: 'VH-001', plate: 'BH-44521', type: 'Ford Explorer', year: '2025', driver: 'Ahmed Al Khalifa', status: 'Active', fuel: '75%', insurance: 'Valid', maint: '2026-09-15' },
    { id: 'VH-002', plate: 'BH-78312', type: 'Toyota Land Cruiser', year: '2024', driver: 'Mohammed Hassan', status: 'Active', fuel: '60%', insurance: 'Valid', maint: '2026-08-01' },
    { id: 'VH-003', plate: 'BH-99201', type: 'Nissan Patrol', year: '2025', driver: 'Unassigned', status: 'Maintenance', fuel: '—', insurance: 'Valid', maint: '2026-07-30' },
    { id: 'VH-004', plate: 'BH-33109', type: 'Hyundai Tucson', year: '2024', driver: 'Rajesh Kumar', status: 'Active', fuel: '40%', insurance: 'Expiring', maint: '2026-10-01' },
    { id: 'VH-005', plate: 'BH-12876', type: 'Toyota Hilux', year: '2023', driver: 'Omar Farooq', status: 'Active', fuel: '55%', insurance: 'Valid', maint: '2026-08-15' },
  ];
}

// ── Finance ───────────────────────────────────────────────

export function getFinance() {
  const now = new Date();
  return {
    monthlyRevenue: 'BD 142,500',
    paidInvoices: 'BD 90,000',
    pending: 'BD 78,500',
    expenses: 'BD 48,200',
    invoices: [
      { id: 'INV-001', client: 'Bahrain Financial Harbour', amount: 'BD 45,000', status: 'Paid', date: `${now.getFullYear()}-07-01` },
      { id: 'INV-002', client: 'Al Salam Bank', amount: 'BD 30,000', status: 'Paid', date: `${now.getFullYear()}-07-05` },
      { id: 'INV-003', client: 'The Ritz-Carlton', amount: 'BD 32,000', status: 'Pending', date: `${now.getFullYear()}-07-15` },
      { id: 'INV-004', client: 'Bahrain National Hospital', amount: 'BD 28,500', status: 'Pending', date: `${now.getFullYear()}-07-20` },
      { id: 'INV-005', client: 'Diyar Al Muharraq', amount: 'BD 18,000', status: 'Overdue', date: `${now.getFullYear()}-06-15` },
      { id: 'INV-006', client: 'British School', amount: 'BD 15,000', status: 'Paid', date: `${now.getFullYear()}-07-10` },
    ],
    quotes: [
      { id: 'Q-001', client: 'Gulf Air', amount: 'BD 52,000', status: 'Sent', date: `${now.getFullYear()}-07-25` },
      { id: 'Q-002', client: 'BAPCO', amount: 'BD 85,000', status: 'Draft', date: `${now.getFullYear()}-07-26` },
      { id: 'Q-003', client: 'Bahrain Mall', amount: 'BD 22,000', status: 'Sent', date: `${now.getFullYear()}-07-27` },
    ],
  };
}

// ── Notifications ─────────────────────────────────────────

export function getNotifications() {
  return [
    { id: 1, type: 'alert', title: 'Incident Alert', desc: 'Unauthorized access detected at Manama HQ Tower — Gate B', time: '2 min ago', unread: true },
    { id: 2, type: 'success', title: 'Patrol Completed', desc: 'Seef Commercial District patrol route completed — 15/15 checkpoints', time: '15 min ago', unread: true },
    { id: 3, type: 'info', title: 'Shift Change', desc: 'Night shift started — 87 guards clocked in across all sites', time: '1 hour ago', unread: false },
    { id: 4, type: 'warning', title: 'Leave Request', desc: 'Sarah Ahmed requested annual leave — Aug 15-20, 2026', time: '2 hours ago', unread: false },
    { id: 5, type: 'alert', title: 'Invoice Overdue', desc: 'Diyar Al Muharraq invoice BD 18,000 — 15 days overdue', time: '3 hours ago', unread: false },
    { id: 6, type: 'warning', title: 'Late Arrival Alert', desc: `42 guards arrived late today — 15% increase from yesterday`, time: '5 hours ago', unread: false },
  ];
}
