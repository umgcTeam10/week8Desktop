import React from 'react';
import { useDesktop } from '../context/DesktopContext';

/**
 * Design 2.7 Tasks Screen.
 */
export function TasksScreen() {
  const { openModal } = useDesktop();

  return (
    <div className="tasks-content">
      <h2>Tasks</h2>
      <p className="panel-subtitle">Manage your daily health tasks and activities.</p>
      <div className="dashboard-banner" role="status">
        Now: Physical Therapy Appointment — 02:00 PM — All care — <button type="button" className="link-button" onClick={() => {}}>View →</button>
      </div>
      <div className="tasks-summary">
        <div className="dashboard-card">Today: 3 tasks</div>
        <div className="dashboard-card dashboard-card-overdue">Overdue: 2</div>
        <div className="dashboard-card dashboard-card-done">Done: 1</div>
      </div>
      <div className="tasks-actions">
        <button type="button" className="btn-primary" onClick={() => openModal('new-log')}>+ Add Task</button>
        <input type="search" placeholder="Search tasks..." aria-label="Search tasks" className="search-input" />
      </div>
      <div className="alert-banner" role="alert">
        You have 2 overdue tasks <button type="button" className="link-button">View →</button>
      </div>
      <div className="tasks-tabs" role="tablist">
        <button type="button" role="tab" aria-selected="true">Upcoming</button>
        <button type="button" role="tab">Today</button>
        <button type="button" role="tab">Overdue</button>
        <button type="button" role="tab">Done</button>
      </div>
      <ul className="tasks-list" aria-label="Today's tasks">
        <li className="list-item">
          <input type="checkbox" aria-label="Mark Blood Pressure Check done" />
          Blood Pressure Check — Record morning reading — 09:00 AM Jan 27 — With breakfast
          <span className="tag">medium</span>
          <button type="button" className="btn-primary">Done</button>
          <button type="button" className="btn-secondary">Reschedule</button>
        </li>
        <li className="list-item">
          <input type="checkbox" aria-label="Mark Prepare Lunch done" />
          Prepare Lunch — Low-sodium, diabetic-friendly meal — 12:00 PM Jan 27
          <span className="tag">medium</span>
        </li>
      </ul>
      <aside className="tasks-now-card">
        <h3>Physical Therapy Appointment</h3>
        <p>Due now — 02:00 PM — At clinic</p>
        <button type="button" className="btn-primary">Start</button>
        <button type="button" className="btn-secondary">Snooze 10 min</button>
      </aside>
    </div>
  );
}
