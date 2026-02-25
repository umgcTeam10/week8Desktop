import React from 'react';
import { mockCalendarEvents } from '../data/mockData';

/**
 * Design 2.8 Calendar: month view, today highlighted, Today's Schedule.
 */
export function CalendarScreen() {
  return (
    <div className="calendar-content">
      <h2>Calendar</h2>
      <p className="panel-subtitle">View your schedule and upcoming appointments.</p>
      <div className="calendar-month-nav">
        <button type="button" aria-label="Previous month">←</button>
        <span>January 2026</span>
        <button type="button" aria-label="Next month">→</button>
      </div>
      <div className="calendar-grid" role="grid" aria-label="January 2026 calendar">
        <div className="calendar-weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <p className="calendar-note">(Calendar grid: day 26 highlighted as today)</p>
      </div>
      <section aria-labelledby="today-schedule-heading">
        <h3 id="today-schedule-heading">Today&apos;s Schedule — Monday, Jan 26</h3>
        <ul aria-label="Today's appointments">
          {mockCalendarEvents.map((ev) => (
            <li key={ev.id} className="list-item">
              <strong>{ev.title}</strong> — {ev.time}
              <span className="tag">high</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
