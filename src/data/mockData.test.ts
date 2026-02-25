import { mockHealthLogs, mockMessages, mockCalendarEvents } from './mockData';

describe('mockData', () => {
  it('mockHealthLogs has required fields', () => {
    expect(mockHealthLogs.length).toBeGreaterThan(0);
    mockHealthLogs.forEach((log) => {
      expect(log).toHaveProperty('id');
      expect(log).toHaveProperty('date');
      expect(log).toHaveProperty('type');
      expect(log).toHaveProperty('notes');
    });
  });

  it('mockMessages has required fields', () => {
    expect(mockMessages.length).toBeGreaterThan(0);
    mockMessages.forEach((msg) => {
      expect(msg).toHaveProperty('id');
      expect(msg).toHaveProperty('from');
      expect(msg).toHaveProperty('subject');
      expect(msg).toHaveProperty('date');
      expect(msg).toHaveProperty('read');
    });
  });

  it('mockCalendarEvents has required fields', () => {
    expect(mockCalendarEvents.length).toBeGreaterThan(0);
    mockCalendarEvents.forEach((ev) => {
      expect(ev).toHaveProperty('id');
      expect(ev).toHaveProperty('title');
      expect(ev).toHaveProperty('date');
      expect(ev).toHaveProperty('time');
    });
  });
});
