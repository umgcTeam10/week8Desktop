import React from 'react';
import { useDesktop } from '../context/DesktopContext';

/**
 * Design 2.11 Profile and Settings: Notifications, Preferences, Accessibility.
 */
export function ProfileScreen() {
  const { highContrast, setHighContrast, zoom, setZoom } = useDesktop();

  return (
    <div className="profile-content layout-two-panel">
      <div className="panel-side">
        <section aria-labelledby="profile-heading">
          <h3 id="profile-heading">User Profile</h3>
          <div className="profile-avatar">SJ</div>
          <p><strong>Sarah Johnson</strong></p>
          <p>Caregiver</p>
          <button type="button" className="btn-secondary">Edit Profile</button>
        </section>
        <section aria-labelledby="contact-heading">
          <h3 id="contact-heading">Contact Information</h3>
          <p>sarah.johnson@email.com</p>
          <p>(555) 123-4567</p>
          <p>123 Main St, City, ST</p>
        </section>
        <p>Member since January 2024 — Active 45 days</p>
      </div>
      <div className="panel-main">
        <h2>Profile &amp; Settings</h2>
        <section aria-labelledby="notifications-heading">
          <h3 id="notifications-heading">Notifications</h3>
          <p className="panel-subtitle">Manage your notification settings</p>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked aria-label="Push Notifications" />
              Push Notifications — Receive app notifications
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked aria-label="Email Notifications" />
              Email Notifications — Receive email updates
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked aria-label="Task Reminders" />
              Task Reminders — Remind me about tasks
            </label>
          </div>
          <p className="form-helper">Quiet Hours: 10:00 PM - 7:00 AM</p>
        </section>
        <section aria-labelledby="preferences-heading">
          <h3 id="preferences-heading">Preferences</h3>
          <p className="panel-subtitle">Customize your CareConnect experience</p>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                aria-label="Dark Mode"
              />
              Dark Mode — Currently {highContrast ? 'enabled' : 'disabled'}
            </label>
          </div>
          <div className="form-group">
            <label>Language: English (US)</label>
          </div>
          <div className="form-group">
            <label>Time Format: 12-hour (AM/PM)</label>
            <div className="segmented">
              <button type="button" className="active">12h</button>
              <button type="button">24h</button>
            </div>
          </div>
          <div className="form-group">
            <label>Date Format: MM/DD/YYYY</label>
          </div>
        </section>
        <section aria-labelledby="accessibility-heading">
          <h3 id="accessibility-heading">Accessibility</h3>
          <p className="panel-subtitle">Adjust settings for better usability</p>
          <div className="form-group">
            <label htmlFor="text-size-slider">Text Size — Adjust the display size of text</label>
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
            <span>Normal — 16px</span>
          </div>
        </section>
      </div>
    </div>
  );
}
