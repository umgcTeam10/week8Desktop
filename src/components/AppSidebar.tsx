import React from 'react';
import { useDesktop, Screen } from '../context/DesktopContext';

const navItems: { key: Screen; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'health-logs', label: 'Health Logs' },
  { key: 'messages', label: 'Messages' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'profile', label: 'Profile' },
];

export function AppSidebar() {
  const { screen, setScreen } = useDesktop();

  return (
    <aside className="app-sidebar" role="navigation" aria-label="Main navigation">
      <div className="app-sidebar-brand">
        <span aria-hidden="true">♥</span> CareConnect
      </div>
      <nav className="app-sidebar-nav">
        {navItems.map(({ key, label }) => (
          <button
            type="button"
            key={key}
            className={screen === key ? 'active' : ''}
            onClick={() => setScreen(key)}
            aria-current={screen === key ? 'page' : undefined}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="app-sidebar-user">
        Robert Patient
      </div>
    </aside>
  );
}
