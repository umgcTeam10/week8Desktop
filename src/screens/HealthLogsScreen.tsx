import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { mockHealthLogs } from '../data/mockData';

/**
 * Design 2.9 Health Logs: summary panel + recent logs, filter bar.
 */
export function HealthLogsScreen() {
  const { error, openModal } = useDesktop();

  return (
    <div className="layout-two-panel health-logs-layout">
      <div className="panel-side">
        <section aria-labelledby="health-summary-heading">
          <h3 id="health-summary-heading">Health Summary</h3>
          <a href="#recent-logs" className="link">View Report</a>
          <div className="health-summary-cards">
            <div className="health-summary-card">BP Today: 120/80 mmHg</div>
            <div className="health-summary-card">Meds: 2/2 Completed</div>
            <div className="health-summary-card">Meals: 1,240 Calories</div>
            <div className="health-summary-card">Mood: Good Improving</div>
          </div>
          <h4>FILTERS</h4>
          <div className="nav-buttons" role="group" aria-label="Filter by type">
            <button type="button" className="active">All</button>
            <button type="button">Vitals</button>
            <button type="button">Meds</button>
            <button type="button">Meals</button>
          </div>
          <p>Weekly Activity: 4/7 Days</p>
        </section>
      </div>
      <div className="panel-main" id="recent-logs">
        {error && <div className="error-banner" role="alert">{error}</div>}
        <div className="health-logs-toolbar">
          <h2>Health Logs</h2>
          <input type="search" placeholder="Search logs... (Ctrl+F)" aria-label="Search logs" className="search-input" />
          <button type="button" className="btn-primary" onClick={() => openModal('new-log')}>+ New Log</button>
        </div>
        <p className="panel-subtitle">Sort by: Date</p>
        <ul aria-label="Recent health log entries">
          {mockHealthLogs.map((log) => (
            <li key={log.id} className="list-item health-log-entry">
              <strong>{log.date}</strong> — {log.type}: {log.notes}
              <span className="log-tag log-tag-vitals">VITALS</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
