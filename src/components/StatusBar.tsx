import React from 'react';
import { useDesktop } from '../context/DesktopContext';

export function StatusBar() {
  const { authPhase, screen } = useDesktop();
  const labels: Record<string, string> = {
    dashboard: 'Home Dashboard',
    'health-logs': 'Health Logs',
    messages: 'Messages',
    calendar: 'Calendar',
    tasks: 'Tasks',
    profile: 'Profile & Settings',
    search: 'Search',
  };

  const statusText =
    authPhase === 'role'
      ? 'Choose your role'
      : authPhase === 'signin'
        ? 'Sign in'
        : labels[screen] ?? screen;

  return (
    <footer className="status-bar" role="contentinfo">
      <span>CareConnect Desktop — {statusText}</span>
    </footer>
  );
}
