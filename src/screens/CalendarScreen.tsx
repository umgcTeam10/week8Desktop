import React from 'react';
import { mockCalendarEvents } from '../data/mockData';
import { PersistentNowBar } from '../components/PersistentNowBar';

/**
 * Design 2.8 Calendar: month view, today highlighted, Today's Schedule.
 */
export function CalendarScreen() {
  const days = [
    ['', '', '', '', '1', '2', '3'],
    ['4', '5', '6', '7', '8', '9', '10'],
    ['11', '12', '13', '14', '15', '16', '17'],
    ['18', '19', '20', '21', '22', '23', '24'],
    ['25', '26', '27', '28', '29', '30', '31'],
  ];

  return (
    <div className="app-page calendar-page">
      <header className="app-page-topbar" aria-label="Calendar status">
        <h2>Calendar</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">Robert <span className="tag tag-blue">Patient</span></div>
      </header>
      <PersistentNowBar />

      <section className="dashboard-heading" aria-labelledby="calendar-heading">
        <h3 id="calendar-heading">Calendar Overview</h3>
        <p>View your schedule and upcoming appointments</p>
      </section>

      <section className="calendar-shell app-surface-card" role="grid" aria-label="January 2026 calendar">
        <div className="calendar-month-nav">
          <button type="button" aria-label="Previous month">←</button>
          <span>January 2026</span>
          <button type="button" aria-label="Next month">→</button>
        </div>
        <div className="calendar-weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div className="calendar-days">
          {days.flatMap((week, weekIndex) =>
            week.map((day, dayIndex) => {
              if (!day) {
                return <span key={`empty-${weekIndex}-${dayIndex}`} className="calendar-day empty" aria-hidden="true" />;
              }
              const isToday = day === '26';
              const hasDot = day === '27';
              return (
                <span key={`${weekIndex}-${day}`} className={`calendar-day ${isToday ? 'today' : ''}`}>
                  {day}
                  {hasDot && <span className="calendar-event-dot" aria-hidden="true" />}
                </span>
              );
            })
          )}
        </div>
      </section>

      <section aria-labelledby="today-schedule-heading" className="calendar-schedule">
        <h3 id="today-schedule-heading">Today&apos;s Schedule</h3>
        <p className="panel-subtitle">Monday, Jan 26</p>
        <ul aria-label="Today's appointments" className="calendar-schedule-list">
          {mockCalendarEvents.map((ev) => (
            <li key={ev.id} className="list-item calendar-schedule-card">
              <div>
                <strong>{ev.title}</strong>
                <p>{ev.time}</p>
              </div>
              <span className="tag">high</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
