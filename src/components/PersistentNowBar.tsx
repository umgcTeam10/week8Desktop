import React from 'react';
import { useDesktop } from '../context/DesktopContext';

export function PersistentNowBar() {
  const { setScreen } = useDesktop();

  return (
    <div className="dashboard-banner app-now-banner app-now-banner-persistent" role="status">
      <div className="app-now-banner-main">
        <span className="dashboard-banner-now" aria-hidden="true" />
        <strong>Now: Physical Therapy Appointment</strong>
        <span className="app-now-banner-sep">|</span>
        <span className="app-now-banner-item">02:00 PM</span>
        <span className="app-now-banner-sep">|</span>
        <span className="app-now-banner-item">All care</span>
      </div>
      <button
        type="button"
        className="app-now-banner-action"
        onClick={() => setScreen('calendar')}
      >
        View →
      </button>
    </div>
  );
}
