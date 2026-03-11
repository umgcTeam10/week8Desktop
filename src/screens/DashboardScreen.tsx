import React from "react";
import { useDesktop } from "../context/DesktopContext";
import { mockCalendarEvents } from "../data/mockData";
import { ClockIcon } from "../components/AuthIcons";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIconSmall,
  UserIcon,
} from "../components/AppIcons";
import { PersistentNowBar } from "../components/PersistentNowBar";

/**
 * Design 2.6 Home Dashboard.
 */
export function DashboardScreen() {
  const { setScreen } = useDesktop();
  const nextAppointment = mockCalendarEvents[0];
  const contrastStyles = `
    .dashboard-page .dashboard-heading p.dashboard-muted-text {
      color: #43617c;
    }

    .dashboard-page .dashboard-card .dashboard-muted-text {
      color: #586f87;
    }

    .dashboard-page .dashboard-wellness .dashboard-muted-text,
    .dashboard-page .dashboard-task-list .dashboard-muted-text,
    .dashboard-page .dashboard-next-appt .dashboard-muted-text {
      color: #516b82;
    }

    .dashboard-page .dashboard-tag-blue {
      background: #dcecf9;
      border-color: #c7ddf1;
      color: #1f5f8c;
    }

    .dashboard-page .dashboard-tag {
      color: #8f5513;
    }
  `;

  return (
    <div className="app-page dashboard-page">
      <style>{contrastStyles}</style>
      <header className="app-page-topbar" aria-label="Dashboard status">
        <h2>Home Dashboard</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">
          Robert{" "}
          <span className="tag tag-blue dashboard-tag-blue">Patient</span>
        </div>
      </header>
      <PersistentNowBar />

      <section
        aria-labelledby="health-today-heading"
        className="dashboard-heading"
      >
        <h3 id="health-today-heading">Your Health Today</h3>
        <p className="dashboard-muted-text">
          Here&apos;s your care summary for today
        </p>
      </section>

      <div className="dashboard-cards">
        <article className="dashboard-card">
          <span className="dashboard-card-icon">
            <CheckCircleIcon className="dashboard-card-icon-svg" />
          </span>
          <div>
            <strong>1</strong>
            <span className="dashboard-muted-text">Completed</span>
          </div>
        </article>
        <article className="dashboard-card">
          <span className="dashboard-card-icon">
            <ClockIconSmall className="dashboard-card-icon-svg" />
          </span>
          <div>
            <strong>2</strong>
            <span className="dashboard-muted-text">Pending</span>
          </div>
        </article>
        <article className="dashboard-card">
          <span className="dashboard-card-icon">
            <CalendarIcon className="dashboard-card-icon-svg" />
          </span>
          <div>
            <strong>3</strong>
            <span className="dashboard-muted-text">Appointments</span>
          </div>
        </article>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <section className="dashboard-wellness app-surface-card">
            <div className="dashboard-wellness-icon" aria-hidden="true">
              <UserIcon className="dashboard-wellness-icon-svg" />
            </div>
            <div>
              <h4>How are you feeling today?</h4>
              <p className="dashboard-muted-text">
                Take a moment to log your mood and any symptoms
              </p>
              <button
                type="button"
                className="btn-primary dashboard-inline-btn"
              >
                Log Wellness Check
              </button>
            </div>
          </section>

          <section
            className="app-surface-card dashboard-task-card"
            aria-labelledby="tasks-heading"
          >
            <div className="section-row">
              <h3 id="tasks-heading">Today&apos;s Tasks</h3>
              <button
                type="button"
                className="link-button dashboard-link-button"
                onClick={() => setScreen("tasks")}
              >
                View All →
              </button>
            </div>
            <ul className="dashboard-task-list">
              <li>
                <div>
                  <strong>Blood Pressure Check</strong>
                  <span className="dashboard-muted-text">09:00 AM</span>
                </div>
                <span className="tag dashboard-tag">medium</span>
              </li>
              <li>
                <div>
                  <strong>Prepare Lunch</strong>
                  <span className="dashboard-muted-text">12:00 PM</span>
                </div>
                <span className="tag dashboard-tag">medium</span>
              </li>
            </ul>
          </section>
        </div>

        <aside
          className="dashboard-side"
          aria-label="Appointment and care team"
        >
          <section
            className="dashboard-next-appt app-surface-card"
            aria-labelledby="next-appt-heading"
          >
            <div className="section-row">
              <h3 id="next-appt-heading">Next Appointment</h3>
              <span className="tag tag-blue dashboard-tag-blue">therapy</span>
            </div>
            <p>
              <strong>{nextAppointment?.title}</strong>
            </p>
            <p className="panel-subtitle dashboard-muted-text">
              Knee rehabilitation session
            </p>
            <div className="dashboard-next-appt-footer">
              <div className="dashboard-next-appt-details">
                <p className="dashboard-detail-row dashboard-muted-text">
                  <ClockIcon className="dashboard-inline-icon" />
                  {nextAppointment?.date} at {nextAppointment?.time}
                </p>
                <p className="dashboard-detail-row dashboard-muted-text">
                  Dr. Lisa Chen, PT
                </p>
              </div>
              <button type="button" className="btn-secondary">
                Set Reminder
              </button>
            </div>
          </section>

          <section className="dashboard-care-team app-surface-card">
            <h3>Your care team is here for you</h3>
            <p>Need help or have questions? Reach out anytime.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setScreen("messages")}
            >
              Send Message
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
