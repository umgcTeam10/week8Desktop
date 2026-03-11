import React from "react";
import { useDesktop } from "../context/DesktopContext";
import { PersistentNowBar } from "../components/PersistentNowBar";

const patientTagStyle: React.CSSProperties = { color: "#1f5f91" };
const statsLabelStyle: React.CSSProperties = { color: "#53697f" };
const settingMetaStyle: React.CSSProperties = { color: "#556f86" };
const sliderScaleStyle: React.CSSProperties = { color: "#556d83" };

/**
 * Design 2.11 Profile and Settings: Notifications, Preferences, Accessibility.
 * A11y fixes:
 *  - Wrapped content in <div> (app shell provides the <main> landmark)
 *  - Removed redundant aria-label from checkboxes (implicit label via wrapping <label>)
 *  - Removed redundant aria-label from slider (htmlFor/id already provides accessible name)
 *  - Added aria-hidden to decorative icon spans in contact list
 *  - Added aria-hidden to decorative avatar initials
 *  - Added aria-labelledby to Account Statistics section (was missing)
 *  - Added aria-label to <aside> for screen reader landmark navigation
 *  - Added role="group" + aria-labelledby to segmented Time Format buttons
 *  - Added aria-pressed to segmented buttons
 *  - Added aria-hidden to visual-only slider scale labels
 */
export function ProfileScreen() {
  const { highContrast, setHighContrast, zoom, setZoom } = useDesktop();

  return (
    <div className="app-page profile-page">
      <header
        className="app-page-topbar"
        aria-label="Profile and Settings page header"
      >
        <h2>Profile &amp; Settings</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">
          Robert <span className="tag tag-blue" style={patientTagStyle}>Patient</span>
        </div>
      </header>

      <PersistentNowBar />

      <div className="profile-content layout-two-panel">
        <aside
          className="panel-side profile-side"
          aria-label="User profile summary"
        >
          <section
            aria-labelledby="profile-heading"
            className="app-surface-card"
          >
            <h3 id="profile-heading">User Profile</h3>
            <div className="profile-avatar" aria-hidden="true">
              SJ
            </div>
            <p>
              <strong>Sarah Johnson</strong>
            </p>
            <p>Caregiver</p>
            <button type="button" className="btn-secondary">
              Edit Profile
            </button>
          </section>

          <section
            aria-labelledby="contact-heading"
            className="app-surface-card"
          >
            <h3 id="contact-heading">Contact Information</h3>
            <ul className="profile-contact-list">
              <li>
                <span aria-hidden="true">@</span>
                <p>sarah.johnson@email.com</p>
              </li>
              <li>
                <span aria-hidden="true">☎</span>
                <p>(555) 123-4567</p>
              </li>
              <li>
                <span aria-hidden="true">⌂</span>
                <p>123 Main St, City, ST</p>
              </li>
            </ul>
          </section>

          <section aria-labelledby="stats-heading" className="app-surface-card">
            <h3 id="stats-heading">Account Statistics</h3>
            <ul className="profile-stats-list">
              <li>
                <span style={statsLabelStyle}>Member since</span>
                <strong>January 2024</strong>
              </li>
              <li>
                <span style={statsLabelStyle}>Active days</span>
                <strong>45 days</strong>
              </li>
              <li>
                <span style={statsLabelStyle}>Tasks completed</span>
                <strong>128</strong>
              </li>
            </ul>
          </section>
        </aside>

        <section
          className="panel-main profile-main"
          aria-labelledby="profile-settings-heading"
        >
          <header className="profile-header">
            <h2 id="profile-settings-heading">Settings</h2>
            <input
              type="search"
              placeholder="Search settings (Ctrl+F)"
              aria-label="Search settings"
              className="search-input"
            />
          </header>

          <section
            aria-labelledby="notifications-heading"
            className="profile-settings-section"
          >
            <h3 id="notifications-heading">Notifications</h3>
            <p className="panel-subtitle">Manage your notification settings</p>
            <div className="profile-row-grid">
              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input type="checkbox" defaultChecked />
                  Push Notifications
                </label>
                <span style={settingMetaStyle}>Receive app notifications</span>
              </div>

              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input type="checkbox" defaultChecked />
                  Email Notifications
                </label>
                <span style={settingMetaStyle}>Receive email updates</span>
              </div>

              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input type="checkbox" defaultChecked />
                  Task Reminders
                </label>
                <span style={settingMetaStyle}>Remind me about tasks</span>
              </div>

              <div className="profile-setting-row">
                <strong>Quiet Hours</strong>
                <span style={settingMetaStyle}>10:00 PM - 7:00 AM</span>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="preferences-heading"
            className="profile-settings-section"
          >
            <h3 id="preferences-heading">Preferences</h3>
            <p className="panel-subtitle">
              Customize your CareConnect experience
            </p>
            <div className="profile-row-grid">
              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                  />
                  Dark Mode
                </label>
                <span style={settingMetaStyle}>
                  Currently {highContrast ? "enabled" : "disabled"}
                </span>
              </div>

              <div className="profile-setting-row">
                <strong>Language</strong>
                <span style={settingMetaStyle}>English (US)</span>
              </div>

              <div className="profile-setting-row">
                <strong id="time-format-label">Time Format</strong>
                <div
                  className="segmented"
                  role="group"
                  aria-labelledby="time-format-label"
                >
                  <button type="button" className="active" aria-pressed="true">
                    12h
                  </button>
                  <button type="button" aria-pressed="false">
                    24h
                  </button>
                </div>
              </div>

              <div className="profile-setting-row">
                <strong>Date Format</strong>
                <span style={settingMetaStyle}>MM/DD/YYYY</span>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="accessibility-heading"
            className="profile-settings-section"
          >
            <h3 id="accessibility-heading">Accessibility</h3>
            <p className="panel-subtitle">
              Adjust settings for better usability
            </p>
            <div className="profile-setting-row profile-slider-row">
              <label htmlFor="text-size-slider">Text Size</label>
              <input
                id="text-size-slider"
                type="range"
                min="12"
                max="24"
                value={Math.round(16 * zoom)}
                onChange={(e) => setZoom(Number(e.target.value) / 16)}
                aria-valuenow={Math.round(16 * zoom)}
                aria-valuemin={12}
                aria-valuemax={24}
              />
              <div
                className="profile-slider-scale"
                aria-hidden="true"
                style={sliderScaleStyle}
              >
                <span>A (Small)</span>
                <span>Normal — {Math.round(16 * zoom)}px</span>
                <span>A (Large)</span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
