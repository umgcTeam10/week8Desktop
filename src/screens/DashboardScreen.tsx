import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { mockCalendarEvents } from '../data/mockData';

/**
 * Design 2.6 Home Dashboard.
 */
export function DashboardScreen() {
  const { setScreen } = useDesktop();
  const nextAppointment = mockCalendarEvents[0];

  return (
    <div className="dashboard-content">
      <h2>Home Dashboard</h2>
      <p className="panel-subtitle">Monday, January 26, 2026 4:02 PM</p>
      <div className="dashboard-banner" role="status">
        <span className="dashboard-banner-now">Now:</span> Physical Therapy Appointment — 02:00 PM — All care
        <button type="button" className="link-button" onClick={() => setScreen('calendar')}>View →</button>
      </div>
      <section aria-labelledby="health-today-heading">
        <h3 id="health-today-heading">Your Health Today</h3>
        <p>Here&apos;s your care summary for today.</p>
        <div className="dashboard-cards">
          <div className="dashboard-card"><span className="dashboard-card-icon">✓</span> 1 Completed</div>
          <div className="dashboard-card"><span className="dashboard-card-icon">⏱</span> 2 Pending</div>
          <div className="dashboard-card"><span className="dashboard-card-icon">📅</span> 3 Appointments</div>
        </div>
      </section>
      <section className="dashboard-wellness">
        <p>Take a moment to log your mood and any symptoms.</p>
        <button type="button" className="btn-primary">Log Wellness Check</button>
      </section>
      <section aria-labelledby="tasks-heading">
        <h3 id="tasks-heading">Today&apos;s Tasks</h3>
        <button type="button" className="link-button" onClick={() => setScreen('tasks')}>View All →</button>
        <ul>
          <li className="list-item">Blood Pressure Check — 09:00 AM <span className="tag">medium</span></li>
          <li className="list-item">Prepare Lunch — 12:00 PM <span className="tag">medium</span></li>
        </ul>
      </section>
      <section className="dashboard-next-appt" aria-labelledby="next-appt-heading">
        <h3 id="next-appt-heading">Next Appointment</h3>
        <p><strong>{nextAppointment?.title}</strong> — {nextAppointment?.date} at {nextAppointment?.time}</p>
        <button type="button" className="btn-secondary">Set Reminder</button>
      </section>
      <section className="dashboard-care-team">
        <p>Need help or have questions? Reach out anytime.</p>
        <button type="button" className="btn-primary" onClick={() => setScreen('messages')}>Send Message</button>
      </section>
    </div>
  );
}
