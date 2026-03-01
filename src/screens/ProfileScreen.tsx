import React from 'react';
import { useDesktop } from '../context/DesktopContext';
import { PersistentNowBar } from '../components/PersistentNowBar';

/**
 * Design 2.11 Profile and Settings: Notifications, Preferences, Accessibility.
 */
export function ProfileScreen() {
  const { highContrast, setHighContrast, zoom, setZoom } = useDesktop();

  return (
    <div className="app-page profile-page">
      <header className="app-page-topbar" aria-label="Profile status">
        <h2>Profile &amp; Settings</h2>
        <p>Monday, January 26, 2026 | 4:02 PM</p>
        <div className="app-page-user">Robert <span className="tag tag-blue">Patient</span></div>
      </header>
      <PersistentNowBar />
      <div className="profile-content layout-two-panel">
        <aside className="panel-side profile-side">
          <section aria-labelledby="profile-heading" className="app-surface-card">
            <h3 id="profile-heading">User Profile</h3>
            <div className="profile-avatar">SJ</div>
            <p><strong>Sarah Johnson</strong></p>
            <p>Caregiver</p>
            <button type="button" className="btn-secondary">Edit Profile</button>
          </section>
          <section aria-labelledby="contact-heading" className="app-surface-card">
            <h3 id="contact-heading">Contact Information</h3>
            <ul className="profile-contact-list">
              <li><span>@</span><p>sarah.johnson@email.com</p></li>
              <li><span>☎</span><p>(555) 123-4567</p></li>
              <li><span>⌂</span><p>123 Main St, City, ST</p></li>
            </ul>
          </section>
          <section className="app-surface-card">
            <h3>Account Statistics</h3>
            <ul className="profile-stats-list">
              <li><span>Member since</span><strong>January 2024</strong></li>
              <li><span>Active days</span><strong>45 days</strong></li>
              <li><span>Tasks completed</span><strong>128</strong></li>
            </ul>
          </section>
        </aside>

        <main className="panel-main profile-main">
          <header className="profile-header">
            <h2>Settings</h2>
            <input type="search" placeholder="Search settings (Ctrl+F)" aria-label="Search settings" className="search-input" />
          </header>

          <section aria-labelledby="notifications-heading" className="profile-settings-section">
            <h3 id="notifications-heading">Notifications</h3>
            <p className="panel-subtitle">Manage your notification settings</p>
            <div className="profile-row-grid">
              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input type="checkbox" defaultChecked aria-label="Push Notifications" />
                  Push Notifications
                </label>
                <span>Receive app notifications</span>
              </div>
              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input type="checkbox" defaultChecked aria-label="Email Notifications" />
                  Email Notifications
                </label>
                <span>Receive email updates</span>
              </div>
              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input type="checkbox" defaultChecked aria-label="Task Reminders" />
                  Task Reminders
                </label>
                <span>Remind me about tasks</span>
              </div>
              <div className="profile-setting-row">
                <strong>Quiet Hours</strong>
                <span>10:00 PM - 7:00 AM</span>
              </div>
            </div>
          </section>

          <section aria-labelledby="preferences-heading" className="profile-settings-section">
            <h3 id="preferences-heading">Preferences</h3>
            <p className="panel-subtitle">Customize your CareConnect experience</p>
            <div className="profile-row-grid">
              <div className="profile-setting-row">
                <label className="checkbox-label profile-toggle-row">
                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(e) => setHighContrast(e.target.checked)}
                    aria-label="Dark Mode"
                  />
                  Dark Mode
                </label>
                <span>Currently {highContrast ? 'enabled' : 'disabled'}</span>
              </div>
              <div className="profile-setting-row">
                <strong>Language</strong>
                <span>English (US)</span>
              </div>
              <div className="profile-setting-row">
                <strong>Time Format</strong>
                <div className="segmented">
                  <button type="button" className="active">12h</button>
                  <button type="button">24h</button>
                </div>
              </div>
              <div className="profile-setting-row">
                <strong>Date Format</strong>
                <span>MM/DD/YYYY</span>
              </div>
            </div>
          </section>

          <section aria-labelledby="accessibility-heading" className="profile-settings-section">
            <h3 id="accessibility-heading">Accessibility</h3>
            <p className="panel-subtitle">Adjust settings for better usability</p>
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
                aria-label="Text size"
              />
              <div className="profile-slider-scale">
                <span>A (Small)</span>
                <span>Normal — {Math.round(16 * zoom)}px</span>
                <span>A (Large)</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
