import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { mockHealthLogs } from '../data/mockData';
import { PersistentNowBar } from '../components/PersistentNowBar';
import { CalendarIcon, CheckCircleIcon, ClipboardIcon, HeartOutlineIcon } from '../components/AppIcons';

/**
 * Design 2.9 Health Logs: summary panel + recent logs, filter bar.
 */
export function HealthLogsScreen() {
  const { error, openModal } = useDesktop();
  const badgesByType: Record<string, { label: string; chips: string[]; icon: JSX.Element }> = {
    'Blood pressure': {
      label: 'VITALS',
      chips: ['Systolic: 120', 'Diastolic: 80', 'Heart Rate: 72'],
      icon: <HeartOutlineIcon className="health-log-icon-svg" />,
    },
    Glucose: {
      label: 'LAB',
      chips: ['Fasting', 'Range: normal'],
      icon: <ClipboardIcon className="health-log-icon-svg" />,
    },
    Weight: {
      label: 'WELLNESS',
      chips: ['Weekly trend', 'Hydration: good'],
      icon: <CheckCircleIcon className="health-log-icon-svg" />,
    },
  };
  const contrastStyles = `
    .health-logs-page .health-summary-card span,
    .health-logs-page .health-summary-card small {
      color: #557188;
    }

    .health-logs-page .health-filter-card h4 {
      color: #506c85;
    }

    .health-logs-page .health-filter-card p {
      color: #557188;
    }

    .health-logs-page .health-week-grid span {
      color: #506c85;
    }

    .health-logs-page .health-chip {
      color: #506c85;
    }

    .health-logs-page .health-log-entry-meta {
      color: #58758f;
    }

    .health-logs-page .app-page-user .tag-blue {
      color: #25679b;
      border-color: #a9cde6;
    }
  `;

  return (
    <div className="app-page health-logs-page">
      <style>{contrastStyles}</style>
      <header className="app-page-topbar" aria-label="Health Logs status">
        <h2>Health Logs</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">Robert <span className="tag tag-blue">Patient</span></div>
      </header>
      <PersistentNowBar />

      <div className="layout-two-panel health-logs-layout">
        <aside className="panel-side health-logs-side" aria-label="Health summary">
          <header className="health-logs-side-header">
            <h3 id="health-summary-heading">Health Summary</h3>
            <a href="#recent-logs" className="link">View Report</a>
          </header>

          <section aria-labelledby="health-summary-heading" className="health-summary-cards">
            <div className="health-summary-card"><span>BP Today</span><strong>120/80</strong><small>mmHg</small></div>
            <div className="health-summary-card"><span>Meds</span><strong>2/2</strong><small>Completed</small></div>
            <div className="health-summary-card"><span>Meals</span><strong>1,240</strong><small>Calories</small></div>
            <div className="health-summary-card"><span>Mood</span><strong>Good</strong><small>Improving</small></div>
          </section>

          <section className="health-filter-card">
            <h4>Filters</h4>
            <div className="nav-buttons health-filter-pills" role="group" aria-label="Filter by type">
              <button type="button" className="active">All</button>
              <button type="button">Vitals</button>
              <button type="button">Meds</button>
              <button type="button">Meals</button>
            </div>
            <p>Weekly Activity <span>4/7 Days</span></p>
            <div className="health-week-grid" aria-label="Weekly activity chart">
              <span className="on">M</span>
              <span className="on">T</span>
              <span className="on">W</span>
              <span>Th</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </section>
        </aside>

        <section className="panel-main health-logs-main" id="recent-logs" aria-labelledby="recent-logs-heading">
          <header className="health-logs-toolbar">
            <h2 id="recent-logs-heading">Recent Logs</h2>
            <input type="search" placeholder="Search logs... (Ctrl+F)" aria-label="Search logs" className="search-input" />
            <button type="button" className="btn-primary" onClick={() => openModal('new-log')}>+ New Log</button>
            <button type="button" className="health-sort-btn">Sort by: Date</button>
          </header>

          {error && <div className="error-banner" role="alert">{error}</div>}

          <section aria-label="Log entries">
            <h3>
              Entries
              {' '}
              <span className="tag tag-blue">{mockHealthLogs.length}</span>
            </h3>
            <ul className="health-log-list" aria-label="Recent health log entries">
              {mockHealthLogs.map((log) => (
                <li key={log.id} className="list-item health-log-entry">
                  <div className="health-log-entry-head">
                    <div className="health-log-title-wrap">
                      <span className="health-log-icon" aria-hidden="true">
                        {badgesByType[log.type]?.icon ?? <CalendarIcon className="health-log-icon-svg" />}
                      </span>
                      <div>
                        <strong>{log.type} Check</strong>
                        <p className="health-log-entry-meta">{log.date} · Resting · Right Arm</p>
                      </div>
                    </div>
                    <span className="log-tag log-tag-vitals">
                      {badgesByType[log.type]?.label ?? 'LOG'}
                    </span>
                  </div>
                  <div className="health-log-chip-row">
                    {(badgesByType[log.type]?.chips ?? ['Tracked today']).map((chip) => (
                      <span key={`${log.id}-${chip}`} className="health-chip">{chip}</span>
                    ))}
                  </div>
                  <p className="health-log-entry-note">{log.notes}</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </div>
  );
}
