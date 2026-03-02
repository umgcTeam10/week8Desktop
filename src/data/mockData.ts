export interface HealthLogEntry {
  id: string;
  date: string;
  type: string;
  notes: string;
}

export interface Message {
  id: string;
  from: string;
  subject: string;
  date: string;
  read: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
}

export const mockHealthLogs: HealthLogEntry[] = [
  { id: '1', date: '2025-02-24', type: 'Blood pressure', notes: '120/80' },
  { id: '2', date: '2025-02-23', type: 'Glucose', notes: '95 mg/dL' },
  { id: '3', date: '2025-02-22', type: 'Weight', notes: '70 kg' },
];

export const mockMessages: Message[] = [
  { id: '1', from: 'Dr. Smith', subject: 'Appointment reminder', date: '2025-02-24', read: false },
  { id: '2', from: 'CareConnect', subject: 'Weekly summary', date: '2025-02-23', read: true },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: '1', title: 'Check-up', date: '2026-01-26', time: '10:00 AM' },
  { id: '2', title: 'Lab results', date: '2026-01-27', time: '2:00 PM' },
];
